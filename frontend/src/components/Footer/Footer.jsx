import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/singhstagram.png";
import { FaHome, FaImages, FaRegCommentDots, FaUser } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { RiAccountCircle2Line } from "react-icons/ri";

export default function Footer() {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user);
  }, [user]);

  return (
    <footer className="bg-black text-white">
      <div className="hidden lg:block mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
        <div className="flex flex-col md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} className="mr-3 w-12" alt="SOON TO BE ADDED" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
                Resources
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/angadsxngh"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
                Legal
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 lg:my-8" />
        <div className="flex justify-around space-x-[80%] flex-col lg:flex-row">
          <div>
            <span className="text-sm text-gray-500">All Rights Reserved.</span>
          </div>
        </div>
      </div>

      {/* 🟢 Show Mobile Footer Only When Logged In */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 w-full py-5 bg-black text-white p-3 flex justify-around items-center border-t border-gray-700 md:hidden">
          <NavLink
            to="/Posts"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-blue-400" : "text-gray-400"
              }`
            }
          >
            <IoHomeOutline className="text-xl" />
          </NavLink>

          <NavLink
            to="/find-user"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-blue-400" : "text-gray-400"
              }`
            }
          >
            <CiSearch className="text-xl" />
          </NavLink>

          <NavLink
            to="/Account"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-blue-400" : "text-gray-400"
              }`
            }
          >
            <RiAccountCircle2Line className="text-xl" />
          </NavLink>
        </div>
      )}
    </footer>
  );
}
