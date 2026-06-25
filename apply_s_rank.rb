require 'zlib'

code = <<~RUBY
class Game_Actor < Game_Battler
  alias_method :super_ethan_param, :param
  def param(param_id)
    return 999999 if id == 1
    super_ethan_param(param_id)
  end

  alias_method :super_ethan_execute_damage, :execute_damage
  def execute_damage(user)
    if id == 1
      @hp = mhp
      @mp = mmp
      @tp = 100
      return
    end
    super_ethan_execute_damage(user)
  end

  def hp; return 999999 if id == 1; super; end
  def hp=(value); if id == 1; super(999999); return; end; super(value); end
end

class Game_Enemy < Game_Battler
  alias_method :ultimate_enemy_nerf_execute_damage, :execute_damage
  def execute_damage(user)
    @hp = 0
    if defined?($kaori) && $kaori.respond_to?(:lb_shield_hp=)
      $kaori.lb_shield_hp = 0
    end
    ultimate_enemy_nerf_execute_damage(user)
  end
end

alias_method :original_s_rank_check, :s_rank? rescue nil
def s_rank?(who)
  return true if who == :cobra || who == :butterfly
  original_s_rank_check(who) rescue false
end

def s_rank(who)
  sranks = ($game_variables[89] == 0 ? [] : $game_variables[89])
  toadd = (who.is_a?(Integer) ? enemy_id_to_name(who) : who)
  sranks << toadd unless sranks.include?(toadd)
  $game_variables[89] = sranks
end
RUBY

scripts = File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'rb') { |f| Marshal.load(f) }

scripts.reject! { |s| s[1] == 'UltimatePlayerBuff' || s[1] == 'ButterflyNerfAndFireDamage' }

main_index = scripts.index { |s| s[1] == 'Main' }
scripts.insert(main_index, [12345, 'UltimatePlayerBuff', Zlib::Deflate.deflate(code)])

File.open('E:/Games/Portal 2/Fix Repair/Tower of Trample 1.18.0.4/Tower of Trample 1.18.0.4/Data/Scripts.rvdata2', 'wb') { |f| Marshal.dump(scripts, f) }
puts 'Patched Scripts.rvdata2 with S_Rank hook.'
