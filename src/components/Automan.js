import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

const Automan = ({options, title, setSlData,type}) =>{

  return (
    <Autocomplete
    id="country-select-demo"
    sx={{ width: '100%' }}
    options={options}
    onInputChange={(event, newInputValue) => {
          setSlData(newInputValue);
        }}
    autoHighlight
    getOptionLabel={(option) => [option.name] || ""}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <div className='w-full flex justify-start items-center gap-4'>               
                    
                    <img
                        loading="lazy"
                        src={option.image}
                        className='rounded-full w-8 h-8'
                        alt=""
                    /> 
                    <p className='text-sm'>{option.name}</p>
                </div>                                  
            </Box>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        label={title}
        inputProps={{
          ...params.inputProps,
         
        }}
        size={type}
        
      />
    )}
  />
  );
}



export default Automan