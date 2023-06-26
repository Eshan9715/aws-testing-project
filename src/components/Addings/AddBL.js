import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { CargoDesc, CargoQuantity, ConsigneeDetails, ContainerDetails, MarkNvalues, NotifyDetails, ShipperDetails } from '../Viewings/FormTemplates'
import { DialogBox } from '../DialogBoxes/DialogBox'

const AddBL = ({show,title,close,id, blData}) => {
    var http = process.env.REACT_APP_BASE_URL;
    const loggedUser = useSelector(state=> state.auth.value);
    var userID = loggedUser.userID
  
    const [shipper, setshipper] = useState([])
    const [consignee, setconsignee] = useState([])
    const [notify, setnotify] = useState([])
    const [bl, setbl] = useState([])

    const [isCheckValid, setisCheckValid] = useState(false)
    const [openDialog, setopenDialog] = useState(false)

    const [donesave, setDonesave] = useState(false)
    const [saving, setsaving] = useState(false)

    useEffect(() => {
      const getShipperData = ()=>{
          axios
          .get(`${http}/api/user/shipperData/${userID}`)
          .then((res) => {
            //console.log(res.data);
            setshipper(res.data.user?.shipperDetails)
          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getShipperData();

        const getConsigneeData = ()=>{
          axios
          .get(`${http}/api/user/consigneeData/${userID}`)
          .then((res) => {
            //console.log(res.data);
            setconsignee(res.data.user?.consigneeDetails)
          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getConsigneeData();

        const getNotifyData = ()=>{
          axios
          .get(`${http}/api/user/notifyData/${userID}`)
          .then((res) => {
            //console.log(res.data);
            setnotify(res.data.user?.notifyDetails)
          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getNotifyData();
  
  }, [userID,http,id]);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);            
    }

    // console.log(bl)

    const handleValidNext = () => {
        console.log(activeStep)
        if(activeStep===0){
          if(formData.shipperName!=='' && formData.shipperAddress!=='' && formData.shippermail!=='' && formData.shipperTele!=='' ){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);            
          }   
        }else if(activeStep===1){
          if(formData.consigneeName!=='' && formData.consigneeAddress!=='' && formData.consigneemail!=='' && formData.consigneeTele!=='' ){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);            
          }   
        }else if(activeStep===2){
          if(formData.notifyName!=='' && formData.notifyAddress!=='' && formData.notifymail!=='' && formData.notifyTele!=='' ){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);            
          }   
        }else if(activeStep===3){
          if(formData.markNvalues!==''){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);            
          }   
        }else if(activeStep===4){
          if(formData.cargoDesc!=='' ){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);            
          }   
        }else if(activeStep===5){
          if(formData.NoPackages!=='' && formData.GrossWeight!=='' && formData.NetWeight!=='' && formData.Volume!=='' ){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);  
          }   
        }else if(activeStep===6){
          if(formData.containerData!=='' && formData.sealData!==''){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);  
          }   
        }
  }
    
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const finalAdding = ()=>{
      sendRequest();
      close();
    }

    const [rdetails, setrDetails] = useState([])
    const [BLData, setBLData] = useState([])

    const [formData, setFormData] = useState({});

    useEffect(() => {
      setFormData(blData[0])
    }, [blData]);

    // console.log(blData[0])
    // console.log(formData)

    const steps = [
        {
          label: 'Shipper Details',
          description: <ShipperDetails formData={formData} setFormData={setFormData} ischeck={isCheckValid} data={shipper}  />,
        },
        {
          label: 'Consignee Details',
          description:
          <ConsigneeDetails formData={formData} setFormData={setFormData} ischeck={isCheckValid} data={consignee}  />,
        },
        {
          label: 'Notify Party Details',
          description: <NotifyDetails formData={formData} setFormData={setFormData} ischeck={isCheckValid} data={notify}  />,
        },
        {
          label: 'Mark & Numbers',
          description: <MarkNvalues formData={formData} setFormData={setFormData} ischeck={isCheckValid}  />,
        },
        {
          label: 'Cargo Description',
          description: <CargoDesc formData={formData} setFormData={setFormData} ischeck={isCheckValid}  />,
        },
        {
          label: 'Cargo Quantity In Numbers',
          description: <CargoQuantity formData={formData} setFormData={setFormData} ischeck={isCheckValid}  />,
        },
        {
          label: 'Container Data',
          description: <ContainerDetails formData={formData} setFormData={setFormData} ischeck={isCheckValid}  />,
        },
      ];

    const [pdetails, setpDetails] = useState([])

    useEffect(() => {
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
        //validate(val1);
    }, [http]);

    const sendRequest = async() =>{
        BLData.push(formData)
        //console.log(BLData)
        //console.log(BLData.length)

        const AddBL = { 
        id: id,
        status: 'b/l added',
        blData: BLData.map((item) => ({
          shipperName :  item.shipperName,
          shipperAddress : item.shipperAddress,
          shipperTele : item.shipperTele,
          shippermail : item.shippermail,
    
          consigneeName: item.consigneeName,
          consigneeAddress: item.consigneeAddress,
          consigneeTele: item.consigneeTele,
          consigneemail: item.consigneemail,
    
          notifyName: item.notifyName,
          notifyAddress: item.notifyAddress,
          notifyTele: item.notifyTele,
          notifymail: item.notifymail,
    
          markNvalues: item.markNvalues,
          cargoDesc: item.cargoDesc,
          NoPackages: item.NoPackages,
          GrossWeight: item.GrossWeight,
          NetWeight: item.NetWeight,
          Volume: item.Volume,

          containerData:item.containerData,
          sealData:item.sealData

          })),    
        }        
        axios
        .put(`${http}/api/fclquery/addBLData/${id}`,AddBL)
        .then((res) => {
          //console.log(res.data);
    
        setrDetails(res.data)
      });

      if(shipper?.filter(e=>e.shipperName).length===0 || (shipper?.filter(e=>!e.shipperName.includes(formData.shipperName)))){
        //console.log('shipppppppppppppp1')
        ship1();
      }
      if(consignee?.filter(e=>e.consigneeName).length===0 || (consignee?.filter(e=>!e.consigneeName.includes(formData.consigneeName)))){
        //console.log('shikkkkkkkkkkkkkkkkk1')
        ship2();
      }
      if(notify?.filter(e=>e.notifyName).length===0 || (notify?.filter(e=>!e.notifyName.includes(formData.notifyName)))){
        //console.log('shigggggggggggggggg1')
        ship3();
      }

    }

    const saveRequest = async() =>{
      BLData.push(formData)
      console.log(BLData)
      console.log(BLData.length)
      setsaving(true)

      const AddDBL = { 
      id: id,
      blData: BLData.map((item) => ({
        shipperName :  item.shipperName,
        shipperAddress : item.shipperAddress,
        shipperTele : item.shipperTele,
        shippermail : item.shippermail,
  
        consigneeName: item.consigneeName,
        consigneeAddress: item.consigneeAddress,
        consigneeTele: item.consigneeTele,
        consigneemail: item.consigneemail,
  
        notifyName: item.notifyName,
        notifyAddress: item.notifyAddress,
        notifyTele: item.notifyTele,
        notifymail: item.notifymail,
  
        markNvalues: item.markNvalues,
        cargoDesc: item.cargoDesc,
        NoPackages: item.NoPackages,
        GrossWeight: item.GrossWeight,
        NetWeight: item.NetWeight,
        Volume: item.Volume,

        containerData:item.containerData,
        sealData:item.sealData

        })),    
      }        
      axios
      .put(`${http}/api/fclquery/saveBLData/${id}`,AddDBL)
      .then((res) => {
        console.log(res.data);
        setDonesave(true)
        setsaving(false)
  
      setrDetails(res.data)
    });

  }
    const handleUpload = ()=>{
       setActiveStep(0);
       setisCheckValid(true) 
    }

    const setUpload = ()=>{
      setopenDialog(true);
     
    }

    const handleSave = ()=>{
      saveRequest();
      if(donesave){
        close();
      }
     }
  
   if(!show){
        return null
    }

    const ship1 = () =>{
      const AddShipperData = { 
        id: userID,
        shipperDetails: BLData.map((item) => ({
          shipperName :  item.shipperName,
          shipperAddress : item.shipperAddress,
          shipperTele : item.shipperTele,
          shippermail : item.shippermail,
          })),     
        }        
      axios
      .put(`${http}/api/user/addShipperData/${userID}`,AddShipperData)
      .then((res) => {
        console.log(res.data);
  
      setrDetails(res.data)
    });
  }

  const ship2 = () =>{
    const AddConsigneeData = { 
      id: userID,
      consigneeDetails: BLData.map((item) => ({    
        consigneeName: item.consigneeName,
        consigneeAddress: item.consigneeAddress,
        consigneeTele: item.consigneeTele,
        consigneemail: item.consigneemail,
        })),     
      }        
    axios
    .put(`${http}/api/user/addConsigneeData/${userID}`,AddConsigneeData)
    .then((res) => {
      console.log(res.data);

    setrDetails(res.data)
  });
}

  const ship3 = ()=>{
    const AddNotifyData = { 
      id: userID,
      notifyDetails: BLData.map((item) => ({
        notifyName: item.notifyName,
        notifyAddress: item.notifyAddress,
        notifyTele: item.notifyTele,
        notifymail: item.notifymail,
        })),     
      }        
    axios
    .put(`${http}/api/user/addNotifyData/${userID}`,AddNotifyData)
    .then((res) => {
      console.log(res.data);

    setrDetails(res.data)
  });

  
}

  return (
    <div className={`${show? "fixed inset-0" : "hidden"} bg-gray-900 bg-opacity-50 z-20 mt-16 w-full flex justify-center items-center md:ml-20`}>
      <DialogBox open={openDialog} close={()=>setopenDialog(false)} send={()=>finalAdding()}/>

        <div className='flex flex-col justify-center items-center bg-white w-[50%] rounded-lg shadow-lg'>
            <div className='w-full flex justify-center items-center bg-sky-700'>
                <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>{title}</h3>
                <svg fill="none" onClick={close} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>

            <div className='w-full flex justify-center items-center'>
                <div className='w-full bg-white px-10 py-1 rounded-md flex flex-col justify-start items-center max-h-[400px] overflow-y-auto'>

                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            optional={
                                index === 6 ? (
                                <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                            >
                            {step.label}
                            </StepLabel>
                            <StepContent>
                            <div>{step.description}</div>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                <Button
                                    variant="contained"
                                    onClick={isCheckValid? handleValidNext : handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                                </div>
                            </Box>
                            </StepContent>
                        </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                       
                          <div className='w-full justify-start items-center gap-2 flex mb-2 mt-2'>

                          {((!isCheckValid) || (!donesave)) && 
                          <button className='text-[13px] px-2 py-2 w-[130px] flex justify-center items-center gap-2 mx-4 text-blue-700 bg-white border-2 border-blue-700 rounded-lg active' onClick={handleReset}>Re-check</button>}
                          {!isCheckValid && <button onClick={handleSave} disabled={donesave}  className= {` ${donesave? 'bg-green-500': 'bg-red-500'} text-[13px] px-2 py-2 w-[130px] flex justify-center items-center gap-2 mx-4 text-white rounded-lg active`} >
                            {(saving && !donesave) && <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>}
                            {(!saving && !donesave) && 
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 text-white cursor-pointer rounded-full' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"></path>
                                </svg>
                            }
                            {donesave && <svg fill="none" stroke="currentColor" className='w-5 h-5 text-white cursor-pointer rounded-full' stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>}

                            {saving? 'saving...': donesave? 'saved': 'Save as draft'}
                          </button>}
                          
                          {!isCheckValid && <button className='text-[14px] px-2 py-2 w-[130px] flex justify-center items-center gap-2 mx-4 text-blue-700 bg-white border-2 border-blue-700 rounded-lg active' onClick={handleUpload}>Upload to system</button>}
                          {isCheckValid && <button className='text-[14px] font-bold px-2 py-2 w-[130px] flex justify-center items-center gap-2 mx-4 text-red-500 bg-white border-[3px] border-red-500 rounded-lg active' onClick={setUpload}>Upload</button>}

                          </div>
                        </Paper>
                    )}
                </Box>
                </div>
            </div>
        </div>              
    </div>
    
    )

}

export default AddBL