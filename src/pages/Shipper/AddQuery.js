import React, { useEffect, useState } from 'react'
import AutoText from '../../components/TextUI/AutoText';
import {Eports} from '../../Data'
import {  Box, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { BasicDatePicker } from '../../components/TextUI/BasicDatePicker';
import AutoForwarder from '../../components/TextUI/AutoForwarder';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AlertQuery from '../../components/DialogBoxes/AlertQuery';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/TextUI/TextInput';
import { NumberInput } from '../../components/TextUI/NumberInput';
import CloseIcon from "@mui/icons-material/Close";
import { userSchema5 } from '../../components/Default/userValidation';
import moment from 'moment';


var fclCargo = []
var lcl = []

var obj = {};
var newobj = {};

var lclCargo = {
  totalPackages:'',
  totalVolume:'',
}

var finalizedCargo = []

const AddQuery = () => {    
    
 var http = process.env.REACT_APP_BASE_URL;
 const loggedUser = useSelector(state=> state.auth.value);
  const navigate = useNavigate();

 const [role,setRole] = useState("");
 const [id,setID] = useState("");
 const [memData, setmemData] = useState([])
 const [userData, setUserData] = useState([])
 const [showAlert, setShowAlert] = useState(false)

 const [fqueryData, setFQueryData] = useState([])
 const [lqueryData, setLQueryData] = useState([])
 const [lConqueryData, setLConQueryData] = useState([])

 const [pdetails, setpDetails] = useState([])
 const [hsdetails, sethsDetails] = useState([])
 const [mngr, setmngr] = useState('')
 const [name, setName] = useState('')

 const initialConValues = {
    Containers: [
      {  
        containerType: '',
        quantity: '',
      },
    ],
  };

  const initialValues = {
    loading: '',
    desty: '',
  }

 const [origin, setOrigin] = useState(initialValues.loading)
  const [destination, setDestination] = useState(initialValues.desty)
  const [forwd, setForwd] = useState(initialValues.loading)

  const [mode, setMode] = useState('')
  const [shStatus, setshStatus] = useState('')

  const [error, setError] = useState('')

  const [rdate, serRdate] = useState(null)
  console.log(rdate)


  // const navigate = useNavigate();

  const [checkCargo, setCheckCargo] = useState('');
  const [search, setSearch] = useState(false);
  const [tab, setTab] = useState(false);

  const [freight,setFreight] = useState('')
  const [wordEntered, setWordEntered] = useState("");
  const [noPkg, setNoPkg] = useState('')
  const [vol, setVol] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [code, setCode] = useState('')

 useEffect(() => {
     setRole(loggedUser.role)
     setID(loggedUser.userID)
     setName(loggedUser.userName)

     const getConsoleMngr = () =>{
       axios
       .get(`${http}/api/member?role=consolemanager`)
       .then((res) => {
         console.log(res.data);
         setmngr(res.data.member[0].name)
       })
       .catch(err=> {
         console.log(err);
       })  
     }
     getConsoleMngr()

     const getFCLQueries = ()=>{
       axios
       .get(`${http}/api/fclquery/user/${id}`)
       .then((res) => {
         console.log(res.data);
         setFQueryData(res.data.user.fclqueries)
       })
       .catch(err=> {
         console.log(err);
       })  
     }
     getFCLQueries();

     const getLCLQueries = ()=>{
       axios
       .get(`${http}/api/lclquery/user/${id}`)
       .then((res) => {
         console.log(res.data);
         setLQueryData(res.data.user.lclqueries)
       })
       .catch(err=> {
         console.log(err);
       })  
     }
     getLCLQueries();

     const getLCLs = ()=>{
       axios
       .get(`${http}/api/lclquery?ID=${id}`)
       .then((res) => {
         console.log(res.data);
         setLConQueryData(res.data.lclqueries)
       })
       .catch(err=> {
         console.log(err);
       })  
     }
     getLCLs();
     
     const getPorts = ()=>{
       axios
       .get(`${http}/api/destination`)
       .then((res) => {
         //console.log(res.data);
         setpDetails(res.data.destinations)
       })
       .catch(err=> {
         console.log(err);
       })     
     }
     getPorts();

     const getHSCodes = ()=>{
       axios
       .get(`${http}/api/hsCodes`)
       .then((res) => {
         //console.log(res.data);
         sethsDetails(res.data.hsCodes)
       })
       .catch(err=> {
         console.log(err);
       })     
     }
     getHSCodes();

     const getUser = ()=>{
       axios
       .get(`${http}/api/user/${id}`)
       .then((res) => {
         console.log(res.data.user);
         res.data.user!==undefined && setUserData(res.data.user)
         // setFQueryData(res.data.fclqueries)
       })
       .catch(err=> {
         console.log(err);
       })     
   
     }
     getUser();

     const getMember = ()=>{
       axios
       .get(`${http}/api/member/${id}`)
       .then((res) => {
         console.log(res.data.member);
         res.data.member!==undefined && setmemData(res.data.member)
         // setFQueryData(res.data.fclqueries)
       })
       .catch(err=> {
         console.log(err);
       })         
     }
     getMember();
     
 }, [id,http,loggedUser,role]);

  console.log(lConqueryData)
  console.log(userData)
  console.log(memData)

 console.log(mngr)


 const handleChange = (event) => {
    if(role==='user'){
      setMode(event.target.value);
    }else if(role==='consoleOperator'){
      setshStatus(event.target.value)
      setMode('LCL');
    }
  };

  const handleFreight = (event) => {
    setFreight(event.target.value);
  };

  const showChance = ()=>{
    setTab(!tab);
  }

  const handleQuery = () =>{
    setSearch(true)
    //getUser();
    if(checkCargo==="added"){
      console.log("done")
      if(mode==='LCL'){
        lcl.push(lclCargo)
        console.log('addeddddddd!!!!')
        
      }
      finalizedCargo = [...fclCargo]
      setShowAlert(true)
      // navigate('/')
    }else{
      setCheckCargo("failed")
    }     
  }

  const sendLCLRequest = async() =>{
    const newLQuery = {
      origin: origin,
      destination: destination,
      containerMode: "LCL",
      cargo:
      lcl.map((item) => ({
        totalPackages: item.totalPackages,
        totalVolume: item.totalVolume,
      })),
      user: loggedUser.userID,
      receiver: role==='user' ? userData.assignedTo: role==='consoleOperator' && mngr,
      crd: role==='user' ? userData.assignedCRD: '',
      rDate: moment(rdate).format('dddd, MMM Do YYYY'),
      uName: role==='user' ? userData.name : memData.name, 
      uCompany: role==='user' ? userData.companyName: forwd,
      commodity: wordEntered,
      type: role==='user'? '' : role==='consoleOperator' && shStatus 
    }     
    console.log(newLQuery);
      axios
      .post(`${http}/api/lclquery/add`,newLQuery)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err=> {
        console.log(err);
        // setError(err.response.data.message);
        // console.log(error);
      })   
        
  };

  const sendFCLRequest = async() =>{
    const newFQuery = {
      origin: origin,
      destination: destination,
      containerMode: mode,

      cargo: 
      fclCargo.map((item) => ({
        containerType: item.containerType,
        quantity: item.quantity,
      })),

      user: loggedUser.userID,
      receiver: userData.assignedTo,
      crd: userData.assignedCRD,
      rDate: moment(rdate).format('dddd, MMM Do YYYY'),
      uName: userData.name, 
      uCompany: userData.companyName,
      commodity: wordEntered,
      freight: freight

    }        
      axios
      .post(`${http}/api/fclquery/add`,newFQuery)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err=> {
        console.log(err);
        // setError(err.response.data.message);
        // console.log(error);

      })     
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = hsdetails.filter((value) => {
      return value.Commudity.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setCode('');
  };

  const optionClicked = (val) =>{
    setWordEntered(val)
    setFilteredData([]);
  }

  const handleSend = () => {
    if(error===''){
      if(mode==="FCL"){
        sendFCLRequest();
      }else{
        sendLCLRequest();
        lcl.pop();
      }
      navigate("/BQuering")
    }else{

    }
  }

  const handleClose = () =>{
    setShowAlert(false)
    finalizedCargo.length=0
    console.log(finalizedCargo)
  }

  const addLCLData = ()=>{
    lclCargo.totalPackages = noPkg;
    lclCargo.totalVolume = vol;
    setCheckCargo("added");
    setTab(!tab);

  }



  return (
    <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
        <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>
            <p className='text-4xl text-center mt-[100px] font-semibold'>Get Your Instant Freight Quotes <span className='text-white text-3xl px-2 py-1 rounded-xl bg-red-600 font-semibold'>Online.</span></p>

            <div className=' bg-white backdrop-blur-sm shadow-md border-2 rounded-lg p-4 w-4/5 my-3'>

                <div className='w-full my-2 grid grid-cols-3 gap-x-10 gap-y-5 px-4 items-center'>
                    <div className='flex flex-col'>
                    <AutoText options={Eports} title="Origin"  setPortData={setOrigin}/>
                    {origin==='' && (checkCargo==='added' || search===true) && <p className='text-[13px] text-red-600 mb-1'>Add your origin port!</p>}
                    </div>     

                    <div className='flex flex-col'>
                    <AutoText options={pdetails} title="Destination" setPortData={setDestination}/>
                    {destination==='' && (checkCargo==='added' || search===true) && <p className='text-[13px] text-red-600 mb-1'>Add your destination port!</p>}
                    </div>  

                    <div className='flex justify-center items-center'>
                    <BasicDatePicker label={"Cargo readyness date"} setDate={serRdate}/>

                    </div>    

                    {role==='user' && 
                    <div className='flex flex-col'>
                    <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Container Mode</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mode}
                        label="Container Mode"
                        onChange={handleChange}

                        >
                        <MenuItem value={"FCL"}>FCL</MenuItem>
                        <MenuItem value={"LCL"}>LCL</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>

                    {mode==='' && (checkCargo==='added' || search===true) && <p className='text-[13px] text-red-600 mb-1'>Add your container mode!</p>}
                    </div> }     

                    {role==='consoleOperator' &&
                    <div className='flex flex-col'>
                    <AutoForwarder setSlData={setForwd}/>
                    {forwd==='' && (search===true) && <p className='text-[13px] text-red-600 mb-1'>Add shipper name!</p>}
                    </div>
                    }


                {role==='user'&& 
                <div className='w-full flex justify-start items-center flex-col'>
                
                    <button onClick={showChance} className='w-full'>
                    <p className='text-sm font-semibold flex gap-2 px-4 items-center justify-center hover:bg-red-500 hover:text-white border-black py-4 border-2 rounded-lg'>Add Cargo <span>  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-4 h-4 mt-1 font-extrabold cursor-pointer' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg></span></p>
                
                    </button>
                    {checkCargo==='failed' && <p className='text-[13px] text-red-600 mb-1'>Add your cargo before continue!</p>}
                </div>}

                {role==='consoleOperator'&& 
                <div className='w-full flex justify-start items-center gap-1'>
                    <div className='w-[55%] flex justify-center items-center'>
                    <div className='w-full flex flex-col'>
                    <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Shipment Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={shStatus}
                        label="Shipment Status"
                        onChange={handleChange}

                        >
                        <MenuItem value={"Direct"}>Direct</MenuItem>
                        <MenuItem value={"Co-Load"}>Co-Load</MenuItem>
                        <MenuItem value={"T/S"}>T/S</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>

                    {mode==='' && (checkCargo==='added' || search===true) && <p className='text-[13px] text-red-600 mb-1'>Add your shipment status!</p>}
                    </div>

                    </div>
                    <div className='w-[45%] flex flex-col justify-center items-center'>

                    <button onClick={showChance} className='w-full'>
                    <p className='text-sm font-semibold flex gap-2 px-4 items-center justify-center hover:bg-red-500 hover:text-white border-black py-4 border-2 rounded-lg'>Add Cargo <span>  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-4 h-4 mt-1 font-extrabold cursor-pointer' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg></span></p>
                
                    </button>
                    {checkCargo==='failed' && <p className='text-[13px] text-red-600 mb-1'>Add your cargo!</p>}
                    </div>
                </div>}

                <div className='flex flex-col'>
                    <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Freight Charges</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={freight}
                        label="Freight Charges"
                        onChange={handleFreight}

                        >
                        <MenuItem value={"Prepaid"}>Prepaid</MenuItem>
                        <MenuItem value={"Collect"}>Collect</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>

                    {freight==='' && (checkCargo==='added' || search===true) && <p className='text-[13px] text-red-600 mb-1'>Add your freight details!</p>}
                </div>   
                </div>

                <div className='w-full flex justify-center items-center mt-4'>
                <div className='w-[30%] flex justify-center items-center'>
                <button onClick={handleQuery}
                    className="flex items-center justify-between w-full h-[55px] px-4 py-1 text-sm font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>Search results</span>

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button> 
                </div>
                </div>

            </div>

            {role==='user' && <AlertQuery title={"Query Summery"}  send={handleSend} origin={origin} rDate={rdate} show={showAlert} close={handleClose} freight={freight} destination={destination} como={wordEntered} type={mode} cargosFCL={finalizedCargo} cargosLCL={lclCargo} sta={shStatus}/>}

            {role==='consoleOperator' && <AlertQuery title={"Query Summery"}  send={handleSend} origin={origin} rDate={rdate} forwarder={forwd} show={showAlert} close={handleClose} freight={freight} destination={destination} como={wordEntered} type={mode} cargosLCL={lclCargo} sta={shStatus}/>}

              
            <div className={`${tab && mode!==''? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
                      <div className={`w-[40%] flex flex-col bg-white gap-4 rounded-lg shadow-lg`}>
                        <div className='w-full flex justify-center items-center bg-sky-700'>
                            <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>Add your cargo</h3>
                            <svg fill="none" onClick={()=>setTab(false)} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                            {/* <div class="flex w-full justify-center  items-center">
                              <span class={`px-2.5 py-3 flex justify-center items-center text-center text-sm font-medium cursor-pointer w-1/2 ${left? "bg-gray-500 text-white":" bg-white text-black"} `} onClick={()=>conMode("FCL")}>FCL</span>
                              <span class={`px-2.5 py-3 flex text-sm truncate cursor-pointer font-bold justify-center items-center w-1/2 h-full text-center ${!left? "bg-gray-500 text-white":" bg-white text-black"}`} onClick={()=>conMode("LCL")}>LCL</span>
                            </div> */}

                          {mode==='FCL'&&
                            <div className='max-h-[250px] overflow-y-auto'>
                            <div className="w-full px-6 pt-4">
                                <div className="flex w-full justify-start items-center gap-1">
                                  <TextField
                                      id="outlined-basic" 
                                      label='Commodity' variant="outlined" 
                                      placeholder='Add commudity here..'   
                                      value={wordEntered}
                                      className='w-full p-1'
                                      size='small'
                                      onChange={handleFilter}/>
                              
                                  <div className="searchIcon">
                                    {wordEntered !== '' && (
                                      <CloseIcon id="clearBtn" onClick={clearInput} />
                                    )}
                                  </div>
                                </div>
                                {filteredData.length !== 0 && (
                                  <div className="w-full">
                                    {filteredData.slice(0, 15).map((value, key) => {
                                      return (
                                          <div className="flex justify-start items-center my-1 max-h-[200px] overflow-y-auto cursor-pointer p-2 w-[90%] gap-2.5 ml-1 text-xs" onClick={()=>optionClicked(value.Commudity)}>
                                              <p>{value.Commudity} </p>

                                          </div>
                                        
                                      );
                                    })}
                                  </div>
                                )}
                            </div>
                            <Formik
                              initialValues={initialConValues}
                              validationSchema={userSchema5}
                              onSubmit={async (values) => {
                                console.log(values);
                                setCheckCargo("added");
                                setTab(!tab);
                                obj = {...initialValues, ...values}
                                console.log(obj)
                                newobj = {...obj, loading: origin, desty: destination}
                                console.log(newobj)
                                fclCargo = [...newobj.Containers]        
                                console.log(fclCargo)

                              }}
                            >
                    
                            {({ values }) => (
                              <Form>
                                <FieldArray name="Containers">
                                  {({remove, push}) => (
                                    <div className='divide-y divide-solid divide-gray-400'>
                                      {values.Containers?.length > 0 &&
                                        values.Containers?.map((container, index) => (
                                          <div className='flex w-full justify-center items-center gap-2 p-3' key={index}>
                                            <div className='w-[45%] p-3 text-sm flex flex-col gap-2'>
                                                <label htmlFor={`Containers.${index}.containerType`}>Container type</label>
                                                <Field as="select" 
                                                  name={`Containers.${index}.containerType`}
                                                  className='text-center p-2 w-[220px] rounded-md border'>
                                                  <option value={''} key={index}>Select Container</option>
                                                  <option value="20 GP">20 GP</option>
                                                  <option value="40 GP">40 GP</option>
                                                  <option value="40 HC">40 HC</option>
                                                  <option value="45 HC">45 HC</option>
                                                  <option value="20 RG">20 RG</option>
                                                  <option value="40 RG">40 RG</option>

                                                </Field>
                                                <ErrorMessage name={`Containers.${index}.containerType`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                            </div>

                                            <div className='w-[55%] text-sm flex  justify-center items-center'>
                                              <div className='flex flex-col gap-2'>
                                                <label htmlFor={`Containers.${index}.quantity`}>Quantity</label>
                                                  <Field
                                                    name={`Containers.${index}.quantity`}
                                                    placeholder=""
                                                    type="number"
                                                    className='text-center p-2 w-[200px] rounded-md border'
                                                  />
                                                  <ErrorMessage name={`Containers.${index}.quantity`} component="div" className='text-[10px] text-red-600 mb-1'/>

                                              </div>

                                              <button onClick={() => remove(index)} disabled={values.Containers.length===1}>
                                                <svg fill="none" stroke="currentColor" className='w-7 h-7 mb-3 bg-red-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-5 mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                              </button>

                                              <button onClick={() => push({containerType: '', quantity: ''})} >
                                                <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-7 h-7 mb-3 bg-green-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-2 mt-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
                                                </svg> 
                                              </button>
                                          
                                            </div>  

                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </FieldArray>
                              <div className="w-full flex justify-center items-center">
                                <div className="w-[150px] mt-2 h-8 bg-orange-500 p-2 rounded-md mb-2 text-white font-bold flex justify-center items-center ml-3">
                                <button type="submit">Add</button>

                                </div>
                              </div>
                              </Form>
                            )}
                            </Formik>
                            </div>                
                          }

                          {mode==='LCL'&&
                            <>
                              <div className="w-full p-4">
                                <div className="flex w-full justify-start items-center gap-1">
                                  <TextField
                                      id="outlined-basic" 
                                      label='Commodity' variant="outlined" 
                                      placeholder='Add commudity here..'   
                                      value={wordEntered}
                                      className='w-full'
                                      onChange={handleFilter}/>
                              
                                  <div className="searchIcon">
                                    {wordEntered !== '' && (
                                      <CloseIcon id="clearBtn" onClick={clearInput} />
                                    )}
                                  </div>
                                </div>
                                {filteredData.length !== 0 && (
                                  <div className="w-full">
                                    {filteredData.slice(0, 15).map((value, key) => {
                                      return (
                                          <div className="flex justify-start items-center my-1 max-h-[200px] overflow-y-auto cursor-pointer p-2 w-[90%] gap-2.5 ml-1 text-xs" onClick={()=>optionClicked(value.Commudity)}>
                                              <p>{value.Commudity} </p>

                                          </div>
                                        
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                              <div className='w-full grid grid-cols-2 justify-center items-center py-1 px-4 gap-2 mb-4'>
                                <TextInput label='No : Packages ' placeholder='ex: 100 boxes ...' setValue={setNoPkg}/>
                                <NumberInput label='Volume (Cbm) ' placeholder='' setValue={setVol}/>
                              </div>

                              <div className="w-full flex justify-center items-center">
                                <button onClick={addLCLData} className="w-[150px] mt-2 h-8 bg-orange-500 p-2 rounded-md mb-3 text-white font-bold flex justify-center items-center ml-3">Add</button>
                              </div>

                            </>
                           
                          }                                              
                    </div>
            </div>

            {role==='consoleOperator' && <div className={`${tab? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
                      <div className={`w-[40%] flex flex-col bg-white gap-4 rounded-lg shadow-lg`}>
                        <div className='w-full flex justify-center items-center bg-sky-700'>
                            <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>Add your cargo</h3>
                            <svg fill="none" onClick={()=>setTab(false)} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <>
                            <div className="w-full p-4">
                              <div className="flex w-full justify-start items-center gap-1">
                                <TextField
                                    id="outlined-basic" 
                                    label='Commodity' variant="outlined" 
                                    placeholder='Add commudity here..'   
                                    value={wordEntered}
                                    className='w-full'
                                    onChange={handleFilter}/>
                            
                                <div className="searchIcon">
                                  {wordEntered !== '' && (
                                    <CloseIcon id="clearBtn" onClick={clearInput} />
                                  )}
                                </div>
                              </div>
                              {filteredData.length !== 0 && (
                                <div className="w-full">
                                  {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                        <div className="flex justify-start items-center my-1 max-h-[200px] overflow-y-auto cursor-pointer p-2 w-[90%] gap-2.5 ml-1 text-xs" onClick={()=>optionClicked(value.Commudity)}>
                                            <p>{value.Commudity} </p>

                                        </div>
                                      
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <div className='w-full grid grid-cols-2 justify-center items-center py-1 px-4 gap-2 mb-4'>
                              <TextInput label='No : Packages ' placeholder='ex: 100 boxes ...' setValue={setNoPkg}/>
                              <NumberInput label='Volume (Cbm) ' placeholder='' setValue={setVol}/>
                            </div>

                            <div className="w-full flex justify-center items-center">
                              <button onClick={addLCLData} className="w-[150px] mt-2 h-8 bg-orange-500 p-2 rounded-md mb-3 text-white font-bold flex justify-center items-center ml-3">Add</button>
                            </div>

                        </>                                              
                    </div>
            </div>}
        </div>
    </div>
  )
}

export default AddQuery