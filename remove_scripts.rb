require 'zlib'

def remove_script(file_path, script_name)
  return unless File.exist?(file_path)
  scripts = File.open(file_path, 'rb') { |f| Marshal.load(f) }
  original_length = scripts.length
  scripts.reject! { |s| s[1] == script_name }
  if scripts.length < original_length
    File.open(file_path, 'wb') { |f| Marshal.dump(scripts, f) }
    puts "Removed #{script_name} from #{file_path}"
  else
    puts "#{script_name} not found in #{file_path}"
  end
end

remove_script('E:/Games/Portal 2/Fix Repair/GAME/KAREN/Data/Scripts.rvdata2', 'EthanDamageOverride')
remove_script('E:/Games/Portal 2/Fix Repair/GAME/EGYPT/Data/Scripts.rvdata2', 'EthanDamageOverrideEgypt')

