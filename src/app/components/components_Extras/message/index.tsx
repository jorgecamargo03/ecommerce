'use client'
import React, { useEffect } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
type props ={
    msg:string
    setMsg:React.Dispatch<React.SetStateAction<string>>
}


const Message = ({msg,setMsg}:props) => {
  useEffect(()=>{
    if(msg!==''){
      const timer = setTimeout(() => {
        setMsg('')
      }, 6000);
      return () => clearTimeout(timer)

    }

  },[msg,setMsg])



  return (
     <div className={`fixed top-20 left-1/2 -translate-x-1/2  p-[1rem] pb-2 bg-white text-zinc-950  ${msg !== '' ? 'shake' : ''} ${msg !== '' ? 'block' : 'hidden'}
     text-white flex items-center max-w-[500px] w-[90%] top-1 rounded-xs
     shadow-md shadow-zinc-950 z-99
     `}>

          <div className={`font-bold text-5xl
                        ${msg.toLowerCase().includes('sucesso') ? 'text-green-500' : 'text-red-600 '}`}>
            {msg.toLowerCase().includes('sucesso') ? <FaCheckCircle /> : <MdError />}
          </div>
          <div className='text-center  w-full'>
            <h6 className='font-bold'>Alert</h6>
            <p className=''>{msg}</p>
          </div>
        </div>
  )
}

export default Message
