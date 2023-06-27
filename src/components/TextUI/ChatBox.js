import { Fab } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {Message, RepliedMessage, ReplyMessage } from './Message'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

var fullLRemarks = []
var fullFRemarks = []
var fullAllRemarks = []


const ChatBox = ({show,title,close,id,role,userID,loggedName,status,containerType}) => {

  var http = process.env.REACT_APP_BASE_URL;
    const messagesRef = useRef(null);
    const activeRef = useRef(null);
    const textRef = useRef(null);

    const [mheight, setMHeight] = useState(0);

    const [lre, setlRe] = useState([])
    const [fre, setfRe] = useState([])
    const [lshre, setlshRe] = useState([])
    const [fshre, setfshRe] = useState([])

    const [kid, setkid] = useState('')

    const [reply, setReply] = useState(false)
    const [scrollDown, setScrollDown] = useState(false)
    const [positionTop, setPositionTop] = useState(0);

    const [salremarks, setsalRemarks] = useState({
        status:'', remark:'',dDate:'',userID: userID, adder: loggedName, refID:''}
    )

    useEffect(() => {
          // const getLRemarks = ()=>{
          //   axios
          //   .get(`${http}/api/lclquery/getRemarks/${id}`)
          //   .then((res) => {
          //     console.log(res.data);
          //     setlRe(res.data.lclquery.remarks)
          //     setlshRe(res.data.lclquery.shremarks)

          //   })
          //   .catch(err=> {
          //     console.log(err);
          //   })     
          // }
          // getLRemarks();

          const getFRemarks = ()=>{
            axios
            .get(`${http}/api/fclquery/getRemarks/${id}`)
            .then((res) => {
              //console.log(res.data);
              setfRe(res.data.fclquery.remarks)
              setfshRe(res.data.fclquery.shremarks)

            })
            .catch(err=> {
              console.log(err);
            })     
          }
          getFRemarks();
    
    }, [id,http]);

    useEffect(() => {   
        messagesRef.current?.scrollIntoView({behavior: 'smooth'})

    }, [scrollDown]);

    const addLMemberIdea = ()=>{
        salremarks.status = status
        salremarks.dDate = new Date()
        salremarks.refID = kid

        console.log(salremarks)
        const AddMemberIdea= { 
            remarks: salremarks
            }                    
            axios
            .put(`${http}/api/lclquery/addMemberIdea/${id}`,AddMemberIdea)
            .then((res) => {
              //console.log(res.data);
              setlRe([...lre, salremarks])
        
          });
          textRef.current.value = "";
          setReply(false)

    }

    const addFMemberIdea = ()=>{
      salremarks.status = status
      salremarks.dDate = new Date()
      salremarks.refID = kid

      console.log(salremarks)
      const AddMemberIdea= { 
          remarks: salremarks
         
          }                    
          axios
          .put(`${http}/api/fclquery/addMemberIdea/${id}`,AddMemberIdea)
          .then((res) => {
            console.log(res.data);
            setfRe([...fre, salremarks])

        });
        textRef.current.value = "";
        setReply(false)

  }

    const addLShipperIdea = ()=>{
        salremarks.status = status
        salremarks.dDate = new Date()
        salremarks.refID = kid

        console.log(salremarks)
        const AddShipperIdea= { 
            shremarks: salremarks
           
            }                    
            axios
            .put(`${http}/api/lclquery/addShipperIdea/${id}`,AddShipperIdea)
            .then((res) => {
              //console.log(res.data);
              setlshRe([...lshre, salremarks])

          });
          textRef.current.value = "";
          setReply(false)

    }

    const addFShipperIdea = ()=>{
      salremarks.status = status
      salremarks.dDate = new Date()
      salremarks.refID = kid

      console.log(salremarks)
      const AddShipperIdea= { 
          shremarks: salremarks
         
          }                    
          axios
          .put(`${http}/api/fclquery/addShipperIdea/${id}`,AddShipperIdea)
          .then((res) => {
            console.log(res.data);
            setfshRe([...fshre, salremarks])

        });
        textRef.current.value = "";
        setReply(false)

  }

        fullLRemarks = [...lre, ...lshre]
        fullFRemarks = [...fre, ...fshre]
        fullAllRemarks = [...fullFRemarks, ...fullLRemarks]

    if(!show){
        return null
    }

    var memberArr = [ 'crd' , 'lcl-crd' , 'salesman', 'consolemanager']

    const sendReply = (idy)=>{
      setReply(true)
      setkid(idy);
    }

    const tapToBottom = ()=>{
      setScrollDown(!scrollDown)
     
    }
    
    const handleScroll = () => {
      const el = activeRef.current;
      setPositionTop(el.scrollTop);
      if(el.scrollTop> mheight)
      setMHeight(el.scrollTop)
   
  };


  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50 z-20 w-full  flex justify-center items-center md:ml-20`}>
            <div className={`w-[55%] relative flex flex-col bg-white gap-4 rounded-lg shadow-lg`}>
                <div className='w-full flex justify-center items-center bg-sky-700'>
                    <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>{title}</h3>

                    <svg fill="none" onClick={close} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>

                {containerType==='LCL' && 
                
                <div className='w-full flex flex-col justify-start items-center p-3 overflow-y-auto max-h-[300px]' ref={activeRef} onScroll={handleScroll}>

                {fullLRemarks?.sort((a,b)=> new Date(a.dDate) - new Date(b.dDate)).map((re)=>(  
                    re.refID===''?                  
                    <Message type={re.userID===userID?'my':'other'} person={re.adder} msg={re.remark} time={re.dDate} chatReply={()=>sendReply(re._id)} /> :
                    <RepliedMessage type={re.userID===userID?'my':'other'} type1={fullLRemarks.filter(e=>e._id===re.refID)[0].userID===userID?'my':'other'} person={re.adder} person1={fullLRemarks.filter(e=>e._id===re.refID)[0].adder} msg={re.remark} msg1={fullLRemarks.filter(e=>e._id===re.refID)[0].remark} time={re.dDate} chatReply={()=>sendReply(re._id)} /> 

                    ))
                }
                <div ref={messagesRef} />
                   
                </div>}

                {containerType==='FCL' && 
                <div className='w-full flex flex-col justify-start items-center p-3 overflow-y-auto max-h-[300px]' ref={activeRef} onScroll={handleScroll}>

                {fullFRemarks?.sort((a,b)=> new Date(a.dDate) - new Date(b.dDate)).map((ree)=>(    
                  ree.refID===''?                   
                    <Message type={ree.userID===userID?'my':'other'} person={ree.adder} msg={ree.remark} time={ree.dDate} chatReply={()=>sendReply(ree._id)} /> :
                    <RepliedMessage type={ree.userID===userID?'my':'other'} type1={fullFRemarks.filter(e=>e._id===ree.refID)[0].userID===userID?'my':'other'} person={ree.adder} person1={fullFRemarks.filter(e=>e._id===ree.refID)[0].adder} msg={ree.remark} msg1={fullFRemarks.filter(e=>e._id===ree.refID)[0].remark}  time={ree.dDate} chatReply={()=>sendReply(ree._id)} />                   
                  
                    ))
                }
                <div ref={messagesRef} />

                  
                </div>}

                {/* <div ref={scrollRef} ></div> */}

                {((positionTop < mheight/2) || (positionTop===0)) && <div className="absolute animate-bounce bottom-20 right-8 z-50 h-8 w-8" onClick={tapToBottom}>
                <Fab color="primary" aria-label="add" size='medium'>
                  <KeyboardArrowDownRoundedIcon/>
                </Fab>
                </div>}



               

                <div className='w-full flex flex-col'>
                  {reply && 
                    fullAllRemarks.filter(e=>e._id===kid).map((rr)=>(
                      <ReplyMessage type={rr.userID===userID?'my':'other'} msg={rr.remark} person={rr.adder} noReply={()=> setReply(false)} />
                    ))
                  }
                 
                  <div className='w-full flex justify-between items-center p-2 gap-2'>
                        <input
                              id="outlined-multiline-static"
                              label="Type message here"
                              multiline
                              placeholder='Type something here....'
                              //value={salremarks.remark}
                              className='w-[90%] p-2 border border-gray-500'
                              onChange={e=>setsalRemarks({...salremarks, remark: e.target.value })}
                              ref={textRef}
                              
                          /> 
                                                 
                      {containerType==='LCL' && <button onClick={memberArr.includes(role)? addLMemberIdea : addLShipperIdea} className='w-[10%] p-2 rounded-md bg-sky-700 text-white'>Add</button>}          
                      {containerType==='FCL' && <button onClick={memberArr.includes(role)? addFMemberIdea : addFShipperIdea} className='w-[10%] p-2 rounded-md bg-sky-700 text-white'>Add</button>}          

                  </div>
                </div>               

            </div>

    </div>

    
    )
}

export default ChatBox