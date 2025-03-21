import React from "react";
import { Link, NavLink } from 'react-router-dom'
import Login from "../Login/Login";
import LoginBtn from "../Buttons/LoginBtn";
import SignUpBtn from "../Buttons/SignUpBtn";
import Btn from "../Buttons/Btn";

export default function Header() {
    return (
        <header className="shadow sticky z-50 rounded mx-[-13.15%] mt-[-2.7%]">
            <nav className="bg-black px-3 w-full py-5">
                <div className="flex flex-wrap justify-between items-center  text-white w-full">
                    <div className="">
                        <img src="ADD SOURCE" alt="SOON TO BE ADDED" />
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
            </nav>
        </header>
    );
}

