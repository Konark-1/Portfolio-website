require 'zlib'
scripts = File.open('E:/Games/Portal 2/Fix Repair/GAME/KAREN/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }

# We can't easily eval all of RGSS3 without a huge runtime environment (Bitmap, Sprite, etc.)
# But we can check if Marshal.load throws an error when we just read the file using my dummy classes.

class Tone
  attr_accessor :red, :green, :blue, :gray
  def initialize(r=0, g=0, b=0, gray=0); @red, @green, @blue, @gray = r, g, b, gray; end
  def self._load(s); new(*s.unpack("d4")); end
  def _dump(d); [@red, @green, @blue, @gray].pack("d4"); end
end
class Color
  attr_accessor :red, :green, :blue, :alpha
  def initialize(r=0, g=0, b=0, a=255); @red, @green, @blue, @alpha = r, g, b, a; end
  def self._load(s); new(*s.unpack("d4")); end
  def _dump(d); [@red, @green, @blue, @alpha].pack("d4"); end
end
class Table
  attr_accessor :xsize, :ysize, :zsize, :data
  def initialize(x, y=1, z=1); @xsize, @ysize, @zsize = x, y, z; @data = Array.new(x*y*z, 0); end
  def self._load(s)
    dim, nx, ny, nz, items, *data = s.unpack("V5 v*")
    t = new(nx, ny, nz)
    t.data = data
    t
  end
  def _dump(d)
    [3, @xsize, @ysize, @zsize, @xsize*@ysize*@zsize].pack("V5") + @data.pack("v*")
  end
end
module RPG
  class BaseItem; end; class UsableItem < BaseItem; end; class Skill < UsableItem; end
  class Item < UsableItem; end; class EquipItem < BaseItem; end; class Weapon < EquipItem; end
  class Armor < EquipItem; end; class Class; end; class Class::Learning; end
  class Class::Feature; end; class Enemy; end
  class System; end; class System::Terms; end; class Event; end; class Event::Page; end
  class Event::Page::Condition; end; class Event::Page::Graphic; end
  class EventCommand; end; class MoveRoute; end; class MoveCommand; end
  class Map; end; class BGM; end; class BGS; end; class ME; end; class SE; end
end
class Game_System; end; class Game_Timer; end; class Game_Message; end
class Game_Switches; end; class Game_Variables; end; class Game_SelfSwitches; end
class Game_Screen; end; class Game_Picture; end; class Game_BaseItem; end
class Game_Action; end; class Game_ActionResult; end; class Game_BattlerBase; end
class Game_Battler < Game_BattlerBase; end; class Game_Actor < Game_Battler; end
class Game_Enemy < Game_Battler; end; class Game_Actors; end; class Game_Unit; end
class Game_Party < Game_Unit; end; class Game_Troop < Game_Unit; end
class Game_Map; end; class Game_CommonEvent; end; class Game_CharacterBase; end
class Game_Character < Game_CharacterBase; end; class Game_Player < Game_Character; end
class Game_Follower < Game_Character; end; class Game_Followers; end
class Game_Vehicle < Game_Character; end; class Game_Event < Game_Character; end
class Game_Interpreter
  def marshal_dump; [@depth, @map_id, @event_id, @list, @index, @branch]; end
  def marshal_load(obj); @depth, @map_id, @event_id, @list, @index, @branch = obj; end
end
class Float; end

def load_with_dummy_classes(file_path)
  max_retries = 100
  retries = 0
  begin
    File.open(file_path, "rb") do |f|
      return Marshal.load(f)
    end
  rescue ArgumentError => e
    if e.message =~ /undefined class\/module (.+)/
      class_name = $1
      puts "Creating dummy class: #{class_name}"
      if class_name.include?("::")
        parts = class_name.split("::")
        curr = Object
        parts.each do |p|
          if !curr.const_defined?(p)
            curr.const_set(p, Class.new)
          end
          curr = curr.const_get(p)
        end
      else
        Object.const_set(class_name, Class.new)
      end
      retries += 1
      retry if retries < max_retries
    end
    raise e
  end
end

begin
  data = load_with_dummy_classes("E:/Games/Portal 2/Fix Repair/GAME/KAREN/Save01.rvdata2")
  puts "Successfully loaded Save01.rvdata2 using dummy classes"
rescue Exception => e
  puts "Error: #{e.message}"
end
