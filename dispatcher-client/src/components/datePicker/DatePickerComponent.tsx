import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { filterActions } from '../../store/slices/filterSlice';
import { asyncActions } from '../../store/asyncAtions';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { COLORS } from '../../utils/constants/colors';
import { DatesFilterContainer, DateIconStyled } from './styles';

export interface DatePickerProps {
  filtertype: string;
}

const DatePickerComponent = ({ filtertype }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDateChange = (newValue: any) => {
    setSelectedDate(newValue);
    if (newValue) {
      const ISO = newValue.toISOString().slice(0, 10);
      dispatch(filterActions.updateFilter({ key: filtertype, value: ISO }));
    } else {
      dispatch(filterActions.updateFilter({ key: filtertype, value: '' }));
    }
    dispatch(asyncActions.fetchNews());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        clearable
        showToolbar={false}
        orientation='portrait'
        inputFormat='dd/MM/yyyy'
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        InputProps={{
          disableUnderline: true,
        }}
        PaperProps={{
          sx: {
            borderRadius: '1.25rem',
            boxShadow: '0px 32px 64px rgba(0, 0, 0, 0.07)',
          },
        }}
        PopperProps={{
          placement: 'bottom',
          sx: { paddingTop: '1rem', paddingLeft: '13%' },
        }}
        renderInput={(params) => (
          <DatesFilterContainer onClick={() => setIsOpen(true)}>
            {selectedDate ? '' : 'Dates'}
            <TextField
              variant='standard'
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder: '',
                readOnly: true,
                sx: {
                  color: COLORS.purple,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                },
              }}
            />
            <DateIconStyled />
          </DatesFilterContainer>
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
