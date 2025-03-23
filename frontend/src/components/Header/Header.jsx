import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Login from "../Login/Login";
import LoginBtn from "../Buttons/LoginBtn";
import SignUpBtn from "../Buttons/SignUpBtn";
import Btn from "../Buttons/Btn";
import menu from "../../images/hamburger.png"
import logo from "../../images/twitter.png"

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const menuClick = () => {

        
        setIsOpen(!isOpen)

    }

    return (
        <header className="shadow sticky z-50 rounded mx-[-13.15%] mt-[-10%] lg:mt-[-2.7%]">
            <nav className="bg-black px-3 w-full py-5">
                <div className="hidden lg:flex flex-wrap justify-between items-center  text-white w-full">
                    <div className="mr-[-20%] pr-0">
                        <img className="w-[10%]" src={logo} alt="Logo" />
                        {/* <img src="wnid" alt="soon to be added" /> */}
                    </div>
                    <div className="flex justify-between">
                        <ul className="flex gap-3">
                            <li><NavLink
                                 to="/"
                                     className={({isActive}) =>
                                         `block pr-4 pl-4 py-2 duration-200 ${isActive ? "text-black bg-white " : "text-white"} border-b border-gray-100 hover:bg-gray-50 hover:text-black lg:border-0 rounded-lg`
                                     }
                                 >
                                     Home
                                 </NavLink></li> 
                            <li><NavLink
                                 to="/Posts"
                                     className={({isActive}) =>
                                         `block pr-4 pl-4 py-2 duration-200 ${isActive ? "text-black bg-white " : "text-white"} border-b border-gray-100 hover:bg-gray-50 hover:text-black lg:border-0 rounded-lg`
                                     }
                                 >
                                     Posts
                                 </NavLink></li> 
                            <li><NavLink
                                 to="/Messages"
                                     className={({isActive}) =>
                                         `block pr-4 pl-4 py-2 duration-200 ${isActive ? "text-black bg-white " : "text-white"} border-b border-gray-100 hover:bg-gray-50 hover:text-black lg:border-0 rounded-lg`
                                     }
                                 >
                                     Messages
                                 </NavLink></li> 
                            <li><NavLink
                                 to="/Account"
                                     className={({isActive}) =>
                                         `block pr-4 pl-4 py-2 duration-200 ${isActive ? "text-black bg-white " : "text-white"} border-b border-gray-100 hover:bg-gray-50 hover:text-black lg:border-0 rounded-lg`
                                     }
                                 >
                                     Account
                                 </NavLink></li> 
                        </ul>
                    </div>
                    <div className="">
                        <ul className="flex justify-between">
                            <li><NavLink to={"/Login"}><LoginBtn/></NavLink></li>
                            <li><NavLink to={"/SignUp"}><SignUpBtn/></NavLink></li>
                        </ul>

                    </div>
                </div>

                <div className="px-4">
                    <ul className="flex lg:hidden justify-around">
                        <li><img className="w-[10%]" src={logo} alt="LOGO" /></li>
                        <li><button onClick={menuClick}><img className={`ml-[70%] mt-[5%] w-[30%] transform transition-transform duration-300 
                            `} src={menu} alt="Menu" /><span
                            className={`ml-2 transform transition-transform duration-300 ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                          >
                          </span></button></li>
                    </ul>
                    {isOpen && (
                        <div className="absolute right-0 mt-[-3%] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <ul className="py-2 text-gray-700">
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 border-b-2">
                                Profile
                            </a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 border-b-2">
                                Settings
                            </a>
                            </li>
                            <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Logout
                            </a>
                            </li>
                        </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

