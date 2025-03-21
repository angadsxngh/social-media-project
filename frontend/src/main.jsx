import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Messages from './components/Messages/Messages.jsx'
import Login from './components/Login/Login.jsx'
import Posts from './components/Posts/Posts.jsx'
import Account from './components/Account/Account.jsx'
import SignUp from './components/SignUp/SignUp.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Posts' element={<Posts/>}/>
      <Route path='/Messages' element={<Messages/>}/>
      <Route path='/Account' element={<Account/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
