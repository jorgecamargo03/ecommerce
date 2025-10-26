"use client"
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { UseMeproducts } from '@/app/context/MeproductsProvider'
import { IoCart } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link'
const NavBar = () => {
  const router = useRouter()
  const [showMenu,SetShowMenu]=useState(false)
  const {Meproduct,tokenValido}=UseMeproducts()

  return (

  <div className="bg-[#2c2c2c] p-[1rem] fixed w-full top-0 shadow-[1px_0px_5px_#2c2c2c] z-99 flex">
 
 
         <div className="max-w-[1200px] flex mx-auto justify-between w-full
         items-center">
 
           <Link href='/'
             className="text-blue-500 text-2xl uppercase font-bold md:text-3xl cursor-pointer">Blue<span className="text-white">Store</span></Link>
 
           <nav className={`transition duration-300 
             ${showMenu ? 'block translate-y-[100px] w-full absolute -top-[40px] left-0 bg-[#2c2c2c]' : 'hidden'}
           lg:block`}>
 
             <ul className="flex items-center gap-5 md:flex-row flex-col pb-1">
 
               <li onClick={() => router.push('/')} className="nav-ul-li">
                 Home
               </li>
               <li onClick={() => router.push('/')}
                 className="nav-ul-li"
               >Produtos</li>
               <li onClick={() => router.push('/')}
                 className="nav-ul-li"
               >Contacto</li>
               <li onClick={() => router.push('/myProfile')}
                 className="nav-ul-li"
               >Conta</li>
             </ul>
 
           </nav>
 
           <div className="flex justify-between text-3xl gap-4 text-white items-center">
 
 
             {tokenValido ? '' : <button
               onClick={() => router.push('/register')}
               className="text-sm py-1 px-3 bg-blue-500 rounded-xl font-bold transition duration-300 hover:bg-blue-700">Fazer Login/Cadastro</button>}
 
 
 
             <Link 
             href='/meCart'
             className="relative flex items-center  transition duration-300 hover:scale-130">
               <button className="cursor-pointer "><IoCart /></button>
 
               <div className={`bg-blue-600 rounded-full w-5 h-5 absolute text-sm flex justify-center items-center -top-1 -left-2
             ${Meproduct.length === 0 ? 'hidden' : 'block'}`}>{Meproduct.length}</div>
             </Link>
 
 
             <button
               onClick={() => SetShowMenu(!showMenu)}
               className="lg:hidden  transition duration-300 hover:scale-130"><RxHamburgerMenu /></button>
           </div>
         </div>

       </div>
  )
}

export default NavBar
