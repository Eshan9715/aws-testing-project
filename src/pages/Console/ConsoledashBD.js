import React, { useState } from 'react'
//import Slider from '../sliders/Slider'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { TextField } from '@mui/material';
import DBTable from '../../components/Viewings/DBTable';
// import DBTable from '../components/DBTable'
// import { DatePicker } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TextField } from '@mui/material'

//var http = "http://localhost:5000";  
//var http =  "https://cute-plum-caterpillar-tie.cyclic.app" 

const ConsoleDashBD = () => {
    const [value, setValue] = useState(new Date())

    const data = [
      {
        name: "Week 1",
        COLOAD: 4000,
        FLI: 2400,
        TS: 2400
      },
      {
        name: "Week 2",
        COLOAD: 3000,
        FLI: 1398,
        TS: 2210
      },
      {
        name: "Week 3",
        COLOAD: 2000,
        FLI: 9800,
        TS: 2290
      },
      {
        name: "Week 4",
        COLOAD: 2780,
        FLI: 3908,
        TS: 2000
      }
    ];

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[95%] flex flex-col justify-center items-center'>
           
            <div className='w-full flex flex-col justify-center items-start my-2'>
              <p className='font-semibold text-start text-lg my-1.5'>Current Console Boxes</p>           
              {/* <Slider title='Exports from Sri lanka' type='lcllive'/> */}
            </div>

            <div className='h-0.5 bg-gray-300 w-full my-2 px-4'></div>

            {/* <div className='w-full flex flex-col justify-center items-start my-2'>
            <p className='font-semibold text-start text-lg'>Ongoing LCL Shipments</p>           

            <ul className="w-full flex flex-wrap justify-start items-start -mb-px text-sm font-medium text-center gap-3">
                                                        
              <li className="mr-2 py-1.5" role="presentation">            
              <p className={`inline-block border-2 px-5 py-3  rounded-md active`}>Rates Pending<span className='ml-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{8}</span></p>                           
              </li>

              <li className="mr-2 py-1.5" role="presentation">            
              <p className={`inline-block border-2 px-5 py-3  rounded-md active`}>Confirmation Pending<span className='ml-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{8}</span></p>                           
              </li>

              <li className="mr-2 py-1.5" role="presentation">            
              <p className={`inline-block border-2 px-5 py-3  rounded-md active`}>Vessel Pending<span className='ml-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{8}</span></p>                           
              </li>

              <li className="mr-2 py-1.5" role="presentation">            
              <p className={`inline-block border-2 px-5 py-3  rounded-md active`}>B/L Pending<span className='ml-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{8}</span></p>                           
              </li>

            </ul>
            </div> */}

            
            {/* <p className='w-full flex justify-start font-semibold text-start text-lg my-1'>Search LCLs by Year & Month</p>            */}

            <div className='w-full flex justify-start items-start gap-4 my-1'>

              <div className='w-[20%] flex flex-col justify-center items-start my-2'>
              <p className='font-semibold text-start text-lg mb-1'>Ongoing LCL Shipments</p>           

              <ul className="w-full flex flex-col flex-wrap justify-start items-start -mb-px text-sm font-medium text-center gap-3">
                                                          
                <li className="mr-2 py-1.5" role="presentation">            
                <p className={`inline-block border-2 px-5 py-3  rounded-md active`}><span className='mr-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{3}</span>Rates Pending</p>                           
                </li>

                <li className="mr-2 py-1.5" role="presentation">            
                <p className={`inline-block border-2 px-5 py-3  rounded-md active`}><span className='mr-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{5}</span>Confirmation Pending</p>                           
                </li>

                <li className="mr-2 py-1.5" role="presentation">            
                <p className={`inline-block border-2 px-5 py-3  rounded-md active`}><span className='mr-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{2}</span>Vessel Pending</p>                           
                </li>

                <li className="mr-2 py-1.5" role="presentation">            
                <p className={`inline-block border-2 px-5 py-3  rounded-md active`}><span className='mr-2 px-2 py-0.5 bg-red-500 text-white font-semibold rounded-full border-2 w-10 h-8'>{3}</span>B/L Pending</p>                           
                </li>

              </ul>
              </div>


              <div className='w-[40%] mt-1 flex flex-col gap-2 items-start '>
              <p className='font-semibold text-start text-lg mb-1'>Search LCLs by Year & Month</p>           

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
                  height={220}
                  data={data}
                  margin={{
                    top: 10,
                    right: 25,
                    left: 5,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="FLI" fill="#8884d8" />
                  <Bar dataKey="COLOAD" fill="#82ca9d" />
                  <Bar dataKey="TS" fill="#82ca9d" />

                </BarChart>

            </div>
              </div>
              </div>

              <div className='w-[40%] mt-1 flex flex-col items-start'>
              <div className='w-full flex justify-between items-center'>
                <p className='font-semibold text-start text-lg mb-2'>Week by week</p> 
                <TextField
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
                />        
              </div>

                <DBTable type='ship'/>
              </div>
            </div>

          </div>  
    </div>
    )
}

export default ConsoleDashBD
