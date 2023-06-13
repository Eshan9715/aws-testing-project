import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

const AutoCountry = ({options, title, setPortData}) =>{
  return (
    <Autocomplete
    id="country-select-demo"
    sx={{ width: '100%' }}
    options={options}
    onInputChange={(event, newInputValue) => {
          setPortData(newInputValue);
        }}
    autoHighlight
    getOptionLabel={(option) => [option.name] || ""}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <div className='w-full flex justify-between items-center mr-2'>               
                    <p className='text-sm'>{option.name}</p>
                    <img
                        loading="lazy"
                        width="25"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    /> 
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
        
      />
    )}
  />
  );
}

export default AutoCountry