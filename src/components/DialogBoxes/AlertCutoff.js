import React from 'react'

const AlertCutoff = ({cutof,show,close,id,title,containerMode}) => {

    if(!show){
        return null
    }

    //console.log(cutof)

   
  return (
    <div className={`${show? "fixed inset-0" : "hidden"}  bg-gray-900 bg-opacity-50  w-full flex justify-center items-center md:ml-20`}>
            <div className={`flex flex-col bg-white w-[40%] gap-4 rounded-lg shadow-lg`}>
            <div className='w-full flex justify-center items-center bg-sky-700'>
                <h3 className='w-full text-lg font-semibold text-center p-2.5  text-white'>{title}</h3>
                <svg fill="none" onClick={close} className='w-8 h-8 mr-2 text-white font-semibold cursor-pointer bg-red-500 rounded-full p-1' stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            {containerMode==='FCL' && 
            <div className='w-full flex flex-col justify-center items-center mb-3 overflow-y-auto max-h-[400px]'>

                <LineRow topic='ETA COLOMBO' dateC={cutof?.ETACOLD} timeC={cutof?.ETACOLT}/>
                <LineRow topic='FCL OPENING' dateC={cutof?.FCLOPND} timeC={cutof?.FCLOPNT}/>
                <LineRow topic='FCL CLOSING' dateC={cutof?.FCLCLOD} timeC={cutof?.FCLCLOT}/>
                <LineRow topic='BL CUT OFF' dateC={cutof?.BLCLOD} timeC={cutof?.BLCLOT}/>
                <LineRow topic='VGM CLOSING' dateC={cutof?.VGMCLOD} timeC={cutof?.VGMCLOT}/>
                <LineRow topic='REEFER OPENING' dateC={cutof?.VGMCLOD} timeC={cutof?.BLCLOT}/>

             
                <TextLine term='BERTHING' pla={cutof?.TERMIN}/>
                <TextLine term='VESSEL OPERATOR' pla={cutof?.VESOP}/>
                <TextLine term='CONTAINER OPERATOR' pla={cutof?.CONOP}/>

                <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>
                <p className='w-full text-[11px] text-red-600 flex justify-center'>*Optional</p>

                <LineRow topic='CNTR PICK UP CUT OFF' dateC={cutof?.CPUCD} timeC={cutof?.CPUCT}/>

            </div>}

            {containerMode==='LCL' && 
            <div className='w-full flex flex-col justify-center items-center mb-3 overflow-y-auto max-h-[400px]'>

                <LineRow topic='ETA COLOMBO' dateC={cutof?.ETACOLD} timeC={cutof?.ETACOLT}/>
                <LineRow topic='FCL OPENING' dateC={cutof?.FCLOPND} timeC={cutof?.FCLOPNT}/>
                <LineRow topic='FCL CLOSING' dateC={cutof?.FCLCLOD} timeC={cutof?.FCLCLOT}/>
                <LineRow topic='BL CUT OFF' dateC={cutof?.BLCLOD} timeC={cutof?.BLCLOT}/>
                <LineRow topic='VGM CLOSING' dateC={cutof?.VGMCLOD} timeC={cutof?.VGMCLOT}/>
                <LineRow topic='REEFER OPENING' dateC={cutof?.VGMCLOD} timeC={cutof?.BLCLOT}/>

             
                <TextLine term='BERTHING' pla={cutof?.TERMIN}/>
                <TextLine term='VESSEL OPERATOR' pla={cutof?.VESOP}/>
                <TextLine term='CONTAINER OPERATOR' pla={cutof?.CONOP}/>

                <div className='h-0.5 bg-gray-300 w-full my-4 px-4'></div>
                <p className='w-full text-[11px] text-red-600 flex justify-center'>*Optional</p>

                <LineRow topic='CNTR PICK UP CUT OFF' dateC={cutof?.CPUCD} timeC={cutof?.CPUCT}/>

            </div>}
            </div>
    </div>
    
    )
}

export default AlertCutoff

//component=>
 const LineRow = ({topic,dateC, timeC})=>{
    return(
        <div className='w-full flex justify-center items-center p-1'>
        <div className='w-[50%] flex flex-col justify-center items-end px-10 font-semibold'>
            <p>{topic} : </p>
        </div>

        <div className='w-[50%] flex justify-center items-start gap-2'>
        <div className='w-full flex'>
        <div className='w-1/2 flex gap-1'>
        <svg fill="none" stroke="currentColor" stroke-width="1.5"className='w-5 h-5 mr-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"></path>
            </svg>
        <p>{dateC}</p>
        </div>
        <div className='w-1/2 flex gap-1'>
        <svg fill="none" stroke="currentColor" stroke-width="1.5" className='w-5 h-5 mr-2' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        <p>{timeC}</p>
        </div>
        </div>
        </div>

    </div>
    )
}

const TextLine = ({term,pla})=>{
    return(
        <div className='w-full flex justify-center items-center p-1'>
            <div className='w-[50%] flex  justify-end items-center px-10 font-semibold'>
                <p>{term} : </p>
            </div> 
            <div className='w-[50%] flex justify-start items-center px-10 font-semibold'>
                <p>{pla}</p>
            </div>       
        </div>

    )
}


// MSC ERMINIA V: QS326R	SHIKRA E/B SERVICE
// ETA COLOMBO 	30.06.2023
// FCL OPENING  	22.06.2023 – 0001 HRS
// FCL CLOSING	30.06.2023 – 1200 HRS
// BL CUT OFF	28.06.2023 – 1200 HRS
// VGM CLOSING	29.06.2023 – 1500 HRS
// CNTR PICK UP CUT OFF	16.06.2023 – 1800 HRS
// REEFER OPENING	29.06.2023 – 2359 HRS
// BERTHING	ECT (Ref : MERMQS326RU)
// VESSEL OPERATOR 	MSC
// CONTAINER OPERATOR 	MSC


 