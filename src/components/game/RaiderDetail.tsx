import {
  Crosshair, Shield, HeartPulse, Bomb, Ghost,
  ArrowLeft, Heart, Swords, Gauge, ShieldHalf, Zap, Lock,
  Eye, Footprints, Target, ShieldOff,
  Megaphone, BrickWall, Castle, Flame,
  Plus, RotateCcw, Pill, Sparkles,
  Asterisk, Package, Radiation,
  EyeOff, Sword, Cloud, Droplets, Skull, Wind,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Raider, Skill } from '@/types/raider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const avatarIcons: Record<string, any> = {
  crosshair: Crosshair, shield: Shield, 'heart-pulse': HeartPulse, bomb: Bomb, ghost: Ghost,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const skillIcons: Record<string, any> = {
  eye: Eye, zap: Zap, footprints: Footprints, target: Target, 'shield-off': ShieldOff,
  shield: Shield, megaphone: Megaphone, 'brick-wall': BrickWall, swords: Swords, flame: Flame, castle: Castle,
  plus: Plus, 'rotate-ccw': RotateCcw, pill: Pill, sparkles: Sparkles,
  asterisk: Asterisk, package: Package, 'flame-kindling': Flame, radiation: Radiation,
  'eye-off': EyeOff, sword: Sword, cloud: Cloud, droplets: Droplets, skull: Skull, wind: Wind,
};

const rarityColor: Record<string, string> = {
  common: 'var(--rarity-common)', uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)', epic: 'var(--rarity-epic)', legendary: 'var(--rarity-legendary)',
};

interface Props {
  raider: Raider;
  onClose: () => void;
}

export default function RaiderDetail({ raider, onClose }: Props) {
  const AvatarIcon = avatarIcons[raider.icon] || Crosshair;
  const rc = rarityColor[raider.rarity];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in p-4">
      <div className="popup-panel w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Rarity bar */}
        <div className="h-2 rounded-t-[12px] -mx-[1px] -mt-[1px]" style={{ background: `hsl(${rc})` }} />

        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="popup-btn popup-btn-cancel p-2 !px-3">
              <ArrowLeft size={18} />
            </button>
            <h2 className="font-game text-xl text-foreground game-outline flex-1">{raider.name}</h2>
            <span className={cn('font-game text-[10px] game-outline uppercase px-2 py-1 rounded-lg', `rarity-badge-${raider.rarity}`)}>
              {raider.rarity}
            </span>
          </div>

          {/* Avatar + Role */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="raider-avatar w-24 h-24"
              style={{ borderColor: `hsl(${rc})`, boxShadow: `0 0 30px hsl(${rc} / 0.4)` }}
            >
              <AvatarIcon size={52} style={{ color: `hsl(${rc})` }} />
            </div>
            <span className="font-game text-xs text-secondary game-outline uppercase tracking-wider">
              {raider.role}
            </span>
            <p className="text-sm text-muted-foreground text-center italic max-w-xs">
              "{raider.description}"
            </p>
          </div>

          {/* Power / XP */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-game text-[10px] text-secondary game-outline">POWER</span>
              <span className="font-game text-[10px] text-muted-foreground game-outline">
                Lv {raider.level} / MAX 11
              </span>
            </div>
            <div className="xp-bar h-4">
              <div
                className="xp-bar-fill"
                style={{ width: `${(raider.xp / raider.xpMax) * 100}%`, background: `hsl(${rc})` }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="stat-block text-center">
              <span className="stat-label"><Heart size={10} className="inline mr-0.5" />HEALTH</span>
              <span className="stat-value">{raider.stats.health}</span>
            </div>
            <div className="stat-block text-center">
              <span className="stat-label"><Swords size={10} className="inline mr-0.5" />ATTACK</span>
              <span className="stat-value text-base">{raider.stats.attack}</span>
            </div>
            <div className="stat-block text-center">
              <span className="stat-label"><Zap size={10} className="inline mr-0.5" />SUPER</span>
              <span className="stat-value text-xs leading-tight">{raider.stats.super}</span>
            </div>
            <div className="stat-block text-center">
              <span className="stat-label"><Gauge size={10} className="inline mr-0.5" />SPEED</span>
              <span className="stat-value">{raider.stats.speed}</span>
            </div>
          </div>

          {/* Defense */}
          <div className="stat-block flex items-center justify-center gap-2">
            <ShieldHalf size={16} className="text-secondary" />
            <span className="stat-label">DEFENSE</span>
            <span className="stat-value">{raider.stats.defense}</span>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-game text-sm text-primary game-outline mb-3">SKILLS</h3>
            <div className="grid grid-cols-3 gap-2">
              {raider.skills.map((skill) => (
                <SkillNode key={skill.id} skill={skill} rarityColor={rc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillNode({ skill, rarityColor: rc }: { skill: Skill; rarityColor: string }) {
  const Icon = skillIcons[skill.icon] || Zap;

  return (
    <div
      className={cn(
        'skill-node',
        skill.unlocked ? 'skill-unlocked' : 'skill-locked',
      )}
      style={skill.unlocked ? { borderColor: `hsl(${rc})` } : undefined}
      title={skill.description}
    >
      <div className="relative">
        <Icon size={18} className={skill.unlocked ? 'text-foreground' : 'text-muted-foreground/50'} />
        {!skill.unlocked && (
          <Lock size={10} className="absolute -top-1 -right-1 text-muted-foreground" />
        )}
      </div>
      <span className={cn(
        'font-game text-[8px] game-outline text-center leading-tight',
        skill.unlocked ? 'text-foreground' : 'text-muted-foreground/50',
      )}>
        {skill.name}
      </span>
      <span className="font-game text-[7px] text-muted-foreground game-outline">
        Lv.{skill.level}
      </span>
    </div>
  );
}
