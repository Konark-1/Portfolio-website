import struct
import os
import sys

# Reconfigure stdout to use utf-8 so print doesn't crash on windows console
sys.stdout.reconfigure(encoding='utf-8')

RGSS3A_MAGIC = b"RGSSAD\x00\x03"

def decrypt_rgss3a_header(filepath):
    files = []
    with open(filepath, "rb") as f:
        magic = f.read(8)
        if magic != RGSS3A_MAGIC:
            return []
        key = struct.unpack("<I", f.read(4))[0]
        key = key * 9 + 3
        while True:
            offset_enc = struct.unpack("<I", f.read(4))[0]
            offset = offset_enc ^ key
            if offset == 0:
                break
            size_enc = struct.unpack("<I", f.read(4))[0]
            size = size_enc ^ key
            file_key_enc = struct.unpack("<I", f.read(4))[0]
            file_key = file_key_enc ^ key
            name_len_enc = struct.unpack("<I", f.read(4))[0]
            name_len = name_len_enc ^ key
            name_bytes = bytearray(f.read(name_len))
            for i in range(name_len):
                name_bytes[i] ^= (key >> (8 * (i % 4))) & 0xFF
            name = name_bytes.decode("utf-8", errors="replace")
            name = name.replace("\\", "/")
            files.append({"name": name, "offset": offset, "size": size, "key": file_key})
    return files

def extract_file(archive_path, file_info, base_dir):
    out_path = os.path.join(base_dir, file_info["name"])
    
    # Don't overwrite if it's already extracted or is one of our modified files
    skip_files = ['Data/Scripts.rvdata2', 'Data/Enemies.rvdata2', 'Data/Skills.rvdata2']
    if file_info["name"] in skip_files or os.path.exists(out_path):
        return
        
    with open(archive_path, "rb") as f:
        f.seek(file_info["offset"])
        encrypted = bytearray(f.read(file_info["size"]))
    key = file_info["key"]
    key_bytes = struct.pack("<I", key)
    j = 0
    for i in range(len(encrypted)):
        encrypted[i] ^= key_bytes[j]
        j += 1
        if j == 4:
            j = 0
            key = (key * 7 + 3) & 0xFFFFFFFF
            key_bytes = struct.pack("<I", key)
            
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as out:
        out.write(encrypted)
    # print safely without crashing on unicode errors
    print(f"Extracted {file_info['name'].encode('utf-8', 'replace').decode('utf-8')}")

archive = "E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Game.rgss3a"
base_dir = "E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4"
files = decrypt_rgss3a_header(archive)

for f in files:
    extract_file(archive, f, base_dir)

print("Extraction complete.")
