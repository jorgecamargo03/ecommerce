import React from 'react'
import Image from 'next/image'
//img icons
import logoPlay from '@/images/play-store.png'
import logoApple from '@/images/app-store.png'
const Footer = () => {
  return (
      <footer className="bg-zinc-800 w-full p-[2rem_1.8rem]">
           <div className="grid items-center grid-cols-1 footer_md justify-between gap-4 border-b-2 border-b-white pb-4 max-w-[1280px] m-[0_auto]">
             <div className="flex flex-col gap-1">
               <p className="text-lg text-white font-bold">Baixe nossa aplicação</p>
               <span className="text-zinc-500">Disponível para Android e iOS</span>
               <div className="flex gap-1 w-[310px]">
                 <Image src={logoApple} alt="Logo da Apple" className="basis-1/2" />
                 <Image src={logoPlay} alt="Logo play store" className="basis-1/2" />
               </div>
             </div>
   
             <div className="text-center p-1 text-gray-300">
               <h2 className="text-2xl font-bold text-blue-500">
                 BLUE<span className="text-white">STORE</span>
               </h2>
               <p>
                 A loja que conecta você à nova geração de tecnologia. Preços acessíveis, entrega rápida e suporte especializado.
               </p>
             </div>
   
             <div>
               <p className="font-bold text-white text-lg">Links Úteis</p>
               <ul className="text-zinc-400 flex flex-col gap-1">
                 <li>Cupons e Descontos</li>
                 <li>Nosso Blog</li>
                 <li>Política de Privacidade</li>
                 <li>Termos de Uso</li>
               </ul>
             </div>
           </div>
   
           <div className="w-full mt-4 text-gray-400 text-center">
             <span>Copyright 2026 - Renato Camargo - Todos os Direitos Reservados</span>
           </div>
         </footer>
  )
}

export default Footer
