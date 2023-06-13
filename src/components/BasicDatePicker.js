import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

export const BasicDatePicker = ({label,setDate}) =>{
  const [value, setValue] = React.useState(
    dayjs(new Date()),
  );

  const handleChange = (newValue) => {
    setValue(newValue);
    setDate(moment(newValue?.$d.toLocaleDateString()).format('dddd, MMM Do YYYY'))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} width={'100%'}>
        <DesktopDatePicker
          label={label}
          minDate={new Date()}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
     
      </Stack>
    </LocalizationProvider>
  );
}