import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilterState {
  [key: string]: string;
}

interface FilterItemPayload {
  key: string;
  value: string;
}

const initialState: IFilterState = {
  country: '',
  endpoint: 'top-headlines',
  q: '',
  to: '',
  language: '',
  sortBy: '',
  category: '',
  sources: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<FilterItemPayload>) => {
      state[action.payload.key] = action.payload.value;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.q = action.payload;
    },
    clearFilters(state) {
      state.country = '';
      state.category = '';
      state.to = '';
      state.language = '';
      state.sortBy = '';
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
