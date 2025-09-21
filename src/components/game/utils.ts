export const getEvolutionName = (evolution: string) => {
  const names = {
    hatchling: 'Детёныш',
    juvenile: 'Молодой',
    adult: 'Взрослый',
    ancient: 'Древний'
  };
  return names[evolution as keyof typeof names];
};

export const getElementName = (element: string) => {
  const names = {
    fire: 'Огонь',
    ice: 'Лёд',
    lightning: 'Молния',
    earth: 'Земля'
  };
  return names[element as keyof typeof names];
};

export const getEnergyTimeLeft = (energy: number, maxEnergy: number) => {
  if (energy >= maxEnergy) return '';
  
  const energyPerMs = maxEnergy / (2 * 60 * 60 * 1000);
  const msToFull = (maxEnergy - energy) / energyPerMs;
  const hours = Math.floor(msToFull / (60 * 60 * 1000));
  const minutes = Math.floor((msToFull % (60 * 60 * 1000)) / (60 * 1000));
  
  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
};