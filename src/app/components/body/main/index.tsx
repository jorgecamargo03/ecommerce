'use client'
import React, { useEffect, useState } from 'react'
//imgs product
import product1 from '@/images/products/product-1.png'
import product2 from '@/images/products/product-2.png'
import product3 from '@/images/products/product-3.png'
import product16 from '@/images/exclusive.png'
//components
import CardProduto from '@/app/components/components_Extras/cardProduct'
import { UseMeproducts } from "@/app/context/MeproductsProvider";
import Image from 'next/image'
import { useCartActions } from '@/app/hooks/addItem'
//icons react-icon
import { FaStar } from "react-icons/fa";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
//loader
import { MoonLoader } from "react-spinners";
//extras
import { useRef } from 'react'
import axios from 'axios'
import Message from '../../components_Extras/message'

type ApiTypeProduct = {
  id: number
  title: string
  price: number
  image: string
  rating: {
    rate: number,
    count: number
  }
}
const Main = () => {
      const [msg, setMsg] = useState('')
      const [Apiproducts, setApiProducts] = useState<ApiTypeProduct[]>([])
      const { Meproduct } = UseMeproducts()
      const [loading, setLoading] = useState(true)
      const refUltimosProdutos = useRef<HTMLDivElement>(null)
      const [visibleCount, setVisibleCount] = useState(8)
      const { addItemCart } = useCartActions(setMsg)
      const handleViewMore = () => {
        setVisibleCount(prev => {
          const newCount = prev + 4
          return newCount >= Apiproducts.length ? Apiproducts.length : newCount
        })
      }
      const handleViewless = () => {
        setVisibleCount(prev => {
          const newCount = prev - 4;
          return newCount <= 8 ? 8 : newCount;
        });
        refUltimosProdutos.current?.scrollIntoView({ behavior: 'auto' });
      }
    useEffect(()=>{
     async function fetchProduct() {
      try {
        setLoading(true)
        const res = await axios.get("https://fakestoreapi.com/products")
        setApiProducts(res.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
  setTimeout(() => { fetchProduct() }, 1000);
    },[])
  return (
     <main className="w-full">
        <Message msg={msg} setMsg={setMsg} />
        <div className="w-full bg-[#2c2c2c]">
          <div className="max-w-300 m-[0_auto]">
            <div className="grid p-[4rem_1rem] md:grid-cols-3 gap-4 grid-cols-2 justify-center items-center">
              <Image src={product1} alt="Headset gamer profissional" />
              <Image src={product2} alt="Mouse ergonômico RGB" />
              <Image src={product3} alt="Teclado mecânico retroiluminado" />
            </div>
          </div>
        </div>

        <div className="bg-gray-200 relative">
          <div className="max-w-300 m-[0_auto] p-[4rem_1rem]">
            <h3 className="text-center font-bold text-3xl">Produtos Selecionados</h3>
            <div className="bg-blue-700 h-1 rounded-full w-18 m-[0_auto]"></div>

            {loading && (
              <div className="absolute inset-0 flex justify-center items-center top-28">
                <MoonLoader size={65} color="#0084ff" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {Apiproducts.slice(0, 4).map((produto) => (
                <CardProduto key={produto.id} produto={produto} MeProduct={Meproduct} AddCart={addItemCart} />
              ))}
            </div>
          </div>
        </div>

      
        <div className="bg-gray-200 relative pb-12">
          <div className="max-w-300 m-[0_auto] p-[4rem_1rem]">
            <h3 className="text-center font-bold text-3xl">Últimos Lançamentos</h3>
            <div className="bg-blue-700 h-1 rounded-full w-18 m-[0_auto]"></div>

            {loading && (
              <div className="absolute inset-0 flex justify-center items-center top-28">
                <MoonLoader size={65} color="#0084ff" />
              </div>
            )}

            <div ref={refUltimosProdutos} className="flex flex-col justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                {Apiproducts.slice(4, visibleCount).map((produto) => (
                  <CardProduto key={produto.id} produto={produto} MeProduct={Meproduct} AddCart={addItemCart} />
                ))}
              </div>

              {!loading && (
                <div className="flex mt-10 w-full justify-center flex-col items-center gap-5">
                  {visibleCount >= 12 && (
                    <button
                      type="button"
                      onClick={handleViewless}
                      className="p-1 px-5 font-light text-5xl transition duration-300 text-zinc-950 hover:text-zinc-800 flex items-center justify-center"
                    >
                      <FaArrowAltCircleUp />
                    </button>
                  )}
                  {visibleCount < 20 && (
                    <button
                      type="button"
                      onClick={handleViewMore}
                      className="p-1 px-5 font-light text-5xl transition duration-300 text-zinc-950 hover:text-zinc-800 flex items-center justify-center"
                    >
                      <FaArrowAltCircleDown />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      
        <div className="bg-[#2c2c2c] w-full p-[3rem_4rem]">
          <div className="max-w-[1200px] m-[0_auto] flex gap-4 items-center flex-col md:flex-row justify-center md:justify-start">
            <div className="basis-1/2">
              <Image src={product16} alt="Smart Band 4" />
            </div>
            <div className="flex flex-col gap-3 basis-1/2 text-white">
              <h3 className="font-bold text-3xl">Smart Band 4</h3>
              <p>
                Acompanhe seus treinos, sono e batimentos com estilo. A Smart Band 4 traz tecnologia avançada e bateria duradoura para quem busca desempenho e conforto no pulso.
              </p>
              <button className="bg-[#0084ff] cursor-pointer p-[0.8rem_3.8rem] hover:bg-[#003c74] transition duration-300 mt-3 self-start text-white rounded-full font-[500] text-[1rem]">
                Ver Agora &#8594;
              </button>
            </div>
          </div>
        </div>

    
        <div className="bg-gray-200 w-full">
          <div className="w-[1200px m-[0_auto] grid grid-cols-1 md:grid-cols-3 gap-3 p-[2rem_3rem]">
            {[
              {
                name: "Lorenza W7",
                text: "Adorei a experiência! O atendimento foi rápido e o produto chegou antes do prazo. A qualidade é impecável!",
              },
              {
                name: "Ph da Motorizada",
                text: "Comprei um headset gamer e estou impressionado. Som limpo, graves potentes e super confortável.",
              },
              {
                name: "Everton Detona",
                text: "Top demais! Os produtos são originais e o suporte da loja me ajudou em tudo. Voltarei a comprar com certeza.",
              },
            ].map((av) => (
              <div key={av.name} className="flex flex-col gap-1 justify-center items-center p-[1rem_1.8rem] bg-white shadow-lg shadow-zinc-800 text-center rounded-2xl">
                <h3 className="text-[150px] text-blue-500 font-bold h-[120px]">&quot;</h3>
                <p>{av.text}</p>
                <div className="text-lg text-blue-500 flex items-center">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span className="font-bold">{av.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
  )
}

export default Main
