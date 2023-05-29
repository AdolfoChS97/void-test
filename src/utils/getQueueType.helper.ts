import { GameType } from './queueType.enum';

export const getQueueType = (value: number): string | undefined => {
  const gameTypeKeys = Object.keys(GameType).filter((key) =>
    isNaN(Number(key)),
  );
  for (const key of gameTypeKeys) {
    if (GameType[key as keyof typeof GameType] === value) {
      return key;
    }
  }
  return undefined;
};
