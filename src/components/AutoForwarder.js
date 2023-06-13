import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { forwarders } from '../Data';

const AutoForwarder = ({options,setSlData}) => {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      sx={{ width: '100%' }}
      disableClearable
      options={forwarders.map((option) => option.fname)}
      onInputChange={(event, newInputValue) => {
          setSlData(newInputValue);
        }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Shipper name"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  )
}

export default AutoForwarder