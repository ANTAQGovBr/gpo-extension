import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export default function FormDatePicker({
  label,
  value,
  onChange,
}: TextFieldProps | DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value || null}
        inputFormat="dd/MM/yyyy"
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
