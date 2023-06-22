import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BasicDateTimePicker, EditBasicDateTimePicker, EditTextInput } from '../TextUI/BasicDateTimePicker'
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../TextUI/TextInput';
import { object } from 'yup';
import { ConstructionOutlined } from '@mui/icons-material';

const AddCutOff = ({show,close,title,id,data}) => {
  var http = process.env.REACT_APP_BASE_URL;
  console.log(data)
  
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
    const [cutof,setcutof] = useState({})


    var CUTOFF = {
      ETACOLD:'',
      FCLOPND:'',
      FCLCLOD:'',
      BLCLOD:'',
      VGMCLOD:'',
      RFOPND:'',
      CPUCD:'',
      ETACOLT:'',
      FCLOPNT:'',
      FCLCLOT:'',
      BLCLOT:'',
      VGMCLOT:'',
      RFOPNT:'',
      CPUCT:'',
      TERMIN:'',
      VESOP:'',
      CONOP:''

    }

    const [Data, setData] = useState({});
    let ctf = []
    ctf.push(data)
    console.log(ctf)

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
    }, [data, http,cutof]);

    console.log(Data?.ETACOL)
    //console.log(Data?.ETACOL.split(" ")[0])

    const sendRequest = async() =>{
        CUTOFF.ETACOLD = etaCol
        CUTOFF.FCLOPND = fclOpen
        CUTOFF.FCLCLOD = fclClo
        CUTOFF.BLCLOD = blClo
        CUTOFF.VGMCLOD = vgmClo
        CUTOFF.RFOPND = rfOpen
        CUTOFF.CPUCD = cpuc

        CUTOFF.ETACOLT = etaColt
        CUTOFF.FCLOPNT = fclOpent
        CUTOFF.FCLCLOT = fclClot
        CUTOFF.BLCLOT = blClot
        CUTOFF.VGMCLOT = vgmClot
        CUTOFF.RFOPNT = rfOpent
        CUTOFF.CPUCT = cpuct

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

  const updateRequest = async() =>{
    const addCUTOFF = { 
        cutoff: Data,
       
        id: id,
        status: 'b/l pending'
    }     
    console.log(CUTOFF)   
    axios
    .put(`${http}/api/fclquery/addCutOff/${id}`,addCUTOFF)
    .then((res) => {
      console.log(Data);

    //setlDetails(res.data.lines)
    navigate('/dashboard')
  });
}

  const send = () =>{
    if(etaCol===null && fclClo===null && blClo===null && vgmClo===null && etaColt===null && fclClot===null && blClot===null && vgmClot===null ){
      close();
    }else{
      sendRequest();
      close();
    }
  }
  const updateVal = () =>{
    updateRequest();
    close();
}

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
    <div className={`flex flex-col bg-white max-w-screen-md gap-4 rounded-lg shadow-lg`}>
      <h3 className='text-lg font-semibold text-center p-2 bg-sky-700 text-white'>{title}</h3>
      <div className='w-full flex justify-center items-center'>
          {data==='no values' && 
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


          {data!=='no values' && 

          <div className='w-full flex-col justify-center items-center max-h-[400px] overflow-y-auto overflow-x-hidden gap-2 px-16'>

            <EditBasicDateTimePicker label1={"ETA Colombo Date"} label2={"ETA Colombo Time"} fetchDate={Data?.ETACOLD} handleDate={(e) =>setData({ ...Data, ETACOLD: e.target.value})} fetchTime={Data?.ETACOLT} handleTime={(e) =>setData({ ...Data, ETACOLT: e.target.value})}/>
            {/* {((etaCol===null) || (etaColt===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add ETD Colombo here!</p>} */}

            <EditBasicDateTimePicker label1={"FCL Opening Date"} label2={"FCL Opening Time"} fetchDate={Data?.FCLOPND} handleDate={(e) =>setData({ ...Data, FCLOPND: e.target.value})} fetchTime={Data?.FCLOPNT} handleTime={(e) =>setData({ ...Data, FCLOPNT: e.target.value})}/>
            {/* {((fclOpen===null) || (fclOpent===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add FCL Opening here!</p>} */}

            <EditBasicDateTimePicker label1={"FCL Closing Date"} label2={"FCL Closing Time"} fetchDate={Data?.FCLCLOD} handleDate={(e) =>setData({ ...Data, FCLCLOD: e.target.value})} fetchTime={Data?.FCLCLOT} handleTime={(e) =>setData({ ...Data, FCLCLOT: e.target.value})}/>
            {/* {((fclClo===null) || (fclClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add FCL Closing here!</p>} */}

            <EditBasicDateTimePicker label1={"B/L Cutoff Date"} label2={"B/L Cutoff Time"} fetchDate={Data?.BLCLOD} handleDate={(e) =>setData({ ...Data, BLCLOD: e.target.value})} fetchTime={Data?.BLCLOT} handleTime={(e) =>setData({ ...Data, BLCLOT: e.target.value})}/>
            {/* {((blClo===null) || (blClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add B/L CutOff here!</p>} */}
 
            <EditBasicDateTimePicker label1={"VGM Cutoff Date"} label2={"VGM Cutoff Time"} fetchDate={Data?.VGMCLOD} handleDate={(e) =>setData({ ...Data, VGMCLOD: e.target.value})} fetchTime={Data?.VGMCLOT} handleTime={(e) =>setData({ ...Data, VGMCLOT: e.target.value})}/>
            {/* {((vgmClo===null) || (vgmClot===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add VGM CutOff here!</p>} */}

            <EditBasicDateTimePicker label1={"Reefer Opening Date"} label2={"Reefer Opening Time"} fetchDate={Data?.RFOPND} handleDate={(e) =>setData({ ...Data, RFOPND: e.target.value})} fetchTime={Data?.RFOPNT} handleTime={(e) =>setData({ ...Data, RFOPNT: e.target.value})}/>
            {/* {((rfOpen===null) || (rfOpent===null)) && <p className='w-full text-[11px] text-red-600 flex justify-center'>Add Reefer Opening here!</p>} */}

            <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>
         
              <div className='w-full flex-col justify-center items-center mt-4 space-y-4'>
              <EditTextInput  label='Terminal Name' placeholder='Edit terminal name' fetchValue={Data?.TERMIN} handleValue={(e) =>setData({ ...Data, TERMIN: e.target.value})} />
              <EditTextInput label='Vessel Operator' placeholder='Edit Vessel Operator' fetchValue={Data?.VESOP} handleValue={(e) =>setData({ ...Data, VESOP: e.target.value})} />
              <EditTextInput label='Container Operator' placeholder='Edit Container Operator' fetchValue={Data?.CONOP} handleValue={(e) =>setData({ ...Data, CONOP: e.target.value})}  />

              <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>
              <p className='w-full text-[11px] text-red-600 flex justify-start'>*Optional</p>

              <EditBasicDateTimePicker label1={"Cont: pick-up cutoff Date"} label2={"Container pick-up cutoff Time"} fetchDate={Data?.CPUCD} handleDate={(e) =>setData({ ...Data, CPUCD: e.target.value})} fetchTime={Data?.CPUCT} handleTime={(e) =>setData({ ...Data, CPUCT: e.target.value})}/>

            </div>


          </div>}

      </div>

      <div className='flex w-full justify-center gap-5 items-center mb-2'>
          <button onClick={close} 
          className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          <span>cancel</span>
          </button> 
          {data==='no values' && <button onClick={send} 
          className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          <span>ok</span>
          </button>}
          {data!=='no values' && <button onClick={updateVal} 
          className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          <span>Update</span>
          </button>}
      </div>

    </div>

</div>
  )
}

export default AddCutOff