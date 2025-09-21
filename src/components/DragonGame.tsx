import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface DragonStats {
  level: number;
  coins: number;
  power: number;
  element: 'fire' | 'ice' | 'lightning' | 'earth';
  evolution: 'hatchling' | 'juvenile' | 'adult' | 'ancient';
}

interface GameState {
  dragon: DragonStats;
  clickPower: number;
  autoEarn: number;
  totalClicks: number;
}

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
    totalClicks: 0
  });

  const [activeTab, setActiveTab] = useState<'home' | 'upgrade' | 'shop' | 'quests' | 'rating' | 'friends'>('home');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const handleDragonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setGameState(prev => ({
      ...prev,
      dragon: {
        ...prev.dragon,
        coins: prev.dragon.coins + prev.clickPower
      },
      totalClicks: prev.totalClicks + 1
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

  const getEvolutionName = (evolution: string) => {
    const names = {
      hatchling: 'Детёныш',
      juvenile: 'Молодой',
      adult: 'Взрослый',
      ancient: 'Древний'
    };
    return names[evolution as keyof typeof names];
  };

  const getElementName = (element: string) => {
    const names = {
      fire: 'Огонь',
      ice: 'Лёд',
      lightning: 'Молния',
      earth: 'Земля'
    };
    return names[element as keyof typeof names];
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

  const tabs = [
    { id: 'home', name: 'Главная', icon: 'Home' },
    { id: 'upgrade', name: 'Прокачка', icon: 'Zap' },
    { id: 'shop', name: 'Магазин', icon: 'ShoppingCart' },
    { id: 'quests', name: 'Задания', icon: 'Target' },
    { id: 'rating', name: 'Рейтинг', icon: 'Trophy' },
    { id: 'friends', name: 'Друзья', icon: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-card">
      {/* Header */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Dragon Display */}
            <Card className="p-8 bg-gradient-to-br from-card via-card/80 to-muted">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div
                    className="cursor-pointer click-effect animate-pulse-fire rounded-full p-8 dragon-scale relative overflow-hidden"
                    onClick={handleDragonClick}
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

            {/* Stats Cards */}
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
                
                {/* Прогресс-бар для следующего достижения */}
                <div className="mt-2 w-full bg-muted/50 rounded-full h-1.5 relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out animate-pulse"
                    style={{
                      width: `${Math.min(100, ((gameState.totalClicks % 100) / 100) * 100)}%`
                    }}
                  />
                  {/* Бегущий эффект */}
                  <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-float -skew-x-12" />
                </div>
                
                {/* Мини-индикатор следующего достижения */}
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
          </div>
        )}

        {activeTab === 'upgrade' && (
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
                    onClick={upgradePower}
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
                    onClick={upgradeLevel}
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
          </div>
        )}

        {['shop', 'quests', 'rating', 'friends'].includes(activeTab) && (
          <div className="text-center py-12">
            <Icon name="Construction" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Скоро...</h2>
            <p className="text-muted-foreground">
              Раздел "{tabs.find(t => t.id === activeTab)?.name}" находится в разработке
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-6 gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className={`h-16 flex-col space-y-1 rounded-none ${
                  activeTab === tab.id 
                    ? 'fire-gradient text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <Icon name={tab.icon as any} size={20} />
                <span className="text-xs">{tab.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default DragonGame;