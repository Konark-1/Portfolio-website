require 'zlib'
scripts = File.open('E:/Games/Portal 2/Fix Repair/GAME/KAREN/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }
scripts.each do |s|
  if s[0] == 12345
    puts s[1]
    puts Zlib::Inflate.inflate(s[2]).force_encoding('UTF-8') rescue ''
  end
end
