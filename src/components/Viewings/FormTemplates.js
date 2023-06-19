import React, { useEffect } from 'react'
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


export const ShipperDetails = ({formData, setFormData,ischeck,data}) => {

  return (
    <div className='w-full flex flex-col gap-2 justify-center items-center'>
        <Stack spacing={2} sx={{ width: '100%' }}>       
            <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.length===0? []: data?.map(e=>e.shipperName)}
            value={formData.shipperName}
            onInputChange={(event,value) =>
                setFormData({ ...formData, shipperName: value })
                }      
            renderInput={(params) => (
                <TextField
                {...params}
                label={'shipper name'}
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
                />
            )}
            />
        </Stack>
        {((formData.shipperName==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Shipper name Required!</p>} 

        <Stack spacing={2} sx={{ width: '100%' }}>
        
            <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.length===0? []: data?.map(e=>e.shipperAddress)}
            value={formData.shipperAddress}
            onInputChange={(event,value) =>
                setFormData({ ...formData, shipperAddress: value })
                }      
            renderInput={(params) => (
                <TextField
                {...params}
                label={'shipperAddress'}
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
                />
            )}
            />
        </Stack>
        {((formData.shipperAddress==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Shipper address Required!</p>}   


        <div className='w-full grid grid-cols-2 justify-center items-center py-1 gap-2'>
            <div className='w-full flex flex-col'>      
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.length===0? []: data?.map(e=>e.shipperTele)}
               
                value={formData.shipperTele}
                onInputChange={(event,value) =>
                    setFormData({ ...formData, shipperTele: value })
                    }      
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label={'shipper TeleNum:'}
                    InputProps={{
                        ...params.InputProps,
                        type: 'number',
                       
                    }}
                    />
                )}
                />
            </Stack>
            {((formData.shipperTele==='' ) && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add shipper telephone number here!</p>}   
            {((formData.shipperTele!=='') && (ischeck) && !(/^(?:0|94|\+94)?(?:|7(0|1|2|4|5|6|7|8)\d)\d{6}$/.test(formData.shipperTele))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid telephone number!</p>}   

             </div>
            <div className='w-full flex flex-col'>      

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.length===0? []: data?.map(e=>e.shippermail)}
              
                value={formData.shippermail}
                onInputChange={(event,value) =>
                    setFormData({ ...formData, shippermail: value })
                    }      
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label={'shipper mail'}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                    />
                )}
                />
            </Stack>   
            {((formData.shippermail==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add shipper email here!</p>}   
            {((formData.shippermail!=='')  && (ischeck) && !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(formData.shippermail))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid email address!</p>}   

        </div>
        </div>    
    </div>
  )
}

export const ConsigneeDetails = ({formData, setFormData,ischeck,data}) => {

    return (
      <div className='w-full flex flex-col gap-2 justify-center items-center'>
          <Stack spacing={2} sx={{ width: '100%' }}>
          
              <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.length===0? []: data?.map(e=>e.consigneeName)}
              type='number'
            
              value={formData.consigneeName}
              onInputChange={(event,value) =>
                  setFormData({ ...formData, consigneeName: value })
                  }      
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label={'consignee name'}
                  type='number'
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                  }}
                  />
              )}
              />
          </Stack>   
          {((formData.consigneeName==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Consignee name Required!</p>} 

  
          <Stack spacing={2} sx={{ width: '100%' }}>
          
              <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.length===0? []:data?.map(e=>e.consigneeAddress)}
              value={formData.consigneeAddress}
              onInputChange={(event,value) =>
                  setFormData({ ...formData, consigneeAddress: value })
                  }      
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label={'consigneeAddress'}
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                  }}
                  />
              )}
              />
          </Stack>
          {((formData.consigneeAddress==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Consignee address Required!</p>}   

          <div className='w-full grid grid-cols-2 justify-center items-center py-1 gap-2'>
          <div className='w-full flex flex-col'>
              <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={data.length===0? []:data?.map(e=>e.consigneeTele)}
                  //   onInputChange={(newInputValue) => {
                  //       setPortData(newInputValue);
                  //     }}
                  value={formData.consigneeTele}
                  onInputChange={(event,value) =>
                      setFormData({ ...formData, consigneeTele: value })
                      }      
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label={'Consignee TeleNum:'}
                      InputProps={{
                          ...params.InputProps,
                          type: 'number',
                          }}
                      />
                  )}
                  />
              </Stack>
              {((formData.consigneeTele==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Consignee telephone number here!</p>}   
            {((formData.consigneeTele!=='') && (ischeck) && !(/^(?:0|94|\+94)?(?:|7(0|1|2|4|5|6|7|8)\d)\d{6}$/.test(formData.consigneeTele))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid telephone number!</p>}   
        </div>
  
        <div className='w-full flex flex-col'>              
              <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={data.length===0? []:data?.map(e=>e.consigneemail)}
                  //   onInputChange={(newInputValue) => {
                  //       setPortData(newInputValue);
                  //     }}
                  value={formData.consigneemail}
                  onInputChange={(event,value) =>
                      setFormData({ ...formData, consigneemail: value })
                      }      
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label={'shipper mail'}
                      InputProps={{
                          ...params.InputProps,
                          type: 'search',
                      }}
                      />
                  )}
                  />
              </Stack>   
              {((formData.consigneemail==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add consignee email here!</p>}   
            {((formData.consigneemail!=='') && (ischeck) && !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(formData.consigneemail))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid email address!</p>}   
        </div>
          </div>    
      </div>
      
    )
  }

export const NotifyDetails = ({formData, setFormData,ischeck,data}) => {
    return (
      <div className='w-full flex flex-col gap-2 justify-center items-center'>
          <Stack spacing={2} sx={{ width: '100%' }}>
          
              <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.length===0? []:data?.map(e=>e.notifyName)}
              //   onInputChange={(newInputValue) => {
              //       setPortData(newInputValue);
              //     }}
              value={formData.notifyName}
              onInputChange={(event,value) =>
                  setFormData({ ...formData, notifyName: value })
                  }      
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label={'Notify name'}
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                  }}
                  />
              )}
              />
          </Stack>   
          {((formData.notifyName==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Notify name Required!</p>} 

  
          <Stack spacing={2} sx={{ width: '100%' }}>
          
              <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.length===0? []:data?.map(e=>e.notifyAddress)}
              value={formData.notifyAddress}
              onInputChange={(event,value) =>
                  setFormData({ ...formData, notifyAddress: value })
                  }      
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label={'Notify Address'}
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                  }}
                  />
              )}
              />
          </Stack>
          {((formData.notifyAddress==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Notify address Required!</p>}   

  
          <div className='w-full grid grid-cols-2 justify-center items-center py-1 gap-2'>
          <div className='w-full flex flex-col'>
              <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={data.length===0? []:data?.map(e=>e.notifyTele)}
                  //   onInputChange={(newInputValue) => {
                  //       setPortData(newInputValue);
                  //     }}
                  value={formData.notifyTele}
                  onInputChange={(event,value) =>
                      setFormData({ ...formData, notifyTele: value })
                      }      
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label={'Notify TeleNum:'}
                      InputProps={{
                          ...params.InputProps,
                          type: 'number',
                      }}
                      />
                  )}
                  />
              </Stack>
              {((formData.notifyTele==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Notify telephone number here!</p>}   
            {((formData.notifyTele!=='') && (ischeck) && !(/^(?:0|94|\+94)?(?:|7(0|1|2|4|5|6|7|8)\d)\d{6}$/.test(formData.notifyTele))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid telephone number!</p>}   
            </div>
  
            <div className='w-full flex flex-col'>
              <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={data.length===0? []:data?.map(e=>e.notifymail)}
                  //   onInputChange={(newInputValue) => {
                  //       setPortData(newInputValue);
                  //     }}
                  value={formData.notifymail}
                  onInputChange={(event,value) =>
                      setFormData({ ...formData, notifymail: value })
                      }      
                  renderInput={(params) => (
                      <TextField
                      {...params}
                      label={'Notify mail'}
                      InputProps={{
                          ...params.InputProps,
                          type: 'search',
                      }}
                      />
                  )}
                  />
              </Stack>
              {((formData.notifymail==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Notify email here!</p>}   
            {((formData.notifymail!=='') && (ischeck) && !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(formData.notifymail))) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Invalid email address!</p>}   
            </div>
          </div>    
      </div>
    )
  }

export const MarkNvalues = ({formData, setFormData,ischeck}) => {
    return (
        <div className='w-full flex flex-col gap-2 justify-center items-center'>

        <TextField 
        id="outlined-basic" 
        label={'Marks & Numbers'} variant="outlined" 
        placeholder={''}   
        className='w-full'
        multiline
        rows={4} 
        value={formData.markNvalues}
        onChange={(event,value) =>
            setFormData({ ...formData, markNvalues: event.target.value })
         }      
    />

      {((formData.markNvalues==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add mark & numbers here!</p>}   
        </div>
    )
}

export const CargoDesc = ({formData, setFormData,ischeck}) => {
    return (
    <div className='w-full flex flex-col gap-2 justify-center items-center'>

    <TextField 
        id="outlined-basic" 
        label={'Cargo Description'} variant="outlined" 
        placeholder={''}   
        className='w-full'
        multiline
        rows={4} 
        value={formData.cargoDesc}
        onChange={(event) =>
            setFormData({ ...formData, cargoDesc: event.target.value })
         } 
    />     
    {((formData.cargoDesc==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add cargo description here!</p>}   
  
    </div>
    )
}

export const CargoQuantity = ({formData, setFormData,ischeck}) => {
    return (
    <div className='w-full grid grid-cols-2 justify-center items-center py-1 gap-2'>
    <div className='w-full flex flex-col'>
    <TextField 
        id="outlined-basic" 
        label={'No Packages'} variant="outlined" 
        placeholder={''}   
        className='w-full'
        value={formData.NoPackages}
        onChange={(event,value) =>
            setFormData({ ...formData, NoPackages: event.target.value })
         }      
    />
        {((formData.NoPackages==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add No of Packages here!</p>}   
    </div>

    <div className='w-full flex flex-col'>
     <TextField 
        id="outlined-basic" 
        label={'Gross Weight'} variant="outlined" 
        placeholder={''}   
        type='number'
        className='w-full'
        value={formData.GrossWeight}
        onChange={(event,value) =>
            setFormData({ ...formData, GrossWeight: event.target.value })
        }      
    />
        {((formData.GrossWeight==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Gross Weight here!</p>}   
    </div>

    <div className='w-full flex flex-col'>
     <TextField 
        id="outlined-basic" 
        label={'Net Weight'} variant="outlined" 
        placeholder={''}   
        type='number'
        className='w-full'
        value={formData.NetWeight}
        onChange={(event,value) =>
            setFormData({ ...formData, NetWeight: event.target.value })
        }      
    />
        {((formData.NetWeight==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Net Weight here!</p>}   
    </div>

    <div className='w-full flex flex-col'>
     <TextField 
        id="outlined-basic" 
        label={'Volume'} variant="outlined" 
        placeholder={''}   
        type='number'
        className='w-full'
        value={formData.Volume}
        onChange={(event,value) =>
            setFormData({ ...formData, Volume: event.target.value })
        }      
    />    
        {((formData.Volume==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Cargo volumes in Cbm here!</p>}   
    </div>

    </div>
    )
}

export const ContainerDetails = ({formData, setFormData,ischeck}) => {
    return (
        <div className='w-full flex flex-col gap-2 justify-center items-center'>

        <div className='w-full flex flex-col'>
        <TextField 
        id="outlined-basic" 
        label={'Container Number'} variant="outlined" 
        placeholder={''}   
        className='w-full'
        value={formData.containerData}
        onChange={(event,value) =>
            setFormData({ ...formData, containerData: event.target.value })
         }      
    />

      {((formData.containerData==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add container Data here!</p>}   
        </div>

        <div className='w-full flex flex-col'>
        <TextField 
        id="outlined-basic" 
        label={'Seal Number'} variant="outlined" 
        placeholder={''}   
        className='w-full'
        value={formData.sealData}
        onChange={(event,value) =>
            setFormData({ ...formData, sealData: event.target.value })
         }      
    />

      {((formData.sealData==='') && (ischeck)) && <p className='w-full text-[13px] text-red-600 mb-1 flex justify-start'>Add Seal number here!</p>}   
        </div>
    </div>
    )
}






