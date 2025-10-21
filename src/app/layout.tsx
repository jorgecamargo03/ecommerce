
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper  from "./components/navbarWrapper/page";
import { ProductsProvider } from "./context/MeproductsProvider/page";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  
  title: "BLUE STORE",
  icons:{
    icon:'/favicon.ico'
  },
  description: "online commerce to help you make your purchases"
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body  className={`${geistSans.variable}
    
      ${geistMono.variable} antialiased`}>
        <ProductsProvider>
      <NavbarWrapper/>
        {children}
        </ProductsProvider>
      </body>
    </html>
  );
}
