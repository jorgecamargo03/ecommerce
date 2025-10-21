'use client'
import React, { useEffect, useState } from 'react'

import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Link from 'next/link';
import bgBlue from '../../../images/dark-blue-background-in-polygonal-style-vector.jpg'
import { Poppins } from 'next/font/google';
import { MdEmail } from "react-icons/md";

import { FaLock } from "react-icons/fa";
import axios from 'axios';
import apiUrl from '../../middleWare/apiUrl'
import { useRouter } from 'next/navigation';

import Message from '@/app/components/message';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"], // só os pesos que você usar
})

const Login = () => {

  const [form,setForm]=useState({
    email:'',
    password:''
  })
   
  const [showPassword,SetShowPassword]=useState(false)
  const [msg,setMsg]=useState('')
  const router = useRouter()
  
 

  async function LoginUser() {
    try {

   const res =  await axios.post(`${apiUrl}/auth/login`,form)
      setMsg('Login feito com sucesso✅')
      const token = res.data.token
      localStorage.setItem('token',token)
      
       setTimeout(() => router.push('/'), 1500);
      
    } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                // Aqui pegamos a mensagem do backend
                const backendMsg = err.response?.data?.msg;
                if (backendMsg) {
                    setMsg(backendMsg); 
                    
                } else {
                    setMsg('Erro ao Fazer Login ❌');
                    
                }
            } else {
                setMsg('Erro inesperado ❌');
               
            }
        }

    
  }



  return (
     <div style={{ backgroundImage: `url(${bgBlue.src})` }}
            className={`h-screen w-screen bg-cover ${poppins.className} flex justify-center items-center relative`}>

          <Message setMsg={setMsg} msg={msg}  />

            <div className='max-w-300 flex bg-gray-50 rounded-2xl w-[90%]'>

                <div className='bg-[#0019ff] pb-5 py-[3rem] pl-[1rem] pr-6 text-white 
         rounded-2xl basis-[70%] md:flex hidden
        font-bold  flex-col gap-5 text-center justify-between'>
                    <div className='mt-5'>
                        <h2 className='text-2xl'>Bem vindo </h2>
                        <p>Faça sua conta agora mesmo</p>
                    </div>

                    <Link
                        href='/register'
                        className='border-white p-[1rem_1.2rem] 
            text-xl
            
            border-1 rounded-full transition duration-300 hover:bg-white
            uppercase text-shadow-zinc-800 text-shadow-2xs hover:text-shadow-none
             hover:text-zinc-800'>CADASTRAR</Link>
                </div>

                <div className='p-[1rem_3rem] flex flex-col  w-full'>

                    <h2 className='text-[#0019ff] font-bold text-2xl text-center'>Crie sua conta</h2>
                    <p className='font-bold text-gray-500 text-center'>Cadastre seu dados na
                        <span className='text-black'> BLUE</span>
                        <span className='text-blue-500'>STORE</span></p>

                    <form className='flex flex-col gap-5 mt-5 w-full'
                        onSubmit={(e) => {
                            e.preventDefault();
                            LoginUser(); // ✅ chama a função
                        }}>

                        <div className='relative'>
                            <input type="text"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className='pl-[2.8rem] bg-gray-300 p-[1rem] font-bold w-full outline-blue-600' placeholder='EMAIL' />
                            <MdEmail className='absolute top-4 left-2 text-2xl text-gray-500' />
                        </div>

                        <div className='relative'>
                            <input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                type={showPassword ? 'text' : 'password'} className='pl-[2.8rem] bg-gray-300 p-[1rem] outline-blue-600 font-bold w-full' placeholder='SENHA' />
                            <FaLock className='absolute top-4 left-2 text-2xl text-gray-500' />

                            <button
                                type='button'
                                onClick={() => SetShowPassword(!showPassword)}
                                className='absolute top-4 right-5 text-2xl text-zinc-700'>

                                {
                                    showPassword ? <IoMdEyeOff /> : <IoIosEye />
                                }

                            </button>

                        </div>

                        <div className='md:hidden flex'>
                            <p>Não tem conta?</p>
                            <Link
                                className='text-blue-700 border-b-blue-700 border-b-1
                transition duration-300 hover:text-blue-500 hover:border-blue-500'
                                href='/register'>Faça Uma</Link>
                        </div>

                        <button className='bg-zinc-950 text-white py-4 rounded-full hover:bg-zinc-800 transition  w-42 m-[0_auto] duration-300 font-bold mt-5'>LOGIN</button>


                    </form>

                </div>


            </div>


        </div>
  )
}

export default Login
