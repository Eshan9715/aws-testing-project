import axios from 'axios';
import React, { useState } from 'react'
// import Slider from '../sliders/Slider'
// import SliderAct from '../sliders/SliderActs'
// import {recentAct} from '../Data'
// import SliderMails from '../sliders/'
import { useEffect } from 'react'
import SliderRates from '../../sliders/SliderRates';
import { tabData } from '../../Data';
import { useSelector } from 'react-redux';
import SliderDashTabs from '../../sliders/SliderDashTabs';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { TextField } from '@mui/material';
import DBTable from '../../components/Viewings/DBTable';
//import { useState } from 'react'
//import axios from 'axios'
// import { useSelector } from 'react-redux'

//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 
var sRfinalizedFullCargo = []

const SalesDashBD = () => {
    var http = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState('')
    const loggedUser = useSelector(state=> state.auth.value);

    const [viewRates, setViewRates] = useState([])
    const [sfrueryData, setsFRueryData] = useState([])
    const [slrueryData, setsLRueryData] = useState([])

    useEffect(() => {
        setName(loggedUser.userName)
  
        const getRates = ()=>{
          axios
          .get(`${http}/api/rate`)
          .then((res) => {
            console.log(res.data);
            setViewRates(res.data.rates)
          })
          .catch(err=> {
            console.log(err);
          })     
        }
        getRates();

        const getsalesRueries = ()=>{
            axios
           .get(`${http}/api/fclquery?sales=${name}`)
           .then((res) => {
             //console.log(res.data);
             setsFRueryData(res.data.fclqueries)
           })
           .catch(err=> {
             console.log(err);
           })     
 
           axios
           .get(`${http}/api/lclquery?sales=${name}`)
           .then((res) => {
             //console.log(res.data);
             setsLRueryData(res.data.lclqueries)
           })
           .catch(err=> {
             console.log(err);
           })   
         }
         getsalesRueries();
         
        
    }, [http,name,loggedUser]);

    sRfinalizedFullCargo = [...sfrueryData, ...slrueryData]
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
            id:3,
            desc: "FCL",
            val: 6,
            icon:<svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"></path>
          </svg>
        },
        {
            id:3,
            desc: "LCL",
            val: 6,
            icon:<svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path>
          </svg>
        },
        {
            id:3,
            desc: "Completed",
            val: 13,
            icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-12 h-12 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
          </svg>
        },
       
       
  ]

  const data = [
    {
      name: "Week 1",
      FCL: 5,
      LCL: 1
    },
    {
      name: "Week 2",
      FCL: 3,
      LCL: 2
    },
    {
      name: "Week 3",
      FCL: 4,
      LCL: 3
    },
    {
      name: "Week 4",
      FCL: 3,
      LCL: 2
    }
  ];
  return (
    <>
    
    <div className='w-full flex justify-center items-center'>
        <div className='w-[95%]'>
            <div className='w-full grid grid-cols-4 h-[70px] gap-4 mt-2'>
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

            <div className=' my-4'>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-2'>
                <p className="text-[17px] font-semibold">Exports from Srilanka</p>
                <img src='https://flagcdn.com/w40/lk.png' alt=''/>

                </div>

              <div className='w-full mt-2'>
                <SliderRates Data={viewRates} title='Exports from Sri lanka' currency='USD'/>             
              </div>
              </div>

            </div>

            {/* <div className=' my-4'>
              <div className='flex justify-center items-center'>
              <div className='w-full'>
              <SliderDashTabs SData={sRfinalizedFullCargo} Data={tabData} type='dashbar' />
              </div>
              </div>

            </div> */}

            <div className='h-0.5 bg-gray-200 w-full my-4 px-4'></div>


            <div className='w-full flex justify-start items-start gap-3'>
              <div className='w-[15%] mt-1 flex flex-col gap-2 items-start '>
                <SliderDashTabs SData={sRfinalizedFullCargo} Data={tabData} type='dashbar' />
              </div>
              
              <div className='w-[40%] mt-1 flex flex-col gap-2 items-start'>
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold text-start text-[17px] mb-1'>Shipments by Year & Month</p>   
                <div className='flex justify-center gap-1'>        
                  <input type="month" className='border px-2 py-0.5' min="2023-06" placeholder='Enter year & date'/>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-8 p-1 h-8 rounded-md shadow-lg bg-red-500 text-white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                  </svg>
                </div>
              </div>

              <div className='border-2 w-full flex flex-col p-4'>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month']}
                  label="Year and Month"
                  minDate={new Date('2023-04-01')}
                  value={value}
                  onChange={setValue}
                  renderInput={(params) => <TextField {...params} helperText={null} size='medium' />}
                />
              </LocalizationProvider> */}


              <div className='overflow-x-scroll mt-2'>
                <BarChart
                  width={450}
                  height={200}
                  data={data}
                  margin={{
                    top: 0,
                    right: 5,
                    left: 5,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="FCL" fill="#8884d8" />
                  <Bar dataKey="LCL" fill="#82ca9d" />

                </BarChart>

              </div>
              </div>
              </div>

              <div className='w-[45%] mt-1 flex flex-col items-start'>
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold text-start text-[17px] mb-2'>Week by week</p> 
                {/* <TextField
                  id="outlined-number"
                  label="Week No:"
                  type="number"
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { 
                    max: 52, min: 1 
                    }
                  }}
                />         */}
                <div className='flex justify-center gap-1 mb-1'>
                  <input type="week" name="week" className='border px-2 py-0.5' min="2023-W20"/>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-8 p-1 h-8 rounded-md shadow-lg bg-red-500 text-white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                  </svg>
                </div>
              </div>

                <DBTable type='Salesman'/>
              </div>
            </div>



















            <div className='grid grid-cols-2 h-[100px] gap-4'>

            <div className='flex flex-col my-5'>
                    {/* <div className='w-full flex justify-between items-center bg-white rounded-lg p-4'>
                        <div className='flex justify-center items-center gap-2'>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-8 h-8 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                        </svg>
                        <p className='font-semibold text-lg'>Recent activities</p>           
                        </div>
                        <button type='submit'
                            className="flex items-center justify-between w-[100px] h-[40px] px-3 py-1 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>view</span>

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button> 
                    </div>  */}

                    {/* <SliderAct data={recentAct}/>    */}
                    
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
                    ))}
                   */}
                
            </div>

            <div className='flex flex-col my-5'>
                    {/* <div className='w-full flex justify-between items-center bg-white rounded-lg p-4'>
                        <div className='flex justify-center items-center gap-2'>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                        </svg>
                        <p className='font-semibold text-lg'>Recent Mails</p>           
                        </div>
                        <button type='submit'
                            className="flex items-center justify-between w-[100px] h-[40px] px-3 py-1 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-white hover:text-black hover:border-2 border-black focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>view</span>

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button> 
                    </div>     */}
                    {/* <SliderMails data={recentMails}/> */}
                    
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

export default SalesDashBD
