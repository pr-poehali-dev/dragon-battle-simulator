import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GameState } from './types';
import { getEvolutionName } from './utils';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  return (
    <div className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Dragon Kombat</h1>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              {gameState.dragon.coins.toLocaleString()} 🪙
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Ур. {gameState.dragon.level}
            </Badge>
            <Badge className="fire-gradient text-white">
              {getEvolutionName(gameState.dragon.evolution)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;