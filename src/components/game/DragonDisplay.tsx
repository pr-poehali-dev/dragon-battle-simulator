import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { GameState, Particle } from './types';
import { getEvolutionName, getElementName } from './utils';

interface DragonDisplayProps {
  gameState: GameState;
  particles: Particle[];
  onDragonClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DragonDisplay: React.FC<DragonDisplayProps> = ({ gameState, particles, onDragonClick }) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-card via-card/80 to-muted">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div
            className="cursor-pointer click-effect animate-pulse-fire rounded-full p-8 dragon-scale relative overflow-hidden"
            onClick={onDragonClick}
          >
            <img 
              src="/img/8315b87a-dfd1-4f61-a916-e80c780de46a.jpg" 
              alt="Dragon" 
              className="w-48 h-48 object-cover rounded-full mx-auto hover:scale-105 transition-transform duration-200"
            />
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle absolute text-2xl"
                style={{
                  left: particle.x,
                  top: particle.y,
                }}
              >
                +{gameState.clickPower} 🔥
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-primary">
            {getEvolutionName(gameState.dragon.evolution)} Дракон
          </h2>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="text-orange-400 border-orange-400">
              <Icon name="Flame" size={16} className="mr-1" />
              {getElementName(gameState.dragon.element)}
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              <Icon name="Zap" size={16} className="mr-1" />
              Сила: {gameState.dragon.power}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DragonDisplay;