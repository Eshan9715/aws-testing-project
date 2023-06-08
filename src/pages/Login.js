import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import { Form, Formik } from 'formik';
import { loginSchema } from '../components/userValidation';
import {TextFields} from '../components/TextFields'
import Navbar from '../components/Navbar';
import logbg from '../assets/loginbg.jpg';
import { login } from '../redux/authRedux';

const Login = () => {
  // const[isSignup, setIsSignup] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isURL = useSelector((state)=> state.url.isURL);
  var http = isURL;  
  console.log(isURL);
  const[loading, setLoading] = useState(false)

  const [details, setDetails] = useState([])

  const sendRequest = async(values) =>{
    const exisitngUser = {
      email:values.email,
      password: values.password,  
    }
    setLoading(true);

    axios
    .post(`${http}/api/auth/login`,exisitngUser)
    .then((res) => {
      console.log(res.data);
      // localStorage.setItem("userID",(res.data.user._id || res.data.member._id))
      // localStorage.setItem("userName",(res.data.user.name || res.data.member.name))
      // localStorage.setItem("userImage",(res.data.user.image || res.data.member.image))
      // localStorage.setItem("userEmail",(res.data.user.email || res.data.member.email))
      // localStorage.setItem("role",(res.data.user.role || res.data.member.role))
      // localStorage.setItem("assignedTo",(res.data.user.assignedTo))
      dispatch(
        login({userID:(res.data.user._id || res.data.member._id), userName:(res.data.user.name || res.data.member.name), 
          userEmail:(res.data.user.email || res.data.member.email) , role: (res.data.user.role || res.data.member.role),
          assignedTo: res.data.user.assignedTo, userImage: (res.data.user.image || res.data.member.image),
           isLoggedIn: true }))


    setDetails(res.data)
    setLoading(false)
    navigate('/dashboard')

  }).catch(err=> {
    console.log(err);
  });

}

  console.log(details)

  return (
    <>
    <Navbar/>
  
    {/* <LoadingView loading={loading}/> */}
    <div className="bg-gradient-to-b from-blue-500 to-gray-900">
        <div className="w-full flex justify-center min-h-screen">
            <div className="hidden bg-cover lg:block lg:w-1/2">
                <img src={logbg} alt='' className='h-full max-w-1/2'/>
            </div>

            <div className="flex mt-[80px] w-4/5 p-8 mx-auto lg:w-1/2">
                <div className="w-full">
                    <h1 className="text-2xl font-semibold tracking-wide text-white capitalize dark:text-white">
                        Welcome back.
                    </h1>
 
                
                
                    <Formik
                      initialValues={{                 
                        email: '',
                        password: '',
                       
                      }}
                      validationSchema={loginSchema}
                      onSubmit={values => {
                        // loading && <LoadingView/>
                        console.log(values);
                        sendRequest(values)
                          // .then(()=>navigate('/'))
                          .then(()=>console.log("Login Successfull!"));

                      }}
                    >
                      {formik => (
                        <div>
                          <Form className='w-4/5 my-10 bg-white px-16 py-5 rounded-xl'>                         
                            <TextFields label="Email" name="email" type="email" />
                            <TextFields label="password" name="password" type="password" />
                            <button type='submit'
                                className={`${loading? 'bg-green-500 justify-center gap-4':'bg-blue-500 justify-between'} flex items-center  w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 my-5`}>
                                {loading? <><i class="fa fa-spinner fa-spin"></i>Loading...</>: <p>Login</p> }

                                {!loading && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>}
                            </button> 
                          </Form>
                        </div>
                      )}
                  </Formik>


                    <p className="text-gray-200 mt-8">Not registered yet? <Link to='/register' class=" font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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


export default Login