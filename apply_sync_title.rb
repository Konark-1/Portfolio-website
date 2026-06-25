require 'zlib'

code = <<~RUBY
class Scene_Title < Scene_Base
  alias_method :sync_save_start, :start rescue nil
  def start
    begin
      target_level = 99
      if DataManager.load_game(11) # Save 12
        target_level = $game_actors[1].level
      end
      
      if DataManager.load_game(2) # Save 3
        if $game_actors[1].level < target_level
          $game_actors[1].change_level(target_level, false)
        end
        $game_actors[1].add_param(0, 5000) # MHP
        $game_actors[1].add_param(1, 1000)  # MMP
        $game_actors[1].add_param(2, 1000)  # ATK
        $game_actors[1].add_param(3, 1000)  # DEF
        $game_actors[1].add_param(4, 1000)  # MAT
        $game_actors[1].add_param(5, 1000)  # MDF
        $game_actors[1].add_param(6, 1000)  # AGI
        $game_actors[1].add_param(7, 1000)  # LUK
        $game_actors[1].hp = $game_actors[1].mhp
        $game_actors[1].mp = $game_actors[1].mmp
        DataManager.save_game(2)
        File.open('SyncSuccess.txt', 'w') { |f| f.puts "Save 3 Successfully Boosted!" }
      end
    rescue Exception => e
      File.open('SyncError.txt', 'w') { |f| f.puts e.message; f.puts e.backtrace.join("\n") }
    end
    sync_save_start
  end
end
RUBY

scripts = File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }

scripts.reject! { |s| s[1] == 'SyncSave3To12' || s[1] == 'SyncInTitle' }
main_index = scripts.index { |s| s[1] == 'Main' }
scripts.insert(main_index, [12345, 'SyncInTitle', Zlib::Deflate.deflate(code)])

File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'wb') { |f| Marshal.dump(scripts, f) }
puts 'Patched Scripts.rvdata2 with SyncInTitle.'
