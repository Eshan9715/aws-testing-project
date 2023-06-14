import React from 'react'
import moment from 'moment';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AddRates from './Addings/AddRates';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import AddSchedule from './Addings/AddSchedule';
import  storage  from "../components/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import ValuesBox from './Viewings/ValuesBox';
import ves from '../assets/ship.png'
import boxes from '../assets/boxes.png'
import crane from '../assets/crane.png'

import officer from '../assets/officer.png'
import factory from '../assets/factory.png'
import RateBox from './Viewings/RateBox';
import chatLogo from '../assets/chatLogo.png'
import { useSelector } from 'react-redux';
import ViewBL from './Viewings/ViewBL';
import clock from '../assets/clock.png'
import AddCutOff from './Addings/AddCutOff';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import ChatBox from './TextUI/ChatBox';
import { BasicDatePicker } from './TextUI/BasicDatePicker';

var keyDoc = '';
var storageRef = ''

const RueryTile = ({ OportName, DportName,containerMode,loggedID, updatedDate,loggedNM,type,commodity,shremarks, remarks, cargos, releaseOrder, selVoyage, freight, selShipLine,rates,schedules, crd,assignedCRD, status, rDate, savedDate, user,role, company,id, layout ,selVessel,assigned,yard,cutoff}) => {
    const navigate = useNavigate();
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  
    const[show, setShow] = useState(false)
    const[newShow, setNewShow] = useState(false)

    const[showChat, setShowChat] = useState(false)

    const[more, setMore] = useState(false)
    const[showSch, setShowSch] = useState(false)
    const[newshowSch, setNewShowSch] = useState(false)

    const[addCutOff, setaddCutOff] = useState(false)
    const[editCutOff, seteditCutOff] = useState(false)

    const [getbl,setgetbl] = useState([])
    const [cutof,setcutof] = useState({})
    const [nRate, setNRate] = useState(0)
    const [nDate, setNDate] = useState('')

    const [thumbColSch, setthumbColSch] = useState(false)

    const[loading, setLoading] = useState(false)
    const[lsoading, setLSoading] = useState(false)

    console.log(cutoff)

    const OportKeys = OportName.split(",");
    const DportKeys = DportName.split(",");
    // console.log(OportKeys)
    // console.log(DportKeys)

    const [open, setOpen] = useState(false);
    const [openl, setOpenl] = useState(false);

    const [openSch, setOpenSch] = useState(false);

    const [newVal, setNewVal] = useState({
        rate:0 , validDate:'', isFinal: false
    })
    const [checked, setChecked] = useState(false);
    const [showDial, setShowDial] = useState(false);

    const handleChecked = (event) => {
      setChecked(event.target.checked);
      console.log(!checked)
    };

    const [file, setFile] = useState('');
    const [keyID, setkeyID] = useState('');
    const [keyID2, setkeyID2] = useState('');

    const [cFinal, setCFinal] = useState('');

    const [cFinal2, setCFinal2] = useState('');

    const [doneUpload, setDoneUpload] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [showBL, setShowBL] = useState(false)

    const [lshre, setlshRe] = useState([])

    const [fre, setfRe] = useState([])
    const [fshre, setfshRe] = useState([])

    const [frates, setfrates] = useState([])
    const [fschedules, setfschedules] = useState([])

    const [lnum, setlNum] = useState(0)
    const [fnum, setfNum] = useState(0)

    const [LlastSeen, setLlastSeen] = useState('')
    const [FlastSeen, setFlastSeen] = useState('')

    const [progresspercent, setProgresspercent] = useState(0);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
      }
  
      const handleUpload = async() => {
        if (!file) {
          alert("Please upload an file first!");
        }
        else{
        setUploading(true);
  
        storageRef = ref(storage, `/Release_Orders/${file.name}`);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
          console.log(progresspercent)
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            keyDoc = downloadURL;
            if(keyDoc!==""){
              setDoneUpload(true)
              setUploading(false)
              sendRelease();
              navigate('/dashboard')

            }
          });
        }
      );
      
     }
  
    };

    const sendRelease = async() =>{
        const AddRelease = {      
        id: id,
        releaseOrder: keyDoc,        
        status:'pending cut-off'
        }        
        axios
        .put(`${http}/api/fclquery/addRelease/${id}`,AddRelease)
        .then((res) => {
          console.log(res.data);
          });
    }

    useEffect(() => {
        //   const getRateReply = ()=>{
        //     axios
        //     .get(`${http}/api/lclquery/getRateReply/${id}`)
        //     .then((res) => {
        //       //console.log(res.data);
        //       setrateReply(res.data.lclquery.rateReply)
        //     })
        //     .catch(err=> {
        //       console.log(err);
        //     })     
        //   }
        //   getRateReply();    
        
          const getFRates = ()=>{
            setLoading(true)
            axios
            .get(`${http}/api/fclquery/rates/${id}`)
            .then((res) => {
              //console.log(res.data);
              setfrates(res.data.fclquery.rates)
              setLoading(false)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getFRates();

    }, [http,id]);

    useEffect(() => {
       
        const getFSchedules = ()=>{
          setLSoading(true)
          axios
          .get(`${http}/api/fclquery/schedules/${id}`)
          .then((res) => {
            //console.log(res.data);
            setfschedules(res.data.fclquery?.schedules)
            setLSoading(false)
          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getFSchedules();

  }, [http,id]);

    useEffect(() => {
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
          
          const getBL = ()=>{
            axios
            .get(`${http}/api/fclquery/blFCLData/${id}`)
            .then((res) => {
              //console.log(res.data);
              setgetbl(res.data.fclquery.blData)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getBL(); 

    }, [http,id]);

    useEffect(() => {
        // const getLMemberLastSeen = ()=>{
        //     axios
        //     .get(`${http}/api/lclquery/getMemberLastSeen/${id}`)
        //     .then((res) => {
        //       //console.log(res.data);
        //       setLlastSeen(res.data.lclquery.lastMemberSeenBtn)
        //     })
        //     .catch(err=> {
        //       console.log(err);
        //     })     
        //   }
        //   getLMemberLastSeen();    

          const getFMemberLastSeen = ()=>{
            axios
            .get(`${http}/api/fclquery/getMemberLastSeen/${id}`)
            .then((res) => {
              //console.log(res.data);
              setFlastSeen(res.data.fclquery.lastMemberSeenBtn)

            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getFMemberLastSeen();    

        //   const getLNumAlerts = ()=>{
        //     setlNum(lshre.filter(e=> (((new Date(e.dDate)).getTime() - (new Date(LlastSeen)).getTime())/(1000))>0).length)
        //   }

        //   getLNumAlerts()

          const getFNumAlerts = ()=>{
            setfNum(fshre.filter(e=> (((new Date(e.dDate)).getTime() - (new Date(FlastSeen)).getTime())/(1000))>0).length)
          }

          getFNumAlerts()

    }, [lshre,LlastSeen,FlastSeen,http,id,fshre]);

    useEffect(() => {
        // const getLRemarks = ()=>{
        //     axios
        //     .get(`${http}/api/lclquery/getRemarks/${id}`)
        //     .then((res) => {
        //       //console.log(res.data);
        //       setlRe(res.data.lclquery.remarks)
        //       setlshRe(res.data.lclquery.shremarks)

        //     })
        //     .catch(err=> {
        //       console.log(err);
        //     })     
        //   }
        //   getLRemarks();

          const getFRemarks = ()=>{
            axios
            .get(`${http}/api/fclquery/getRemarks/${id}`)
            .then((res) => {
              //console.log(res.data);
              setfRe(res.data.fclquery.remarks)
              setfshRe(res.data.fclquery.shremarks)

            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getFRemarks();

    }, [http,id]);

    var CUTOFF = {
        ETDCOL:'',
        FCLCLO:'',
        BLCLO:'',
        VGMCLO:'',
    }

    var arrCutOff = ['b/l pending', 'b/l added']
    var arrVessel = ["rates pending", "rates confirmation", "schedule pending", "vessel pending"]

    //var lastFinal = cFinal;

    const handleClose = () => {
        setOpen(false);
    };
    const handleClosel = () => {
        setOpenl(false);
    };
  
    const lastUpdateBtn = () => {
        setShowChat(true)
        const saveLastSeen= { 
            lastMemberSeenBtn: new Date(),
            }        
            axios
            .put(`${http}/api/lclquery/saveMemberLastSeen/${id}`,saveLastSeen)
            .then((res) => {
              //console.log(res.data);    
          });
    }

    const lastFUpdateBtn = () => {
        setShowChat(true)
        const saveFLastSeen= { 
            lastMemberSeenBtn: new Date(),
            }        
            axios
            .put(`${http}/api/fclquery/saveMemberLastSeen/${id}`,saveFLastSeen)
            .then((res) => {
              //console.log(res.data);    
          });
    }

    const sendLSRequest = async() =>{
       newVal.rate = nRate
       newVal.validDate = nDate
       newVal.isFinal = checked

        const addNewRate = { 
        rates: newVal,
        }        
        axios
        .put(`${http}/api/lclquery/addNewRate/${id}`,addNewRate)
        .then((res) => {
          //console.log(res.data);
        });
        //sendLSStatus();
    }

    const sendLSStatus = async() =>{
        const alterStatus = { 
        status:'rates confirmation',
        }        
        axios
        .put(`${http}/api/lclquery/alterStatus/${id}`,alterStatus)
        .then((res) => {
          //console.log(res.data);
        });
        setOpen(false);
        navigate('/lclboard')
    }

    const openLog = (key, finalIS) =>{
        setShowDial(true);
        setkeyID(key)
        setCFinal(finalIS)
        console.log(key)
        console.log('cFinal1 =>'+ cFinal)
        //console.log('lastFinal1 =>' +  lastFinal)

    }

    const openLogSch = (key,finalIS) =>{
        setOpenSch(true);
        setkeyID2(key)
        setCFinal2(finalIS)
        console.log(key)
        console.log('cSchFinal1 =>'+ cFinal2)
        //console.log('lastschFinal1 =>' +  lastFinal)
    }

    const settleFinalRates = async() =>{
        //lastFinal = !lastFinal;
        //setlastFinal((!lastFinal))
        //console.log(lastFinal)

        const alterFinal = { 
        isFinal: !cFinal,
        keyId: keyID
        }

        axios
        .put(`${http}/api/fclquery/rates/alterFinal/${id}`,alterFinal)
        .then((res) => {
          console.log(res.data);
          setfrates(res.data.fclquery2.rates)
          console.log(frates)
          
        });
        setShowDial(false);
        //getFRates();
        console.log('cFinal2 =>'+ cFinal)
        //console.log('lastFinal2 =>' +  lastFinal)


        // setShowDial(false)
        //   console.log(keyID)
        //   console.log(frates)
        //   let newObj = {}
        //   newObj = frates?.filter((obj => obj._id === keyID))[0]
        //   console.log(newObj)
         
        //   let arr = frates?.filter((obj => obj._id !== keyID));
        //   setalterArr(arr);
        //   let updatedObjj = {...newObj, isFinal: lastFinal }
        //   console.log(updatedObjj)
        //   setfrates([...arr, updatedObjj])
        //   console.log(frates)
     
    }

    const settleFinalLRates = async() =>{
        const alterFinal = { 
        isFinal: !(cFinal),
        keyId: keyID
        }
        setLoading(true) 
        axios
        .put(`${http}/api/lclquery/rates/alterFinal/${id}`,alterFinal)
        .then((res) => {
          console.log(res.data);
        });
        setLoading(false) 
        setOpen(false);
        //navigate('/req')
        //setre.isFinal===true(!re.isFinal===true)
        window.location.reload(false)
    }

    const settleFinalSchedules = async() =>{
        const alterSFinal = { 
        isFinal: !(cFinal2),
        keyId: keyID2
        }
        axios
        .put(`${http}/api/fclquery/schedules/alterFinal/${id}`,alterSFinal)
        .then((res) => {
          console.log(res.data);
          setfschedules(res.data.fclquery2.schedules)
          console.log(fschedules)
        });
         setOpenSch(false);
         console.log('cSchFinal2 =>'+ cFinal2)

        // console.log(keyID2)
        // console.log(fschedules)
        // let newObj = {}
        // newObj = fschedules?.filter((obj => obj._id === keyID2))[0]
        // console.log(newObj)
       
        // let arr = fschedules?.filter((obj => obj._id !== keyID2));
        // setalterArr(arr);
        // let updatedObjj = {...newObj, isFinal: !cFinal2 }
        // console.log(updatedObjj)
        // setfschedules([...arr, updatedObjj])
        // console.log(fschedules)
   
        //navigate('/req')
        //setre.isFinal===trueSch(!re.isFinal===trueSch)
        //window.location.reload(false)
    }
    //console.log(fnum)

  return (
        <div className='w-full flex flex-col p-0.5 bg-slate-50 border-2 hover:shodow-lg rounded-md mt-3 mb-2'>

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
                    <p className={`${containerMode==='LCL'? 'bg-red-500 text-white':'bg-blue-500 text-white'} px-2 py-1 font-bold tracking-wider rounded-lg text-sm`}>{containerMode}</p>
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
                    <img src={factory} alt='' className='w-8 h-8 ml-2' />
                    <RateBox item='fac' company={company} />
                    <img src={officer} alt='' className='w-7 h-7 ml-2' />
                    {role==='salesman' ? <RateBox item='mobileC' post='CRD:' crd={crd}/>: 
                    role==='crd' ? <RateBox item='mobileC' post='Salesperson' crd={assigned}/>: 
                    ((type!=='') && (containerMode==='LCL')) && <RateBox item='mobileC' post='Handled by:' crd={user}/>
                    }
                 
                    <Badge color="error" badgeContent={containerMode==='FCL'? fnum: lnum} overlap="circular">
                        <img src={chatLogo} alt='chat' className='w-9 h-9 cursor-pointer' onClick={containerMode==='LCL'? lastUpdateBtn: lastFUpdateBtn }/>
                    </Badge>
                    </div>

            </div>

            <div className="w-[30%] flex flex-col p-2 my-2 gap-0.5">
                <div className='flex justify-end items-center gap-2'>
                    <p className='text-sm text-gray-400'>ready by:</p>
                    <p>{rDate.split(",")[1]}</p>
                </div>

                <div className='flex justify-end items-center gap-2'>
                    <p className='text-sm text-gray-400'>Added:</p>
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    <p>{moment(savedDate).fromNow()}</p>

                </div>      

                <div className='flex justify-end items-center gap-2'>
                    <p className='text-sm text-gray-400'>Updated:</p>
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    <p>{moment(updatedDate).fromNow()}</p>

                </div>                

            </div>

            <div className="w-[8%] flex justify-center items-center">

                <div className='w-3/4 mdd:w-3/5 xl:w-1/2  flex justify-center items-center text-white rounded-full bg-red-500'>
                {status ==="rates pending"?
                    <button onClick={()=>setShow(!show)} className={`flex ${show? "border-2 text-black bg-white border-black":"bg-orange-500 text-white"} rounded-full items-center justify-center px-2 py-2 text-base tracking-wide capitalize transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
                            </svg>
                        </button>
                        : 
                        <button onClick={()=>setMore(!more)} className={`flex w-full ${more? "border-2 text-black bg-white border-black":"bg-orange-500 text-white"} rounded-full items-center justify-center px-2.5 py-2 text-base tracking-wide capitalize transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
                        {more && <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-8 h-8 rtl:-scale-x-100' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
                                </svg>}
                        {!more &&<svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-8 h-8 rtl:-scale-x-100' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                </svg>}
                        </button>
                        
                    }
                    
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

                    </div>

                    <div className='mt-2 flex justify-start items-center gap-4'>
                    <p className={`${containerMode==='LCL'? 'bg-red-500 text-white':'bg-blue-500 text-white'} px-2 py-1 font-bold tracking-wider rounded-lg text-sm`}>{containerMode}</p>
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
                    <img src={factory} alt='' className='w-8 h-8 ml-2' />
                    <RateBox item='fac' company={company} />
                    {!arrVessel.includes(status) && <img src={ves} alt="vessel" className='w-6 h-6 ml-2' />}
                    {!arrVessel.includes(status) && <RateBox item='ship' vessel={selVessel} voyage={selVoyage} />}

                    </div>

            </div>

            <div className="w-[45%] flex  justify-center p-2 my-1 gap-1">
                <div className='w-full flex'>
                    <div className='w-[40%]'>
                   
                    <div className='w-full flex flex-col justify-center items-center text-center'>
                        <p className='w-full text-center font-semibold px-2 my-1 py-1 border-[3px]  border-red-600 text-red-600 rounded-md'>{status.charAt(0).toUpperCase()+status.substring(1)}</p>                </div>
                    
                        {role==='salesman' && 
                        <div className='flex justify-between items-center gap-2'>
                            <p className='text-xm text-gray-400'>crd:</p>
                            <p className='px-3 mt-1 py-1 border-2 rounded-md bg-white'>{crd}</p>
                        </div>}

                        {role==='crd' && 
                        <div className='flex justify-between items-center gap-2'>
                            <p className='text-xm text-gray-400'>salesman:</p>
                            <p className='px-3 mt-1 py-1 border-2 rounded-md bg-white'>{assigned}</p>
                        </div>}
                    </div> 
               
                    <div className='w-[60%] flex-col '>
                    <div className='w-full flex flex-col justify-center items-end'>
                    <div className='flex justify-center items-end gap-2'>
                    <p className='text-sm text-gray-400'>ready by:</p>
                    <p>{rDate}</p>
                    </div>

                    <div className='flex justify-center items-end gap-2 mt-1'>
                        <p className='text-sm text-gray-400'>Created by:</p>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        <p>{moment(savedDate).fromNow()}</p>

                    </div>

                    <div className='flex justify-center items-end gap-2 mt-1'>
                        <p className='text-sm text-gray-400'>Last updatedAt:</p>
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
                    <div className='h-0.5 bg-gray-300 w-full my-1 px-4'></div>
                    <div className='w-full flex justify-start items-end my-2 text-gray-400 ml-3'>
                        <div className='w-[60%] xl:w-[50%] flex justify-center items-start flex-col px-4'>
                            <p className=' font-semibold text-xs mb-2'>Rates :</p>

                            {loading? <div className='w-full flex justify-center items-center font-semibold gap-3'><i class="fa fa-spinner fa-spin"></i>Loading Rates...</div>:
                            <>
                            {containerMode==='FCL'? 
                                <>
                                {frates?.filter(r=>r.isFinal===false).map((re,index)=>(
                                <div className='w-full xl:w-3/4 flex justify-between items-center gap-x-5 gap-y-2' key={index}>

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

                                    {/* <div className='flex justify-start items-center'>
                                        <p>valid till :</p>
                                        <p className='text-black'>{re.validDate}</p>
                                    </div> */}
                                    {role==='salesman' && <div className='flex justify-start items-center'>                                           
                                           <svg fill="none" stroke="currentColor" onClick={()=>openLog(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7  text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                            </svg>
                                    </div>} 
                                </div>)) }  
                                  
                                {frates?.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized rate/s:</p>}
                                
                                {frates.filter(r=>r.isFinal===true).length>0 && frates.filter(r=>r.isFinal===true).map((re,index)=>(
                                
                                <div className='w-full xl:w-3/4 flex justify-between items-center gap-x-5 gap-y-2 mt-0.5 border-green-600 rounded-md border-2 p-1' key={index}>
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
                                    {/* <div className='flex justify-start items-center'>
                                        <p>valid till :</p>
                                        <p className='text-black'>{re.validDate}</p>
                                    </div>   */}
                                    {role==='salesman' && <div className='flex justify-start items-center'>                        
                                            <svg fill="none" stroke="currentColor" onClick={()=>openLog(re._id,re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                            </svg>
                                    </div>}      
                                </div>))}
                                </>
                                  
                                :

                                <div className='w-full flex flex-col'>
                                <div className='w-full flex justify-between'>

                                    <div className='w-full flex justify-start items-center gap-x-10 gap-y-2'>

                                    {frates.filter(r=>r.isFinal===false).length>0 && frates.filter(r=>r.isFinal===false).map((re,index)=>(

                                    <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2' key={index}>
                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                                            <p className='text-black'>1 Cbm</p>
                                        </div>

                                        <div className='flex justify-start items-center'>
                                            <p className='text-black'>$ {re.rate}</p>
                                        </div>
                                        {/* <div className='flex justify-start items-center'>
                                            <p>valid till :</p>
                                            <p className='text-black'>{re.validDate}</p>
                                        </div>   */}
                                        {role==='salesman' && <div className='flex justify-start items-center'>                        
                                           <svg fill="none" stroke="currentColor" onClick={()=>openLog(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 ${loading && 'animate-spin'} text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                            </svg>
                                        </div>}  
                       
                                    </div>
                                    ))
                                    }
                                    </div>                                
                                </div>
                                    
                                    {frates.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized rate/s:</p>}

                                    {frates.filter(r=>r.isFinal===true).length>0 && frates.filter(r=>r.isFinal===true).map((re,index)=>(
                                    
                                    <div className='w-3/4 flex justify-between items-center gap-x-12 gap-y-2 mt-0.5 border-green-600 rounded-md border-2 p-1' key={index}>
                                        <div className='flex justify-start items-center gap-2'>
                                            <img src={boxes} alt='' className='w-6 h-6 ml-2' />
                                            <p className='text-black'>1 Cbm</p>
                                        </div>

                                        <div className='flex justify-start items-center'>
                                            <p className='text-black'>$ {re.rate}</p>
                                        </div>
                                        {/* <div className='flex justify-start items-center'>
                                            <p>valid till :</p>
                                            <p className='text-black'>{re.validDate}</p>
                                        </div> */}
                                        {role==='salesman' && <div className='flex justify-start items-center'>               
                                            <svg fill="none" stroke="currentColor" onClick={()=>openLog(re._id)} stroke-width="1.5" className={`w-7 h-7 ${loading && 'animate-spin'} text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                            </svg>
                                        </div>}

                                    </div>
                                    ))
                                    }
                                </div>  
                            }
                            </>}
                            
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add New Rate</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    As for request from the shipper, Add the new rate by discussing between shipper & salesman.
                                </DialogContentText>
                                <div className='w-full flex flex-col'>

                                <div className='w-full flex gap-2 justify-center items-center mt-2'>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="New rate($)"
                                    type="number"
                                    value={nRate}
                                    className='w-1/3 -mt-1'
                                    variant="outlined"
                                    onChange={(e) => {
                                        setNRate(e.target.value);
                                    }}
                                />                                    
                                
                                <BasicDatePicker label={"New Valid date"} setDate={setNDate}/>
                                </div>
                                {/* <Switch
                                    checked={checked}
                                    onChange={handleChecked}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    label="Label"
                                /> */}
                                <FormGroup>
                                    <FormControlLabel required control={<Switch />} label="Set as finalized rate*" onChange={handleChecked} />
                                </FormGroup>
                                
                                {/* <TextInput label="New rate" placeholder='' type={'number'} setValue={setNRate} /> */}

                                {/* <TextField
                                  id="outlined-multiline-static"
                                  label="Remarks"
                                  multiline
                                  value={salremarks.remark}
                                  placeholder="Hint: Break the line by adding comma"
                                  className='w-3/4'
                                  size='small'
                                  onChange={e=>setsalRemarks({...salremarks, remark: e.target.value })}
                              /> */}
                                </div>
                                
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={sendLSRequest}>Add</Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={openl}
                                onClose={handleClosel}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Cancel the rate bargain request?"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                 Are you want to the cancel the request from shipper?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={sendLSStatus}>Yes</Button>
                                <Button onClick={handleClosel} autoFocus>
                                    No
                                </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={showDial}
                                onClose={()=> setShowDial(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Settle the final frates!"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                 Are you want to add/remove to/from finalized rates?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={settleFinalRates}>Yes</Button>
                                <Button onClick={()=> setShowDial(false)} autoFocus>
                                    No
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        {role==='salesman' &&  <div className='w-[40%] xl:w-[50%] flex justify-center items-center px-4 ml-4'>
                                <div className='w-full flex justify-end items-center gap-2'>
                                    <button onClick={()=>setNewShow(!newShow)} className=' text-green-500 animate-bounce mx-6 font-semibold hover:bg-green-600 hover:text-white border-green-600 bg-white border-2 py-2 px-4 text-[14.5px] rounded-md'>Add new rate</button>
                                    {/* <button onClick={cancelRate} className='bg-red-500 text-white py-0.5 px-2 text-[14px] rounded-md'>Cancel</button> */}
                                </div> 
                        </div>}  
                    </div> 
                    
                    <>
                        <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                        <div className='w-full flex items-end'>
                            <>                       
                            {status==='schedule pending' && 

                            <div className='w-[55%] flex justify-start items-center'>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>

                                <p className=' font-semibold text-xs mb-2 px-4'>Adding schedule:</p>
                                <button onClick={()=>setShowSch(!showSch)}  className= "bg-red-500 text-[13px] px-2 py-2 w-[120px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active" >
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                                </svg>Add</button>
                                                                                    
                            </div>
                            </div>
                            }
                            </>
                        
                        </div>
                    </>
                    

                    {((status==='vessel pending') || (status==='booking') || (status==='pending cut-off') || (status==='b/l pending') || (status==='b/l added')) && 
                    <>
                    {/* <div className='h-0.5 bg-gray-300 w-full my-1 px-4'></div> */}
                    <div className='w-full flex  flex-col px-4 justify-end items-start my-3 text-gray-400 ml-3'>
                        <p className=' font-semibold text-xs mb-2'>Schedules :</p>
                        
                        <div className='w-full flex'>
                            <div className='w-[60%] xl:w-[40%] flex flex-col justify-center items-start'> 
                            {lsoading? <div className='w-full flex justify-center items-center font-semibold gap-3'><i class="fa fa-spinner fa-spin"></i>Loading Schedules...</div>:
                                <>
                                {containerMode==='FCL'? 
                                        <>
                                        {fschedules?.filter(r=>r.isFinal===false).map((re,index)=>(
                                            <div className='w-full flex justify-between gap-1' key={index}>
                                                <div className='flex justify-start items-center gap-2'>
                                                    <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                                    <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                                </div>
                                        
                                                <div className='flex mt-1'>                                   
                                                    <ValuesBox item='schedulesF' f1={re.ETD} f2={re.transit} f3={re.ETA} f4={re.shipMode} f5={re.transhipments} />
                                                </div>

                                                {<div className='flex justify-start items-center'>
                                                    {thumbColSch? <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                    </svg> :
                                                <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                    </svg>}
                                            </div>} 
                                            </div>
                                        )) }  
                                        
                                        {fschedules?.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1 text-start'>Finalized schedule/s:</p>}
                                        
                                        {fschedules.filter(r=>r.isFinal===true).length>0 && fschedules.filter(r=>r.isFinal===true).map((re,index)=>(
                                        
                                            <div className='w-full flex justify-between gap-1 border-green-600 rounded-md border-2 p-1' key={index}>
                                                <div className='flex justify-start items-center gap-2'>
                                                    <DirectionsBoatFilledIcon sx={{ color: 'blue' }}/>
                                                    <p className='text-black text-[13px]'>{re.vessel} / {re.voyage}</p>
                                                </div>
                                        
                                                <div className='flex mt-1'>                                   
                                                    <ValuesBox item='schedulesF' f1={re.ETD} f2={re.transit} f3={re.ETA} f4={re.shipMode} f5={re.transhipments} />
                                                </div>

                                                {<div className='flex justify-start items-center'>
                                                    {thumbColSch?  <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                    </svg> :
                                                    <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                    </svg>}
                                            </div>} 
                                            </div>
                                        ))
                                        }
                                        </>
                                        
                                        :

                                        <div className='w-full flex flex-col'>
                                        <div className='w-full flex justify-between'>

                                            <div className='w-full flex justify-start items-center gap-x-10 gap-y-2'>

                                            {fschedules.filter(r=>r.isFinal===false).length>0 && fschedules.filter(r=>r.isFinal===false).map((re,index)=>(

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
                                            {<div className='flex justify-start items-center'>
                                                    {thumbColSch? <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                    </svg> :
                                                <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                    </svg>}
                                            </div>} 
                                        </>
                                            ))
                                            }
                                            </div>                               
                                        </div>
                                            
                                            {fschedules.filter(r=>r.isFinal===true).length>0 && <p className='text-green-600 font-semibold text-[12.5px] py-1'>Finalized schedule/s:</p>}

                                            {fschedules.filter(r=>r.isFinal===true).length>0 && fschedules.filter(r=>r.isFinal===true).map((re,index)=>(
                                            
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
                                            {<div className='flex justify-start items-center'>
                                                {thumbColSch? <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-red-500 border-2 border-red-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                    </svg> :
                                                <svg fill="none" stroke="currentColor" onClick={()=>openLogSch(re._id, re.isFinal)} stroke-width="1.5" className={`w-7 h-7 text-green-500 border-2 border-green-500 rounded-full p-0.5 cursor-pointer`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                    </svg>}
                                            </div>} 
                                            </>
                                            ))
                                            }
                                        </div>  
                                

                                    }
                                </>}

                                    <Dialog
                                    open={openSch}
                                    onClose={()=>setOpenSch(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"finalized schedules?"}
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                    Are you want to add/remove to/from finalized schedules?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={settleFinalSchedules}>Yes</Button>
                                    <Button onClick={()=> setOpenSch(false)} autoFocus>
                                        No
                                    </Button>
                                    </DialogActions>
                                </Dialog>

                                                                            
                            </div>
                            <div className='w-[40%] xl:w-[60%] flex justify-end items-end'>
                                <div className='w-full flex justify-end items-center gap-2 mr-5'>
                                    <button onClick={()=>setNewShowSch(!newshowSch)} className='p-2 text-[14px] font-semibold border-2 border-green-600 bg-white rounded-md text-green-600 hover:bg-green-600 hover:text-white hover:border-white hover:scale-110 animate-bounce'>Add New Schedule</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    </>
                    }
            
                    {status==='booking' && 
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <p className='font-semibold text-xs mb-2 px-4'>Release Order :</p>
                                <div className='w-3/4 flex justify-start items-center gap-2'>
                                <input name="photo" id="fileInput" accept=".pdf,.docx, .doc" className="flex ml-2" type="file" onChange={handleChange} />
                                <button onClick={handleUpload} disabled={doneUpload}  className= {` ${doneUpload? 'bg-green-500': 'bg-red-500'} text-[13px] px-2 py-2 w-[130px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`} >
                                {(uploading && !doneUpload) && <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>}
                                {(!uploading && !doneUpload) && 
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 text-white cursor-pointer rounded-full' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"></path>
                                    </svg>
                                }
                                {doneUpload && <svg fill="none" stroke="currentColor" className='w-5 h-5 text-white cursor-pointer rounded-full' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>}

                                {uploading? 'Uploading...': doneUpload? 'Uploaded': 'Upload'}</button>
                                </div>      
                            

                            </div>
                        </>
                    }
                    
                    {status==='pending cut-off' && 
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-between items-center'>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <p className='font-semibold text-xs mb-2 px-4'> Release Order:</p>

                                <a href={releaseOrder} download>
                                    <button className= {`bg-red-500 text-[13px] px-2 py-2 w-[110px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>View</button>
                                </a>
                                
                            </div>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 ml-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                            </svg>
                                <p className='font-semibold mt-2 text-xs mb-2 px-4'> Cut-Off data:</p>
                                <button onClick={()=> setaddCutOff(true)} className= {`bg-red-500 text-[13px] px-2 py-2 w-[110px] flex justify-center items-center gap-2 cursor-pointer mx-4 text-white rounded-lg active`}>
                                    {/* <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg> */}
                                    Add Cut-Off
                                </button>
                            </div>
                            </div>
                        </>
                    }

                    {(status==='b/l pending') && 
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-between items-center'>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <p className='font-semibold text-xs mb-2 px-4'> Release Order:</p>

                                <a href={releaseOrder} download>
                                    <button className= {`bg-red-500 text-[13px] px-2 py-2 w-[110px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>View</button>
                                </a>
                                
                            </div>
                            <div className='w-full flex justify-center items-center my-3 text-gray-400'>
                                    <p className='font-semibold text-xs mb-2 px-4'>Cut-Offs :</p>
                                    <img src={clock} alt='' className='w-8 h-8 ml-2' />
                                    {arrCutOff.includes(status) && <ValuesBox item='cutoff' c1={cutof?.BLCLO} c2={cutof?.FCLCLO} c3={cutof?.VGMCLO} c4={cutof?.ETDCOL}/>}
                                                
                            </div>
                            <div className='w-full flex justify-end items-center gap-2 mr-5'>
                                    <button onClick={()=>seteditCutOff(true)} className='p-2 text-[14px] font-semibold border-2 border-green-600 bg-white rounded-md text-green-600 hover:bg-green-600 hover:text-white hover:border-white hover:scale-110 animate-bounce'>Edit CutOffs</button>
                            </div>

                            </div>
                        </>
                    }

                    {(status==='b/l added') && 
                        <>
                            <div className='h-0.5 bg-gray-300 w-full mt-1 px-4'></div>
                            <div className='w-full flex justify-between items-center'>
                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                                <p className='font-semibold text-xs mb-2 px-4'> Release Order:</p>

                                <a href={releaseOrder} download>
                                    <button className= {`bg-red-500 text-[13px] px-2 py-2 w-[110px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>View</button>
                                </a>
                                
                            </div>

                            <div className='w-full flex justify-start items-center my-3 text-gray-400 ml-3'>
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 ml-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                            </svg>
                                <p className='font-semibold mt-2 text-xs mb-2 px-4'> B / L data:</p>
                                <button onClick={()=> setShowBL(true)} className= {`bg-red-500 text-[13px] px-2 py-2 w-[110px] flex justify-center items-center gap-2 cursor-pointer mx-4 text-white rounded-lg active`}>
                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>View
                                </button>
                            </div>
                            </div>
                        </>
                    }

                </>
                }
            </>
            }

            {((type==="") || (containerMode==='FCL')) && <AddRates show={show} title='Add rates' id={id} close={()=>setShow(false)} type={containerMode} mode={type} loggedID={loggedID} loggedName={loggedNM} />}
            {((type==="") || ((containerMode==='FCL')&& (rates?.length>0))) && <AddRates show={newShow} title='Add new rates' id={id} close={()=>setNewShow(false)} type={containerMode} mode={type} loggedID={loggedID} loggedName={loggedNM} />}

            {((type!=="") && (containerMode==='LCL')) && <AddRates show={show} title='Add rates & CRD' id={id} close={()=>setShow(false)} type={containerMode} mode={type} loggedID={loggedID} loggedName={loggedNM} />}

            <AddSchedule title={"Add Schedule"} show={showSch} id={id} close={()=>setShowSch(false)} containerMode={containerMode} />
            <AddSchedule title={"Add New Schedule"} show={newshowSch} id={id} close={()=>setNewShowSch(false)} containerMode={containerMode} />

            {status==='b/l added' && <ViewBL show={showBL} close={()=>setShowBL(false)} blData={getbl[0]} vessel={selVessel} voyage={selVoyage} shipline={selShipLine}
             origin={OportName} destination={DportName} freight={freight} id={id} />}

             <AddCutOff show={addCutOff} close={()=>setaddCutOff(false)} title='Add Cut-Off' id={id} data={''} />
             <AddCutOff show={editCutOff} close={()=>seteditCutOff(false)} title='Edit Cut-Off' id={id} data={cutof}/>

             <ChatBox person={user} userID={loggedID} containerType={containerMode} loggedName={loggedNM} role={role} status={status} show={showChat} close={()=>setShowChat(false)} title='Chat Box' id={id}/>

        </div>
       
     
    )
}

export default RueryTile