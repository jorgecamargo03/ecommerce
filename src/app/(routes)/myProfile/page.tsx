'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoPersonCircle } from "react-icons/io5";
import apiUrl from '@/app/middleWare/apiUrl'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MoonLoader } from 'react-spinners';
type User = {
    _id: string,
    name: string,
    email: string,
}
const Meprofile = () => {
    const [profile, setProfile] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()


    useEffect(() => {
        let isMounted = true
        async function fetchME() {
           
                setLoading(true)
                const token = localStorage.getItem('token')
                if (!token) {
                    await router.push('/')
                    return
                }
            try {
                const res = await axios.get(`${apiUrl}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (isMounted) {
                    setProfile(res.data);
                }
            } catch (error) {
                // verifica se é erro de autenticação
                if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                    await router.push('/login');
                } else {
                    console.error('Erro ao buscar perfil:', error);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        
        fetchME()
        return () => {
            isMounted = false
        }
    }, [router])
    if (loading) {
    return <div className="absolute inset-0 flex justify-center items-center top-28">
      <MoonLoader size={65} color="#0084ff" />
    </div>}

  if (!profile) {
    return <div className="absolute inset-0 flex justify-center items-center top-0">
      <div className='bg-zinc-300 p-3 py-7 rounded-sm flex gap-6 w-[90%] max-w-[550px]'>
        <h1 className='text-5xl text-gray-700 '>!Ops</h1>
        <div className='flex flex-col text-zinc-600 italic'>
          <p>Perfil Não encontrado</p>
          <p>Houve erro?</p>
          <p>Nos envie Um Email:
            <Link target='_blank' href='https://gmail.com' className='ml-2 text-blue-600 border-b-1 border-b-blue-700 cursor-pointer'>vendadaBlue@vendas.com</Link>
          </p>
          <Link href='/' className='mt-5 not-italic text-center cursor-pointer bg-blue-800 py-3 rounded-xl text-white font-bold transition hover:bg-blue-500'>Voltar ao Inicio</Link>
        </div>
      </div>

    </div>
  }

    return (
        <div className='mt-20'>

            <div className='bg-zinc-200 p-[1rem_2rem] max-w-200 w-[90%] rounded-xl m-[0_auto]'>

                <span className='text-7xl text-blue-500  flex items-center justify-center '><IoPersonCircle /></span>
                <h1 className='text-2xl font-bold text-center'>Seja bem vindo,
                <span className='text-blue-600'>{profile?.name}</span>
            

                </h1>
                <p className='italic mt-5'>Email:
                   <span className='not-italic'> {profile.email}</span>
                    </p>
                <button 
                onClick={()=>{
                    localStorage.removeItem('token')
                    router.push('/login')
                }}
                className='bg-red-600
                text-white font-semibold transition hover:bg-red-900
                 px-5 py-1 w-[200px] block mt-3 rounded-xl m-[0_auto]'>Sair </button>




            </div>

        </div>
    )
}

export default Meprofile
