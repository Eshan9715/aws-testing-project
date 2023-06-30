import React, { useState, useEffect } from 'react'
import Button from './button';
import { Link, useNavigate } from 'react-router-dom';
import fri from '../../assets/fri.png'
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../redux/authRedux';

const Navbar = ({childern}) => {
  // const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [role, setrole] = useState('');

  const [mail, setMail] = useState('');
  const navigate = useNavigate();
  const [assign,setAssign] = useState('')

  const [show, setShow] = useState(false)
  const loggedUser = useSelector(state=> state.auth.value);

  useEffect(() => {
    setName(loggedUser.userName)
    setPic(loggedUser.userImage)
    setMail(loggedUser.userEmail)
    setAssign(loggedUser.assignedTo)
    setrole(loggedUser.role)

}, [loggedUser]);

  const handleAuth = ()=>{
    dispatch(logout());
    localStorage.clear();
    navigate("/login")

  }

  const handleDashBoard = () =>{
    navigate("/dashboard")
  }

  const showWindow = ()=>{
    setShow(!show);
  }

  return (
    <div className={`shadow-md w-[100%] fixed ${role==='user'? 'bg-red-400': role==='salesman'?'bg-green-400': role==='crd'?'bg-purple-400':'bg-slate-100'} z-50`}>
      <div className='w-full flex items-center justify-between py-1 px-2'>
        <div className='font-bold md:text-xl text-base cursor-pointer flex items-center font-Monserrat 
        text-black'>
          <div className='w-8 md:w-12 lg:w-16'>
            <img src={fri} alt=''className='rounded-full' 
            onClick={()=> navigate('/')}

              />
          </div>
          <p className='track-wider' onClick={()=> navigate('/')}>FLI-BOOKING</p>
        </div>

        <p className='tracking-widest text-lg font-semibold'>{role==='user'? 'SHIPPER': role==='ratesmanager'? 'SALES MANAGER': role==='salesman'? 'SALES PERSON': role.toUpperCase()}</p>
      
        <div className='flex flex-col md:flex-row'>
            {
              loggedUser.isLoggedIn && 
              <>
                <div className='bg-white flex justify-center items-center gap-3 border-2 text-center font-Monserrat font-bold py-1 md:px-6 px-2 rounded hover:bg-orange-400'> 
                <img src={pic} alt='' className='md:w-10 md:h-10 w-7 h-7 rounded-full'/>
                <span>{name && name.split(" ")[0]}</span>
                <button onClick={showWindow}><svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-4 h-4 mt-1 font-bold cursor-pointer' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                        </svg>
                </button>
                </div>
                <div class={`z-[90] ${show? "absolute top-[60px] right-10": "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-300 rounded-lg shadow`}>
                  <div class="px-2.5 py-3">
                    <span class="block text-sm font-medium">{name}</span>
                    <span class="block text-sm truncate">{mail}</span>
                  </div>
                  <ul class="py-2" aria-labelledby="user-menu-button">
                    {assign!=='pending' && <li>
                      <p className="block px-4 py-2 text-sm hover:bg-orange-600 hover:text-white cursor-pointer" onClick={handleDashBoard}>Dashboard</p>
                    </li>}                          
                    <li>
                    <p className="block px-4 py-2 text-sm hover:bg-orange-600 hover:text-white cursor-pointer" onClick={handleAuth}>logout</p>

                    {/* <Link to='/login' className='text-gray-800 hover:text-gray-400 duration-500 font-Monserrat '><Button name='logout' handleClick={handleAuth} >logout</Button></Link> */}
                    </li>
                  </ul>
                </div>
              </>
          
            }

            {!loggedUser.isLoggedIn && <> 
                        {/* <Link to='/login' className='text-gray-800 hover:text-gray-400 duration-500 font-Monserrat '><Button>Sign In</Button></Link> */}
                        <Link to='/login' className='text-gray-800 hover:text-gray-400 duration-500 font-Monserrat '><Button name='Sign In' color={'orange-500'} hoverColor={'white'} textColor={'white'} hoverTextColor={'black'}></Button></Link>
                         </>
            }
           
        </div>

      </div>
    </div>
               
  )
}

export default Navbar;


