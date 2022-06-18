import { RootState } from '../store';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { IResponseNews } from '../../utils/types/APITypes';
import { fetchNewsData, scrollNewsData } from '../../services/newsApiService';
import { RESPONSES } from '../../utils/constants/responseStatus';
import { ENDPOINTS } from '../../utils/constants/endpoints';

interface INewsState extends IResponseNews {
  page: number;
  hasSearched: boolean;
}

const initialState: INewsState = {
  status: RESPONSES.IDLE,
  totalResults: -1,
  articles: [],
  page: 1,
  hasSearched: false,
};

export const fetchNews: AsyncThunk<any, void, { state: RootState }> =
  createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue, getState }) => {
      const state = getState() as RootState;
      const filters = state.filters;
      const defaultCountry = state.location.defaultCountry.id;
      try {
        const response = await fetchNewsData(filters, defaultCountry);
        return response.data;
      } catch (err) {
        return rejectWithValue(JSON.stringify(err));
      }
    },
    {
      condition: (_, { getState }) => {
        const state = getState() as RootState;
        const { category, q, sources, country, endpoint } = state.filters;
        const defaultCountry = state.location.defaultCountry.id;
        // required parameters for the API
        if (
          endpoint === ENDPOINTS.TOP &&
          category === '' &&
          country === '' &&
          defaultCountry === '' &&
          sources === '' &&
          q === ''
        ) {
          return false;
        } else if (
          endpoint === ENDPOINTS.EVERYTHING &&
          sources === '' &&
          q === ''
        ) {
          return false;
        }
      },
    }
  );

export const scrollNews: AsyncThunk<any, void, { state: RootState }> =
  createAsyncThunk(
    'news/scrollNews',
    async (_, { rejectWithValue, getState }) => {
      const state = getState() as RootState;
      const filters = state.filters;
      const defaultCountry = state.location.defaultCountry.id;
      const page = state.news.page;
      try {
        const response = await scrollNewsData(filters, defaultCountry, page);
        return response.data;
      } catch (err) {
        return rejectWithValue(JSON.stringify(err));
      }
    }
  );

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page = state.page + 1;
    },
    setHasSearched(state, action: PayloadAction<boolean>) {
      const updateState = { ...state, hasSearched: action.payload };
      return updateState;
    },
  },
  extraReducers: {
    [fetchNews.pending.type]: (state) => {
      state.status = RESPONSES.LOADING;
    },
    [fetchNews.fulfilled.type]: (
      state,
      action: PayloadAction<IResponseNews>
    ) => {
      state.status = action.payload.status;
      state.totalResults = action.payload.totalResults;
      state.articles = action.payload.articles;
    },
    [fetchNews.rejected.type]: (state) => {
      state.status = RESPONSES.ERROR;
    },
    [scrollNews.pending.type]: (state) => {
      state.status = RESPONSES.LOADING;
    },
    [scrollNews.fulfilled.type]: (
      state,
      action: PayloadAction<IResponseNews>
    ) => {
      state.status = action.payload.status;
      state.totalResults = action.payload.totalResults;
      state.articles = [...state.articles, ...action.payload.articles];
    },
    [scrollNews.rejected.type]: (state) => {
      state.status = RESPONSES.ERROR;
    },
  },
});

export const newsActions = newsSlice.actions;

export default newsSlice.reducer;
