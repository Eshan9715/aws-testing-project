import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
import axios from 'axios'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lclRates, userSchema8 } from '../Default/userValidation'
import { TextFields } from '../TextUI/TextFields'
import Automan from '../TextUI/AutoText'

var rates=[];
var lRates = {}
var lratesArr = []
var lre=[];


const AddRates = ({show,title,close,id,type,mode, loggedID,loggedName}) => {
  var http = process.env.REACT_APP_BASE_URL;
  
    const navigate = useNavigate();
    const [re, setRe] = useState([])

    const [ldetails, setlDetails] = useState([])
    const [memData, setmemData] = useState([])

    const [click, setClick] = useState(false)
    const [sclick, setsClick] = useState(false)

    const [cName, setcName] = useState('')

    const [checked, setChecked] = useState(false);

    const [salremarks, setsalRemarks] = useState({
        status:'', remark:'',timeVal:'',userID: loggedID, adder: loggedName, refID:''}
    )
    const handleChecked = (event) => {
      setChecked(event.target.checked);
      console.log(!checked)
    };

    useEffect(() => {

        const getRemarks = ()=>{
            axios
            .get(`${http}/api/fclquery/${id}`)
            .then((res) => {
              //console.log(res.data);
              setRe(res.data.fclquery.remarks)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getRemarks();

          const getLines = ()=>{
            axios
            .get(`${http}/api/line`)
            .then((res) => {
              //console.log(res.data);
              setlDetails(res.data.lines)
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getLines();

          const getMember = ()=>{
            axios
            .get(`${http}/api/member?type=lcl-crd`)
            .then((res) => {
              //console.log(res.data);
              setmemData(res.data.member)
              // setFQueryData(res.data.fclqueries)
            })
            .catch(err=> {
              console.log(err);
            })     
        
          }
          getMember();
    
    }, [id,http]);

    const initialLCL = {
        rate: '',
        validDate: '',
      }

    const initialValues = {
        SRates: [
            {  
              sLine: '',
              containerType: '',
              rate: '',
              date: ''
            },
          ],
    }

    const send = ()=>{
      setsClick(true)
      if(cName!==''){    
        sendLSRequest()
          .then(()=>close())
          // window.location.reload(false)     
      } 
    }

    const sendRequest = async() =>{
        //setsalRemarks({...salremarks, status: 'rates confirmation' })
        salremarks.status = 'rates confirmation'
        salremarks.timeVal = new Date()

        re.push(salremarks)
        console.log(re)
        const addRates = { 
        rates: 
        rates.map((item) => ({
                shipLine: item.sLine,
                validDate: item.date,
                container: item.containerType,
                rate: item.rate,
                isFinal: false
            })), 
        id: id,
        remarks:
        re.map((item) => ({
            status: item.status,
            remark: item.remark,
            dDate: item.timeVal,
            userID: item.userID,
            adder: item.adder,
            refID:''
        })), 
        
        status:'rates confirmation',
        }        
        axios
        .put(`${http}/api/fclquery/addRates/${id}`,addRates)
        .then((res) => {
          //console.log(res.data);
    
      });
      salremarks.status=''
      salremarks.remark=''
      salremarks.timeVal=''

      re.length=0;
    }

    const sendFNRequest = async() =>{
      const addNewRates = { 
      rates: 
      rates.map((item) => ({
              shipLine: item.sLine,
              validDate: item.date,
              container: item.containerType,
              rate: item.rate,
              isFinal: true
          })), 
      id: id,
      }        
      axios
      .put(`${http}/api/fclquery/addNewRate/${id}`,addNewRates)
      .then((res) => {
        //console.log(res.data);
  
    });
    sendFSStatus();
  
  }

  const sendLNRequest = async() =>{
    const addLNewRates = {  
    rates: 
    lratesArr.map((item) => ({
      rate: item.rate,
      validDate: item.validDate,
      isFinal: true
      
    })), 
    }        
    axios
    .put(`${http}/api/lclquery/addNewRate/${id}`,addLNewRates)
    .then((res) => {
      //console.log(res.data);

  });
  sendFSStatus();

}

  const sendFSStatus = async() =>{
    const alterStatus = { 
    status:'rates confirmation',
    }        
    axios
    .put(`${http}/api/fclquery/alterStatus/${id}`,alterStatus)
    .then((res) => {
      //console.log(res.data);
    });
    //setOpen(false);
    navigate('/dashboard')
}

  const sendLRequest = async() =>{
        // setsalRemarks({...salremarks, status: 'rates confirmation' })
        salremarks.status = 'rates confirmation'
        salremarks.timeVal = new Date()

        //lre.push(salremarks)
        console.log(lre)
        
        const addRates = { 
        // rates: lRates,
        rates: 
        lratesArr.map((item) => ({
          rate: item.rate,
          validDate: item.validDate,
          isFinal: false
          
        })), 
        id: id,
        remarks:
        lre.map((item) => ({
            status: item.status,
            remark: item.remark,
            dDate: item.timeVal,
            userID: item.userID,
            adder: item.adder,
            refID:''

        })), 
        
        status:'rates confirmation',
        crd: ""
        }        
        axios
        .put(`${http}/api/lclquery/addRates/${id}`,addRates)
        .then((res) => {
          //console.log(res.data);
    
      });
      // salremarks.status=''
      // salremarks.remark=''
      // salremarks.timeVal=''
      // re.length=0;
      // lratesArr.length=0;

      //close();
      //navigate('/dashboard')
  }


  const sendLSRequest = async() =>{
    // setsalRemarks({...salremarks, status: 'rates confirmation' })
    console.log(lratesArr)

    salremarks.status = 'rates confirmation'
    salremarks.timeVal = new Date()

    //lre.push(salremarks)
    console.log(re)
    
    const addRates = { 
    // rates: lRates,
    rates: 
    lratesArr.map((item) => ({
      rate: item.rate,
      validDate: item.validDate,
      isFinal: false
      
    })), 
    id: id,
    remarks:
    lre.map((item) => ({
        status: item.status,
        remark: item.remark,
        dDate: item.timeVal,
        userID: item.userID,
        adder: item.adder,
        refID:''

    })), 
    
    status:'rates confirmation',
    crd: cName
    }        
    axios
    .put(`${http}/api/lclquery/addRates/${id}`,addRates)
    .then((res) => {
      //console.log(res.data);
  });
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
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 z-20 w-full flex justify-center items-center md:ml-20`}>
            <div className={`w-[55%] flex flex-col bg-white gap-4 rounded-lg shadow-lg`}>
            <div className='w-full flex justify-center items-center bg-sky-700'>
                <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>{title}</h3>
                <svg fill="none" onClick={close} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>

            <div className='w-full flex flex-col justify-center items-center p-3'>

            {type==='FCL'?
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={userSchema8}
                    onSubmit={async (values) => {
                    console.log(values);
                    rates = [...values.SRates]
                    rates.forEach(value => {
                        value.date = moment(value.date).format('MMM Do YYYY');
                    })
                    console.log(rates);
                    title==='Add rates' &&
                    sendRequest()
                      .then(()=>close())
                      .then(()=>window.location.reload(false)) 

                    title==='Add new rates' &&
                    sendFNRequest()
                      .then(()=>close())
                      .then(()=> window.location.reload(false))

                    }}
                >
        
                {({ values }) => (
                    <Form>
                    <FieldArray name="SRates">
                        {({remove, push,setFieldValue}) => (
                        <div className='divide-y divide-solid divide-gray-300 overflow-y-auto mb-2 max-w-[100%] max-h-[200px]  overflow-x-auto'>
                            {values.SRates?.length > 0 &&
                            values.SRates?.map((container, index) => (
                                <div className='flex w-full justify-center items-center gap-1 p-1' key={index}>

                                    <div className='p-1 text-sm flex flex-col gap-2'>
                                            <label htmlFor={`SRates.${index}.sLine`}>Shipping line</label>
                                            <Field as="select" 
                                                name={`SRates.${index}.sLine`}
                                                className='text-center p-2 w-[180px] rounded-md border'>
                                                <option value={''} key={index}>Select shipLine</option>

                                                {ldetails.map((r,index)=>
                                                    <option value={r.LineName} key={index}>{r.LineName}</option>
                                                )}
                                            </Field>
                                     
                                    
                                        <ErrorMessage name={`SRates.${index}.sLine`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                
                                    <div className='p-1 text-sm flex flex-col gap-2 mr-2'>
                                            <label htmlFor={`SRates.${index}.containerType`}>Container type</label>
                                            <Field as="select" 
                                                name={`SRates.${index}.containerType`}
                                                className='text-center p-2 w-[150px] rounded-md border'>
                                                <option value={''} key={index}>Select Container</option>
                                                <option value="20 GP">20 GP</option>
                                                <option value="40 GP">40 GP</option>
                                                <option value="40 HC">40 HC</option>
                                                <option value="45 HC">45 HC</option>
                                                <option value="20 RG">20 RG</option>
                                                <option value="40 RG">40 RG</option>

                                            </Field>
                                     
                                    
                                        <ErrorMessage name={`SRates.${index}.containerType`} component="div" className='text-[12px] text-red-600 mb-1'/>                                                  
                                    </div>
                                
                                    <div className='text-sm flex  justify-center items-center ml-1'>

                                        <div className='flex flex-col gap-2'>
                                        <label htmlFor={`SRates.${index}.rate`}>Rate</label>
                                            <Field
                                            name={`SRates.${index}.rate`}
                                            placeholder=""
                                            type="number"
                                            className='text-center p-2 w-[150px] rounded-md border'
                                            />
                                            <ErrorMessage name={`SRates.${index}.rate`} component="div" className='text-[10px] text-red-600 mb-1'/>

                                        </div>

                                        <div className='flex flex-col gap-2 ml-2'>
                                        <label htmlFor={`SRates.${index}.date`}>Valid until</label>
                                            <Field
                                            name={`SRates.${index}.date`}
                                            placeholder=""
                                            type="date"
                                            format='MMM Do YYYY'
                                            min={today}
                                            className='text-center p-2 w-[150px] rounded-md border'
                                            />
                                            <ErrorMessage name={`SRates.${index}.date`} component="div" className='text-[10px] text-red-600 mb-1'/>

                                        </div>

                                        <button onClick={() => remove(index)} disabled={values.SRates.length===1}>
                                                    <svg fill="none" stroke="currentColor" className='w-7 h-7 mb-3 bg-red-600 p-1 text-white cursor-pointer font-extrabold rounded-full ml-5 mt-5' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>

                                                <button onClick={() => push({ sLine: '', containerType: '',  rate: '', date: ''})} >
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
                        {title!=='Add new rates' && <TextField
                            id="outlined-multiline-static"
                            label="Remarks"
                            multiline
                            value={salremarks.remark}
                            placeholder="Hint: Break the line by adding comma"
                            className='w-3/4'
                            size='small'
                            onChange={e=>setsalRemarks({...salremarks, remark: e.target.value })}
                        />}

                        {title==='Add new rates' && <FormGroup>
                          <FormControlLabel required control={<Switch />} label="Set as finalized rate*" onChange={handleChecked} />
                        </FormGroup>}

                        <button className='py-2 ml-2 items-center text-white bg-slate-600 px-8 hover:bg-orange-500 hover:text-white rounded-md' type="submit">Add</button>

                        
                    </div>
                    </Form>
                )}
                </Formik>
            </>:
            <>
                <Formik
                      initialValues={initialLCL}
                      validationSchema={lclRates}
                      onSubmit={values => {
                        values.validDate = moment(values.validDate).format('MMM Do YYYY');
                        console.log(values);
                        lRates = {...initialLCL, ...values}
                        console.log(lRates);
                        lratesArr[0] = lRates;
                        console.log(lratesArr)
                        setClick(true)
                        
                        mode==="" && sendLRequest()
                        .then(()=>close())
                        // .then(()=>window.location.reload(false)) 

                        title==='Add new rates' &&
                          sendLNRequest()
                            .then(()=>close())
                            .then(()=> window.location.reload(false))
                                              
                      }}
                    >
                      {formik => (
                        <div className='w-4/5'>
                          <Form className='w-full flex flex-col justify-start items-center gap-3'> 
                            <div className='w-full flex justify-center items-center gap-3'>

                            
                              <p className='py-2 px-2 min-w-[100px] rounded-md text-center font-semibold border-2 border-black mt-4 mr-4'>1 Cbm</p>                        
                              <TextFields label="Rate ($)" name="rate" type="number" />
                              <TextFields label="Valid Until" name="validDate" min={today} type="date" />
                            </div>

                            {mode!=="" && <>
                            <div className='w-full flex justify-start items-center'>
                            <p className='w-1/4 text-[13.5px]'>Add remarks for shipper</p>
                            <div className='h-0.5 bg-gray-300 w-3/4 my-2 px-4'></div>

                            </div>
                            <div className="w-full flex justify-start items-center">
                              <TextField
                                  id="outlined-multiline-static"
                                  label="Remarks"
                                  multiline
                                  value={salremarks.remark}
                                  placeholder="Hint: Break the line by adding comma"
                                  className='w-3/4'
                                  size='small'
                                  onChange={e=>setsalRemarks({...salremarks, remark: e.target.value })}
                              />
                              <button className={`w-1/4 py-2 ml-2 items-center text-white ${click? 'bg-slate-300':'bg-slate-600 hover:bg-orange-500 hover:text-white'}  px-8  rounded-md`} type="submit" disabled={click}>Add</button>
                            </div>

                            {click && <>
                            <div className='w-full flex justify-start items-center'>
                            <p className='w-2/5 text-[13.5px]'>Add operator to continue this shipment</p>
                            <div className='h-0.5 bg-gray-300 w-3/5 my-2 px-4'></div>

                            </div>

                            <div className="w-full flex justify-start items-center">
                            <div className='w-3/4'>
                              <div className='w-full flex flex-col'>
                                <Automan title="Operator name" type={'small'} options={memData} setSlData={setcName}/>
                                {((cName==='') && (sclick)) && <p className='text-[13px] text-red-600 mb-1'>Add operator here!</p>}
                              </div>                  
                            </div>
                            <button onClick={send} className='w-1/4 py-2 ml-2 items-center text-white bg-slate-600 px-8 hover:bg-orange-500 hover:text-white rounded-md'>Add</button>

                            </div>
                            </>}
                            </>}

                            {mode==="" && <>
                            {title==='Add new rates' && <button className='w-1/4 py-2 ml-2 items-center text-white bg-slate-600 px-8 hover:bg-orange-500 hover:text-white rounded-md' type="submit">Add</button>}

                            {title!=='Add new rates' && <div className='w-full flex justify-start items-center'>
                            <p className='w-1/4 text-[13.5px]'>Add remarks for shipper</p>
                            <div className='h-0.5 bg-gray-300 w-3/4 my-2 px-4'></div>

                            </div>}
                            {title!=='Add new rates' && <div className='w-full flex justify-start items-center'>
                              <TextField
                                  id="outlined-multiline-static"
                                  label="Remarks"
                                  multiline
                                  value={salremarks.remark}
                                  placeholder="Hint: Break the line by adding comma"
                                  className='w-3/4'
                                  size='small'
                                  onChange={e=>setsalRemarks({...salremarks, remark: e.target.value })}
                              />
                              <button className='w-1/4 py-2 ml-2 items-center text-white bg-slate-600 px-8 hover:bg-orange-500 hover:text-white rounded-md' type="submit">Add</button>
                            </div>}
                            </>}
                          </Form>
                        </div>
                      )}
                </Formik>
            </>}     
            </div>
            </div>
    </div> 
    )
}

export default AddRates