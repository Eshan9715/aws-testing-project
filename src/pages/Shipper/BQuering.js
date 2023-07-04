import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Badge} from '@mui/material';
import {useSelector} from 'react-redux';
import QueryTile from '../../components/QueryTile';
import noData from '../../assets/noData.png'
import { tabConsolData, tabShiprData } from '../../Data';
import SliderTabs from '../../sliders/SliderTabs';

var finalizedFullCargo = []

const BQuering = () => {
  const loggedUser = useSelector(state=> state.auth.value);

  var http = process.env.REACT_APP_BASE_URL; 
  
  const [role,setRole] = useState("");
  const [id,setID] = useState("");
  const [memData, setmemData] = useState([])
  const [userData, setUserData] = useState([])


  const [fqueryData, setFQueryData] = useState([])
  const [lqueryData, setLQueryData] = useState([])
  const [lConqueryData, setLConQueryData] = useState([])

  //const [mngr, setmngr] = useState('')
  const [name, setName] = useState('')

  const getCurrentDimension = () =>{
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
        setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);


    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  useEffect(() => {
      setRole(loggedUser.role)
      setID(loggedUser.userID)
      setName(loggedUser.userName)

      // const getConsoleMngr = () =>{
      //   axios
      //   .get(`${http}/api/member?role=consolemanager`)
      //   .then((res) => {
      //     //console.log(res.data);
      //     setmngr(res.data.member[0].name)
      //   })
      //   .catch(err=> {
      //     console.log(err);
      //   })  
      // }
      // getConsoleMngr()

      const getFCLQueries = ()=>{
        axios
        .get(`${http}/api/fclquery/user/${id}`)
        .then((res) => {
          //console.log(res.data);
          setFQueryData(res.data.user.fclqueries)
        })
        .catch(err=> {
          console.log(err);
        })  
      }
      getFCLQueries();

      const getLCLQueries = ()=>{
        axios
        .get(`${http}/api/lclquery/user/${id}`)
        .then((res) => {
          //console.log(res.data);
          setLQueryData(res.data.user.lclqueries)
        })
        .catch(err=> {
          console.log(err);
        })  
      }
      getLCLQueries();

      const getLCLs = ()=>{
        axios
        .get(`${http}/api/lclquery?ID=${id}`)
        .then((res) => {
          //console.log(res.data);
          setLConQueryData(res.data.lclqueries)
        })
        .catch(err=> {
          console.log(err);
        })  
      }
      getLCLs();

      const getUser = ()=>{
        axios
        .get(`${http}/api/user/${id}`)
        .then((res) => {
          //console.log(res.data.user);
          res.data.user!==undefined && setUserData(res.data.user)
          // setFQueryData(res.data.fclqueries)
        })
        .catch(err=> {
          console.log(err);
        })     
    
      }
      getUser();

      const getMember = ()=>{
        axios
        .get(`${http}/api/member/${id}`)
        .then((res) => {
          //console.log(res.data.member);
          res.data.member!==undefined && setmemData(res.data.member)
          // setFQueryData(res.data.fclqueries)
        })
        .catch(err=> {
          console.log(err);
        })         
      }
      getMember();
      
  }, [id,http,loggedUser,role]);

  finalizedFullCargo = [...fqueryData, ...lqueryData]

   //console.log(lConqueryData)
   //console.log(userData)
   //console.log(memData)

  //console.log(mngr)

  //console.log(rdate)

  const [tabmode, setTabmode] = useState('rates pending')

  const chooseTab = (type) => {
    setTabmode(type);
  };
  
  return (
    <>
      <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
        <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>

            <div className='w-full h-full flex flex-col justify-start items-center'>
             
              {/* <div className="w-[84%] mt-[80px] flex items-center justify-between text-center gap-2 fixed">
                
                {role==='user'? 
                <div className="my-1 flex w-full justify-start">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="rates pending").length}  >
                            <button onClick={()=>setTabmode("rates pending")}  className={`inline-block ${tabmode==="rates pending"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="rates pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Newly Added</button>
                            </Badge>
                        </li>                       

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="rates confirmation").length}  >
                            <button onClick={()=>setTabmode("rates confirmation")}  className={`inline-block ${tabmode==="rates confirmation"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="rates confirmation").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Rates Confirmation</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="vessel pending").length}  >
                            <button onClick={()=>setTabmode("vessel pending")} className={`inline-block ${tabmode==="vessel pending"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="vessel pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Select Vessel</button>
                            </Badge>
                        </li>

                        {<li className="mr-2 py-1.5" role="presentation">
                                <Badge color='error' badgeContent={finalizedFullCargo?.filter(e=> e.status==="pending cut-off").length}  >
                                    <button onClick={()=>setTabmode("pending cut-off")}  className={`inline-block ${tabmode==="pending cut-off"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="pending cut-off").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-3 py-3 text-white rounded-lg active`}id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Booking | Release</button>
                                </Badge>
                        </li>}

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="b/l pending").length}  >
                            <button onClick={()=>setTabmode("b/l pending")}  className={`inline-block ${tabmode==="b/l pending"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="b/l pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Cutoff | B/L</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="b/l added").length}  >
                            <button onClick={()=>setTabmode("b/l added")}  className={`inline-block ${tabmode==="b/l added"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="b/l added").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Added B / L</button>
                            </Badge>
                        </li>
                  
                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={finalizedFullCargo?.filter(e=> e.status==="complete").length}  >
                            <button onClick={()=>setTabmode("complete")}  className={`inline-block ${tabmode==="complete"? "bg-orange-500 text-white": (finalizedFullCargo?.filter(e=> e.status==="complete").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Complete Queries</button>
                            </Badge>
                        </li>                        
                                             
                    </ul>

                </div>: 
                role==='consoleOperator' &&
                <div className="my-1 flex w-full justify-start">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="rates pending").length}  >
                            <button onClick={()=>setTabmode("rates pending")}  className={`inline-block ${tabmode==="rates pending"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="rates pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Newly Added</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="rates confirmation").length}  >
                            <button onClick={()=>setTabmode("rates confirmation")}  className={`inline-block ${tabmode==="rates confirmation"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="rates confirmation").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Rates Confirmation</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="vessel pending").length}  >
                            <button onClick={()=>setTabmode("vessel pending")} className={`inline-block ${tabmode==="vessel pending"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="vessel pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Select Vessel</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="b/l pending").length}  >
                            <button onClick={()=>setTabmode("b/l pending")}  className={`inline-block ${tabmode==="b/l pending"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="b/l pending").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">B/L Pending</button>
                            </Badge>
                        </li>

                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="b/l added").length}  >
                            <button onClick={()=>setTabmode("b/l added")}  className={`inline-block ${tabmode==="b/l added"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="b/l added").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Added B / L</button>
                            </Badge>
                        </li>
                  
                        <li className="mr-2 py-1.5" role="presentation">
                            <Badge color="error" badgeContent={lConqueryData?.filter(e=> e.status==="complete").length}  >
                            <button onClick={()=>setTabmode("complete")}  className={`inline-block ${tabmode==="complete"? "bg-orange-500 text-white": (lConqueryData?.filter(e=> e.status==="complete").length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-1.5 py-3 text-white rounded-md active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Complete Queries</button>
                            </Badge>
                        </li>
                                                                   
                    </ul>
                </div>
                }

              </div> */}

              {screenSize.width >= 1610 && 
                <div className="flex w-[85%] mt-[65px] justify-center fixed items-start">
                    {role==='user' && <ul className="flex w-full text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        {tabShiprData.map(e=>(
                        <li className="mr-2 py-1.5" role="presentation" key={e.id}>
                        <Badge color='error' badgeContent={finalizedFullCargo?.filter(er=> (er.status===e.fact)).length}  >
                            <button onClick={()=>setTabmode(e.fact)}  className={`inline-block ${tabmode===e.fact? "bg-orange-500 text-white": (finalizedFullCargo?.filter(er=> er.status===e.fact).length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-3 py-3  rounded-lg active`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{e.topic}</button>
                        </Badge>
                        </li> 
                        ))}
                        
                    </ul>}

                    {role==='consoleOperator' && <ul className="flex w-full text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        {tabConsolData.slice(2).map(e=>(
                        <li className="mr-2 py-1.5" role="presentation" key={e.id}>
                        <Badge color='error' badgeContent={finalizedFullCargo?.filter(er=> (er.status===e.fact)).length}  >
                            <button onClick={()=>setTabmode(e.fact)}  className={`inline-block ${tabmode===e.fact? "bg-orange-500 text-white": (finalizedFullCargo?.filter(er=> er.status===e.fact).length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-3 py-3  rounded-lg active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{e.topic}</button>
                        </Badge>
                        </li> 
                        ))}
                        
                    </ul>}

                </div>}

                {screenSize.width < 1610 && 
                    <div className="flex w-[90%] lg:mt-[65px] mt-[45px] md:mt-[50px] justify-center fixed items-start">
                    
                    {role==='user' && <SliderTabs SData={finalizedFullCargo} Data={tabShiprData} chooseTab={chooseTab} role={role} type='topbar' />}
                    {role==='consoleOperator' && <SliderTabs SData={finalizedFullCargo} Data={tabConsolData} chooseTab={chooseTab} role={role} type='topbar' />}

                    </div>                   
                }
                  
              {role==='user' && 
              <div className='w-[95%] mt-[140px] max-h-[510px] overflow-y-auto overflow-x-hidden mb-2'>
              {finalizedFullCargo?.filter(e=> e.status===tabmode).length!==0?
              
                finalizedFullCargo?.filter(e=> e.status===tabmode).sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).map((obj,index)=>(
                <QueryTile key={index}
                    OportName={obj.origin} 
                    DportName={obj.destination} 
                    containerMode={obj.containerMode}
                    cargos={obj.cargo} 
                    status={obj.status}
                    rDate={obj.rDate}
                    savedDate = {obj.createdAt}
                    lastUpdate = {obj.updatedAt}
                    id = {obj._id}
                    rates = {obj.rates}
                    remarks = {obj.remarks}
                    selShipLine = {obj.selShipLine}
                    shremarks = {obj.shremarks}
                    schedules = {obj.schedules}
                    selVessel = {obj.selVessel}
                    bookingData = {obj.bookingData}
                    releaseOrder = {obj.releaseOrder}
                    //blData = {obj.blData[0]}
                    commodity = {obj.commodity}
                    freight = {obj.freight}
                    //cutoff = {obj.cutoff[0]}
                    selVoyage={obj.selVoyage}
                    yard= {obj.yard}
                    type={obj.type}
                    loggedID = {id}
                    loggedNM = {name}
                    assigned = {obj.receiver}
                    crd={obj.crd}

                />
              )): 
              <>
                <div className='flex justify-center flex-col items-center h-[500px] border-2 w-full rounded-md bg-gray-100 text-lg'>
                    <img src={noData} alt='' className='w-[300px]' />
                    <p>No relevant data here!</p>

                </div>
              </>}

              </div>}

              {role==='consoleOperator' && 
              <div className='w-[95%] mt-[140px] max-h-[510px] overflow-y-auto overflow-x-hidden mb-2'>
               {lConqueryData?.filter(e=> e.status===tabmode).length!==0?
              
                lConqueryData?.filter(e=> e.status===tabmode).sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).map((obj,index)=>(
                <QueryTile key={index}
                    OportName={obj.origin} 
                    DportName={obj.destination} 
                    containerMode={obj.containerMode}
                    cargos={obj.cargo} 
                    status={obj.status}
                    rDate={obj.rDate}
                    savedDate = {obj.createdAt}
                    lastUpdate = {obj.updatedAt}
                    id = {obj._id}
                    rates = {obj.rates}
                    remarks = {obj.remarks}
                    selShipLine = {obj.selShipLine}
                    shremarks = {obj.shremarks}
                    schedules = {obj.schedules}
                    selVessel = {obj.selVessel}
                    bookingData = {obj.bookingData}
                    releaseOrder = {obj.releaseOrder}
                    //blData = {obj.blData[0]}
                    commodity = {obj.commodity}
                    freight = {obj.freight}
                    //cutoff = {obj.cutoff[0]}
                    selVoyage={obj.selVoyage}
                    yard= {obj.yard}
                    consoles = 'yes'
                    company = {obj.uCompany}
                    type={obj.type}
                    role={role}
                    user = {obj.uName}  
                    assigned = {obj.receiver}
                    loggedID = {id}
                    loggedNM = {name}
                    crd = {obj.crd}

                />
              )): 
              <>
                <div className='flex justify-center flex-col items-center h-[500px] border-2 w-full rounded-md bg-gray-100 text-lg'>
                    <img src={noData} alt='' className='w-[300px]' />
                    <p>No relevant data here!</p>

                </div>
              </>}
              </div>}

            </div>
        </div>
      
      </div>

    </>
  )
}

export default BQuering

