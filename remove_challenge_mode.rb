require 'zlib'

scripts = File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }

# Remove all custom scripts with ID 12345 EXCEPT StoryProgressionFix
removed = []
scripts.reject! do |s|
  if s[0] == 12345 && s[1] != 'StoryProgressionFix'
    removed << s[1]
    true
  else
    false
  end
end

File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'wb') { |f| Marshal.dump(scripts, f) }
puts "Removed scripts: #{removed.join(', ')}"
