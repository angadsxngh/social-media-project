import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Login from "../Login/LoginWithUsername";
import LoginBtn from "../Buttons/LoginBtn";
import SignUpBtn from "../Buttons/SignUpBtn";
import Btn from "../Buttons/Btn";
import menu from "../../images/hamburger.png"
import logo from "../../images/twitter.png"
import { useUser } from "../../context/UserContext";
import { useContext } from "react";

export default function Header() {

    const { user, logout } = useUser();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        setIsLoggedIn(!user)
    }, [user])

    const handleClick = async () => {
        if(logout){
            await logout()
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
                <img className="w-[10%] lg:w-[5%]" src={logo} alt="" />
                {user && (
                    <ul className="hidden md:flex gap-6">
                    <NavLink to="/Posts" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Posts</button></NavLink>
                    <NavLink to="/find-user" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Find</button></NavLink>
                    <NavLink to="/Messages" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Messages</button></NavLink>
                    <NavLink to="/Account" className={({isActive}) => `${isActive?"text-blue-500":"text-white"}`}><button href="#" className="hover:text-blue-500">Profile</button></NavLink>
                </ul>
        )}

                {!user && (<NavLink to="SignUp"><button className="cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">Sign Up</button></NavLink>)}

                {user && (<NavLink to="/"><button onClick={handleClick} className="cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">Logout</button></NavLink>)}
            </nav>
        

        
        </header>
    );
}

