import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { filterActions } from '../../store/slices/filterSlice';
import { newsActions } from '../../store/slices/newsSlice';
import { asyncActions } from '../../store/asyncAtions';
import { SelectOption } from '@mui/base/SelectUnstyled';
import { CustomSelect, StyledOption, DropdownContainer } from './styles';
import { ENDPOINTS } from '../../utils/constants/endpoints';

export interface IOption {
  name: string;
  id: string;
}

export interface DropdownProps {
  placeholder: string;
  options: IOption[];
  insearchbox?: any;
  filtertype: string;
}

const Dropwdown = ({
  placeholder,
  options,
  insearchbox,
  filtertype,
}: DropdownProps) => {
  const [selectedFilterValue, setSelectedFilterValue] =
    useState<IOption | null>(null);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const hasSearched = useAppSelector((state) => state.news.hasSearched);
  const defaultSearch = useAppSelector(
    (state) => state.location.defaultCountry.name
  );

  const handleFilterChange = (newValue: IOption | null) => {
    if (newValue) {
      setSelectedFilterValue(newValue);
      dispatch(
        filterActions.updateFilter({ key: filtertype, value: newValue.id })
      );
      if (!hasSearched) {
        dispatch(newsActions.setHasSearched(true));
      }
      if (filtertype === 'endpoint') {
        dispatch(filterActions.clearFilters());
        if (
          newValue.id === ENDPOINTS.EVERYTHING &&
          filters.q === '' &&
          filters.sources === ''
        ) {
          dispatch(filterActions.setQuery(defaultSearch));
        } else if (
          newValue.id === ENDPOINTS.TOP &&
          filters.q === defaultSearch
        ) {
          dispatch(filterActions.setQuery(''));
        } else if (filters.q === defaultSearch) {
          dispatch(filterActions.setQuery(''));
        }
      }
      dispatch(asyncActions.fetchNews());
      dispatch(asyncActions.fetchGraphData());
    }
  };

  const handleUnselectFilter = (id: string) => {
    if (selectedFilterValue && id === selectedFilterValue.id && !insearchbox) {
      setSelectedFilterValue(null);
      dispatch(filterActions.updateFilter({ key: filtertype, value: '' }));
      if (
        filters.endpoint === ENDPOINTS.EVERYTHING &&
        filters.q !== '' &&
        filters.sources !== ''
      ) {
        dispatch(asyncActions.fetchNews());
        dispatch(asyncActions.fetchGraphData());
      } else if (
        filters.endpoint === ENDPOINTS.EVERYTHING &&
        filters.q === '' &&
        filters.sources === ''
      ) {
        dispatch(filterActions.setQuery(defaultSearch));
      }
      dispatch(asyncActions.fetchNews());
      dispatch(asyncActions.fetchGraphData());
    }
  };

  return (
    <DropdownContainer
      options={options}
      insearchbox={insearchbox ? insearchbox.toString() : undefined}
      filtertype={filtertype}
      placeholder={placeholder}
      filters={filters}
      className={filtertype}
    >
      <CustomSelect
        value={selectedFilterValue}
        onChange={handleFilterChange}
        renderValue={(item: SelectOption<IOption> | null) =>
          item != null ? item.label : placeholder
        }
        componentsProps={{
          popper: {
            placement: 'bottom',
            popperOptions: { placement: 'bottom', disablePortal: true },
          },
        }}
      >
        {options.map((option) => (
          <div key={option.id} onClick={() => handleUnselectFilter(option.id)}>
            <StyledOption value={option} className='font-mulish'>
              {option.name}
            </StyledOption>
          </div>
        ))}
      </CustomSelect>
    </DropdownContainer>
  );
};

export default Dropwdown;
