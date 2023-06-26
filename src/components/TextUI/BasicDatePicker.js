// import * as React from 'react';
// import dayjs from 'dayjs';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// export const BasicDatePicker = ({label,setDate}) =>{
//   const [value, setValue] = React.useState(
//     dayjs(new Date()),
//   );



//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//     <DemoContainer components={['DatePicker']}>
//       <Stack spacing={3} width={'100%'}>
//         <DatePicker
//           label={label}
//           minDate={new Date()}
//           inputFormat="DD/MM/YYYY"
//           value={value}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
     
//       </Stack>
//     </DemoContainer>

//     </LocalizationProvider>

//   );
// }

import React, { useRef, useState } from "react";

export const BasicDatePicker = ({label,setDate}) => {
  const [Value, setValue] = useState(null);
  const ref = useRef();

  let objectDate = new Date();

  let day = objectDate.getDate();
  //console.log(day); 

  let month = objectDate.getMonth();
  //console.log(month + 1); 

  let year = objectDate.getFullYear();
  //console.log(year); 

  let format3 = `${year}-${month+1}-${day}`
  //console.log(format3); 
  let Imonth = month>9? (month+1) : `0${(month+1)}`

  let format4 = `${year}-${Imonth}-${day}`
  //console.log(format4); 

  const handleChange = (event) => {
    setValue(event.target.value);
    setDate(event.target.value);

    //console.log(Value)
    //setDate(moment(Value).format('dddd, MMM Do YYYY'))
  };

  //console.log(Value)
  //console.log(setDate(moment(Value).format('dddd, MMM Do YYYY')))

  return (
    <input 
      type="text"
      onFocus={() => (ref.current.type = "date")}
      onBlur={() => (ref.current.type = "text")}      
      className="z-20 p-4 border rounded-md flex w-full"
      min={format4}
      ref={ref}
      inputFormat="DD/MM/YYYY"
      value={Value}
      placeholder={label}
      onChange={handleChange} />
  );
};