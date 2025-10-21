'use client'
import { usePathname } from 'next/navigation'
import NavBar from '../NavBar/page'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const showNavbar = pathname !== '/login' && pathname !== '/register'

  return showNavbar ? <NavBar /> : null
}
