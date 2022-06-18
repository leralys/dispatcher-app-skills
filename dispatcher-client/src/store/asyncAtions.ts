import { fetchNews, scrollNews } from './slices/newsSlice';
import { fetchSources } from './slices/sourcesSlice';
import { fetchGraphData } from './slices/graphDataSlice';

export const asyncActions = {
  fetchGraphData,
  fetchSources,
  fetchNews,
  scrollNews,
};
