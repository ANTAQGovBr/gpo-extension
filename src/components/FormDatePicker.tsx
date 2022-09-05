import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/lab/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import ptBR from 'date-fns/locale/pt-BR';

export default function FormDatePicker({
  label,
  value,
  onChange,
}: TextFieldProps | DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <DatePicker
        label={label}
        value={value || null}
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
