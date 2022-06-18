import { ISource } from '../utils/types/APITypes';

export const createListSources = (data: ISource[]): string => {
  let sourcesList: string[] = [];
  for (let i = 0; i < 100; i += 5) {
    sourcesList.push(data[i].id);
  }
  return sourcesList.join(',');
};
