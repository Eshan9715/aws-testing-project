import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const BasicDateTimePicker = ({label,setDateTime}) => {
  const [value, setValue] = React.useState(null);
  if(value!==null){
  var y = (value.$d.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}))
  console.log(y)
  setDateTime(y);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        minDate={new Date()}
        className='w-full'
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}



// let date_1 = new Date('10/25/2021');
// let date_2 = new Date();

// const days = (date_1, date_2) =>{
//     let difference = date_1.getTime() - date_2.getTime();
//     let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
//     return TotalDays;
// }
// console.log(days(date_1, date_2) +" days to world cup");



//endTime.diff(startTime, 'hours')
//var mins = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("mm")


// const countDays = (day)=>{
//   let difference = day.getTime() - new Date().getTime();
//   let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
//   return TotalDays;
// }