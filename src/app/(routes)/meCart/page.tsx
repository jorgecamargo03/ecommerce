'use client'
import { UseMeproducts } from '@/app/context/MeproductsProvider';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import apiUrl from '@/app/hooks/apiUrl'
import CardCartProduct from '../../components/components_Extras/cardCartProduct'
import Message from '@/app/components/components_Extras/message';
import ConfirmModal from '@/app/components/components_Extras/confirmModal';
import cartEmpty from '@/images/cartEmpty.png'
import Link from 'next/link';
import { useFormatCurrency } from '@/app/hooks/priceBrl';
const MeCart = () => {
  const [openModal, setOpenModal] = useState(false)
  const {formatCurrency}=useFormatCurrency()
  const { Meproduct, setMeproduct,token } = UseMeproducts()
  const [productsSelected, setProductsSelected] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [SearchQuery, setSearchQuery] = useState('')
  const [msg, setMsg] = useState('')
  const allPrice = Meproduct.filter(p => productsSelected.includes(p._id)).reduce((sum, p) => sum + p.price, 0)

  function checkAll(e: boolean) {
    if (e) return setProductsSelected(Meproduct.map(e => e._id));
    if (!e) return setProductsSelected([]);
  }

  async function deletedMany() {
    
    setOpenModal(true)
    try {
      const res = await axios.delete(`${apiUrl}/products/delete-many`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: productsSelected }
      })
      if (res.status === 200) {
        setMsg('Produtos deletados com sucesso ✅')
        setMeproduct(prev =>
          prev.filter(item => !productsSelected.includes(item._id))
        )
        setProductsSelected([])
        setOpenModal(false)

      }

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


    <div>

      <Message msg={msg} setMsg={setMsg} />
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={deletedMany}
      />

      <div className='p-3  flex bg-white shadow-gray-300 shadow-sm w-full justify-between mt-15 items-center sticky'>
        <p className='text-blue-600 border-l-2 border-l-blue-800 pl-4 text-lg
        md:text-2xl'>Carrinho de compras</p>
        <div className='border-blue-500 border-2 flex' >
          <input type="text" className='px-3 py-1'
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchQuery(searchInput);
              }}}
              placeholder='Busque seu produto'/>
                <button 
                onClick={()=>setSearchQuery(searchInput)}
                className='bg-blue-500 px-3 py-[6px] text-xl w-full h-full  text-white 
  
    hover:bg-blue-700 transition duration-200'>
                  <CiSearch />
                </button>


        </div>
      </div>


      <div className='mt-5 max-w-300  m-[0_auto] ' >

        <div>

          <div className='flex gap-3 items-center mt-1 justify-between bg-white shadow-sm p-4  shadow-gray-700 z-[100] border-b-gray-500/50 border-b-1 px-12 '>
            <div className='flex gap-3 items-center max-w-95 w-full '>
              <input type="checkbox" name="" id=""
                checked={Meproduct.length === productsSelected.length ? true : false}
                onChange={(e) => { checkAll(e.target.checked) }}
              />
              <p>Produtos</p>
            </div>
            <div className='flex gap-5 text-gray-600 border-l-2 border-blue-600 pl-9'>
              <p>Preço</p>
              <p>Ações</p>
            </div>
          </div>
        </div>

        <div className='overflow-y-auto overflow-x-hidden  max-h-full 
        mb-20 
        px-6'>

    
         {Meproduct.length>0 ?(
          Meproduct
          .filter((prev)=>prev.title.toLowerCase().includes(SearchQuery.toLowerCase()))
          .map((produto) => (
           <CardCartProduct 
           key={produto._id}
           setMsg={setMsg}
           setProductsSelected={setProductsSelected}
           produto={produto}
           productsSelected={productsSelected}/>
          ))) : <div className='flex w-full h-full  justify-center items-center mt-10 p-[.1rem_.5rem] flex-col'>
            <Image src={cartEmpty.src} 
            width={200}
            height={200}
            className='min-w-[200px] max-w-[300px] w-full '
            alt='não há produtos no carrinho'/>
            <p className="mt-4 text-sm font-bold ">Seu Carrinho de compras está vazio</p>
            <Link 
            className='bg-blue-600 py-2 px-5 rounded-sm text-white hover:bg-blue-800 transition duration-300 '
            href='/' >Ir Às compras Agora</Link>
            </div>}
          
        </div>



      </div>

      <div className='bg-white shadow-sm shadow-zinc-800 z-50 p-3 fixed bottom-0
     w-full justify-between flex py-5  gap-2  text-sm mt-5'>

        <div className='flex gap-2 items-center'>
          <input type="checkbox"
            className='scale-120'
            checked={Meproduct.length === productsSelected.length ? true : false}
            onChange={(e) => checkAll(e.target.checked)} />
          <p>Selecionar todos</p>
          <button
            disabled={productsSelected.length === 0}
            onClick={() => setOpenModal(true)}
            className='text-white font-semibold px-2 py-1 
            rounded-sm
            bg-red-700 hover:opacity-55 transition duration-300
            cursor-pointer disabled:opacity-30'>Excluir</button>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='font-bold'>Total ({productsSelected.length} {productsSelected.length <= 1 ? 'item' : 'itens'}):</span>

          <p className='text-blue-800 font-semibold '>{formatCurrency(allPrice)}</p>
          <button className='

            bg-blue-500 px-3 py-1 rounded-sm text-white font-bold 
            hover:bg-blue-800 transition duration-300'>
            Continuar
          </button>



        </div>

      </div>

    </div>

  )
}

export default MeCart
