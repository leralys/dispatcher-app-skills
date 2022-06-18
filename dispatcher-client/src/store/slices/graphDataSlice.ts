import { RootState } from '../store';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { IResponseNews } from '../../utils/types/APITypes';
import { fetchAllGraphData } from '../../services/newsApiService';
import { RESPONSES } from '../../utils/constants/responseStatus';
import { ENDPOINTS } from '../../utils/constants/endpoints';

const initialState: IResponseNews = {
  status: RESPONSES.IDLE,
  totalResults: -1,
  articles: [],
};

export const fetchGraphData: AsyncThunk<any, void, { state: RootState }> =
  createAsyncThunk(
    'graphData/fetchGraphData',
    async (_, { rejectWithValue, getState }) => {
      const state = getState() as RootState;
      const filters = state.filters;
      const defaultCountry = state.location.defaultCountry.id;
      try {
        const response = await fetchAllGraphData(filters, defaultCountry);
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

export const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGraphData.pending.type]: (state) => {
      state.status = RESPONSES.LOADING;
    },
    [fetchGraphData.fulfilled.type]: (
      state,
      action: PayloadAction<IResponseNews>
    ) => {
      state.status = action.payload.status;
      state.totalResults = action.payload.totalResults;
      state.articles = action.payload.articles;
    },
    [fetchGraphData.rejected.type]: (state) => {
      state.status = RESPONSES.ERROR;
    },
  },
});

export const graphDataActions = graphDataSlice.actions;

export default graphDataSlice.reducer;
