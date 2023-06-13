import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextInput } from './TextInput'

const AddChapters = ({show,title,close}) => {
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  
    const loggedUser = useSelector(state=> state.auth.value);

    const [commudityType, setCommudityType] = useState('')
    const [hscode, setHSCode] = useState('')

    const [error, setError] = useState('')
    const [cdetails, setcDetails] = useState([])
    const [id, setId] = useState('');

    // const [id, setId] = useState('');

    useEffect(() => {
        setId(loggedUser.userID)
       
    }, [loggedUser]);

    const send = ()=>{
        if(commudityType==='' || hscode===''){
            setError('Please fill the required details !!')
        }else{
            sendRequest();
            close();
        }
    }

    const sendRequest = async() =>{
        const addhscode = { 
          Commudity: commudityType, 
          HSCode: hscode,
          user: id,
        }        
        axios
        .post(`${http}/api/hsCodes/add`,addhscode)
        .then((res) => {
          console.log(res.data);
    
        setcDetails(res.data)
      });
    }
    
    if(!show){
        return null
    }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-1/3 gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
            <div className='w-full flex justify-center items-center'>
                <div className='w-3/4 flex flex-col justify-center items-center gap-2'>
                    <TextInput label='commudity' placeholder='' setValue={setCommudityType} />
                    <TextInput label='HS code' placeholder='' setValue={setHSCode} />
                </div>

            </div>

            {error!=='' && <p className='text-xs text-center text-red-600 mb-1'>{error}</p> }
     
            <div className='flex w-full justify-center gap-5 items-center mb-5'>
                <button onClick={close} 
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>cancel</span>
                </button> 
                <button onClick={send} 
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>ok</span>
                </button> 
            </div>

            </div>

    </div>

    
    )
}

export default AddChapters