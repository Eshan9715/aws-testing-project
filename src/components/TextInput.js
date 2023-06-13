import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TextInput = ({label,placeholder,setValue, type}) =>{
    const [input, setInput] = React.useState('')
    setValue(input)
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
        value={input}
        type={type}
        className='w-full'
        onChange={(e) => {
            setInput(e.target.value);
        }}/>

     
    </Box>
  );
}