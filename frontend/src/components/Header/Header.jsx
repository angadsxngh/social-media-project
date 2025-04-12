import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Login from "../Login/LoginWithUsername";
import LoginBtn from "../Buttons/LoginBtn";
import SignUpBtn from "../Buttons/SignUpBtn";
import Btn from "../Buttons/Btn";
import logo from "../../images/singhstagram.png"
import { useUser } from "../../context/UserContext";
import { useContext } from "react";
import  ToasterUi  from "toaster-ui";

export default function Header() {

    const toaster = new ToasterUi()
    const { user, logout } = useUser();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        setIsLoggedIn(!user)
    }, [user])

    const handleClick = async () => {
        if(logout){
            await logout()
            toaster.addToast("Logged out succesfully", "success")
            setIsLoggedIn(false)
        }
        else{
            console.log("logout function is undefined");
            
        }
    }


    return (
        <header className=" left-0 w-full bg-[#111] text-white font-bold leading-tight">
            <nav className="flex justify-between items-center px-6 py-4 bg-[#111] shadow-md ">
                {/* <h1 className="text-2xl font-bold text-blue-400">Connect</h1> */}
                    <img className="w-[10%] lg:w-[5%] rounded-lg" src={logo} alt="" />
                {user && (
                    <ul className="hidden md:flex gap-6">
                    <NavLink to="/Posts" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Posts</button></NavLink>
                    <NavLink to="/find-user" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Find</button></NavLink>
                    <NavLink to="/Account" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Profile</button></NavLink>
                </ul>
        )}

                {!user && (
                    <div className="flex gap-3">
                        <NavLink to="/Login-username"><button className="cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">Login</button></NavLink>
                        <NavLink to="/SignUp"><button className="cursor-pointer hidden lg:inline bg-black border px-6 py-3 rounded-lg text-blue-400 font-semibold">Sign Up</button></NavLink>
                    </div>
                    )}

                {user && (<NavLink to="/"><button onClick={handleClick} className="cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">Logout</button></NavLink>)}
            </nav>
        

        
        </header>
    );
}

