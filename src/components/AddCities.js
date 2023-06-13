import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { codes } from '../Data'
import AutoCountry from './AutoCountry'
import { TextInput } from './TextInput'

const AddCities = ({show,title,close}) => {
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  
    const [cName, setcName] = useState('')
    const loggedUser = useSelector(state=> state.auth.value);

    const [pCountry, setCountry] = useState('')
    const [error, setError] = useState('')
    const [pdetails, setpDetails] = useState([])

    const [id, setId] = useState('');
    const [cod, setCod] = useState('')

    useEffect(() => {
        setId(loggedUser.userID)

        const getCCode = (country)=>{
            if(country===''){
              setCod(codes.filter(e=>e.name==='China')[0].code)
            }else if(checkCountry(country)){
                console.log((codes.filter(e=>e.name===country))[0].code)
                setCod(codes.filter(e=>e.name===country)[0].code)
            }else(
                setCod(codes.filter(e=>e.name==='India')[0].code)
    
            )      
        }
        getCCode(pCountry);
    
    }, [pCountry,loggedUser]);

    const send = ()=>{
        if(cName==='' || pCountry===''){
            setError('Please fill the required details !!')
        }else{
            sendRequest();
            close();
        }
    }

    const sendRequest = async() =>{
        const addCity = { 
          ObjectName: cName, 
          ObjectCode: '',
          CountryName: pCountry,
          user: id,
          CountryCode: cod,
          State: 'City'
        }        
        axios
        .post(`${http}/api/destination/add`,addCity)
        .then((res) => {
          console.log(res.data);
    
        setpDetails(res.data)
      });
    }

    const checkCountry = (country)=>{
        for(let i =0; i<codes.length; i++){
            if(codes[i].name===country){
                return true
            }
        }
        return false
    }

    console.log(pdetails.destination)
    
    if(!show){
        return null
    }

    console.log(pCountry)


  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-1/3 gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
            <div className='w-full flex justify-center items-center'>
                <div className='w-3/4 flex flex-col justify-center items-center gap-2'>

                        <AutoCountry options={codes} title="Country name"  setPortData={setCountry}/>
                        <input type="text" id="country" name="country" value={cod} readonly className='w-full p-4 border rounded-md'/>
                        <TextInput label='City name' placeholder='' setValue={setcName} />
                       
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
        {/* </div> */}

    </div>

    
    )
}

export default AddCities