import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TextInput } from './TextInput'
import line from '../assets/line.jpg';
import ProgressBar from './ProgressBar';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Success from './Success';
import { useSelector } from 'react-redux';

var keyImg = '';

const AlertLines = ({show,title,close}) => {
    const navigate = useNavigate();
    const isURL = useSelector((state)=> state.url.isURL);
    var http = isURL;  

    const loggedUser = useSelector(state=> state.auth.value);

    const [lName, setlName] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [progresspercent, setProgresspercent] = useState(0);
    const [id, setId] = useState('');


    const [error, setError] = useState('')
    const [ldetails, setlDetails] = useState([])

    const [file, setFile] = useState('');
    const [doneUpload, setDoneUpload] = useState(false)

    useEffect(() => {
        setId(loggedUser.userID)   
    }, [loggedUser]);


    const send = ()=>{
        if(lName==='' || imageUrl===null){
            setError('Please fill the required details !!')
        }else{
            sendRequest();
            close();
            <Success title='New line' action='added' type='low' handleClick={()=>navigate("/settings")} />
        }
    }

    const sendRequest = async() =>{
        const addLine = { 
          LineName: lName.toUpperCase(), 
          LineLogo: keyImg,
          user: id
        }        
        axios
        .post(`${http}/api/line/add`,addLine)
        .then((res) => {
          console.log(res.data);
    
        setlDetails(res.data.lines)
      });
    }

    console.log(ldetails)

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        // alert(file)
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
        }
      }
  
      const handleUpload = async() => {
        if (!file) {
          alert("Please upload an image first!");
        }
  
        const storageRef = ref(storage, `/shippingLines/${file.name}`);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
          console.log(progresspercent)
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL)
            keyImg = downloadURL;
            if(keyImg!==""){
              setDoneUpload(true)
            }
          });
        }
      );
    }

    if(!show){
        return null
    }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 w-full z-20 flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-1/3 gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
            <div className='w-full flex flex-col justify-center items-center'>

                  <div className="mb-5 text-center mt-5">
                    <div className="mx-auto w-24 h-24 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                      {!image?
                      <img className="object-cover w-full h-24 rounded-full" src={line} alt='shipping logo'/>:
                      <img src={image} alt="preview" className="object-cover w-full h-24 rounded-full" />}

                    </div>
    
                    <div className='flex justify-center items-center gap-2 mb-3'>
                      <label 
                        for="fileInput"
                        type="button"
                        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>						
                        Browse Photo
                      </label>
                      <div className={`${doneUpload? "hidden": "flex"}`}>
                      {file!=='' && <svg fill="none" stroke="currentColor" onClick={handleUpload} stroke-width="1.5" className='w-10 h-10 shadow-md border-2 p-2 bg-orange-500 text-white cursor-pointer rounded-full' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"></path>
                      </svg>}
                      </div>
                    </div>
                    <ProgressBar progressPercentage={progresspercent} condition={doneUpload}/>
                 
                    <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" onChange={handleChange} />
                  

                  </div>
                  <div className='w-2/3 mt-2'>
                    <TextInput label='Shipping line' placeholder='' setValue={setlName} />
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

export default AlertLines