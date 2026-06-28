begin
  File.open("E:/Games/Portal 2/Fix Repair/GAME/KAREN/Save01.rvdata2", "rb") do |f|
    data = Marshal.load(f)
    puts "Load successful"
  end
rescue Exception => e
  puts "Crash: #{e.message}"
end
