import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangeRole = ({show,close,title,name,id,role}) => {
    const [staste, setstaste] = useState('')
    var http = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();


    const sendRequestR = async() =>{
        const changerole = { 
          role: staste
        }        
        console.log(staste)
        axios
        .put(`${http}/api/member/changeRole/${id}`,changerole)
        .then((res) => {
          console.log(res.data);
      });
    }

    const send = ()=>{
        sendRequestR();
        close();
        //navigate('/staff')
    }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white w-[40%] gap-4 rounded-lg shadow-lg`}>
    <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
    <div className='w-full flex justify-center items-center'>

        <div className='w-[90%] flex flex-col justify-center items-center gap-2'>
            <p><span className='font-semibold'>{name}'s</span> role is <span className='font-bold text-red-500 tracking-wider text-lg ml-2'>{role}</span>.</p>

            <div className='w-full flex justify-center items-center gap-2'>
            <p>Change <span className='font-semibold'>{name}'s</span> role ?</p>
            <FormControl sx={{ m: 1, width:'140px',borderRadius:2 }}>
                    <InputLabel id="demo-select-small">status</InputLabel>
                        <Select
                            value={staste}
                            label="status"
                            onChange={(e)=>setstaste(e.target.value)}
                            className='py-0.5'
                            size='small'
                        >
                            <MenuItem value={"salesman"}>Salesman</MenuItem>
                            <MenuItem value={"crd"}>CRD</MenuItem>
                            <MenuItem value={"ratesmanager"}>Sales manager</MenuItem>

                        </Select>
            </FormControl>
            </div>
        </div>

    </div>


    <div className='flex w-full justify-center gap-5 items-center mb-5'>
        <button onClick={close} 
        className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
        <span>cancel</span>
        </button> 
        <button onClick={send} 
        className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
        <span>ok</span>
        </button> 
    </div>

    </div>
{/* </div> */}

</div>
  )
}

export default ChangeRole