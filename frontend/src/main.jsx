import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Messages from './components/Messages/Messages.jsx'
import LoginEmail from './components/Login/LoginWithEmail.jsx'
import LoginUsername from './components/Login/LoginWithUsername.jsx'
import Posts from './components/Posts/Posts.jsx'
import Account from './components/Account/Account.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import UpdateAccount from './components/Account/UpdateAccount.jsx'
import UpdatePfp from './components/Account/UpdatePfp.jsx'
import UpdateName from './components/Account/UpdateName.jsx'
import UpdatePassword from './components/Account/UpdatePassword.jsx'
import DeleteAccount from './components/Account/DeleteAccount.jsx'
import Card from './components/Card/Card.jsx'
import CreatePost from './components/Posts/CreatePost.jsx'
import FindUser from './components/Account/FindUser.jsx'
import Profile from './components/Account/Profile.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/Login-email' element={<LoginEmail/>}/>
      <Route path='/Login-username' element={<LoginUsername/>}/>
      <Route path='/update-account' element={<UpdateAccount/>}/>
      <Route path='/update-account/update-pfp' element={<UpdatePfp/>}/>
      <Route path='/update-account/update-name' element={<UpdateName/>} />
      <Route path='/update-account/update-password' element={<UpdatePassword/>} />
      <Route path='/delete-account' element={<DeleteAccount/>} />
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Posts' element={<Posts/>}/>
      <Route path='/Messages' element={<Messages/>}/>
      <Route path='/Account' element={<Account/>}/>
      <Route path='/Card' element={<Card/>}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/find-user' element={<FindUser/>}/>
      <Route path='/profile/:userid' element={<Profile/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
