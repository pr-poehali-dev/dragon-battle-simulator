import React from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GameState } from './types';
import { getEnergyTimeLeft } from './utils';

interface EnergyBarProps {
  gameState: GameState;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ gameState }) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-blue-400" />
          <span className="font-semibold text-blue-400">Энергия</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {gameState.energy}/{gameState.maxEnergy}
          {gameState.energy < gameState.maxEnergy && (
            <span className="ml-2 text-xs text-blue-300">
              Восстановится через: {getEnergyTimeLeft(gameState.energy, gameState.maxEnergy)}
            </span>
          )}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-muted/50 rounded-full h-3 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
            style={{
              width: `${(gameState.energy / gameState.maxEnergy) * 100}%`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-float rounded-full" />
          </div>
          
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-0.5 bg-background/30"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>
        
        {gameState.energy <= 30 && (
          <div className="mt-2 text-center text-red-400 text-sm animate-pulse">
            ⚠️ Низкий уровень энергии!
          </div>
        )}
        
        {gameState.energy <= 0 && (
          <div className="mt-2 text-center text-red-500 text-sm font-semibold animate-pulse">
            🔋 Энергия истощена! Подождите восстановления
          </div>
        )}
      </div>
    </Card>
  );
};

export default EnergyBar;