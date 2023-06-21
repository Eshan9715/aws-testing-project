import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BasicDateTimePicker } from '../TextUI/BasicDateTimePicker'
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../TextUI/TextInput';

const AddCutOff = ({show,close,title,id,data}) => {
  var http = process.env.REACT_APP_BASE_URL;
  
    const navigate = useNavigate();
    const [etaCol, setetaCol] = useState(null)
    const [fclOpen, setfclOpen] = useState(null)
    const [fclClo, setfclClo] = useState(null)
    const [blClo, setblClo] = useState(null)
    const [vgmClo, setvgmClo] = useState(null)
    const [rfOpen, setrfOpen] = useState(null)
    const [cpuc, setcpuc] = useState(null)



    const [etaColt, setetaColt] = useState(null)
    const [fclOpent, setfclOpent] = useState(null)
    const [fclClot, setfclClot] = useState(null)
    const [blClot, setblClot] = useState(null)
    const [vgmClot, setvgmClot] = useState(null)
    const [rfOpent, setrfOpent] = useState(null)
    const [cpuct, setcpuct] = useState(null)


    const [ldetails, setlDetails] = useState([])
    const [vopr, setvopr] = useState('')
    const [conopr, setconopr] = useState('')
    const [termin, settermin] = useState('')

    var CUTOFF = {
      ETACOL:'',
      FCLOPN:'',
      FCLCLO:'',
      BLCLO:'',
      VGMCLO:'',
      RFOPN:'',
      TERMIN:'',
      VESOP:'',
      CONOP:''

    }

    const [Data, setData] = useState({});
    let ctf = []
    ctf.push(data)

    useEffect(() => {
      setData(data)
      const getLines = ()=>{
        axios
        .get(`${http}/api/line`)
        .then((res) => {
          console.log(res.data);
          setlDetails(res.data.lines)
        })
        .catch(err=> {
          console.log(err);
        })     
      }
      getLines();
    }, [data, http]);

    // console.log(Data)

    const sendRequest = async() =>{
        CUTOFF.ETACOL = etaCol + ' ' + etaColt;
        CUTOFF.FCLOPN = fclOpen + ' ' + fclOpent;
        CUTOFF.FCLCLO = fclClo + ' ' + fclClot;
        CUTOFF.BLCLO = blClo + ' ' + blClot;
        CUTOFF.VGMCLO = vgmClo + ' ' + vgmClot;
        CUTOFF.RFOPN = rfOpen + ' ' + rfOpent;
        CUTOFF.TERMIN = termin;
        CUTOFF.VESOP = vopr;
        CUTOFF.CONOP = conopr;
       
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
        axios
        .put(`${http}/api/fclquery/addCutOff/${id}`,addCUTOFF)
        .then((res) => {
          //console.log(res.data);
    
        //setlDetails(res.data.lines)
        navigate('/dashboard')
      });
  }

    const send = () =>{
      if(etaCol!==null && fclClo!==null && blClo!==null && vgmClo!==null && etaColt!==null && fclClot!==null && blClot!==null && vgmClot!==null ){
        sendRequest();
        close();
    }
  }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white max-w-screen-md gap-4 rounded-lg shadow-lg`}>
      <h3 className='text-lg font-semibold text-center p-2 bg-sky-700 text-white'>{title}</h3>
      <div className='w-full flex justify-center items-center'>
          {ctf?.length>0 && 
            <div className='w-full flex justify-center items-center px-16'>
              <div className='w-full flex-col justify-center items-center max-h-[400px] overflow-y-auto overflow-x-hidden gap-2'>

                <BasicDateTimePicker label1={"ETA Colombo Date"} label2={"ETA Colombo Time"} setDate={setetaCol} setTime={setetaColt}/>
                {((etaCol===null) || (etaColt===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add ETD Colombo here!</p>}

                <BasicDateTimePicker label1={"FCL Opening Date"} label2={"FCL Opening Time"} setDate={setfclOpen} setTime={setfclOpent}/>
                {((fclOpen===null) || (fclOpent===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add FCL Opening here!</p>}

                <BasicDateTimePicker label1={"FCL Closing Date"} label2={"FCL Closing Time"} setDate={setfclClo} setTime={setfclClot}/>
                {((fclClo===null) || (fclClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add FCL Closing here!</p>}

                <BasicDateTimePicker label1={"B/L Cutoff Date"} label2={"B/L Cutoff Time"} setDate={setblClo} setTime={setblClot}/>
                {((blClo===null) || (blClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add B/L CutOff here!</p>}

                <BasicDateTimePicker label1={"VGM Cutoff Date"} label2={"VGM Cutoff Time"} setDate={setvgmClo} setTime={setvgmClot}/>
                {((vgmClo===null) || (vgmClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add VGM CutOff here!</p>}

                <BasicDateTimePicker label1={"Reefer Opening Date"} label2={"Reefer Opening Time"} setDate={setrfOpen} setTime={setrfOpent}/>
                {((rfOpen===null) || (rfOpent===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add Reefer Opening here!</p>}

                <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>

                <div className='w-full flex-col justify-center items-center mt-4 space-y-4'>
                  <TextInput  label='Terminal Name' placeholder='Add terminal name' setValue={settermin}/>
                  <TextInput label='Vessel Operator' placeholder='Add Vessel Operator' setValue={setvopr}/>
                  <TextInput label='Container Operator' placeholder='Add Container Operator' setValue={setconopr}/>

                  <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>
                  <p className='w-full text-[11px] text-red-600 flex justify-start'>*Optional</p>

                  <BasicDateTimePicker label1={"Cont: pick-up cutoff Date"} label2={"Container pick-up cutoff Time"} setDate={setcpuc} setTime={setcpuct}/>

                </div>

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