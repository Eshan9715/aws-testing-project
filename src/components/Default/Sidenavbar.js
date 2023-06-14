import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidenavbar = ({children}) => {
  const [role, setRole] = useState('')
  const loggedUser = useSelector(state=> state.auth.value);

  useEffect(() => {
    setRole(loggedUser.role)
}, [loggedUser]);

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

  console.log(screenSize.height)

    const activeStyle = {
        backgroundColor: "white",
        width: '100%',
      };

    const tags = [
        { 
            id: 1,
            val: "Dashboard",
            link:"/dashboard",
            role: ["user","salesman", "crd", "ratesmanager", "admin", "consolemanager", "consoleOperator","lcl-crd"],
            icon: <svg fill="none" stroke="currentColor" className="w-6 h-6 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
            </svg>
        },
       
        { 
            id: 2,
            val: "Live Query",
            link:'/bQuering',
            role: ["user", "consoleOperator"],
            icon: <svg fill="none" stroke="currentColor" className="w-6 h-6 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
          </svg>
        },
        { 
            id: 3,
            val: "Live Query",
            link:'/req',
            role: ["salesman", "crd","lcl-crd"],
            icon: <svg fill="none" stroke="currentColor" className="w-6 h-6 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path>
          </svg>
        },
        { 
            id: 4,
            val: "Query list",
            link:'/reqlist',
            role: ["salesman", "crd","lcl-crd"],
            icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
          </svg>
        },
        { 
          id: 5,
          val: "Query list",
          link:'/querylist',
          role: ["user"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
        </svg>
        },
        { 
          id: 6,
          val: "LCL List",
          link:'/lclboard',
          role: ["consolemanager"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
        </svg>
        },
         
        { 
          id: 7,
          val: "Clients",
          link:'/clients',
          role: ["salesman","crd","admin","ratesmanager"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-6 h-6 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
        </svg>
        },
        { 
          id: 8,
          val: "Staff",
          link:'/staff',
          role: ["admin","ratesmanager"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
        </svg>
        },
        { 
          id: 9,
          val: "Settings",
          link:'/settings',
          role: ["admin"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" className="w-6 h-6 rtl:-scale-x-100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        },
        { 
          id: 10,
          val: "Rates",
          link:'/rates',
          role: [""],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-6 h-6 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path>
        </svg>
        },
        { 
          id: 11,
          val: "Analysis",
          link:'/console',
          role: ["consolemanager"],
          icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-6 h-6 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path>
             </svg>
        },
        // { 
        //   id: 12,
        //   val: "Analysis",
        //   link:'/rates',
        //   role: ["consolemanager"],
        //   icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-6 h-6 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        //   <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path>
        // </svg>
        // },
      
        // { 
        //   id: 8,
        //   val: "Mails",
        //   link:'/createmail',
        //   role:["user","salesman", "crd","admin","ratesmanager"],
        //   icon: <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" className="w-6 h-6 rtl:-scale-x-100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        //   <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
        // </svg>
        // },
      //   { 
      //     id: 9,
      //     val: "Profile",
      //     link:'/profile',
      //     role: ["user","salesman", "crd", "ratesmanager","admin"],
      //     icon: <svg fill="none" stroke="currentColor" className="w-6 h-6 rtl:-scale-x-100" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      //     <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
      //   </svg>
      // },
    ];

  return (
    <>
    <div className='hidden mdd:flex min-h-screen w-[10%] fixed bg-slate-200 justify-center items-center z-40'>
        <div className='flex flex-col h-[80%] w-full justify-center items-center mt-16'>
        {screenSize.width>1280 && 
            tags.filter(e=>e.role.includes(role)).map((tag)=>(
              <NavLink to={tag.link} className={`w-full hover:bg-white cursor-pointer`}  style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>               
              <div className={`w-full flex justify-start shadow:md items-center p-3 gap-1 m-2 text-center `}  key={tag.id}>
                  {tag.icon}
                  <p className='flex text-[15px] text-start justify-start'>{tag.val}</p> 
              </div>              
              </NavLink>
          ))
        }

        {screenSize.width<=1280 && 
          tags.filter(e=>e.role.includes(role)).map((tag)=>(
            <NavLink to={tag.link} className={`w-full hover:bg-white cursor-pointer`}  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>  
            <div className={`w-full flex flex-col justify-start shadow:md items-center p-2 gap-1 m-1 text-center `}  key={tag.id}>
                {tag.icon}
                <p className='flex text-[13px] text-start justify-start'>{tag.val}</p> 
            </div>
            </NavLink>
          ))}
      
        </div>

    </div>
    <main>{children}</main>

    </>


)
}

export default Sidenavbar