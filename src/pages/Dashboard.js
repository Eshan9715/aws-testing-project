import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';

import SalesDashBD from './SalesDashBD'

const Dashboard = () => {
    const loggedUser = useSelector((state)=> state.auth.value);

    const [role,setRole] = useState("");
    const [id,setID] = useState("");

    useEffect(() => {
        setRole(loggedUser.role)
        setID(loggedUser.userID)
    
    }, [loggedUser]);

  return (
    <>
    <div className={`h-screen w-full flex justify-end items-start overflow-y-scroll text-black ${role==="salesman"? 'bg-gradient-to-b from-purple-500 to-gray-900' : role==="ratesmanager"? 'bg-gradient-to-b from-gray-500 to-gray-900': role==="crd"? 'bg-gradient-to-b from-green-500 to-gray-900' : 'bg-white' }`}>
      <div className='w-[100%] mdd:w-[90%] flex justify-center items-center'>
          <div className='w-full mt-[70px] h-full justify-center items-center p-2'>
            <SalesDashBD/>

          </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
