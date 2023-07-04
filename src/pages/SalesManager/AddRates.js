import axios from 'axios';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React, { useState,useEffect } from 'react'
import AutoText from '../../components/TextUI/AutoText';
import TextField from '@mui/material/TextField';
import {Eports} from '../../Data'
import route from '../../assets/route.png'
import dollar from '../../assets/dollar.png'
import VesselInputs from '../../components/TextUI/VesselInputs';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextInput } from '../../components/TextUI/TextInput';
import { BasicDatePicker } from '../../components/TextUI/BasicDatePicker';
import { userSchema7 } from '../../components/Default/userValidation';
import AlertRate from '../../components/DialogBoxes/AlertRate';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

var rates = [];
var obj = {}
//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const AddRates = () => {
  var http = process.env.REACT_APP_BASE_URL;

  const loggedUser = useSelector((state)=> state.auth.value);

    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [discharge, setDischarge] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    //const [viewRates, setViewRates] = useState([])
    const [ldetails, setlDetails] = useState([])
    const [pdetails, setpDetails] = useState([])


    const [id,setID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      setID(loggedUser.userID)

      // const getRates = ()=>{
      //   axios
      //   .get(`${http}/api/rate`)
      //   .then((res) => {
      //     console.log(res.data);
      //     setViewRates(res.data.rates)
      //   })
      //   .catch(err=> {
      //     console.log(err);
      //   })     
      // }
      // getRates();

      const getPorts = ()=>{
        axios
        .get(`${http}/api/destination`)
        .then((res) => {
          console.log(res.data);
          setpDetails(res.data.destinations)
        })
        .catch(err=> {
          console.log(err);
        })     
      }
      getPorts();

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
      
  }, [http,loggedUser]);


    const [shipline, setShipline] = useState('')
   
    const[validDate, setValidDate] = useState(null);
    const [shmode, setShMode] = useState('')
    const [multiVal, setMultiVal] = useState('')
    var go = false;

    const sendRRequest = async() =>{
        const newRate = {
          origin: origin,
          destination: destination,
          discharge: discharge,
          shipline:shipline,
          zipCode:zipcode,
          deliveryMode: shmode,
          validDate:validDate,
          remarks: multiVal,
          rates: rates.map((item) => ({
                  containerType: item.containerType,
                  rate: item.price,
                  })),
          user:id,

        }    
        console.log(newRate)    
          axios
          .post(`${http}/api/rate/add`,newRate)
          .then((res) => {
            console.log(res.data);

          });     
      };

      const finalSubmit = ()=>{
        setShowAlert(true);
      }

      const handleSend = () => {
          sendRRequest();
          navigate("/viewrates")
       
      }

      const initialConRates = {
        Rates: [
          {  
            containerType: '',
            price: '',
          },
        ],
      };

      console.log(validDate)

  return (
    <>
     <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
        <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>

          <div className='w-full h-full flex flex-col justify-start items-center '>
              <div className='w-[82%]  mt-[70px]  flex justify-between items-center fixed'>
                <div className="flex items-center justify-center text-center gap-2">
                  <img src={dollar} alt='' className='w-[80px]' />
                  <p className="text-xl sm:text-3xl text-black font-bold leading-none">Add Rates</p>                
                </div>

              </div>

              <div className='w-[95%] mt-[140px] flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden border'>                   
                  <div className='w-[100%] flex justify-center items-center flex-col'>
                      
                      <div className='w-full bg-white px-8 py-2 rounded-md flex mt-2'>

                        <div className='w-1/3 flex justify-center flex-col items-center'>
                          <h3 className='font-semibold text-xl p-2'>Sailing Details</h3>
                          <img src={route} alt='' />
                        </div>

                        <div className='w-2/3 flex justify-center flex-col items-center'>
                          <div className='w-full grid grid-cols-2 gap-4'>

                          <div className='flex flex-col'>
                            <AutoText options={Eports} title="Port of Origin"  setPortData={setOrigin}/>                        
                            {origin==='' && go===true &&  <p className='text-[13px] text-red-600 mt-1'>Add your origin port!</p>}
                          </div>

                          <div className='flex flex-col'>
                            <AutoText options={pdetails} title="Port of Discharge" setPortData={setDischarge}/>
                            {discharge==='' && go===true &&  <p className='text-[13px] text-red-600 mb-1'>Add your discharge port!</p>}
                          </div>


                          <div className='flex flex-col'>
                            <Box sx={{ width: '100%'}}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Delivery Mode</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Delivery Mode"
                                  value={shmode}
                                  onChange={(e)=>setShMode(e.target.value)}
                                
                              >
                              <MenuItem value={"CY / CY"}>CY / CY</MenuItem>
                              <MenuItem value={"CY / CFS"}>CY / CFS</MenuItem>
                              <MenuItem value={"CY / DOOR"}>CY / DOOR</MenuItem>
                              <MenuItem value={"CY / RAMP"}>CY / RAMP</MenuItem>
                              <MenuItem value={"CFS / CFS"}>CFS / CFS</MenuItem>
                              {/* <MenuItem value={"Ex: works"}>Ex: works</MenuItem> */}
                              <MenuItem value={"FCL / FCL"}>FCL / FCL</MenuItem>
                              <MenuItem value={"FCL / LCL"}>FCL / LCL</MenuItem>
                              <MenuItem value={"LCL / LCL"}>LCL / LCL</MenuItem>

                                </Select>
                              </FormControl>
                            </Box> 

                          {shmode==='' &&  go===true  && <p className='text-[13px] text-red-600'>Add your delivery Mode!</p>}
                          </div>


                          <div className='flex flex-col'>

                            <VesselInputs options={ldetails} title="Shipping line"  setVesselData={setShipline}/>  
                            {shipline==='' && go===true &&  <p className='text-[13px] text-red-600 mb-1'>Add your shipping line!</p>}
                          </div>


                          {((shmode==="CY / RAMP") || (shmode==="CY / DOOR")) && <div className='flex flex-col'>

                          <TextInput label={"Destination"} setValue={setDestination}/>
                          {destination==='' && go===true &&  <p className='text-[13px] text-red-600 mb-1'>Add your destination!</p>}
                          </div>}


                          {shmode===("CY / DOOR") &&<div className='flex flex-col'>

                          <TextInput label={"Zip code"} setValue={setZipcode}/>
                          {zipcode==='' && go===true &&  <p className='text-[13px] text-red-600 mb-1'>Add your zip code!</p>}
                          </div>}

                          </div>
                        </div>

                      </div>
                      <div className='h-0.5 bg-gray-100 w-full my-1 px-4'></div>

                      <div className='w-full my-2 bg-white px-8 py-2 rounded-md flex mt-2'>

                        <div className='w-1/3 flex justify-center flex-col items-center'>
                          <h3 className='font-semibold text-xl p-2'>Pricing Details</h3>
                          <img src={dollar} alt='' className='w-[180px]' />
                        </div>

                        <div className='w-2/3 flex justify-center flex-col items-center p-2'>
                          {/* <div className='w-full grid grid-cols-2 gap-4'> */}                          

                          <div className='w-full flex justify-between items-center gap-2'>

                          <div className='w-3/4 flex flex-col mt-2'>
                            <TextField
                              id="outlined-multiline-static"
                              label="Remarks"
                              multiline
                              maxRows={4}
                              value={multiVal}
                              defaultValue=""
                              onChange={e=>setMultiVal(e.target.value)}
                            />
                          { go===true && multiVal==="" && <p className='text-[13px] text-red-600 mb-1'>Add remarks here!</p>}
                          {/* </div> */}
                          </div>
                          <div className='w-1/4 mt-2'>
                          <BasicDatePicker label={"Valid until"} setDate={setValidDate} />
                          </div>

                          </div>


                          <div className='w-full border-2 my-2 mt-4'>
                          <Formik
                            initialValues={initialConRates}
                            validationSchema={userSchema7}
                            onSubmit={async (values) => {
                              console.log(values);
                              obj = {...initialConRates, ...values}
                              rates = [...obj.Rates]  
                              console.log(rates)
                              finalSubmit();

                              // setCheckCargo("added");
                              // setTab(!tab);
                              // obj = {...initialValues, ...values}
                              // console.log(obj)
                              // newobj = {...obj, loading: origin, desty: destination}
                              // fclCargo = [...newobj.Rates]        
                              // console.log(fclCargo)

                            }}
                          >

                          {({ values }) => (
                            <Form>
                            <FieldArray name="Rates">
                              {({remove, push}) => (
                                <div className='divide-y divide-solid divide-gray-400'>
                                  {values.Rates?.length > 0 &&
                                    values.Rates?.map((rate, index) => (
                                      <div className='flex w-full justify-center items-center gap-2 p-2' key={index}>
                                        <div className='w-[50%] p-2 text-sm flex flex-col gap-2  justify-center items-start'>
                                            <label htmlFor={`Rates.${index}.containerType`}>Container type</label>
                                            <Field as="select" 
                                              name={`Rates.${index}.containerType`}
                                              className='text-center p-2 w-full rounded-md border'>
                                              <option value={''} key={index}>Select Container</option>
                                              <option value="20 GP">20 GP</option>
                                              <option value="40 GP">40 GP</option>
                                              <option value="40 HC">40 HC</option>
                                              <option value="45 HC">45 HC</option>
                                              <option value="20 RG">20 RG</option>
                                              <option value="40 RG">40 RG</option>

                                            </Field>
                                            <ErrorMessage name={`Rates.${index}.containerType`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                        </div>

                                        <div className='w-[50%] text-sm flex  justify-center items-center'>
                                          <div className='flex flex-col gap-2'>
                                            <label htmlFor={`Rates.${index}.price`}>Price ($)</label>
                                              <Field
                                                name={`Rates.${index}.price`}
                                                placeholder=""
                                                type="number"
                                                className='text-center p-2 w-full rounded-md border'
                                              />
                                              <ErrorMessage name={`Rates.${index}.price`} component="div" className='text-[10px] text-red-600 mb-1'/>

                                          </div>

                                          <button onClick={() => remove(index)} disabled={values.Rates.length===1}>
                                            <svg fill="none" stroke="currentColor" className='w-7 h-7 mb-3 bg-red-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-5 mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                          </button>

                                          <button onClick={() => push({containerType: '', price: ''})} >
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
                              <div className="w-[150px] bg-orange-500 py-2 rounded-md mb-2 text-white font-bold flex justify-center items-center ml-3">
                              <button type="submit"> + Add</button>

                              </div>
                            </div>
                              </Form>
                          )}
                          </Formik>
                          </div>

                        
                        </div>

                      </div>

                      {/* <div className='w-full flex justify-center items-center mb-10'>
                        <button onClick={finalSubmit}
                          className="flex items-center justify-center max-w-[400px] px-6 py-3 text-base tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                          <span>Submit </span>

                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 rtl:-scale-x-100 mt-0.5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div> */}
                  
                  </div>
              </div>

              <AlertRate title={"New rate details"} send={handleSend} show={showAlert} close={()=>setShowAlert(false)} origin={origin} discharge={discharge} shipline={shipline} vdate={validDate} rates={rates} type={shmode} remarks={multiVal} destination={destination} zipcode={zipcode}/>
 
          </div>
      </div>
    </div>
    </>

      
      
      
      
      
      
      
      
      
      
      
      
    
    
    
  )
}

export default AddRates


