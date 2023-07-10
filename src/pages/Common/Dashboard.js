import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ConsoleDashBD from '../Console/ConsoledashBD';
import SalesDashBD from '../Salesman/SalesDashBD';
import CrdDashboard from '../CRD/CrdDashboard';

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
    <div className={`h-screen w-full flex justify-end items-start overflow-y-scroll text-black bg-white}`}>
      <div className='w-[100%] mdd:w-[90%] flex justify-center items-center'>
          <div className='w-full mt-[70px] h-full justify-center items-center p-2'>
            {role==='salesman'? <SalesDashBD/>: role==='crd'? <CrdDashboard/>: <ConsoleDashBD/>}
            {/* <ConsoleDashBD/> */}

          </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
