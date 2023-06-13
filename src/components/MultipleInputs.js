import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';

export const MultipleInputs = ({data,placeholder,label,setData}) => {
  const [selection, setSelection] = useState([]);

  const handleChange = (event, value) => {
    setSelection(value);
    setData(value);
  }


  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={data}
        getOptionLabel={(option) => option.name || ""}
        defaultValue={[]}
        value={selection}
        onChange={handleChange}
        filterSelectedOptions
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <div className='w-full flex justify-start items-center'>
                <img
                    loading="lazy"
                    width="25"
                    src={option.image}
                    alt=""
                />              
                <p className='text-sm ml-2'>{option.name}</p>                        
              </div>
            </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
          />
        )}
        />
    </Stack>
  );
}