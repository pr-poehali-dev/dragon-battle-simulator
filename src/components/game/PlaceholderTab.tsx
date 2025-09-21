import React from 'react';
import Icon from '@/components/ui/icon';
import { TabType } from './types';

interface PlaceholderTabProps {
  activeTab: TabType;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ activeTab }) => {
  const getTabName = (tab: TabType) => {
    const names = {
      shop: 'Магазин',
      quests: 'Задания',
      rating: 'Рейтинг',
      friends: 'Друзья',
      home: 'Главная',
      upgrade: 'Прокачка'
    };
    return names[tab];
  };

  return (
    <div className="text-center py-12">
      <Icon name="Construction" size={64} className="mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Скоро...</h2>
      <p className="text-muted-foreground">
        Раздел "{getTabName(activeTab)}" находится в разработке
      </p>
    </div>
  );
};

export default PlaceholderTab;