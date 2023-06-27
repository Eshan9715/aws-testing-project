import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Badge } from '@mui/material'
import RueryTile from '../../components/RueryTile'
import noData from '../../assets/noData.png'
import { useSelector } from 'react-redux'
import { ctabData, tabData } from '../../Data'
import SliderTabs from '../../sliders/SliderTabs'

var sRfinalizedFullCargo = []
var cRfinalizedFullCargo = []

const Requests = () => {
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [ID, setID] = useState('')

    const loggedUser = useSelector(state=> state.auth.value);

    var http = process.env.REACT_APP_BASE_URL;
    const [sfrueryData, setsFRueryData] = useState([])
    const [cfrueryData, setcFRueryData] = useState([])

    const [slrueryData, setsLRueryData] = useState([])
    const [clrueryData, setcLRueryData] = useState([])

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
        setName(loggedUser.userName)
        setID(loggedUser.userID)

        const getcrdFCLRueries = ()=>{
          axios
          .get(`${http}/api/fclquery?crd=${name}`)
          .then((res) => {
            //console.log(res.data);
            setcFRueryData(res.data.fclqueries)
          })
          .catch(err=> {
            console.log(err);
          })
        }   

        role==='crd' && getcrdFCLRueries();

        const getcrdLCLRueries = ()=>{
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
        (role==='crd' || 'lcl-crd') && getcrdLCLRueries();

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
          role==='salesman' && getsalesRueries();
  
    }, [http, role, name, loggedUser]);

    const [tabmode, setTabmode] = useState('rates pending')
    const [ctabmode, setcTabmode] = useState('schedule pending')

    //console.log(tabmode)
    
    cRfinalizedFullCargo = [...cfrueryData, ...clrueryData]
    sRfinalizedFullCargo = [...sfrueryData, ...slrueryData]

    const chooseTab = (type) => {
        role==='salesman' && setTabmode(type);
        role==='crd' && setcTabmode(type);

      };

  return (
        <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
            <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>

                {screenSize.width >= 1610 && 
                <div className="flex w-[85%] mt-[65px] justify-center fixed items-start">
                    {role==='salesman' && <ul className="flex w-full text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        {tabData.map(e=>(
                        <li className="mr-2 py-1.5" role="presentation" key={e.id}>
                        <Badge color='error' badgeContent={sRfinalizedFullCargo?.filter(er=> (er.status===e.fact)).length}  >
                            <button onClick={()=>setTabmode(e.fact)}  className={`inline-block ${tabmode===e.fact? "bg-orange-500 text-white": (sRfinalizedFullCargo?.filter(er=> er.status===e.fact).length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-3 py-3  rounded-lg active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{e.topic}</button>
                        </Badge>
                        </li> 
                        ))}
                        
                    </ul>}

                    {(role==='crd' || role==='lcl-crd') && <ul className="flex w-full text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        
                        {ctabData.map(e=>(
                        <li className="mr-2 py-1.5" role="presentation" key={e.id}>
                        <Badge color='error' badgeContent={sRfinalizedFullCargo?.filter(er=> (er.status===e.fact)).length}  >
                            <button onClick={()=>setcTabmode(e.fact)}  className={`inline-block ${ctabmode===e.fact? "bg-orange-500 text-white": (sRfinalizedFullCargo?.filter(er=> er.status===e.fact).length)!==0? 'bg-white text-black shadow-lg': 'bg-gray-500 text-white'} px-3 py-3  rounded-lg active`}id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{e.topic}</button>
                        </Badge>
                        </li> 
                        ))}
                        
                    </ul>}

                </div>}

                {screenSize.width < 1610 && 
                    <div className="flex w-[90%] lg:mt-[65px] mt-[45px] md:mt-[50px] justify-center fixed items-start">
                    {role==='salesman' && <SliderTabs SData={sRfinalizedFullCargo} Data={tabData} chooseTab={chooseTab} role={role} />}
                    {role==='crd' && <SliderTabs SData={cRfinalizedFullCargo} Data={ctabData} chooseTab={chooseTab} role={role} />}

                    </div>                   
                }

                
                <div className='w-[95%] lg:mt-[120px] mt-[100px] max-h-screen overflow-y-auto overflow-x-hidden mb-2'>
                {role==='salesman' && sRfinalizedFullCargo?.filter(e=> e.status===tabmode).length!==0?

                    sRfinalizedFullCargo?.filter(e=> e.status===tabmode).sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).map((obj,index)=>(
                    <RueryTile key={index}
                        OportName={obj.origin} 
                        DportName={obj.destination} 
                        containerMode={obj.containerMode}
                        cargos={obj.cargo} 
                        status={obj.status}
                        rDate={obj.rDate}
                        savedDate = {obj.createdAt}
                        updatedDate = {obj.updatedAt}
                        user = {obj.uName}  
                        company = {obj.uCompany} 
                        id = {obj._id}
                        crd= {obj.crd}
                        commodity = {obj.commodity}
                        freight = {obj.freight}
                        role = {role}
                        rates = {obj.rates}
                        schedules = {obj.schedules}
                        releaseOrder = {obj.releaseOrder}
                        selVessel = {obj.selVessel}
                        selShipLine = {obj.selShipLine}
                        cutoff = {obj?.cutoff}
                        selVoyage = {obj.selVoyage}
                        loggedID = {ID}
                        loggedNM = {name}
                        type={obj.type}
                        yard={obj.yard}
                                                                            
                    />
                    )): role==='salesman' && sRfinalizedFullCargo?.filter(e=> e.status===tabmode).length===0 &&
                    <>
                        <div className='flex justify-center mt-3 flex-col items-center min-h-screen border-2 w-full rounded-md bg-gray-100 text-lg'>
                            <img src={noData} alt='' className='w-[300px]' />
                            <p>No relevant data here!</p>

                        </div>
                    </>
                    }

                    {(role==='crd' || role==='lcl-crd') && cRfinalizedFullCargo?.filter(e=> e.status===ctabmode).length!==0?

                        cRfinalizedFullCargo?.filter(e=> e.status===ctabmode).sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt)).map((obj,index)=>(
                        <RueryTile key={index}
                            OportName={obj.origin} 
                            DportName={obj.destination} 
                            containerMode={obj.containerMode}
                            cargos={obj.cargo} 
                            status={obj.status}
                            rDate={obj.rDate}
                            savedDate = {obj.createdAt}
                            user = {obj.uName}  
                            company = {obj.uCompany} 
                            id = {obj._id}
                            commodity = {obj.commodity}
                            freight = {obj.freight}
                            assigned = {obj.receiver}
                            crd= {obj.crd}
                            cutoff = {obj?.cutoff}
                            role={role}
                            rates = {obj.rates}
                            schedules = {obj.schedules}
                            releaseOrder = {obj.releaseOrder}
                            selVessel = {obj.selVessel}
                            selShipLine = {obj.selShipLine}
                            selVoyage = {obj.selVoyage}
                            loggedID = {ID}
                            loggedNM = {name}
                            type={obj.type}
                            yard={obj.yard}

                            // show = {}                             

                        />
                        )): (role==='crd' || role==='lcl-crd') && cRfinalizedFullCargo?.filter(e=> e.status===ctabmode).length===0 &&
                        <>
                            <div className='w-full mt-3 flex justify-center flex-col items-center h-screen border-2 rounded-md bg-gray-100 text-lg'>
                                <img src={noData} alt='' className='w-[300px]' />
                                <p>No relevant data here!</p>

                            </div>
                        </>
                        }

                </div>
                          
            </div>
        </div>
  )
}

export default Requests