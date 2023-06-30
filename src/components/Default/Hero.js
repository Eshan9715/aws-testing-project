import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Adminapproval from './Adminapprovel';


const Hero = () => {
    const loggedUser = useSelector(state=> state.auth.value);
    const [assign,setAssign] = useState('')

    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setAssign(loggedUser.assignedTo)
    }, [loggedUser]);

    //console.log(user)

    const checkQuotes = ()=>{
        assign === 'pending'? setShow(true) : navigate('/dashboard')       
    }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-gray-900 justify-center items-center flex">
        <div className="flex md:max-w-7xl md:mx-auto">
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex-col justify-start md:max-w-2xl md:mx-auto items-center m-10 md:m-2'>
                        <h1 className="mb-4 my-16 text-2xl font-extrabold leading-none md:text-5xl xl:text-6xl text-white md:mx-5">Easiest way to book your cargo.</h1>
                        <p className="mb-6 font-light text-white lg:mb-8 md:text-base lg:text-lg md:mx-5 opacity-95">We provide 24/7 services at Freight-link International.
                        A shipment cannot be transported by sea without being booked and only booked shipments are accepted.</p>

                        <div className='flex md:flex'>
                            { !loggedUser.isLoggedIn && 
                            <Link to='/register' className='text-gray-800 hover:text-gray-400 duration-500 font-Monserrat '>
                            <button className='flex justify-center font-Monserrat py-3 px-6 rounded md:ml-5 bg-orange-500 gap-2 text-white hover:bg-white hover:text-black'>
                            New to here<svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                            </svg>
                            </button>
                            </Link>}

                            { loggedUser.isLoggedIn && 
                            <button onClick={checkQuotes} className='flex justify-center font-Monserrat py-3 px-6 rounded md:ml-5 bg-white gap-2 text-black hover:bg-orange-500 hover:text-white'>
                            Dashboard<svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                            </svg>
                            </button>
                        }

                        </div>
                    
                    </div>
                
                </div>

                <div className='flex justify-end items-center'>
                    <img src='https://www.aibl.lk/public/images/sub_service/29/marine-hull.jpg' alt="sea" className='hidden md:flex md:w-3/4 p-3 m-3 border rounded-xl'/>
                </div>

            </div>
        </div>

        <Adminapproval show={show} close={()=>setShow(false)} />

    </div>  
    )
}

export default Hero