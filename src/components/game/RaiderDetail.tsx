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
import type { Raider, Skill, SkillCategory } from '@/types/raider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

const SKILL_TABS: { value: SkillCategory; label: string }[] = [
  { value: 'offense', label: 'OFFENSE' },
  { value: 'defense', label: 'DEFENSE' },
  { value: 'utility', label: 'UTILITY' },
];

interface Props {
  raider: Raider;
  onClose: () => void;
}

export default function RaiderDetail({ raider, onClose }: Props) {
  const AvatarIcon = avatarIcons[raider.icon] || Crosshair;
  const rc = rarityColor[raider.rarity];

  const skillsByCategory = (cat: SkillCategory) =>
    raider.skills.filter((s) => s.category === cat);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in p-4">
      <div className="popup-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Rarity bar */}
        <div className="h-2 rounded-t-[12px] -mx-[1px] -mt-[1px]" style={{ background: `hsl(${rc})` }} />

        <div className="p-5 space-y-4">
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

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:items-stretch">
            {/* LEFT COLUMN – Stats */}
            <div className="space-y-4">
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
              <div className="grid grid-cols-2 gap-2">
                <div className="stat-block text-center">
                  <span className="stat-label"><Heart size={10} className="inline mr-0.5" />HEALTH</span>
                  <span className="stat-value">{raider.stats.health}</span>
                </div>
                <div className="stat-block text-center">
                  <span className="stat-label"><Swords size={10} className="inline mr-0.5" />ATTACK</span>
                  <span className="stat-value text-base">{raider.stats.attack}</span>
                </div>
                <div className="stat-block text-center">
                  <span className="stat-label"><Gauge size={10} className="inline mr-0.5" />SPEED</span>
                  <span className="stat-value">{raider.stats.speed}</span>
                </div>
                <div className="stat-block text-center">
                  <span className="stat-label"><ShieldHalf size={10} className="inline mr-0.5" />DEFENSE</span>
                  <span className="stat-value">{raider.stats.defense}</span>
                </div>
              </div>

              {/* Super */}
              <div className="stat-block flex items-center justify-center gap-2">
                <Zap size={16} className="text-secondary" />
                <span className="stat-label">SUPER</span>
                <span className="stat-value text-sm">{raider.stats.super}</span>
              </div>
            </div>

            {/* RIGHT COLUMN – Skill Trees */}
            <div className="flex flex-col h-full">
              <Tabs defaultValue="offense" className="w-full flex flex-col flex-1">
                <TabsList className="w-full bg-transparent rounded-none p-0 h-auto gap-1 border-b-0">
                  {SKILL_TABS.map((tab, i) => {
                    const tabColors = [
                      `hsl(${rc})`,           // offense - rarity color
                      'hsl(var(--muted))',     // defense - muted
                      'hsl(var(--accent))',    // utility - accent
                    ];
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="skill-tab font-game text-[10px] game-outline uppercase flex-1 rounded-t-lg rounded-b-none px-3 py-2 border-0 transition-all shadow-none"
                        style={{ '--tab-color': tabColors[i] } as React.CSSProperties}
                      >
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {SKILL_TABS.map((tab, i) => {
                  const tabColors = [
                    `hsl(${rc})`,
                    'hsl(var(--muted))',
                    'hsl(var(--accent))',
                  ];
                  const skills = skillsByCategory(tab.value);
                  return (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0 border-2 border-t-0 border-border rounded-b-lg p-3 flex-1 overflow-y-auto">
                      {skills.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {skills.map((skill) => (
                            <SkillNode key={skill.id} skill={skill} rarityColor={rc} />
                          ))}
                        </div>
                      ) : (
                        <p className="font-game text-[10px] text-muted-foreground game-outline text-center py-4">
                          NO SKILLS
                        </p>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
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
