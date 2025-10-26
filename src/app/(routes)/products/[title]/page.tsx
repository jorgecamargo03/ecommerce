'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useFormatCurrency } from '@/app/hooks/priceBrl'
import { FaCartPlus } from "react-icons/fa";
import { UseMeproducts } from '@/app/context/MeproductsProvider'
import apiUrl from '@/app/hooks/apiUrl'
import Message from '@/app/components/components_Extras/message'
import { useRouter } from 'next/navigation'
import CardProduct from '@/app/components/components_Extras/cardProduct'
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
const Page = () => {
  const params = useParams<{ title: string }>()
  const titleId = params?.title ? decodeURIComponent(params.title) : ''
  const { formatCurrency } = useFormatCurrency()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<ApiTypeProduct | null>()
  const { Meproduct, setMeproduct } = UseMeproducts()
  const [listProduct,setListProduct]=useState<ApiTypeProduct[]>([])
  const [msg, setMsg] = useState('')
  const router = useRouter()
  async function addItemCart(id: number) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMsg("Você precisa estar logado para adicionar produtos");
        router.push("/login");
        return;
      }
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      const product = {
        _id: res.data.id,
        title: res.data.title,
        price: res.data.price,
        rating: res.data.rating.rate,
        image: res.data.image
      }

      const productExist = Meproduct.some((p) => p._id === product._id)
      if (productExist) {
        setMsg("Esse produto já está no seu carrinho 🛒")
        return
      }

      await axios.post(`${apiUrl}/products/add`, product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setMeproduct((prev) => [...prev, product])
      setMsg('Adicionado ao carrinho com sucesso ✅')

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const backendMsg = err.response?.data?.msg;

        if (status === 401 || backendMsg?.toLowerCase().includes("token")) {
          setMsg("Sessão expirada. Faça login novamente 🔐");
          router.push("/login");
        } else if (backendMsg) {
          setMsg(backendMsg); // mostra só a mensagem do backend
        } else {
          setMsg("Erro ao adicionar produto ❌");
        }
      } else {
        setMsg("Erro inesperado ❌");
      }
    }

  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!titleId) {
          setLoading(false)
          return
        }

        const res = await axios.get<ApiTypeProduct[]>('https://fakestoreapi.com/products')
        setListProduct(res.data)
        const FoundProduct = res.data.find(
          (p) => p.title.toLowerCase() === titleId.toLowerCase()
        )
        setProduct(FoundProduct ?? null)
      } catch (error) {
        console.log('erro ao buscar o produto', error);
        setLoading(false)

      }
      finally {
        setLoading(false)
      }

    }
    fetchProduct()
  }, [titleId])

  if (loading) {
    return <div className="absolute inset-0 flex justify-center items-center top-28">
      <MoonLoader size={65} color="#0084ff" />
    </div>
  }
  if (!product) {
    return <div className="absolute inset-0 flex justify-center items-center top-0">
      <div className='bg-zinc-300 p-3 py-7 rounded-sm flex gap-6 w-[90%] max-w-[550px]'>
        <h1 className='text-5xl text-gray-700 '>!Ops</h1>
        <div className='flex flex-col text-zinc-600 italic'>
          <p>Produto Não encontrado</p>
          <p>Não encontrou o produto que Deseja?</p>
          <p>Nos envie Um Email:
            <Link target='_blank' href='https://gmail.com' className='ml-2 text-blue-600 border-b-1 border-b-blue-700 cursor-pointer'>vendadaBlue@vendas.com</Link>
          </p>
          <Link href='/' className='mt-5 not-italic text-center cursor-pointer bg-blue-800 py-3 rounded-xl text-white font-bold transition hover:bg-blue-500'>Voltar ao Inicio</Link>
        </div>
      </div>

    </div>
  }

  return (
    <div className="p-[2rem_0rem] mt-15 bg-gray-200 flex flex-col gap-2 w-full">
      <Message setMsg={setMsg} msg={msg} />

      <div className='flex md:flex-row flex-col  pb-8  gap-5 max-w-300 m-[0_auto] w-[99%]  '>

        <div className='basis-1/2'>
          <Image
            width={100}
            height={100}
            className='max-w-100 w-full m-[0_auto] '
            src={product.image} alt={`Produto ${product.title}`} />

        </div>
        <div className='basis-1/2  flex flex-col justify-around px-2'>

          <div>
            <div>
              <h1 className='font-bold text-2xl mb-1'>{product.title}</h1>
              <div className='flex gap-3'>
                <div className='border-r-1 border-r-gray-500 flex gap-2 pr-5'>
                  <p className='border-b-1'>{product.rating.rate}</p>
                  <div className='flex items-center gap-0.5 text-blue-700'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.round(product.rating.rate) ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='text-gray-600 flex gap-1'>
                  <span className='text-zinc-950 border-b-1'>{product.rating.count}mil</span>Avaliações
                </div>
              </div>
            </div>

            <div className='p-[1rem_.5rem]'>

              <div className='flex items-center'>
                <p className='font-bold text-4xl'>{formatCurrency(product.price)}</p>
                <span className='line-through text-gray-600 italic'>{formatCurrency(product.price + 10)}</span>
              </div>

              <div className='text-sm mt-3 text-gray-500 flex items-center gap-5'>
                <p>Cartão de Credito</p>
                <span className='text-zinc-800'>9x {formatCurrency(product.price / 9)}</span>

              </div>

            </div>
          </div>

          <div className='gap-4 flex mt-10 '>
            <button
              onClick={() => {
                const inCart = Meproduct.some((p) => p.title === product.title)
                if(inCart) return router.push('/meCart')
                addItemCart(product.id)

              }}
              className='border-blue-500
          transition items-center gap-1 bg-blue-500/10
          hover:bg-blue-500/30
          border-2 py-2 px-1 flex'>

              <FaCartPlus />
              {Meproduct.some((p) => p.title === product.title) ? 'Ver no carrinho': 'Adicionar Ao Carrinho'}</button>

            <button className='
          bg-blue-600 text-white
          px-4 py-1 transition hover:bg-blue-700'>Comprar Agora</button>

          </div>




        </div>



      </div>

      <div  className='bg-gray-50 p-4 '>

        <h2 className='text-xl font-bold text-center pb-2'>Produtos Recomendados</h2>
        <div className="bg-blue-700 h-1 rounded-full w-18 m-[0_auto]"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 ">
        {listProduct.slice(4, 12).map((produto)=>(
          <CardProduct key={produto.id}
           AddCart={addItemCart} 
          produto={produto}
          MeProduct={Meproduct}/>
        ))}



        </div>



      </div>




    </div>
  )
}

export default Page

