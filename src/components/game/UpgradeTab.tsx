import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { GameState } from './types';
import { getEvolutionName } from './utils';
import EnergyBar from './EnergyBar';

interface UpgradeTabProps {
  gameState: GameState;
  onUpgradePower: () => void;
  onUpgradeLevel: () => void;
}

const UpgradeTab: React.FC<UpgradeTabProps> = ({ gameState, onUpgradePower, onUpgradeLevel }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Прокачка Дракона</h2>
      
      <div className="grid gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="MousePointer" size={32} className="text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold">Сила клика</h3>
                <p className="text-sm text-muted-foreground">
                  Текущий уровень: {gameState.clickPower}
                </p>
              </div>
            </div>
            <Button 
              onClick={onUpgradePower}
              disabled={gameState.dragon.coins < gameState.clickPower * 10}
              className="fire-gradient text-white"
            >
              {(gameState.clickPower * 10).toLocaleString()} 🪙
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Star" size={32} className="text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">Уровень дракона</h3>
                <p className="text-sm text-muted-foreground">
                  Текущий уровень: {gameState.dragon.level}
                </p>
              </div>
            </div>
            <Button 
              onClick={onUpgradeLevel}
              disabled={gameState.dragon.coins < gameState.dragon.level * 50}
              className="fire-gradient text-white"
            >
              {(gameState.dragon.level * 50).toLocaleString()} 🪙
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-muted/50 to-card">
          <h3 className="text-lg font-semibold mb-4 text-center">Эволюция дракона</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['hatchling', 'juvenile', 'adult', 'ancient'].map((evo, index) => (
              <div 
                key={evo}
                className={`p-3 rounded-lg text-center border ${
                  gameState.dragon.evolution === evo 
                    ? 'border-primary bg-primary/20' 
                    : 'border-muted bg-muted/50'
                }`}
              >
                <div className="text-2xl mb-1">🐉</div>
                <div className="text-xs font-medium">
                  {getEvolutionName(evo)}
                </div>
                {index > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Ур. {index * 25}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <EnergyBar gameState={gameState} />
    </div>
  );
};

export default UpgradeTab;