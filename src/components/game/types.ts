export interface DragonStats {
  level: number;
  coins: number;
  power: number;
  element: 'fire' | 'ice' | 'lightning' | 'earth';
  evolution: 'hatchling' | 'juvenile' | 'adult' | 'ancient';
}

export interface GameState {
  dragon: DragonStats;
  clickPower: number;
  autoEarn: number;
  totalClicks: number;
  energy: number;
  maxEnergy: number;
  lastEnergyUpdate: number;
}

export type TabType = 'home' | 'upgrade' | 'shop' | 'quests' | 'rating' | 'friends';

export interface Particle {
  id: number;
  x: number;
  y: number;
}