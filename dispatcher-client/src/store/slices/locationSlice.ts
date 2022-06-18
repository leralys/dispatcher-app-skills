import { RootState } from '../store';
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunk,
} from '@reduxjs/toolkit';
import { IOption } from '../../components/dropdown/Dropdown';
import { getIP } from '../../services/IPAddressService';
import { findCountryById } from '../../utils/findCountryById';
import defaultCountry from '../../utils/constants/defaultCountry';

export interface ILocationState {
  defaultCountry: IOption;
}

const initialState: ILocationState = {
  defaultCountry: { name: '', id: '' },
};

export const getIPAddress: AsyncThunk<any, void, { state: RootState }> =
  createAsyncThunk('location/getIPAddress', async (_, { rejectWithValue }) => {
    try {
      const response = await getIP();
      const countryId = response.country_code.toLowerCase();
      return findCountryById(countryId);
    } catch (err) {
      return rejectWithValue(JSON.stringify(err));
    }
  });

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: {
    [getIPAddress.fulfilled.type]: (state, action: PayloadAction<IOption>) => {
      state.defaultCountry = action.payload;
    },
    [getIPAddress.rejected.type]: (state) => {
      state.defaultCountry = defaultCountry;
    },
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
