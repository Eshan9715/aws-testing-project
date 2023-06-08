import axios from 'axios';
import { Form, Formik } from 'formik';
import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TextFields } from '../components/TextFields';
import { userSchema1, userSchema2 } from '../components/userValidation';
import regbg from '../assets/regbg.jpg';
import Success from '../components/Success';
import Selects from '../components/Selects';

const Register = () => {
    const [details, setDetails] = useState([])
    const navigate = useNavigate();
    const isURL = useSelector((state)=> state.url.isURL);
  var http = isURL;  
    const tradeTerms = [{key:1, value:"Imports only"}, {key:2, value:"Exports only"}, {key:3, value:"Both"} ]

    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0])

    const sendRequest = async(values) =>{
        const newUser = {
          name:values.name,
          username:values.username,
          companyName: values.companyName,
          image:'https://firebasestorage.googleapis.com/v0/b/fl-booking-images-storage.appspot.com/o/files%2Fuser.png?alt=media&token=9f547adf-3ced-4e2a-8dfa-655af057da6e',
          email:values.email,
          password: values.password,  
          mobileNumber: values.mobileNum,
          tradeTerm: values.tradeTerm,
          assignedTo: 'pending',
          assignedCRD: 'pending'
        }

          axios
          .post(`${http}/api/auth/signup`,newUser)
          .then((res) => {
            console.log(res.data);
        
        setDetails(res.data)
      }).catch(err=> {
        console.log(err);
      });
      };

      const next = () => {
        setFormNo(formNo + 1)

      }
      const pre = () => {
        setFormNo(formNo - 1)
      }

      const oneLast = (values)=>{
        // handleUpload()
        console.log(values)
        sendRequest(values)
        .then(()=>navigate('/login'))
        .then(()=>console.log("Registration Successfull!"))
        next();
      }
    
  return (
    <>
      <Navbar/>
      <div className='bg-gradient-to-b from-blue-500 to-gray-900'>
        <div className="w-full flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-1/2">
                <img src={regbg} alt='' className='h-full max-w-1/2'/>
          </div>
      
          <div className="flex mt-[80px] w-4/5 p-8 mx-auto lg:w-1/2">
            <div className="w-full items-center">
              <h1 className="text-2xl font-semibold tracking-wider text-white capitalize dark:text-white mt-8">
                  Create your account here.</h1>

              <Formik className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 bg-slate-500"
                initialValues={{
                  name: '',
                  username: '',
                  companyName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  mobileNum:'',
                  tradeTerm: ''

                  // preShipments:'',
                  // comdoType:'',
                  // shipDate:''

                }}
                validationSchema={formNo===1? userSchema1 : userSchema2 }
                onSubmit={values => {
                  console.log(values);
                  formNo===2? oneLast(values) : next();
                  }}
                >
                {formik => (
                  <div className='w-full flex justify-start items-center'>
                    <Form className='w-[90%] mt-6 bg-white px-10 py-1 rounded-md'>

                    <div className='w-full flex justify-center items-center'>
                      {
                        formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
                          {v}
                        </div>
                          {
                            i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                          }
                        </>)
                      }
                    </div>

                    {
                      formNo === 1 && 
                      <>                     
                          <p className='text-center text-lg font-semibold my-2'>Personal Details</p>

                          <TextFields label="Name" name="name" type="text" placeholder="ex: Kamal Perera" />
                          <div className='w-full grid grid-cols-2 gap-4'>
                          <TextFields label="Username" name="username" type="text" placeholder="ex: Kamal9106" />
                          <TextFields label="Mobile number" name="mobileNum" type="number" placeholder="ex: 07X XXXXXXX" />
                          </div>
                          <TextFields label="Company Name" name="companyName" type="text" placeholder="ex: Clemwood Pvt.Ltd" /> 

                        <div className='w-full flex justify-center items-center'>
                        <div className='w-1/2 flex justify-center items-center mt-4 mb-2'>
                          <button type='submit'
                              className="flex items-center justify-center w-4/5 px-6 py-2 text-base tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                              <span>Next </span>

                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 rtl:-scale-x-100 mt-0.5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clip-rule="evenodd" />
                              </svg>
                          </button> 
                          </div>
                          </div>
                      
                      </>
                  
                    }

                    {
                      formNo === 2 && 
                      <div className='mt-2'>
                     
                        <p className='text-center text-lg font-semibold my-2'>Working Details</p>

                        <TextFields label="Work email" name="email" type="email" />
                        <div className='w-full grid grid-cols-2 gap-4'>
                        <TextFields label="Password" name="password" type="password" />
                        <TextFields label="Confirm password" name="confirmPassword" type="password" />
                        <Selects label='Trade term' name="tradeTerm" type="text" options={tradeTerms} />
                        </div>
                      
                        <div className='w-full flex justify-between items-center gap-5 mt-2'>
                          <button onClick={pre}
                          className="flex items-center justify-center w-full px-6 py-3 text-base tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">

                          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='w-4 h-4 mt-1 mr-2'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                          </svg>
                          <span>Previous </span>

                          </button> 

                          <button type='submit'
                          className="flex items-center justify-center w-full my-2 px-6 py-3 text-base tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                          <span>Submit </span>

                          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='w-4 h-4 mt-1 ml-2'>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                          </svg>
                          </button> 


                          {/* <button type='submit'
                                className={`${loading? 'bg-green-500 justify-center gap-4':'bg-blue-500 justify-between'} flex items-center  w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 my-5`}>
                                {loading? <><i class="fa fa-spinner fa-spin"></i>Loading...</>: Login }

                                {!loading && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>}
                            </button>  */}
                        </div>
                    
                      </div>
                    }

                    {
                      formNo === 3 && 
                      <Success title="your account" action="created!" type='low' handleClick={()=>navigate("/")}/>
                    }

                    </Form>
                  </div>
                )}
              </Formik>

              <p className="text-gray-200 mt-4 justify-start flex gap-3">Already have an account?  <Link to='/login' class=" font-medium inline-flex space-x-1 items-center"><span>Login now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></Link>
              </p>

            </div>
          </div>
        </div> 
      </div>
    </>
     
  )
}

export default Register