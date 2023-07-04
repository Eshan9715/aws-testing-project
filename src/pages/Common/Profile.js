import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
//import FormInput from './FormInput';
// import PopupUI from './PopupUI';

const Profile = () => {
  const [role,setRole] = useState("");
  const [id,setID] = useState("");
  const [image,setImage] = useState("");
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [user, setuser] = useState('');
  const [member, setmember] = useState('');


  const [openEdit, setOpenEdit] = useState(false);
  var http = process.env.REACT_APP_BASE_URL;

  const loggedUser = useSelector(state=> state.auth.value);


  useEffect(() => {
    setID(loggedUser.userID)
    setRole(loggedUser.role)

    const getUser = ()=>{
      axios
      .get(`${http}/api/user/${id}`)
      .then((res) => {
        console.log(res.data);
        setuser(res.data.user)
        setImage(res.data.user.image)
        setMail(user.email)
        setName(user.name)
        //setViewRates(res.data.rates)
      })
      .catch(err=> {
        console.log(err);
      })     
    }
    role==='user' && getUser();

    const getMember = ()=>{
      axios
      .get(`${http}/api/member/${id}`)
      .then((res) => {
        //console.log(res.data);
        setmember(res.data.member)
        setImage(member.image)
        setMail(member.email)
        setName(member.name)
      })
      .catch(err=> {
        console.log(err);
      })     
    }
    role!=='user' && getMember();
      
  }, [http,loggedUser,id,role,user,member]);

  const showEdit = ()=>{
    setOpenEdit(!openEdit)
  }

  //console.log(image)

  return (
    <>
   <div className={`w-full h-screen flex overflow-hidden justify-end items-center text-black bg-white`}>               
        <div className='w-[100%] mdd:w-[90%] flex justify-start items-center h-full flex-col p-4 gap-3'>

          <div className="flex flex-col min-w-0 break-words mt-[80px]  bg-white w-[95%] mb-6 shadow-md rounded-lg p-4">
            <div className="px-6 h-[75vh]">

              <div className="flex flex-wrap justify-center">   
                <div className="w-full lg:w-4/12 px-4">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">03</span><span className="text-sm text-blueGray-400">Assigned CRDs</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Clients</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Total Bookings</span>
                    </div>
                  </div>
                </div> 

                <div className="w-full lg:w-4/12 px-4 justify-center items-center">
                <div className="flex justify-center py-2 lg:pt-4 pt-4">

                  <img src={image} alt='' className='max-w-[150px] rounded-full' />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:text-right flex lg:justify-end justify-center lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                    
                      Edit
                    </button>
                  </div>
                </div>
               
               
              </div>

              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 tracking-wide">
                  {name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 tracking-wider font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {role==='user'? 'SHIPPER': role==='ratesmanager'? 'SALES MANAGER': role==='salesman'? 'SALES PERSON': role.toUpperCase()}
                </div>
                <div className="mb-2 flex justify-center gap-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-6 h-6 text-red-500' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                  </svg>{mail}
                </div>
                <div className="mb-2 flex justify-center gap-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400 font-bold tracking-wide"></i>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-6 h-6 font-bold' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"></path>
                </svg>
                  {member.companyName || user.companyName}
                </div>
                <div className="mb-2 flex justify-center gap-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400 font-bold tracking-wide"></i>
                  <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className='w-6 h-6 font-bold text-green-500' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
                </svg>
                  +94 - {member.mobileNumber || user.mobileNumber}
                </div>
              </div>

             
            </div>
          </div>

      </div>
    </div>

    </>
  )
}

export default Profile

 