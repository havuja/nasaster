import React from "react";
import format from "date-fns/format";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

type DatePickerElementProps = {
  label: string;
  value: string;
  onChange(date: string): void;
  testId?: string;
};

function DatePickerElement(props: DatePickerElementProps) {
  const { onChange, value, label, testId } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          if (newValue) {
            onChange(format(new Date(newValue), "yyyy-MM-dd"));
          }
        }}
        inputFormat="yyyy-MM-dd"
        renderInput={(params) => (
          <TextField {...params} data-testid={`datepicker-input-${testId}`} /> // eslint-disable-line
        )}
        data-testid={`datepicker-${testId}`}
      />
    </LocalizationProvider>
  );
}

export default DatePickerElement;
