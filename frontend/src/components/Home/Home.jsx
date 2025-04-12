import React from "react";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import { SampleContextProvider } from "../../context/samplecontext";

import { UserProvider } from "../../context/UserContext";

export default function Home() {
  return (
    <div className="bg-black text-white">
      
      {/* Hero Section */}
      <section className="text-center py-32 px-6">
        <h2 className="text-4xl font-bold leading-tight max-w-2xl mx-auto text-blue-400">
          When you need space to share your thoughts
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-gray-400">
          Imagine a place where just you and a handful of friends can share
          moments together.
        </p>
        <NavLink to="/SignUp">
        <button className="mt-6 cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">
          Get Started
        </button>
        </NavLink>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-[#111]">
        <h2 className="text-center text-3xl font-bold text-blue-400">
          Why Join Singhstagram?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#222] rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-400">Connect</h3>
            <p className="mt-2 text-gray-400">Connect with your loved ones.</p>
          </div>
          <div className="p-6 bg-[#222] rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-400">Share</h3>
            <p className="mt-2 text-gray-400">
              Share your best moments with the people you find best.
            </p>
          </div>
          <div className="p-6 bg-[#222] rounded-lg text-center">
            <h3 className="text-xl font-semibold text-blue-400">Explore</h3>
            <p className="mt-2 text-gray-400">
              Dive into moments shared by everyone and find new people.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-400">
          Join a Community That Matches Your Vibe
        </h2>
        <p className="mt-2 text-gray-400 max-w-xl mx-auto">
          Connect with people who share your interests. Explore trending
          communities, join discussions, and build meaningful relationships.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#222] rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              Tech Enthusiasts
            </h3>
            <p className="mt-2 text-gray-400">
              Join groups discussing AI, Blockchain, and the latest in
              technology.
            </p>
            <button className="mt-4 cursor-pointer bg-blue-400 px-6 py-2 rounded-lg text-black font-semibold">
              Explore
            </button>
          </div>
          <div className="p-6 bg-[#333] rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              Creators & Influencers
            </h3>
            <p className="mt-2 text-gray-400">
              Collaborate with creators, share your work, and gain more
              visibility.
            </p>
            <button className="mt-4 cursor-pointer bg-blue-400 px-6 py-2 rounded-lg text-black font-semibold">
              Join Now
            </button>
          </div>
          <div className="p-6 bg-[#222] rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              Gaming Community
            </h3>
            <p className="mt-2 text-gray-400">
              Find teammates, discuss strategies, and stay updated on gaming
              trends.
            </p>
            
            <button className="mt-4 cursor-pointer bg-blue-400 px-6 py-2 rounded-lg text-black font-semibold">
              Connect
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 text-center bg-[#111]">
        <h2 className="text-3xl font-bold text-blue-400">
          Ready to get started?
        </h2>
        <NavLink to="/SignUp">
        <button className="mt-6 cursor-pointer bg-blue-400 px-6 py-3 rounded-lg text-black font-semibold">
          Join Now
        </button>
        </NavLink>
      </section>
    </div>
  );
}
