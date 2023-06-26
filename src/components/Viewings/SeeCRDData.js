import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import user from '../../assets/user.png'

//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const SeeCRDData = ({show,title,close,id,name,arr}) => {
    console.log(arr)
    const [salesmans, setSalesmans] = useState([])
    const [vcrds, setvcrds] = useState([])
    //console.log((vcrds.filter(t=>t._id===id)[0].assigned))


    var http = process.env.REACT_APP_BASE_URL;
 
    useEffect(() => {
        const getSalesmans = ()=>{
            axios
            .get(`${http}/api/member`)
            .then((res) => {
              //console.log(res.data);
              setSalesmans(res.data.member)
              setvcrds(salesmans.filter(e=>e.role==='crd'))
            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getSalesmans();
    
    }, [http,salesmans]);

    if(!show){
        return null
    }

  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 z-20 bg-opacity-50 w-full flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-[40%] gap-4 rounded-lg shadow-lg`}>
            <h3 className='text-lg font-semibold text-center p-4 bg-sky-700 text-white'>{title}</h3>
            <div className='w-full flex justify-center items-center'>

                <div className='w-[90%] flex flex-col justify-center items-center gap-2'>                  
                    {/* showCRD - CRD Count with salesman */}
                    {((vcrds.filter(t=>t._id===id)[0].assigned).length===0) &&
                    <p className='mb-2'>CRD <span className='font-semibold'>{name}</span> has no salesman yet!</p>}

                    {((vcrds.filter(t=>t._id===id)[0].assigned).length!==0) &&
                    <p className='mb-2'>CRD <span className='font-semibold'>{name}</span> work with <span className=' bg-red-500 text-white font-bold px-2 py-0.5 pb-1 mx-1 w-10 h-8 rounded-full'>{(vcrds.filter(t=>t._id===id)[0].assigned).length}</span> Salesman/s already!</p>}

                    {/* showCRD - already with salesman*/}
                    {arr?.map(p=>(
                      <div className='w-[95%] flex justify-between items-center'>
                        <div className='w-full flex justify-center gap-2'>
                          <img src={user} alt='' className='w-8 h-8 bg-slate-600 rounded-full -p-4'/>
                          <p>{p}</p>
                        </div>
                      </div>
                    ))}
  
                </div>

            </div>
     
            <div className='flex w-full justify-center gap-5 items-center mb-5'>
                <button onClick={close} 
                className="flex text-base items-center mt-3 justify-center w-[120px]  px-8 py-2 font-semibold text-white capitalize bg-red-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>ok</span>
                </button> 
            </div>

            </div>
        {/* </div> */}

    </div>

    
    )
}

export default SeeCRDData