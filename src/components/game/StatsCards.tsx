import React from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GameState } from './types';

interface StatsCardsProps {
  gameState: GameState;
}

const StatsCards: React.FC<StatsCardsProps> = ({ gameState }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 text-center bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
        <Icon name="MousePointer" size={24} className="mx-auto mb-2 text-yellow-400" />
        <div className="text-lg font-semibold">{gameState.clickPower}</div>
        <div className="text-sm text-muted-foreground">За клик</div>
      </Card>
      
      <Card className="p-4 text-center bg-gradient-to-br from-green-500/20 to-emerald-500/20">
        <Icon name="Clock" size={24} className="mx-auto mb-2 text-green-400" />
        <div className="text-lg font-semibold">{gameState.autoEarn}/сек</div>
        <div className="text-sm text-muted-foreground">Автодоход</div>
      </Card>
      
      <Card className="p-4 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
        <Icon name="Target" size={24} className="mx-auto mb-2 text-purple-400 animate-sparkle" />
        <div className="text-lg font-semibold relative z-10">
          <span className="inline-block animate-pulse-fire">
            {gameState.totalClicks.toLocaleString()}
          </span>
          {gameState.totalClicks > 100 && (
            <span className="ml-1 text-xs text-yellow-400">🔥</span>
          )}
          {gameState.totalClicks > 500 && (
            <span className="ml-1 text-xs">⚡</span>
          )}
          {gameState.totalClicks > 1000 && (
            <span className="ml-1 text-xs text-red-400">💎</span>
          )}
        </div>
        <div className="text-sm text-muted-foreground">Всего кликов</div>
        
        <div className="mt-2 w-full bg-muted/50 rounded-full h-1.5 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out animate-pulse"
            style={{
              width: `${Math.min(100, ((gameState.totalClicks % 100) / 100) * 100)}%`
            }}
          />
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-float -skew-x-12" />
        </div>
        
        <div className="text-xs text-purple-300 mt-1">
          {gameState.totalClicks < 100 ? `До огня: ${100 - gameState.totalClicks}` :
           gameState.totalClicks < 500 ? `До молнии: ${500 - gameState.totalClicks}` :
           gameState.totalClicks < 1000 ? `До алмаза: ${1000 - gameState.totalClicks}` :
           'Мастер кликов! 👑'}
        </div>
      </Card>
      
      <Card className="p-4 text-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
        <Icon name="Star" size={24} className="mx-auto mb-2 text-blue-400" />
        <div className="text-lg font-semibold">{gameState.dragon.level}</div>
        <div className="text-sm text-muted-foreground">Уровень</div>
      </Card>
    </div>
  );
};

export default StatsCards;