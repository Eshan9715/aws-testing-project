import React, { useEffect, useState } from 'react'
import SliderDashTabs from '../../sliders/SliderDashTabs'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ctabData, recentAct, recentMails } from '../../Data';
import DBTable from '../../components/Viewings/DBTable';
import SliderVertical from '../../sliders/SliderVertical';
// import Slider from '../sliders/Slider'
// import SliderAct from '../sliders/SliderActs'
// import { recentAct, recentMails} from '../Data'
// import SliderMails from '../sliders/SliderMails'
var cRfinalizedFullCargo = []

const CrdDashboard = () => {
    var http = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState('')
    const loggedUser = useSelector(state=> state.auth.value);

    const [viewRates, setViewRates] = useState([])
    const [cfrueryData, setcFRueryData] = useState([])
    const [clrueryData, setcLRueryData] = useState([])

    useEffect(() => {
        setName(loggedUser.userName)

        const getsalesRueries = ()=>{
            axios
           .get(`${http}/api/fclquery?crd=${name}`)
           .then((res) => {
             //console.log(res.data);
             setcFRueryData(res.data.fclqueries)
           })
           .catch(err=> {
             console.log(err);
           })     
 
           axios
           .get(`${http}/api/lclquery?crd=${name}`)
           .then((res) => {
             //console.log(res.data);
             setcLRueryData(res.data.lclqueries)
           })
           .catch(err=> {
             console.log(err);
           })   
         }
         getsalesRueries();
         
        
    }, [http,name,loggedUser]);

    cRfinalizedFullCargo = [...cfrueryData, ...clrueryData]
    //console.log(sRfinalizedFullCargo)


    const gridParts = [
        {
            id:1,
            desc: "Clients",
            val: 5,
            icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
          </svg>
        },
        {
            id:2,
            desc: "Sales persons",
            val: 3,
            icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
          </svg>
        },
        {
            id:3,
            desc: "FCLs",
            val: 13,
            icon: <svg fill="none" stroke="currentColor" className="w-12 h-12 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
          </svg>
        },
        {
            id:4,
            desc: "LCLs",
            val: 13,
            icon: <svg fill="none" stroke="currentColor" className="w-12 h-12 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
          </svg>
        },
        {
            id:5,
            desc: "Completed",
            val: 6,
            icon:<svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"></path>
          </svg>
        },
       
]
  return (
    <>
    {/* <Navbar/>
    <Sidenavbar role='crd'/> */}
    <div className='w-full flex justify-center items-center'>
        <div className='w-[95%] mt-2'>
            <div className='grid grid-cols-5 h-[70px] gap-4'>
            {gridParts.map((part)=>(
                <div className='p-2 border-2 w-full flex justify-between items-center bg-white rounded-lg'>
                    <div>{part.icon}</div>
                    <div className='flex justify-end items-center gap-1 '>
                        <p className='font-semibold text-lg text-right bg-red-500 rounded-full w-8 h-8 flex justify-center items-center text-white'>{part.val}</p>
                        <p className='font-semibold text-lg text-right'>{part.desc}</p>
                    </div>                  
                </div>
            ))}

            </div>  

            <div className='h-0.5 bg-gray-200 w-full my-2 px-4'></div>

            <div className='w-full flex justify-start items-start gap-3'>
              <div className='w-[20%] flex flex-col gap-2 items-start '>
                <SliderDashTabs SData={cRfinalizedFullCargo} Data={ctabData} type='dashbar' align='vertiz' />
              </div>
              <div className='w-[80%] flex flex-col gap-2 items-start '>
              <div className='w-full flex justify-between'>
                <p className='font-semibold text-[16.5px] text-left'>B/L Cut-Offs</p>
                {/* <p className='text-[16.5px] text-left border rounded-md px-3 py-1 hover:bg-orange-500 hover:text-white cursor-pointer'>See more</p> */}
              </div>
              <DBTable type='crd'/>
              </div>
            </div>

            <div className='grid grid-cols-2 h-[100px] gap-4'>

            <div className='flex flex-col my-1.5'>
                    <div className='w-full flex justify-between items-center bg-white rounded-lg p-4'>
                        <div className='flex justify-center items-center gap-2'>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                        </svg>
                        <p className='font-semibold text-lg'>Recent activities</p>           
                        </div>
                        <button type='submit'
                            className="flex items-center justify-between w-[100px] px-3 py-1.5 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>view</span>

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button> 
                    </div> 

                    <SliderVertical data={recentAct} type='tasks'/>   
                    
                    {/* {recentAct.map(act=>(
                        <div className="w-full flex px-3 py-2 bg-white shadow-md hover:shodow-lg rounded-lg mt-5" key={act.id}>
                            <div className='w-full flex justify-between items-center'>
                                <div className='flex justify-center flex-col items-start'>
                                    <span>{act.act}</span>
                                    <span className='text-sm text-slate-400'>{act.date}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-sm w-[80px] text-center ${act.state === "Urgent" ? 'bg-red-500 w-full text-white':'bg-green-500 w-full text-white'}`}>{act.state}</span>
                            </div>
                        </div>
                    ))} */}
                 
                
            </div>

            <div className='flex flex-col my-1.5'>
                <div className='w-full flex justify-between items-center bg-white rounded-lg p-4'>
                    <div className='flex justify-center items-center gap-2'>
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"></path>
                    </svg>
                    <p className='font-semibold text-lg'>Recent Alerts</p>           
                    </div>
                    <button type='submit'
                        className="flex items-center justify-between w-[100px] px-3 py-1.5 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>view</span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button> 
                </div>    
                {/* <SliderMails data={recentMails}/> */}
                <SliderVertical data={recentMails} type='alerts'/>   

                
                {/* {recentMails.map(act=>(
                    <div className="w-full flex px-3 py-2 bg-white shadow-md hover:shodow-lg rounded-lg mt-5" key={act.id}>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-sm text-gray-800'>{act.sender}</span>
                            <span>{act.act}</span>
                            <span className='text-sm text-slate-400'>{act.date}</span>

                        </div>

                    </div>
                ))} */}
              
            
            </div>


</div>

          

        </div>  
    </div> 
       
    
        

    </>  )
}

export default CrdDashboard