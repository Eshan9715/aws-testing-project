import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
// import vessel from '../assets/vessel.jpg'

const VesselInputs = ({options, title, setVesselData}) =>{
  // const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
    id="country-select-demo"
    sx={{ width: '100%' }}
    options={options}
    onInputChange={(event, newInputValue) => {
      setVesselData(newInputValue);
        }}
    autoHighlight
    getOptionLabel={(option) => option.LineName || ""}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              
                 <div className='flex justify-start items-center'>
                    <img
                        loading="lazy"
                        className='w-6 h-6 rounded-full'
                        src={option.LineLogo}
                        alt=""
                    />                     
                    <p className='text-xs ml-1.5'>{option.LineName}</p>  
                </div>
      </Box>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        label={title}
        inputProps={{
          ...params.inputProps,
          // autoComplete: 'new-password', 
          // disable autocomplete and autofill
        }}
        
      />
    )}
  />
  );
}



export default VesselInputs