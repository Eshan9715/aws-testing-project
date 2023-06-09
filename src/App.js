import {Routes, Route, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react'
import { lazy, Suspense } from 'react';

import axios from 'axios'

import Home from './pages/Common/Home';
import Navbar from './components/Default/Navbar';
import BottomNav from './components/Default/BottomNav';
import Sidenavbar from './components/Default/Sidenavbar';

import NotFound from './pages/Common/NotFound';
import Login from './pages/Common/Login';
import Register from './pages/Common/Register';
import Profile from './pages/Common/Profile';

const Dashboard = lazy(() => import('./pages/Common/Dashboard'));
const BQuering = lazy(() => import('./pages/Shipper/BQuering'));
const Requests = lazy(() => import('./pages/Salesman/Requests'));
const ReqList = lazy(() => import('./pages/Salesman/ReqList'));
const Clients = lazy(() => import('./pages/Salesman/Clients'));
const AddQuery = lazy(() => import('./pages/Shipper/AddQuery'));
const QueryList = lazy(() => import('./pages/Shipper/QueryList'));
const ViewRates = lazy(() => import('./pages/SalesManager/ViewRates'));
const AddRates = lazy(() => import('./pages/SalesManager/AddRates'));
const Staff = lazy(() => import('./pages/Admin/Staff'));

function App() {
  const loggedUser = useSelector(state=> state.auth.value);
  const location = useLocation();
  //console.log(location.pathname)


   //creating IP state
   const [ip,setIP] = useState('');
   const [path,setpath] = useState('')


   //creating function to load ip address from the API
   const getData = async()=>{
       const res = await axios.get('https://geolocation-db.com/json/')
       //console.log(res.data);
       setIP(res.data.IPv4)
   }
   //console.log(ip)

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

   
   useEffect(()=>{
       //passing getData method to the lifecycle method
       getData()
       setpath(location.pathname)

   },[loggedUser,location])

   //console.log(screenSize.height)


   const PrivateRoutes  = ()=>{
    return(
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound/>} />
          <Route path='/bquering' element={<BQuering />} />
          <Route path='/req' element={<Requests />} />
          <Route path='/reqlist' element={<ReqList />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/addquery' element={<AddQuery />} />
          <Route path='/querylist' element={<QueryList />} />
          <Route path='/viewrates' element={<ViewRates />} />
          <Route path='/addrates' element={<AddRates />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>
        </Suspense>
      </div>
    )
   }

   const PublicRoutes = ()=>{
    return(
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='*' element={<NotFound/>} />

        </Routes>
      </div>
    )
   }

   //console.log('your IP Address is:' + ip)

  return (
    <>
    {path==='/'?
    <>
    <Navbar/>
    <Home/>
    </>:
    <>  
    <Navbar/>
    {loggedUser.isLoggedIn && <Sidenavbar/>}
    {!(loggedUser.isLoggedIn) && <PublicRoutes/>}
    { loggedUser.isLoggedIn && <PrivateRoutes/>}
    {loggedUser.isLoggedIn && <BottomNav/>}

    </>
    }
    </>
    
   
  );
  
}
 //JFLFFLFRLJNRJRGIFRGFR

export default App;



