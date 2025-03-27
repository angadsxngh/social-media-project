import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../../context/UserContext'
import Loader from '../Loader/Loader'

function Layout() {
  return (  
    <>  
    <UserProvider>
    <Loader/>
    <Header/>
    <Outlet/>
    <Footer/>
    </UserProvider>
    </>
  )
}

export default Layout