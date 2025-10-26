import React from 'react'
import msi_Header from '@/images/gaming-msi-header.png'
import Image from 'next/image'
const Header = () => {
  return (
    <header className="flex justify-center items-center bg-[radial-gradient(#fff,#c7c7c7)] px-3">
           <div className="w-full max-w-[1200px] m-[0_auto] pb-[2rem]">
             <div className="flex items-center justify-center p-[1rem] flex-col md:flex-row md:p-0 pt-4">
               <div className="basis-1/2 h-full flex flex-col md:text-left text-center">
                 <h2 className="text-[3.2rem] mb-[1.5rem]">
                   Transforme seu dia com tecnologia de ponta
                 </h2>
                 <p className="leading-[1.5rem]">
                   Descubra produtos que unem desempenho, estilo e inovação. De gadgets inteligentes a notebooks potentes — tudo o que você precisa para elevar sua rotina.
                 </p>
                 <button className="bg-[#0084ff] cursor-pointer p-[0.8rem_3.8rem] hover:bg-[#003c74] transition duration-300 mt-3 text-white rounded-full font-[500] text-[1rem]">
                   Ver Agora &#8594;
                 </button>
               </div>
               <div className="basis-1/2 flex items-center justify-center">
                 <Image src={msi_Header} className="w-[115%]" alt="Imagem de laptop gamer" />
               </div>
             </div>
           </div>
         </header>
  )
}

export default Header
