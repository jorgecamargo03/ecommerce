'use client'
import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiUrl from '@/app/hooks/apiUrl'


type Meproduct = {
    _id: string,
    title: string,
    price: number
    rating: number
    image: string

}

type MeproductsContextType = {
    Meproduct: Meproduct[]
    setMeproduct: React.Dispatch<React.SetStateAction<Meproduct[]>>
    loading: boolean
    token: string
    tokenValido:boolean
    
}
const MeproductContext = createContext<MeproductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [Meproduct, setMeproduct] = useState<Meproduct[]>([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState('')
    const [tokenValido,setTokenValido]=useState(false)


  useEffect(() => {
  const fetchData = async () => {
    const tokenReq = localStorage.getItem('token')
    if (!tokenReq) {
      setTokenValido(false)
      setLoading(false)
      return
    }
    setToken(tokenReq)

    try {
      await axios.get(`${apiUrl}/products/check-token`, {
        headers: { Authorization: `Bearer ${tokenReq}` }
      })
      setTokenValido(true)

      const { data } = await axios.get(`${apiUrl}/products/me`, {
        headers: { Authorization: `Bearer ${tokenReq}` }
      })
      setMeproduct(data)
    } catch (error) {
      console.error(error)
      setTokenValido(false)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])

    return (
        <MeproductContext.Provider value={{ Meproduct, setMeproduct, loading, token,tokenValido }} >
            {children}
        </MeproductContext.Provider>
    )

}
export function UseMeproducts() {
    const context = useContext(MeproductContext)
    if (!context) {throw new Error('useMeproducts deve ser usado dentro de MeproductsProvider')}
    return context
}
