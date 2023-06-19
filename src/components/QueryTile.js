import React from 'react'
import moment from 'moment';
import { useState } from 'react';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import { Badge, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddBL from '.././components/Addings/AddBL';
import RateBox from '.././components/Viewings/RateBox';
import boxes from '../assets/boxes.png'
import crane from '../assets/crane.png'
import chatLogo from '../assets/chatLogo.png'
import officer from '../assets/officer.png'
import factory from '../assets/factory.png'
import ValuesBox from '.././components/Viewings/ValuesBox';
import ves from '../assets/ship.png'
import clock from '../assets/clock.png'
import pend from '../assets/pend.gif'
import { useSelector } from 'react-redux';
import ChatBox from '.././components/TextUI/ChatBox';

const QueryTile = ({ OportName, DportName,containerMode, commodity,layout,yard,company,loggedNM, loggedID, crd, type,user,role,assigned, consoles, cargos, updatedDate, cutoff, status, rDate, savedDate, lastUpdate, id, rates, remarks, bookingData, selShipLine, shremarks, schedules,selVessel,releaseOrder,selVoyage}) => {
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  
    const OportKeys = OportName.split(",");
    const DportKeys = DportName.split(",");
    //console.log(OportKeys)
    //console.log(DportKeys)
    const navigate = useNavigate();

    const[more, setMore] = useState(false)
    const[selectedLine, setSelelctedLine] = useState('')
    const[selectedVessel, setSelelctedVessel] = useState('')
    const[sdetails, setsDetails] = useState('')

    const [re, setRe] = useState([])

    const [fre, setfRe] = useState([])
    const [fshre, setfshRe] = useState([])
    const[showQChat, setShowQChat] = useState(false)


    const[showBL, setShowBL] = useState(false)
    const [bla,setbla] = useState([])
    const [cutof,setcutof] = useState(null)
    const [rateReply, setrateReply] = useState('');

    const [lre, setlRe] = useState([])
    const [lshre, setlshRe] = useState([])
    const [lnum, setlNum] = useState(0)
    const [fnum, setfNum] = useState(0)

    const [LlastSeen, setLlastSeen] = useState('')
    const [FlastSeen, setFlastSeen] = useState('')

    var arrCutOff = ['b/l pending', 'b/l added']

    useEffect(() => {  
        const getRemarks = ()=>{
          axios
          .get(`${http}/api/fclquery/getRemarks/${id}`)
          .then((res) => {
            //console.log(res.data);
            setfRe(res.data.fclquery.remarks)
            setfshRe(res.data.fclquery.shremarks)          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getRemarks();

        const getLRemarks = ()=>{
            axios
            .get(`${http}/api/lclquery/getRemarks/${id}`)
            .then((res) => {
              //console.log(res.data);
              setlRe(res.data.lclquery.remarks)
              setlshRe(res.data.lclquery.shremarks)

            })
            .catch(err=> {
              console.log(err);
            })     
          }
        getLRemarks();

        const getBLData = ()=>{
            axios
            .get(`${http}/api/fclquery/blFCLData/${id}`)
            .then((res) => {
              //console.log(res.data);
              setbla(res.data.fclquery.blData)
             
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getBLData();

          const getCutoff = ()=>{
            axios
            .get(`${http}/api/fclquery/getCutOffData/${id}`)
            .then((res) => {
              //console.log(res.data);
              setcutof(res.data.fclquery.cutoff)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getCutoff();  
          
          const getRateReply = ()=>{
            axios
            .get(`${http}/api/lclquery/getRateReply/${id}`)
            .then((res) => {
              //console.log(res.data);
              setrateReply(res.data.lclquery.rateReply)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getRateReply(); 

          const getLShipperLastSeen = ()=>{
            axios
            .get(`${http}/api/lclquery/getShipperLastSeen/${id}`)
            .then((res) => {
              //console.log(res.data);
              setLlastSeen(res.data.lclquery.lastShipperSeenBtn)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getLShipperLastSeen();  
          
          const getFShipperLastSeen = ()=>{
            axios
            .get(`${http}/api/fclquery/getShipperLastSeen/${id}`)
            .then((res) => {
              //console.log(res.data);
              setFlastSeen(res.data.fclquery.lastShipperSeenBtn)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getFShipperLastSeen();  

          const getLNumAlerts = ()=>{
            setlNum(lre?.filter(e=> (((new Date(e.dDate)).getTime() - (new Date(LlastSeen)).getTime())/(1000))>0).length)
          }

          getLNumAlerts()

          const getFNumAlerts = ()=>{
            setfNum(fre?.filter(e=> (((new Date(e.dDate)).getTime() - (new Date(FlastSeen)).getTime())/(1000))>0).length)
          }

          getFNumAlerts()
        
    }, [http,id,consoles,lre,FlastSeen,LlastSeen,fre]);

    console.log(lnum)
  

    const [shipremarks, setShipremarks] = useState({
        status:'', remark:'', timeVal:'', userID: loggedID, adder: loggedNM,refID: '',}
    )

    const removeDuplicateLine = (arr) => {
        let unique = [];
        arr.forEach(element => {
            if (!unique.includes(element.shipLine)) {
                unique.push(element.shipLine);
            }
        });
        //console.log(unique)
        return unique;
    }

    const removeDuplicateVessel = (arr) => {
        let unique = [];
        arr.forEach(element => {
            if (!unique.includes(element.vessel)) {
                unique.push(element.vessel);
            }
        });
        //console.log(unique)
        return unique;
    }

    const addRemarksFCL = ()=>{
        shipremarks.status = selectedLine!=='Disagree'? "schedule pending": "asking for changes"
        shipremarks.timeVal = new Date()

        console.log(shipremarks)
        re.push(shipremarks)
        const addRemarksFCL= { 
            id: id,
            shremarks:re.map((item) => ({
                status: item.status,
                remark: item.remark,
                dDate: item.timeVal,
                userID: item.userID,
                adder: item.adder,
                refID:''
            })),
            } 
                   
            axios
            .put(`${http}/api/fclquery/addShipperIdea/${id}`,addRemarksFCL)
            .then((res) => {            
        
            setsDetails(res.data)
            navigate('/dashboard')
          });
          shipremarks.status=''
          shipremarks.remark=''
          shipremarks.timeVal=''

          re.length=0;
    }

    const addRemarksLCL = ()=>{
        shipremarks.status = selectedLine==='Agree'? "schedule pending": "asking for changes"
        shipremarks.timeVal = new Date()

        console.log(shipremarks)
        re.push(shipremarks)
        const addRemarksFCL= { 
            id: id,
            shremarks:re.map((item) => ({
                status: item.status,
                remark: item.remark,
                dDate: item.timeVal,
                userID: item.userID,
                adder: item.adder,
                refID:''

            })),
            } 
                   
            axios
            .put(`${http}/api/fclquery/addShipIdea/${id}`,addRemarksFCL)
            .then((res) => {
              //console.log(res.data);
        
            setsDetails(res.data)
          });
          shipremarks.status=''
          shipremarks.remark=''
          shipremarks.timeVal=''

          re.length=0;
    }

    const sendFStatus = async(state) =>{
        const alterStatus = { 
        status: state,
        }        
        axios
        .put(`${http}/api/fclquery/alterStatus/${id}`,alterStatus)
        .then((res) => {
          console.log(res.data);
        });
        //setOpen(false);
    }

    const sendLStatus = async(state) =>{
        const alterStatus = { 
        status: state,
        }        
        axios
        .put(`${http}/api/lclquery/alterStatus/${id}`,alterStatus)
        .then((res) => {
          console.log(res.data);
        });
        //setOpen(false);
    }

    const addShipIdea = ()=>{
        // if(selectedLine!=='Disagree'){
        const alterIsFinal = {
            isFinal : true,
        }
        axios
        .put(`${http}/api/fclquery/alterIsFinalRat/${id}`,alterIsFinal)
        .then((res) => {
          console.log(res.data);
        });
        sendFStatus('schedule pending');
        addRemarksFCL();
    }

    const addShipLIdea = ()=>{
        // if(selectedLine==='Agree'){
            const alterIsFinal = {
                isFinal : true,
            }
            axios
            .put(`${http}/api/lclquery/alterIsFinalRat/${id}`,alterIsFinal)
            .then((res) => {
              console.log(res.data);
            });
            sendLStatus('schedule pending');
            addRemarksLCL();
    
            window.location.reload(false)
    }

    const AddShipVessel = ()=>{

        const alterIsFinal = {
            isFinal : true,
            selVessel: selectedVessel
        }
        axios
        .put(`${http}/api/fclquery/addVessel/${id}`,alterIsFinal)
        .then((res) => {
          console.log(res.data);
        });
        sendFStatus('booking');
        // addRemarksFCL();

        window.location.reload(false)

        }

    const AddShipLVessel = ()=>{
        const alterIsFinal = {
            isFinal : true,
            selVessel: selectedVessel
        }
        axios
        .put(`${http}/api/lclquery/addVessel/${id}`,alterIsFinal)
        .then((res) => {
          console.log(res.data);
        });
        sendLStatus('booking');
        //addRemarksLCL();

        window.location.reload(false)
    }

    var arrVessel = ["rates pending", "rates confirmation", "schedule pending", "vessel pending"]


    //console.log(cutoff.BLClosing)

    const countDays = ()=>{
    var x = new Date(cutof?.BLCLO);
    var y = new Date();
    var  xceed = 0

    xceed = (x.getTime() - y.getTime())/(1000*60*60);
    //console.log(xceed)
    var bol = '';

    if(xceed>0){
        bol = 'left!'
    }else if(xceed<0){
        bol = 'exceeded!'
    }
    let h = Math.abs(x.getTime() - y.getTime())/(1000*60*60);
    var hours = Math.floor(h%24);

    if(h>24){
        if(h%24===0){
            var days1 = Math.floor(h/24);
            return (days1 + 'days' + ' ' + bol)
        }else {
            var days2 = Math.floor(h/24);
            return (days2 + ' ' + 'days &' + ' ' +  hours + ' ' + 'hours' + ' ' + bol)
        }
    }else if(h<24 && hours!==0){
        return (hours + ' ' + 'hours' + ' ' + bol)
    }else if(h<24 && hours===0){
        return ('Time over !!!')

    }
}

const lastUpdateBtn = () => {
    setShowQChat(true)
    const saveLastSeen= { 
        lastShipperSeenBtn: new Date(),
        }        
        axios
        .put(`${http}/api/lclquery/saveShipperLastSeen/${id}`,saveLastSeen)
        .then((res) => {
          console.log(res.data);    
      });
}

const lastFUpdateBtn = () => {
    setShowQChat(true)
    const saveFLastSeen= { 
        lastShipperSeenBtn: new Date(),
        }        
        axios
        .put(`${http}/api/fclquery/saveShipperLastSeen/${id}`,saveFLastSeen)
        .then((res) => {
          console.log(res.data);    
      });
}

const buttonName = ()=>{
    var x = new Date(cutof?.BLClosing);
    var y = new Date();
    var exceed = (x.getTime() - y.getTime())/(1000*60*60);
    if(exceed<0){
        return 'Request for Amendment'
    }else if(exceed>0 && bla.length>0){
        return 'Edit'
    }else{
        return 'Add'
    }
}

const sendLSStatus = async() =>{
    const alterStatus = { 
    status:'schedule pending',
    rateReply: 'Agree'
    }        
    axios
    .put(`${http}/api/lclquery/alterStatusRateReply/${id}`,alterStatus)
    .then((res) => {
      console.log(res.data);
    });
    navigate('/dashboard')
}

const sendFSSStatus = async() =>{
    const alterStatus = { 
    status:'booking',
    }        
    axios
    .put(`${http}/api/fclquery/alterStatus/${id}`,alterStatus)
    .then((res) => {
      console.log(res.data);
    });
    //setOpen(false);
    navigate('/dashboard')
}

const sendLSSStatus = async() =>{
    const alterStatus = { 
    status:'b/l pending',
    }        
    axios
    .put(`${http}/api/lclquery/alterStatus/${id}`,alterStatus)
    .then((res) => {
      console.log(res.data);
    });
    //setOpen(false);
    navigate('/dashboard')
}

const sendFSStatus = async() =>{
    const alterRStatus = { 
    status:'schedule pending',
    selShipLine: 'Agree'
    }        
    axios
    .put(`${http}/api/fclquery/alterStatusRateReply/${id}`,alterRStatus)
    .then((res) => {
      console.log(res.data);
    });
    //setOpen(false);
    navigate('/dashboard')
}     

  return (
        <div className={`w-full flex flex-col bg-slate-50 shadow-md  hover:shodow-lg rounded-md mb-3 border-2`}>

        {layout!=='list'? 
        <div className='w-full flex justify-start items-center'>
            <div className={`w-[62%] flex flex-col p-4`}>
                    <div className='w-full flex justify-start items-center gap-2'>
                            <div className='flex justify-center items-center gap-2'>
                                <span>{OportKeys[0]},</span>
                                <span>{OportKeys[1]}</span>
                                <img src={`https://flagcdn.com/20x15/${OportKeys[2].toLowerCase()}.png`} alt="flag" />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                            <div className='flex justify-center items-center gap-2'>
                                <span>{DportKeys[0]},</span>
                                <span>{DportKeys[1]}</span>
                                <img src={`https://flagcdn.com/20x15/${DportKeys[2].toLowerCase()}.png`} alt="flag" />
                            </div>                          

                    </div>

                    <div className='mt-2 flex justify-start items-center gap-4'>
                        <span className={`${containerMode==='LCL'? 'bg-red-500 text-white':'bg-blue-500 text-white'} px-2 py-1 font-bold tracking-wider rounded-lg text-sm`}>{containerMode}</span>
                        {((type!=="") && (containerMode==='LCL')) && <p className='bg-red-500 text-white px-2 py-1 font-bold tracking-wider rounded-lg text-sm'>{type}</p>}
                        {containerMode==='FCL' && cargos?.map(cargo=>(
                            <div className='bg-slate-200 px-2 py-1 rounded-lg text-sm tracking-wide gap-2' key={cargo.id}>{cargo.quantity} X {cargo.containerType}</div>
                        ))}
                        {containerMode==='LCL' && cargos?.map(cargo=>(
                            <div className='flex gap-4' key={cargo.id}>
                            <p className='bg-slate-200 tracking-wide flex justify-start px-2 py-1 rounded-lg text-sm gap-2'>{cargo.totalPackages}</p>
                            <p className='bg-slate-200 tracking-wide flex justify-start px-2 py-1 rounded-lg text-sm gap-2'>{cargo.totalVolume} Cbm</p>

                            </div>
                        ))}
                        <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                        <RateBox item='cargo' commodity={commodity} />
                        {consoles==='yes' && <>
                        <img src={factory} alt='' className='w-8 h-8 ml-2' />
                        <RateBox item='fac' company={company}/>
                        </>}
                        <img src={officer} alt='' className='w-7 h-7 ml-2' />
                        <RateBox item='userok' sales={assigned} crd={crd} />
                        <Badge color="error" badgeContent={containerMode==='FCL'? fnum: lnum} overlap="circular">
                            {/* <p className='font-semibold p-1.5'>Let's Talk</p> */}
                            <img src={chatLogo} alt='chat' className='w-9 h-9 cursor-pointer hover:scale-125 animate-pulse' onClick={containerMode==='LCL'? lastUpdateBtn: lastFUpdateBtn }/>
                        </Badge>
                                            
                    </div>                    
            </div>

            <div className="w-[30%] flex flex-col p-4 my-2 gap-0.5">
                <div className='flex justify-end items-center gap-2'>
                    <p className='text-xm text-gray-400'>ready by:</p>
                    <p>{rDate.split(",")[1]}</p>
                </div>

                <div className='flex justify-end items-center gap-2'>
                    <p className='text-xm text-gray-400'>Created by:</p>
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    <p>{moment(savedDate).fromNow()}</p>

                </div>
                

            </div>

            <div className={`w-[8%] justify-center  flex  items-center`}>
                
                    <div className='w-full flex justify-center items-center p-2 text-white rounded-md mr-4'>
                    {status!=='rates pending'? 
                       <>
                       <button onClick={()=>setMore(!more)} className={`flex w-3/4 ${more? "border-2 text-black bg-white border-black":"bg-orange-500 text-white"} rounded-full items-center justify-center px-2.5 py-2 text-base tracking-wide capitalize transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                       {more && <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 rtl:-scale-x-100' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
                               </svg>}
                       {!more &&<svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 rtl:-scale-x-100' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                               </svg>}
                       </button>
                       </>: <img src={pend} alt='pending' className='w-12 h-12' />}
                       
                    </div>
            </div>
        
        </div>:
        
        <div className='w-full flex justify-start items-center'>
            <div className={`w-[55%] flex flex-col p-4`}>
                    <div className='w-full flex justify-start items-center gap-2'>
                            <div className='flex justify-center items-center gap-2'>
                                <span>{OportKeys[0]},</span>
                                <span>{OportKeys[1]}</span>
                                <img src={`https://flagcdn.com/20x15/${OportKeys[2].toLowerCase()}.png`} alt="flag" />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                            <div className='flex justify-center items-center gap-2'>
                                <span>{DportKeys[0]},</span>
                                <span>{DportKeys[1]}</span>
                                <img src={`https://flagcdn.com/20x15/${DportKeys[2].toLowerCase()}.png`} alt="flag" />
                            </div>
                            {arrCutOff.includes(status) && <img src={clock} alt="vessel" className='w-7 h-7 ml-8' />}
                            {arrCutOff.includes(status) && <ValuesBox item='cutoff' c1={cutof?.BLCLO} c2={cutof?.FCLCLO} c3={cutof?.VGMCLO} c4={cutof?.ETDCOL}/>}

                    </div>

                    <div className='mt-2 flex justify-start items-center gap-4'>
                    <span className={`${containerMode==='LCL'? 'bg-red-500 text-white':'bg-blue-500 text-white'} px-2 py-1 font-bold tracking-wider rounded-lg text-sm`}>{containerMode}</span>
                    {containerMode==='FCL' && cargos?.map(cargo=>(
                        <div className='bg-slate-200 px-2 py-1 rounded-lg text-sm tracking-wide gap-2' key={cargo.id}>{cargo.quantity} X {cargo.containerType}</div>
                    ))}
                    {containerMode==='LCL' && cargos?.map(cargo=>(
                        <div className='flex gap-4' key={cargo.id}>
                        <p className='bg-slate-200 tracking-wide flex justify-start px-2 py-1 rounded-lg text-sm gap-2'>{cargo.totalPackages}</p>
                        <p className='bg-slate-200 tracking-wide flex justify-start px-2 py-1 rounded-lg text-sm gap-2'>{cargo.totalVolume} Cbm</p>

                        </div>
                    ))}
                    <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                    <RateBox item='cargo' commodity={commodity} />
                    {!arrVessel.includes(status) && <img src={ves} alt="vessel" className='w-6 h-6 ml-2' />}
                    {!arrVessel.includes(status) && <RateBox item='ship' vessel={selVessel} voyage={selVoyage} />}

                    </div>
            </div>

            <div className="w-[45%] flex  justify-center p-4 my-1 gap-1">
                <div className='w-full flex'>
                    <div className='w-[30%] flex-col gap-3'>
                        <div className='w-full flex justify-center items-center text-center'>
                        <p className='w-full px-2 mt-1 py-1 border-2  border-red-600 text-red-600 rounded-md'>{status.charAt(0).toUpperCase()+status.substring(1)}</p>                </div>
                        </div>
               
                <div className='w-[70%] flex-col '>
                    <div className='w-full flex flex-col justify-center items-end'>
                    <div className='flex justify-center items-end gap-2'>
                    <p className='text-xm text-gray-400'>ready by:</p>
                    <p>{rDate.split(",")[1]}</p>
                    </div>

                    <div className='flex justify-center items-end gap-2 mt-1'>
                        <p className='text-xm text-gray-400'>Created by:</p>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        <p>{moment(savedDate).fromNow()}</p>

                    </div>

                    <div className='flex justify-center items-end gap-2 mt-1'>
                        <p className='text-xm text-gray-400'>Last updatedAt:</p>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        <p>{moment(updatedDate).fromNow()}</p>

                    </div>
                    </div>
                </div>
                </div>
            </div>

        </div>       
        }
        
          {more && 
                <>
                {status!=='rates pending' &&
                <>
                    <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                    <div className='w-full flex justify-start items-end my-2 text-gray-400 ml-3'>
                       
                         <div className='w-[60%] flex justify-center items-start flex-col px-4'>
                            <p className=' font-semibold my-2 text-[13px]'>Rates:</p>
                            {containerMode==='FCL'? 
                                <>
                                {rates?.filter(r=>r.isFinal===false).map((re,index)=>(
                                <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2' key={index}>

                                    <div className='flex w-[120px] justify-start items-center gap-1'>
                                        <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                        <p className='text-black'>{re.shipLine}</p>
                                    </div>

                                    <div className='flex justify-start items-center gap-1.5'>
                                        <p className='text-black'>{re.container}</p>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <p className='text-black'>$ {re.rate}</p>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <p>valid till :</p>
                                        <p className='text-black'>{re.validDate}</p>
                                    </div>
                                   
                                </div>)) }  
                                  
                                {rates?.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized rate/s:</p>}
                                
                                {rates.filter(r=>r.isFinal===true).length>0 && rates.filter(r=>r.isFinal===true).map((re,index)=>(
                                
                                <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2 mt-0.5 border-green-600 rounded-md border-2 p-1' key={index}>
                                    <div className='flex w-[120px] justify-start items-center gap-1'>
                                        <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                        <p className='text-black'>{re.shipLine}</p>

                                    </div>
                                    <div className='flex justify-start items-center gap-1.5'>
                                        {/* <img src={cargo} alt='' className='w-7 h-7' /> */}
                                        <p className='text-black'>{re.container}</p>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <p className='text-black'>$ {re.rate}</p>
                                    </div>
                                    <div className='flex justify-start items-center'>
                                        <p>valid till :</p>
                                        <p className='text-black'>{re.validDate}</p>
                                    </div>  
                                   
                                </div>))}
                                </>
                                  
                                :

                                <div className='w-full flex flex-col'>
                                <div className='w-full flex justify-between'>

                                    <div className='w-full flex justify-start items-center gap-x-10 gap-y-2'>

                                    {rates.filter(r=>r.isFinal===false).length>0 && rates.filter(r=>r.isFinal===false).map((re,index)=>(

                                    <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2' key={index}>
                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                                            <p className='text-black'>1 Cbm</p>
                                        </div>

                                        <div className='flex justify-start items-center'>
                                            <p className='text-black'>$ {re.rate}</p>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <p>valid till :</p>
                                            <p className='text-black'>{re.validDate}</p>
                                        </div>                                         
                       
                                    </div>
                                    ))
                                    }

                                    </div>                                

                                </div>
                                    
                                    {rates.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized rate/s:</p>}

                                    {rates.filter(r=>r.isFinal===true).length>0 && rates.filter(r=>r.isFinal===true).map((re,index)=>(
                                    
                                    <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2 mt-0.5 border-green-600 rounded-md border-2 p-1' key={index}>
                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                                            <p className='text-black'>1 Cbm</p>
                                        </div>

                                        <div className='flex justify-start items-center'>
                                            <p className='text-black'>$ {re.rate}</p>
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <p>valid till :</p>
                                            <p className='text-black'>{re.validDate}</p>
                                        </div>

                                    </div>
                                    ))
                                    }
                                </div>                          
                            }  
                        </div>

                        {((status==='rates confirmation') && (rates.filter(r=>r.isFinal===true).length===0)) && 
                        <div className='w-[40%] flex justify-center items-center'>
                     
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex gap-2 justify-center items-center'>
                                <p className='min-w-[100px] font-semibold my-1 text-[13px] text-gray-400 px-1'>Shipper Idea:</p>

                                <FormControl sx={{ m: 1, minWidth: 200,borderRadius:2 }} size="small">
                                    <InputLabel id="demo-select-small">Status</InputLabel>
                                    <Select
                                        value={selectedLine}
                                        label="Status"
                                        onChange={(e)=>setSelelctedLine(e.target.value)}
                                    >
                                    {/* {removeDuplicates(rates).length===1 && <MenuItem value={"Agree"}>Agree</MenuItem>} */}
                                    {((containerMode==='FCL') && (cargos.length>=1) && (removeDuplicateLine(rates).length===1)) && removeDuplicateLine(rates).map((r,index)=>
                                        <MenuItem value={r} key={index}>{r}</MenuItem>
                                    )}

                                    {((containerMode==='FCL') && (cargos.length>1) && (removeDuplicateLine(rates).length>1)) && <MenuItem value={"Agree"}>Agree</MenuItem>}
                                    {containerMode==='LCL' && <MenuItem value={"Agree"}>Agree</MenuItem>}
                                    {/* <MenuItem value={"Disagree"}>Disagree</MenuItem> */}

                                    </Select>
                                </FormControl>
                            </div>

                            {containerMode==='FCL'?<button onClick={addShipIdea} disabled={selectedLine===''}  className= "bg-red-500 flex text-center justify-center px-2 py-2 w-full mx-6 text-white rounded-lg active" >Add <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg></button>
                            :<button onClick={addShipLIdea} disabled={selectedLine===''}  className= "bg-red-500 flex text-center justify-center px-2 py-2 w-full mx-6 text-white rounded-lg active" >Add <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg></button>}

                        </div>                                          

                        </div>}

                        {((status==='rates confirmation') && (rates.filter(r=>r.isFinal===true).length>0)) && 
                        <div className='w-[40%] flex justify-center items-end'>
                     
                        <div className='w-full flex items-center justify-end'>
                           
                            {containerMode==='FCL'?<button onClick={sendFSStatus}  className= "bg-red-500 flex text-center justify-center px-4 py-2 w-[150px] mx-6 text-white rounded-lg active" >Continue <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg></button>
                            :<button onClick={sendLSStatus}  className= "bg-red-500 px-4 py-2 flex text-center justify-center w-[150px] mx-6 text-white rounded-lg active" >Continue <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg></button>}

                        </div>                                         

                        </div>}
                       
                    </div>  
                
                    {((status==='rates confirmation') && ((selShipLine!=="Disagree"))) && 
                    <div className='w-full flex'>
                      
                    </div>}

                    {((status==='vessel pending') || (status==='booking')|| (status==='pending cut-off')|| (status==='b/l pending') || (status==='b/l added')) && 
                    <>
                        <div className='h-0.5 bg-gray-300 w-full my-1 px-4'></div>
                        <div className='w-full flex  flex-col px-4 justify-start items-start my-3 text-gray-400 ml-3'>
                            <p className=' font-semibold text-xs mb-2'>Schedules :</p>
                                <div className='w-full flex justify-start items-center gap-x-5 gap-y-2' >
                                    <div className='w-[40%] flex flex-col justify-center items-start'>
                                    {containerMode==='FCL'? 
                                    <>
                                    {schedules?.filter(r=>r.isFinal===false).map((re,index)=>(
                                        <div className='w-full flex justify-between gap-1' key={index}>
                                            <div className='flex justify-start items-center gap-2'>
                                                <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                                <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                            </div>
                                    
                                            <div className='flex mt-1'>                                   
                                                <ValuesBox item='schedulesF' f1={re.ETD} f2={re.transit} f3={re.ETA} f4={re.shipMode} f5={re.transhipments} />
                                            </div>
                                           
                                        </div>
                                    )) }  
                                    
                                    {schedules?.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1 text-start'>Finalized schedule/s:</p>}
                                    
                                    {schedules.filter(r=>r.isFinal===true).length>0 && schedules.filter(r=>r.isFinal===true).map((re,index)=>(
                                    
                                        <div className='w-full flex justify-between gap-1 border-green-600 rounded-md border-2 p-1' key={index}>
                                            <div className='flex justify-start items-center gap-2'>
                                                <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                                <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                            </div>
                                    
                                            <div className='flex mt-1'>                                   
                                                <ValuesBox item='schedulesF' f1={re.ETD} f2={re.transit} f3={re.ETA} f4={re.shipMode} f5={re.transhipments} />
                                            </div>
                                           
                                        </div>
                                    ))
                                    }
                                    </>
                                    
                                    :

                                    <div className='w-full flex flex-col'>
                                    <div className='w-full flex justify-between'>

                                        <div className='w-full flex justify-start items-center gap-x-10 gap-y-2'>

                                        {schedules.filter(r=>r.isFinal===false).length>0 && schedules.filter(r=>r.isFinal===false).map((re,index)=>(

                                        <>
                                        <div className='flex justify-start items-center gap-2'>
                                            <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                            <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                        </div>

                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={crane} alt='calender' className='w-[26px] h-[26px]' />
                                            <p className='text-black text-[13px] font-semibold'>Yard: <span className='ml-3 font-normal'>{yard}</span></p>
                                        </div>

                                        <div className='flex'>                                   
                                        <ValuesBox item='schedules' t1={re.ETAC} t2={re.ETDC} t3={re.ETAD} t4={re.LCLClosingDate} t5={re.LCLClosingTime} />
                                        </div>                                      
                                    </>
                                        ))
                                        }
                                        </div>                               
                                    </div>
                                        
                                        {schedules.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized schedule/s:</p>}

                                        {schedules.filter(r=>r.isFinal===true).length>0 && schedules.filter(r=>r.isFinal===true).map((re,index)=>(
                                        
                                        <>
                                        <div className='flex justify-start items-center gap-2 border-green-600 rounded-md border-2 p-1'>
                                            <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                            <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                        </div>

                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={crane} alt='calender' className='w-[26px] h-[26px]' />
                                            <p className='text-black text-[13px] font-semibold'>Yard: <span className='ml-3 font-normal'>{yard}</span></p>
                                        </div>

                                        <div className='flex'>                                   
                                        <ValuesBox item='schedules' t1={re.ETAC} t2={re.ETDC} t3={re.ETAD} t4={re.LCLClosingDate} t5={re.LCLClosingTime} />
                                        </div>                                    
                                        </>
                                        ))
                                        }
                                    </div>
                                    } 
                                            
                                    </div>
                                    {/* {status!=='vessel pending' && <div className='w-[60%] flex justify-center items-center gap-3'>
                                        <p className='flex font-semibold my-1 text-[13px] text-gray-400 px-4'>Shipper vessel:</p>
                                        <p className='flex ml-2 text-black'>{selVessel}</p>
                        
                                    </div>} */}

                                    {((status==='vessel pending') && (schedules?.filter(r=>r.isFinal===true).length===0)) &&
                                    <div className='w-[60%] flex justify-end items-center gap-3'>
                                        <p className='max-w-[150px] font-semibold my-1 text-[13px] text-gray-400 px-4'>Shipper vessel:</p>
                        
                                        <FormControl sx={{ m: 1, minWidth: 200,borderRadius:2 }} size="small">
                                            <InputLabel id="demo-select-small">Status</InputLabel>
                                            <Select
                                                value={selectedVessel}
                                                label="Status"
                                                onChange={(e)=>setSelelctedVessel(e.target.value)}
                                            >
                                                {removeDuplicateVessel(schedules).map((r,index)=>
                                                <MenuItem value={r} key={index}>{r}</MenuItem>
                                                )}

                                            </Select>
                                        </FormControl>

                                        <div className='flex justify-center items-center'>
                                            {containerMode==='FCL' && 
                                            <button onClick={AddShipVessel} disabled={selectedVessel===''} className= "bg-red-500  flex text-center justify-center px-4 py-1.5 w-[140px] mx-6 text-white rounded-lg active" >Continue  <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                            }
                                            {containerMode==='LCL' && 
                                            <button onClick={AddShipLVessel}  className= "bg-red-500 flex text-center justify-center px-4 py-1.5 w-[140px] mx-6 text-white rounded-lg active" >Continue  <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                            }
                                        </div>

                                    </div>}

                                    {((status==='vessel pending') && (schedules?.filter(r=>r.isFinal===true).length>0)) &&
                                    <div className='w-[60%] flex justify-end items-center gap-3'>
                        
                                        <div className='flex justify-center items-center'>
                                            {containerMode==='FCL' && 
                                            <button onClick={sendFSSStatus} className= "bg-red-500  flex text-center justify-center px-4 py-1.5 w-[140px] mx-6 text-white rounded-lg active" >Continue  <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                            }
                                            {containerMode==='LCL' && 
                                            <button onClick={sendLSSStatus}  className= "bg-red-500 flex text-center justify-center px-4 py-1.5 w-[140px] mx-6 text-white rounded-lg active" >Continue  <svg fill="none" stroke="currentColor" className='w-7 h-7 ml-2' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                            }
                                        </div>

                                    </div>}

                                </div>
                        </div>
                    </>
                    }

                    {(status==='pending cut-off') && 
                        (containerMode==='FCL') &&
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <div className='w-1/4  flex justify-start items-center'>
                                    <p className='font-semibold text-xs mb-2 px-4'> Release Order:</p>

                                    <a href={releaseOrder} download>
                                    <button className= {` text-[13px] bg-red-500 px-2 py-2 w-[150px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-5 h-5 text-white cursor-pointer rounded-full' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"></path>
                                    </svg>Download file</button>
                                    </a>
                                </div>                                
                            </div>
                        </>}

                    {(((status==='b/l pending') || (status==='b/l added')) && 
                        (containerMode==='FCL')) &&
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <div className='w-1/4  flex justify-start items-center'>
                                    <p className='font-semibold text-xs mb-2 px-4'> Release Order:</p>

                                    <a href={releaseOrder} download>
                                    <button className= {` text-[13px] bg-red-500 px-2 py-2 w-[150px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-5 h-5 text-white cursor-pointer rounded-full' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"></path>
                                    </svg>Download file</button>
                                    </a>
                                </div>  

                                <div className='w-1/4 flex justify-center items-center my-3 text-gray-400 ml-3'>
                                    <p className='font-semibold text-xs mb-2 px-4'>Cut-Offs :</p>
                                    <img src={clock} alt='' className='w-8 h-8 ml-2' />
                                    {arrCutOff.includes(status) && <ValuesBox item='cutoff' c1={cutof?.BLCLO} c2={cutof?.FCLCLO} c3={cutof?.VGMCLO} c4={cutof?.ETDCOL}/>}
                                                
                                </div>
                                
                                <div className='w-2/4 flex  justify-center items-center my-3 text-gray-400 ml-3'>
                                    <div className='flex justify-center items-center'>
                                        <p className='font-semibold text-xs mb-2 px-4'>Add B/L Details:</p>

                                        <button onClick={()=>setShowBL(!showBL)}  className= "bg-red-500 text-[13px] px-2 py-2 min-w-[100px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active" >
                                            <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                                            </svg>
                                            {arrCutOff.includes(status) && buttonName()}                                   
                                            </button>
                                    </div> 
                                    <p className='text-red-500 animate-pulse bg-white border-[3px] border-red-500 p-2 rounded-md font-bold'>{countDays()}</p>

                                <div>
                            </div>                                                     
                            </div> 
                            </div>
                        </>
                    }

                    {(((status==='b/l pending') || (status==='b/l added')) && 
                    (containerMode==='LCL')) &&
                        <>
                        <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                        <div className='w-full flex  justify-start items-center my-3 text-gray-400 ml-3'>
                                <p className='font-semibold text-xs mb-2 px-4'>Add B/L Details:</p>

                                <button onClick={()=>setShowBL(!showBL)}  className= "bg-red-500 text-[13px] px-2 py-2 min-w-[100px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active" >
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                                    </svg>
                                    {arrCutOff.includes(status) && buttonName()}                                   
                                    </button>                          
                        </div>
                        </>
                    }
                       
                </>

              
                }

                </>
                }

                <AddBL show={showBL} title='Add B/L Instructions' id={id} close={()=>setShowBL(false)} blData={bla}/>
                <ChatBox  person={assigned} containerType={containerMode} status={status}  role={role} show={showQChat} close={()=>setShowQChat(false)} loggedName={loggedNM} userID={loggedID} title='Chat Box' id={id}/>


        </div>  
        
      )
}

export default QueryTile