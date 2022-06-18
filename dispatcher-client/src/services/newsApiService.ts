import axios from '../axios/config';
import { IFilterState } from '../store/slices/filterSlice';
import { ENDPOINTS } from '../utils/constants/endpoints';
import {
  MAX_API_RESULTS,
  MAX_RESULTS_PER_PAGE,
} from '../utils/constants/maxValues';

const buildAxiosParams = (
  params: IFilterState,
  defaultCountry: string,
  page: number = 1,
  pageSize: number = MAX_RESULTS_PER_PAGE
) => {
  const { endpoint, category, q, to, sortBy, language, sources } = params;
  const country =
    params.country === '' && q === '' && category === ''
      ? defaultCountry
      : params.country;
  let paramsObj;
  if (endpoint === ENDPOINTS.TOP && sources === '') {
    paramsObj = { country, category, q };
  } else if (endpoint === ENDPOINTS.TOP && sources !== '') {
    paramsObj = { sources, q };
  } else {
    paramsObj = { q, sources, to, sortBy, language };
  }
  paramsObj = {
    ...paramsObj,
    page: page.toString(),
    pageSize: pageSize.toString(),
  };
  const searchParams = new URLSearchParams(paramsObj);
  return searchParams;
};

// fetch news by provided parameters
export const fetchNewsData = async (
  state: IFilterState,
  defaultCountry: string
) => {
  const { endpoint } = state;
  const params = buildAxiosParams(state, defaultCountry);
  const res = await axios.get(`/${endpoint}`, { params });
  if (res.status === 200) return res;
  else throw new Error('Could not fetch news');
};

// fetch 10 articles by provided page and parameters
export const scrollNewsData = async (
  state: IFilterState,
  defaultCountry: string,
  page: number
) => {
  const { endpoint } = state;
  const params = buildAxiosParams(
    state,
    defaultCountry,
    page,
    MAX_RESULTS_PER_PAGE
  );
  const res = await axios.get(`/${endpoint}`, { params });
  if (res.status === 200) return res;
  else throw new Error('Could not fetch news');
};

// fetch all sorces for the sources filter
export const fetchSourcesData = async () => {
  const res = await axios.get(`/${ENDPOINTS.TOP}/sources`);
  if (res.status === 200) return res;
  else throw new Error('Could not fetch sources');
};

// fetch max amount of articles
export const fetchAllGraphData = async (
  state: IFilterState,
  defaultCountry: string
) => {
  const { endpoint } = state;
  const params = buildAxiosParams(state, defaultCountry);
  // replace default pageSize to max
  params.set('pageSize', MAX_API_RESULTS.toString());
  const res = await axios.get(`/${endpoint}`, { params });
  if (res.status === 200) return res;
  else throw new Error('Could not fetch news');
};
