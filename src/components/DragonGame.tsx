import React, { useState, useEffect } from 'react';
import { GameState, TabType, Particle } from './game/types';
import GameHeader from './game/GameHeader';
import DragonDisplay from './game/DragonDisplay';
import StatsCards from './game/StatsCards';
import EnergyBar from './game/EnergyBar';
import UpgradeTab from './game/UpgradeTab';
import NavigationTabs from './game/NavigationTabs';
import PlaceholderTab from './game/PlaceholderTab';

const DragonGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    dragon: {
      level: 1,
      coins: 0,
      power: 1,
      element: 'fire',
      evolution: 'hatchling'
    },
    clickPower: 1,
    autoEarn: 0,
    totalClicks: 0,
    energy: 300,
    maxEnergy: 300,
    lastEnergyUpdate: Date.now()
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleDragonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (gameState.energy <= 0) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setGameState(prev => ({
      ...prev,
      dragon: {
        ...prev.dragon,
        coins: prev.dragon.coins + prev.clickPower
      },
      totalClicks: prev.totalClicks + 1,
      energy: Math.max(0, prev.energy - 1)
    }));

    const particleId = Date.now();
    setParticles(prev => [...prev, { id: particleId, x, y }]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particleId));
    }, 1000);
  };

  const upgradePower = () => {
    const cost = gameState.clickPower * 10;
    if (gameState.dragon.coins >= cost) {
      setGameState(prev => ({
        ...prev,
        dragon: {
          ...prev.dragon,
          coins: prev.dragon.coins - cost
        },
        clickPower: prev.clickPower + 1
      }));
    }
  };

  const upgradeLevel = () => {
    const cost = gameState.dragon.level * 50;
    if (gameState.dragon.coins >= cost) {
      setGameState(prev => ({
        ...prev,
        dragon: {
          ...prev.dragon,
          coins: prev.dragon.coins - cost,
          level: prev.dragon.level + 1,
          power: prev.dragon.power + 5
        }
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.autoEarn > 0) {
        setGameState(prev => ({
          ...prev,
          dragon: {
            ...prev.dragon,
            coins: prev.dragon.coins + prev.autoEarn
          }
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.autoEarn]);

  useEffect(() => {
    const { dragon } = gameState;
    let newEvolution = dragon.evolution;
    
    if (dragon.level >= 75) newEvolution = 'ancient';
    else if (dragon.level >= 50) newEvolution = 'adult';
    else if (dragon.level >= 25) newEvolution = 'juvenile';
    else newEvolution = 'hatchling';

    if (newEvolution !== dragon.evolution) {
      setGameState(prev => ({
        ...prev,
        dragon: {
          ...prev.dragon,
          evolution: newEvolution
        }
      }));
    }
  }, [gameState.dragon.level]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - gameState.lastEnergyUpdate;
      const energyToRestore = Math.floor(timeDiff / (2 * 60 * 60 * 1000 / gameState.maxEnergy));
      
      if (energyToRestore > 0 && gameState.energy < gameState.maxEnergy) {
        setGameState(prev => ({
          ...prev,
          energy: Math.min(prev.maxEnergy, prev.energy + energyToRestore),
          lastEnergyUpdate: now
        }));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [gameState.energy, gameState.lastEnergyUpdate, gameState.maxEnergy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-card">
      <GameHeader gameState={gameState} />

      <div className="container mx-auto px-4 py-6 pb-24">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <DragonDisplay 
              gameState={gameState} 
              particles={particles} 
              onDragonClick={handleDragonClick} 
            />
            <EnergyBar gameState={gameState} />
            <StatsCards gameState={gameState} />
          </div>
        )}

        {activeTab === 'upgrade' && (
          <UpgradeTab 
            gameState={gameState}
            onUpgradePower={upgradePower}
            onUpgradeLevel={upgradeLevel}
          />
        )}

        {['shop', 'quests', 'rating', 'friends'].includes(activeTab) && (
          <PlaceholderTab activeTab={activeTab} />
        )}
      </div>

      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default DragonGame;