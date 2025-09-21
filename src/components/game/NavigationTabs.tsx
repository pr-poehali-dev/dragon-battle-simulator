import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { TabType } from './types';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', name: 'Главная', icon: 'Home' },
    { id: 'upgrade', name: 'Прокачка', icon: 'Zap' },
    { id: 'shop', name: 'Магазин', icon: 'ShoppingCart' },
    { id: 'quests', name: 'Задания', icon: 'Target' },
    { id: 'rating', name: 'Рейтинг', icon: 'Trophy' },
    { id: 'friends', name: 'Друзья', icon: 'Users' }
  ];

  return (
    <>
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
                onClick={() => onTabChange(tab.id as TabType)}
              >
                <Icon name={tab.icon as any} size={20} />
                <span className="text-xs">{tab.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default NavigationTabs;