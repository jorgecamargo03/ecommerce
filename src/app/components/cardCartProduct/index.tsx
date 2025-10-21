'use client'
import Image from 'next/image'
import React from 'react'
import { UseMeproducts } from '@/app/context/MeproductsProvider';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import apiUrl from '../../middleWare/apiUrl'

import { useRouter } from 'next/navigation';
import { useFormatCurrency } from '@/app/middleWare/priceBrl';
import Link from 'next/link';
type meProductType = {
    _id: string
    title: string;
    price: number;
    rating: number;
    image: string;
}
type props = {
    produto: meProductType
    productsSelected: string[]
    setProductsSelected: React.Dispatch<React.SetStateAction<string[]>>
    setMsg:React.Dispatch<React.SetStateAction<string>>
}

const CartProduct = ({ produto, productsSelected, setProductsSelected,setMsg}: props) => {
    
    const {setMeproduct,token}=UseMeproducts()
    const router = useRouter()
    const {formatCurrency}=useFormatCurrency() 
  
    async function deletedUnique(id: string) {
    try {
      const res = await axios.delete(`${apiUrl}/products/deleteUnique/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      if (res.status === 200) {
        console.log(res.data.msg);
        
        setMsg(res.data.msg)
      }
      setMeproduct(prev => prev.filter(item => item._id !== id))

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Aqui pegamos a mensagem do backend
        const backendMsg = err.response?.data?.msg;
        if (backendMsg) {
          setMsg(backendMsg);

        } else {
          setMsg('Erro ao deletar ❌');
          console.log(err);


        }
      } else {
        setMsg('Erro inesperado ❌');

      }
    }
  }
    return (
    <div
                   
                   key={produto._id}
                   
                   className='flex gap-3 justify-between items-center
               bg-white shadow-sm shadow-zinc-800 p-4 mt-2 mb-2
               hover:scale-102
             
                transition duration-300'>
                   <div className='flex items-center gap-5  max-w-95 w-full  px-6 '>
                
                     <input
                       checked={productsSelected.includes(produto._id)}
                       onChange={(e) => {
                         
     
                         const checked = e.target.checked;
                         setProductsSelected(prev =>
                           checked
                             ? prev.includes(produto._id) ? prev : [...prev, produto._id]
                             : prev.filter(id => id !== produto._id)
                         );
                       }}
                       type="checkbox" name="" id="" className='scale-130 z-50 sticky' />
                     <Image
                     onClick={()=>router.push}
                       width={100}
                       height={100}
                       src={produto.image} alt={`${produto.title}`} className='w-14 h-15' />
     
                     <Link href={`/products/${produto.title}`}
                     className='transition duration-200 hover:text-blue-600'>
                       {produto.title.length > 16
                         ? produto.title.slice(0, 16) + "..."
                         : produto.title}
                     </Link>
     
                   </div>
                   <div className='flex gap-5  max-w-30 w-full justify-between  items-center'>
                     <p>{formatCurrency(produto.price)}</p>
                     <button
                       onClick={() => deletedUnique(produto._id)}
                       className='text-3xl text-red-600 pl-1'><MdDelete /></button>
                   </div>
     
     
     
     
    </div>
    )
}

export default CartProduct
