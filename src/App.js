import {Routes, Route} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react'
import { lazy, Suspense } from 'react';

import axios from 'axios'

import Home from './pages/Home';
import Navbar from './components/Default/Navbar';
import BottomNav from './components/Default/BottomNav';
import Sidenavbar from './components/Default/Sidenavbar';

import NotFound from './pages/NotFound';
import Login from './pages/Login';
// import Register from './pages/Register';

const Dashboard = lazy(() => import('./pages/Dashboard'));
// const BQuering = lazy(() => import('./pages/BQuering'));
const Requests = lazy(() => import('./pages/Requests'));
const ReqList = lazy(() => import('./pages/ReqList'));


function App() {
  const loggedUser = useSelector(state=> state.auth.value);

   //creating IP state
   const [ip,setIP] = useState('');
    
   //creating function to load ip address from the API
   const getData = async()=>{
       const res = await axios.get('https://geolocation-db.com/json/')
       console.log(res.data);
       setIP(res.data.IPv4)
   }
   
   useEffect(()=>{
       //passing getData method to the lifecycle method
       getData()
   },[])

   const PrivateRoutes  = ()=>{
    return(
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound/>} />
          {/* <Route path='/bquering' element={<BQuering />} /> */}
          <Route path='/req' element={<Requests />} />
          <Route path='/reqlist' element={<ReqList />} />




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
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='*' element={<NotFound/>} />

        </Routes>
      </div>
    )
   }

   console.log('your IP Address is:' + ip)

  return (
    <>
    <Navbar/>
    {loggedUser.isLoggedIn && <Sidenavbar/>}
    {!(loggedUser.isLoggedIn) && <PublicRoutes/>}
    {loggedUser.isLoggedIn && <PrivateRoutes/>}
    {loggedUser.isLoggedIn && <BottomNav/>}

    </>
  );
  
}
 //JFLFFLFRLJNRJRGIFRGFR

export default App;



