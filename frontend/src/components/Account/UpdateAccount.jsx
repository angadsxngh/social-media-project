import React from "react";
import { NavLink } from "react-router-dom";

export default function UpdateAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        
        {/* Menu Options */}
        <ul className="space-y-3">
            <li>
          <NavLink to="/update-account/update-pfp">
                <button className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded  cursor-pointer">
                Change Profile Picture
                </button>
          </NavLink>
            </li>
          <li>
            <NavLink to="/update-account/update-name">
                <button className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded  cursor-pointer">
                Change Name
                </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/update-account/update-password">
                <button className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded  cursor-pointer">
                Change Password
                </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/delete-account'>
                <button className="w-full bg-red-600 hover:bg-red-700 p-3 rounded  cursor-pointer">
                Delete Account
                </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
