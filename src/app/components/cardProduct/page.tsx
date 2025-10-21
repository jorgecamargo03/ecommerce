import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
import Image from 'next/image';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import Link from 'next/link';
import { useFormatCurrency } from '@/app/middleWare/priceBrl';
import { useRouter } from 'next/navigation';
type RatingType={
    rate:number,
    count:number
}

type ProdutoType={
   
    title:string,
    id:number,
    image:string,
    rating:RatingType,
    price:number
}
type meProductType ={
  title: string;
  price: number;
  rating: number;
  image: string;

}
type Props={
    produto:ProdutoType
    MeProduct:meProductType[]
    AddCart: (id: number) => Promise<void>
    
}

const Card = ({produto,AddCart,MeProduct}:Props) => {
    const router = useRouter()
    const inCart = MeProduct.some((p) => p.title === produto.title)
    const fullstars = Math.round(produto.rating.rate)
    const emptyStars = 5 - fullstars
    const {formatCurrency} = useFormatCurrency()

  return (
       <div
        
        className="transition duration-300 hover:-translate-y-5 flex flex-col gap-2 mt-3 relative group justify-end items-center bg-white rounded-lg px-1 shadow-sm shadow-zinc-800/50 pt-2">
          <div 
          onClick={()=>router.push(`/products/${produto.title}`)}
          className='w-[60%] h-[70%] absolute z-1  top-8'>

          </div>
        

                <Image 
                width={200}
                height={200}
                src={produto.image} 
                alt={produto.title} className="rounded-sm" />
                <span className="font-bold">{produto.title}</span>

                <div className="flex text-blue-600">

                {[...Array(fullstars)].map((_,i) => (
                    <FaStar key={i}/>
                ))}

                {[...Array(emptyStars)].map((_,i)=>(
                    <FaRegStar key={i}/>
                ))}
                 
                </div>
                <p>{formatCurrency(produto.price)}$<span className="font-[500] text-sm">BRL</span></p>

                <div className="bg-gradient-to-t opacity-0 group-hover:opacity-100
                 to-transparent  from-black/50 rounded-lg
                  transition duration-300  absolute gap-5 h-full w-full flex justify-between items-end p-[1rem_.9rem] ">

                  <Link  href={`/products/${produto.title}`}
                  className="bg-blue-900 text-white px-2  py-1 text-2xl  rounded-full transition duration-300 hover:bg-zinc-950">
                  <FaInfoCircle />
                  </Link>


                   
                  {inCart?<Link  href={`/meCart`}
                  
                  className="bg-blue-500 text-white px-2  py-1 text-sm  rounded-full transition duration-300 hover:bg-blue-800">
                  Ver o carrinho
                  </Link>
                    :
                  <button 
                  onClick={()=>AddCart(produto.id)}
                  className="bg-blue-500 text-white p-4 text-xl rounded-full transition duration-300 hover:bg-blue-800">
                    <FaCartPlus />
                  </button>}
                  
                 

                </div>

              </div>
  )
}

export default Card
