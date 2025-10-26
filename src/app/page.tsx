'use client'
//react icons
import { useEffect } from "react";
//img icons

//body components
import Header from "./components/body/header";
import Main from "./components/body/main";
import Footer from "./components/body/footer";

export default function Home() {

  useEffect(() => {
    const checksessionToken = sessionStorage.getItem('sessionToken')
   if (!checksessionToken){
    sessionStorage.setItem('sessionToken','true')
     window.location.reload();
  ; }
   
  }, [])

  return (
    <div className="mt-15">
     
     <Header/>

     <Main/>
   
     
     <Footer/>

    </div>
  );
}

