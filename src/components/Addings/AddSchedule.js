import {TextField } from '@mui/material'
import axios from 'axios'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSchema9, userSchema9L } from '../Default/userValidation'

var Schedules=[];
var LSchedules=[];

const AddSchedules = ({show,title,close,id,containerMode}) => {
    var http = process.env.REACT_APP_BASE_URL;
  
    const navigate = useNavigate();

    const [yard, setyard] = useState('')

    const initialValues = {
        SSchedules: [
            {  
              Vessel: '',
              Voyage: '',
              ETD: '',
              ETA: '',
              Transit: '',
              ShipMode: '',
              Transhipments: '',            
            },
          ],
    }

    const initialLValues = {
        SSchedules: [
            {  
              Vessel: '',
              Voyage: '',
              ETAD: '',
              ETAC: '',
              ETDC: '',
              LCLClosingDate: '',
              LCLClosingTime: '',                     
            },
          ],
    }

    const sendRequest = async() =>{
        const addSchedules = { 
        schedules: 
        Schedules.map((item) => ({
            vessel: item.Vessel.toUpperCase(),
            voyage: item.Voyage.toUpperCase(),
            ETD: item.ETD,
            ETA: item.ETA,
            transit: item.Transit,
            shipMode: item.ShipMode,
            transhipments: item.Transhipments,
            isFinal: false
         
            })), 
        status:'vessel pending'
        }        
        axios
        .put(`${http}/api/fclquery/addSchedule/${id}`,addSchedules)
        .then((res) => {
          console.log(res.data);
    
      });
      navigate('/req')
    }

    const sendNewRequest = async() =>{
        const addNSchedules = { 
        schedules: 
        Schedules.map((item) => ({
            vessel: item.Vessel.toUpperCase(),
            voyage: item.Voyage.toUpperCase(),
            ETD: item.ETD,
            ETA: item.ETA,
            transit: item.Transit,
            shipMode: item.ShipMode,
            transhipments: item.Transhipments,
            isFinal: false
         
            })), 
        }        
        axios
        .put(`${http}/api/fclquery/addNewSchedule/${id}`,addNSchedules)
        .then((res) => {
          console.log(res.data);         
    
      });
      navigate('/req')

    }
    

    const sendLRequest = async() =>{
        const addSchedules = { 
        schedules: 
        LSchedules.map((item) => ({
            vessel: item.Vessel.toUpperCase(),
            voyage: item.Voyage.toUpperCase(),
            ETAD: item.ETAD,
            ETAC: item.ETAC,
            ETDC: item.ETDC,
            LCLClosingDate: item.LCLClosingDate,
            LCLClosingTime: item.LCLClosingTime,
            isFinal: false

            })), 
        id: id,
        status:'vessel pending',
        yard: yard
        }        
        axios
        .put(`${http}/api/lclquery/addSchedule/${id}`,addSchedules)
        .then((res) => {
          console.log(res.data);
    
      });
      navigate('/req')


    }
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+dd;

    if(!show){
        return null
    }


  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-10 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
            <div className={`${containerMode==='FCL'? 'w-[75%]':'w-[85%]'}  flex flex-col bg-white gap-4 rounded-lg shadow-lg`}>
            <div className='w-full flex justify-center items-center bg-sky-700'>
                <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>{title}</h3>
                <svg fill="none" onClick={close} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>

            <div className='w-full flex flex-col justify-center items-center p-3'>

            {containerMode==='FCL'?
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema9}
                    onSubmit={async (values) => {
                    console.log(values);
                    Schedules = [...values.SSchedules]
                    
                    console.log(Schedules);
                    title==='Add Schedule' && sendRequest()
                      .then(()=>close())
                      .then(()=>window.location.reload(false))

                    title==='Add New Schedule' &&
                    sendNewRequest()
                      .then(()=>close())
                      .then(()=> window.location.reload(false))

                    }}                                                    
                >
        
                {({ values }) => (
                    <Form>
                    <FieldArray name="SSchedules">
                        {({remove, push,setFieldValue}) => (
                        <div className='divide-y divide-solid divide-gray-300 overflow-y-auto mb-2 max-w-[100%] max-h-[235px]  overflow-x-auto'>
                            {values.SSchedules?.length > 0 &&
                            values.SSchedules?.map((container, index) => (
                                <div className='grid grid-cols-8 w-full justify-center items-center gap-1 p-1 mb-2' key={index}>

                                <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.Vessel`}>Vessel</label>
                                            <Field 
                                                name={`SSchedules.${index}.Vessel`}
                                                placeholder=""                                                                                                
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.Vessel`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.Voyage`}>Voyage</label>
                                            <Field 
                                                name={`SSchedules.${index}.Voyage`}
                                                placeholder=""                                                                                                
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.Voyage`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                            <label htmlFor={`SSchedules.${index}.ETD`}>ETA-Colombo</label>
                                            <Field 
                                                name={`SSchedules.${index}.ETD`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.ETD`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                
                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.ETA`}>ETA-Destination</label>
                                            <Field 
                                                name={`SSchedules.${index}.ETA`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.ETA`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                    <label htmlFor={`SSchedules.${index}.Transit`}>Transit</label>
                                        <Field
                                        name={`SSchedules.${index}.Transit`}
                                        placeholder=""
                                        type="number"
                                        className='text-center p-2 w-full rounded-md border'
                                        />
                                        <ErrorMessage name={`SSchedules.${index}.Transit`} component="div" className='text-[12px] text-red-600 mb-1'/>

                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                        <label htmlFor={`SSchedules.${index}.ShipMode`}>ShipMode</label>
                                        <Field as="select" 
                                            name={`SSchedules.${index}.ShipMode`}
                                            className='text-center p-2 w-full rounded-md border'>
                                            <option value={''} key={index}>Select ShipMode</option>
                                            <option value="Direct">Direct</option>
                                            <option value="Transhipment">Tranship</option>                                          

                                        </Field>
                                                                         
                                        <ErrorMessage name={`SSchedules.${index}.ShipMode`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                        <label htmlFor={`SSchedules.${index}.Transhipments`}>Transhipments</label>
                                        <Field 
                                                name={`SSchedules.${index}.Transhipments`}
                                                placeholder="Optional"                                                                                                
                                                className='text-center p-2 w-full rounded-md border'/>
                                                          
                                                                      
                                        <ErrorMessage name={`SSchedules.${index}.Transhipments`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='flex w-full gap-2'>
                                        <button onClick={() => remove(index)} disabled={values.SSchedules.length===1}>
                                                    <svg fill="none" stroke="currentColor" className='w-7 h-7 mb-3 bg-red-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-5 mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>

                                                <button onClick={() => push({ Vessel: '',Voyage: '',ETD: '',ETA: '',Transit: '',ShipMode: '',Transhipments: '' })} >
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
                    <div className='w-full flex justify-center items-center'>
                        <button className='py-1.5 ml-2 min-w-[150px] items-center border-2 border-black bg-white px-8 hover:bg-orange-500 hover:text-white hover:border-none rounded-md' type="submit">Add</button>

                    </div>
                    </Form>
                )}
                </Formik>
            </>:

            <>
                <Formik
                    initialValues={initialLValues}
                    validationSchema={userSchema9L}
                    onSubmit={async (values) => {
                    console.log(values);
                    LSchedules = [...values.SSchedules]
                   
                    console.log(LSchedules);
                    sendLRequest()
                      .then(()=>close())
                      .then(()=>window.location.reload(false))
                                       
                    }}
                >
        
                {({ values }) => (
                    <Form>
                    <FieldArray name="SSchedules">
                        {({remove, push,setFieldValue}) => (
                        <div className='divide-y divide-solid divide-gray-300 overflow-y-auto mb-2 max-w-[100%] max-h-[235px]  overflow-x-auto'>
                            {values.SSchedules?.length > 0 &&
                            values.SSchedules?.map((container, index) => (
                                <div className='grid grid-cols-8 w-full justify-center items-center gap-0.5 p-1 mb-2' key={index}>

                                <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.Vessel`}>Vessel</label>
                                            <Field 
                                                name={`SSchedules.${index}.Vessel`}
                                                placeholder=""                                                                                                
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.Vessel`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.Voyage`}>Voyage</label>
                                            <Field 
                                                name={`SSchedules.${index}.Voyage`}
                                                placeholder=""                                                                                                
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.Voyage`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                            <label htmlFor={`SSchedules.${index}.ETAC`}>ETA-Colmobo</label>
                                            <Field 
                                                name={`SSchedules.${index}.ETAC`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.ETAC`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                
                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.ETDC`}>ETD-Colombo</label>
                                            <Field 
                                                name={`SSchedules.${index}.ETDC`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.ETDC`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.ETAD`}>ETA-Destination</label>
                                            <Field 
                                                name={`SSchedules.${index}.ETAD`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.ETAD`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>

                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SSchedules.${index}.LCLClosingDate`}>LCL Closing Date</label>
                                            <Field 
                                                name={`SSchedules.${index}.LCLClosingDate`}
                                                placeholder=""
                                                type="date"
                                                format='MMM Do YYYY'
                                                min={today}
                                                className='text-center p-2 w-full rounded-md border'/>

                                        <ErrorMessage name={`SSchedules.${index}.LCLClosingDate`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                    <label htmlFor={`SSchedules.${index}.LCLClosingTime`}>LCL Closing Time</label>
                                        <Field
                                        name={`SSchedules.${index}.LCLClosingTime`}
                                        placeholder=""
                                        type="time"
                                        className='text-center p-2 w-full rounded-md border'
                                        />
                                        <ErrorMessage name={`SSchedules.${index}.LCLClosingTime`} component="div" className='text-[12px] text-red-600 mb-1'/>

                                    </div>                                 
                                  
                                    <div className='flex w-full gap-2'>
                                        <button onClick={() => remove(index)} disabled={values.SSchedules.length===1}>
                                                    <svg fill="none" stroke="currentColor" className='w-7 h-7 mb-3 bg-red-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-5 mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>

                                                <button onClick={() => push({ Vessel: '',Voyage: '',ETAD: '',ETAC: '',ETDC: '',LCLClosingDate:'', LCLClosingTime:'' })} >
                                                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-7 h-7 mb-3 bg-green-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-1 mt-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                        <div className='w-1/3 justify-center items-center flex flex-col'>
                            <TextField
                                id="outlined-multiline-static"
                                label="HandingOver Yard"
                                multiline
                                value={yard}
                                placeholder="Hint: Add the cargo collecting yard here.."
                                className='w-full'
                                size='small'
                                onChange={e=>setyard(e.target.value)}
                            />
                            {yard==='' && <p className='text-[12px] text-red-600 mb-1 justify-start flex'>Please add yard name here</p>}
                        </div>
                       
                        <button className='py-2 ml-2 items-center text-white bg-slate-600 px-8 hover:bg-orange-500 hover:text-white rounded-md' type="submit">Add</button>                       
                    </div>

                    </Form>
                )}
                </Formik>
            </>

            }                     
            </div>          
            </div>
    </div>   
    )
}

export default AddSchedules