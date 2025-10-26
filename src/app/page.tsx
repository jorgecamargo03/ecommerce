'use client'
//react icons
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import apiUrl from './middleWare/apiUrl'
import axios from "axios";
//imgs product
import product1 from '../images/products/product-1.png'
import product2 from '../images/products/product-2.png'
import product3 from '../images/products/product-3.png'
import msi_Header from '../images/gaming-msi-header.png'
import product16 from '../images/exclusive.png'
//img icons
import logoPlay from '../images/play-store.png'
import logoApple from '../images/app-store.png'
//components
import CardProduto from './components/cardProduct'
import { UseMeproducts } from "./context/MeproductsProvider";
import Message from "./components/message";
//icons react-icon
import { FaStar } from "react-icons/fa";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
//loader
import { MoonLoader } from "react-spinners";

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

export default function Home() {
  const [msg, setMsg] = useState('')
  const [Apiproducts, setApiProducts] = useState<ApiTypeProduct[]>([])
  const { Meproduct, setMeproduct, token } = UseMeproducts()
  const [loading, setLoading] = useState(true)
  const refUltimosProdutos = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(8)

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
  const router = useRouter()

  useEffect(() => {
   
    let cancel = false;
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await axios.get("https://fakestoreapi.com/products")
        if (!cancel) {
          setApiProducts(res.data)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    setTimeout(() => { fetchProduct() }, 1000);
    return () => { cancel = true }
  }, [])
  

  async function addItemCart(id: number) {
    try {
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

      await axios.post(`${apiUrl}/products/add`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` }
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
          setMsg(backendMsg)
        } else {
          setMsg("Erro ao adicionar produto ❌");
        }
      } else {
        setMsg("Erro inesperado ❌");
      }
    }
  }

  return (
    <div className="mt-15">
      <Message msg={msg} setMsg={setMsg} />

 
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

   
      <main className="w-full">
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

    </div>
  );
}

