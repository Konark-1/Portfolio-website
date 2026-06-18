module RPG
  class BaseItem
    def initialize; end
  end
  class Enemy < BaseItem
    def initialize; super; end
  end
  class Enemy::DropItem
    def initialize; end
  end
  class Enemy::Action
    def initialize; end
  end
  class BaseItem::Feature
    def initialize; end
  end
end
class Table
  attr_accessor :raw_data
  def self._load(s); obj = new; obj.raw_data = s; obj; end
  def _dump(limit); @raw_data; end
end

begin
  enemies = File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Enemies.rvdata2', 'rb') { |f| Marshal.load(f) }
  count = 0
  enemies.compact.each do |e|
    name = e.instance_variable_get(:@name)
    if name && name =~ /butterfly|lady|yvonne/i
      params = e.instance_variable_get(:@params)
      
      # Nerf her
      params[0] = 1 # HP = 1
      params[2] = 1 # ATK = 1
      params[3] = 1 # DEF = 1
      params[4] = 1 # MAT = 1
      params[5] = 1 # MDF = 1
      params[6] = 1 # AGI = 1
      params[7] = 1 # LUK = 1
      e.instance_variable_set(:@params, params)
      e.instance_variable_set(:@exp, 9999) # Give a lot of EXP just in case
      count += 1
    end
  end
  
  if count > 0
    File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Enemies.rvdata2', 'wb') do |f|
      Marshal.dump(enemies, f)
    end
    puts "Saved Data/Enemies.rvdata2 with #{count} modifications."
  else
    puts "No Yvonne/Butterfly found."
  end
rescue => e
  puts "#{e.class}: #{e.message}"
  puts e.backtrace
end
