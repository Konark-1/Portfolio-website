
require 'zlib'
scripts = File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }
kaori_script = scripts.find { |s| s[1] == 'Kaori Script' }
code = Zlib::Inflate.inflate(kaori_script[2]).force_encoding('UTF-8') rescue ''
File.open('C:/New folder/backup/desktop/Portfolio-website/kaori_script.rb', 'w', encoding: 'utf-8') { |f| f.write(code) }

