import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';

import { ErrorMessage, useField } from 'formik'

const Autocompletes = ({options, title, formData, setFormData, ...props}) =>{
  const [field, meta] = useField(props);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
    
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={options}
      value={formData.email}
      className={`${meta.touched && meta.error && 'is-invalid'}`}
      onInputChange={(event,value) =>
          setFormData({ ...formData, [field.name]:value })
        }      
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
      {...field} {...props}
    />
    <ErrorMessage component="div" name={field.name} className='text-[13px] text-red-600 mb-1' />

    </Stack>
    
  );
}

export default Autocompletes