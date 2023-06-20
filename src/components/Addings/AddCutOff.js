import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { BasicDateTimePicker } from '../TextUI/BasicDateTimePicker'
import { useNavigate } from 'react-router-dom';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const AddCutOff = ({show,close,title,id,data}) => {
  var http = process.env.REACT_APP_BASE_URL;
  
    const navigate = useNavigate();
    const [etdCol, setetdCol] = useState(null)
    const [fclClo, setfclClo] = useState(null)
    const [blClo, setblClo] = useState(null)
    const [vgmClo, setvgmClo] = useState(null)

    const [etdColt, setetdColt] = useState(null)
    const [fclClot, setfclClot] = useState(null)
    const [blClot, setblClot] = useState(null)
    const [vgmClot, setvgmClot] = useState(null)
  
    var CUTOFF = {
      ETDCOL:'',
      FCLCLO:'',
      BLCLO:'',
      VGMCLO:'',
    }

    const [Data, setData] = useState({});
    let ctf = []
    ctf.push(data)

    useEffect(() => {
      setData(data)
    }, [data]);

    // console.log(Data)

    const sendRequest = async() =>{
        CUTOFF.ETDCOL = etdCol + ' ' + etdColt;
        CUTOFF.FCLCLO = fclClo + ' ' + fclClot;
        CUTOFF.BLCLO = blClo + ' ' + blClot;
        CUTOFF.VGMCLO = vgmClo + ' ' + vgmClot;
        // cutoffs.push(CUTOFF)
        // console.log(cutoffs)

        const addCUTOFF = { 
            cutoff: CUTOFF,
            // cutoffs.map((item) => ({
            //     ETDColombo: item.ETDCOL,
            //     FCLClosing: item.FCLCLO,
            //     BLClosing: item.BLCLO,
            //     VGMClosing: item.VGMCLO
            // })),
            id: id,
            status: 'b/l pending'

        }     
        console.log(CUTOFF)   
      //   axios
      //   .put(`${http}/api/fclquery/addCutOff/${id}`,addCUTOFF)
      //   .then((res) => {
      //     //console.log(res.data);
    
      //   //setlDetails(res.data.lines)
      //   navigate('/dashboard')
      // });
  }

    const send = () =>{
      if(etdCol!==null && fclClo!==null && blClo!==null && vgmClo!==null && etdColt!==null && fclClot!==null && blClot!==null && vgmClot!==null ){
        sendRequest();
        close();
    }
  }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white max-w-screen-sm gap-4 rounded-lg shadow-lg`}>
      <h3 className='text-lg font-semibold text-center p-2 bg-sky-700 text-white'>{title}</h3>
      <div className='w-full flex justify-center items-center'>
          {ctf?.length>0 && 
            <div className='w-full flex justify-center items-center px-16'>
              <div className='w-full flex-col justify-center items-center'>

                <BasicDateTimePicker label1={"B/L Cutoff Date"} label2={"B/L Cutoff Time"} setDate={setblClo} setTime={setblClot}/>
                {((blClo===null) || (blClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-start'>Add B/L CutOff here!</p>}

                <BasicDateTimePicker label1={"FCL Closing Date"} label2={"FCL Closing Time"} setDate={setfclClo} setTime={setfclClot}/>
                {((fclClo===null) || (fclClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-start'>Add FCL Closing here!</p>}

                <BasicDateTimePicker label1={"VGM Cutoff Date"} label2={"VGM Cutoff Time"} setDate={setvgmClo} setTime={setvgmClot}/>
                {((vgmClo===null) || (vgmClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-start'>Add VGM CutOff here!</p>}

                <BasicDateTimePicker label1={"ETD Colombo Date"} label2={"ETD Colombo Time"} setDate={setetdCol} setTime={setetdColt}/>
                {((etdCol===null) || (etdColt===null)) && <p className='w-full text-[11px] text-red-600 flex justify-start'>Add ETD Colombo here!</p>}
              </div>
            </div>}

          {ctf?.length>0 && 
          <div className='w-3/4 flex flex-col justify-center items-center gap-2'>














            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={'Add B/L CutOff here!'}
                value={Data?.BLCLO}
                minDate={new Date()}
                className='w-full'
                onChange={(newValue) => {
                  setData({ ...Data, BLCLO: newValue })

                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={'Add FCL Closing here!'}
                value={Data?.FCLCLO}
                minDate={new Date()}
                className='w-full'
                onChange={(newValue) => {
                  // setValue(newValue);
                  setData({ ...Data, FCLCLO: newValue })

                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={'Add VGM CutOff here!'}
                value={Data?.VGMCLO}
                minDate={new Date()}
                className='w-full'
                onChange={(newValue) => {
                  // setValue(newValue);
                  setData({ ...Data, VGMCLO: newValue })

                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={'Add ETD Colombo here!'}
                value={Data?.ETDCOL}
                minDate={new Date()}
                className='w-full'
                onChange={(newValue) => {
                  // setValue(newValue);
                  setData({ ...Data, ETDCOL: newValue })

                }}
              />
            </LocalizationProvider> */}

          </div>}

      </div>

      <div className='flex w-full justify-center gap-5 items-center mb-2'>
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

</div>
  )
}

export default AddCutOff