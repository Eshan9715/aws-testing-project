import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
import anchor from '../../assets/anchor.png'
import city from '../../assets/city.png'

const AutoText = ({options, title, setPortData}) =>{

  return (
    <Autocomplete
    id="country-select-demo"
    sx={{ width: '100%' }}
    freeSolo
    disableClearable
    groupBy={(option) => option.State}
    options={options}
    onInputChange={(event, newInputValue) => {
          setPortData(newInputValue);
        }}
    autoHighlight
    getOptionLabel={(option) => option.State==='Port'? [option.ObjectCode, option.ObjectName, option.CountryCode] : [option.ObjectName, option.CountryName, option.CountryCode]  || ""}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.State==='Port' ? <img
                loading="lazy"
                width="30"
                src={anchor}
                alt=""
                /> :
                <img
                loading="lazy"
                width="30"
                src={city}
                alt=""
                />}
                <div className='w-full flex justify-between items-center'>
                  {option.State==='Port' ? 
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-start items-center'>
                            <p className='text-sm'>{option.ObjectName}</p>
                            <p className='text-xs ml-1'>[{option.ObjectCode}]</p>  
                        </div>
                        <p className='text-sm'>{option.CountryName}</p>
                    </div>:
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-start items-center'>
                            <p className='text-sm'>{option.ObjectName}</p>
                        </div>
                        <p className='text-sm'>{option.CountryName}</p>
                    </div>
                                      
                    }

                    <img
                        loading="lazy"
                        width="25"
                        src={`https://flagcdn.com/w20/${option.CountryCode.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.CountryCode.toLowerCase()}.png 2x`}
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
         
          type: 'search',
        }}
        
      />
    )}
  />
  );
}



export default AutoText