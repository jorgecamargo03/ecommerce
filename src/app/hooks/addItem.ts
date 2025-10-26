'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import apiUrl  from "./apiUrl"
import { UseMeproducts } from "@/app/context/MeproductsProvider/index"
import React from "react"


export function useCartActions(setMsg:React.Dispatch<React.SetStateAction<string>>) {
    const router = useRouter()
    const { Meproduct, setMeproduct,token } = UseMeproducts()
    

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
 return { addItemCart}
}