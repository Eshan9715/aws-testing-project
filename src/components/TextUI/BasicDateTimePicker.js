import { Box, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

export const BasicDateTimePicker = ({label1,label2,setDate,setTime}) => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState();
  const ref1 = useRef();
  const ref2 = useRef();

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


  const handleChange1 = (e) => {
    setValue1(e.target.value);
    setDate(e.target.value);

    // setDate(moment(value1).format('dddd, MMM Do YYYY'))
  };

  const handleChange2 = (e) => {
    setValue2(e.target.value);
    setTime(e.target.value);
  };
  return (
    <div className="w-full flex justify-center items-center gap-2 mt-2">
          <p className="min-w-[100px] text-[13.5px] font-semibold">{`${label1.split(" ")[0]} ${label1.split(" ")[1]}`}</p>
          <div className="w-full flex justify-center items-center gap-2">

            <input className="z-20 p-3 border rounded-md flex"
                type="text"
                onFocus={() => (ref1.current.type = "date")}
                onBlur={() => (ref1.current.type = "text")}      
                min={format4}
                ref={ref1}
                inputFormat="DD/MM/YYYY"
                value={value1}
                placeholder={label1}
                onChange={handleChange1} 
            />
            <input type="text" className="z-20 p-3 border rounded-md flex"
                required
                value={value2}
                ref={ref2}
                onFocus={() => (ref2.current.type = "time")}
                onBlur={() => (ref2.current.type = "text")}   
                onChange={handleChange2} 
                placeholder={label2}

            />
          </div>  
    </div>
    
  );
};

export const EditBasicDateTimePicker = ({label1,label2,fetchDate,handleDate,fetchTime,handleTime}) => {
  const ref1 = useRef();
  const ref2 = useRef();

  let objectDate = new Date();

  let day = objectDate.getDate();

  let month = objectDate.getMonth();

  let year = objectDate.getFullYear();

  let format3 = `${year}-${month+1}-${day}`
  let Imonth = month>9? (month+1) : `0${(month+1)}`

  let format4 = `${year}-${Imonth}-${day}`

  return (
    <div className="w-full flex justify-center items-center gap-2 mt-2">
          <p className="min-w-[100px] text-[13.5px] font-semibold">{`${label1.split(" ")[0]} ${label1.split(" ")[1]}`}</p>
          <div className="w-full flex justify-center items-center gap-2">

            <input className="z-20 p-3 border rounded-md flex"
                type="text"
                onFocus={() => (ref1.current.type = "date")}
                onBlur={() => (ref1.current.type = "text")}      
                min={format4}
                ref={ref1}
                inputFormat="DD/MM/YYYY"
                value={fetchDate}
                placeholder={label1}
                onChange={handleDate} 
            />
            <input type="text" className="z-20 p-3 border rounded-md flex"
                required
                value={fetchTime}
                ref={ref2}
                onFocus={() => (ref2.current.type = "time")}
                onBlur={() => (ref2.current.type = "text")}   
                onChange={handleTime} 
                placeholder={label2}

            />
          </div>  
    </div>
    
  );
};

export const EditTextInput = ({label,placeholder,fetchValue,type,handleValue}) =>{
return (
  <Box
    component="form"
    sx={{width: '100%'}}
    noValidate
    autoComplete="off"
  >
    <TextField 
      id="outlined-basic" 
      label={label} variant="outlined" 
      placeholder={placeholder}   
      value={fetchValue}
      type={type}
      className='w-full'
      onChange={handleValue}/>
  </Box>
);
}



























// import * as React from 'react';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// export const BasicDateTimePicker = ({label,setDateTime}) => {
//   const [value, setValue] = React.useState(null);
//   if(value!==null){
//   var y = (value.$d.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}))
//   console.log(y)
//   setDateTime(y);
//   }
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker
//         renderInput={(props) => <TextField {...props} />}
//         label={label}
//         value={value}
//         minDate={new Date()}
//         className='w-full'
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//       />
//     </LocalizationProvider>
//   );
// }



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