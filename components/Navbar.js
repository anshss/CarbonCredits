"use client"
import React from "react";
import Link from "next/link";
import { useState } from "react";


export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <header class="fixed top-0 w-full clearNav z-50">
        <div class="max-w-5xl mx-auto flex flex-wrap p-5 flex-col md:flex-row">
          <div className="flex flex-row items-center justify-between p-3 md:p-1">
            <Link
              href="/"
              class="flex text-3xl text-white font-medium mb-4 md:mb-0 "
            >
              CarbonCredits
            </Link>
  
           
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <div class="md:ml-auto md:mr-auto font-4 pt-1 md:pl-14 pl-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
              <Link
                class="mr-12 md:ml-18 ml-0 cursor-pointer text-gray-300 hover:text-white text-2xl hover:text-l font-semibold tr04"
                href="/lease"
              >
                Sale
              </Link>
              <Link
                class="mr-12 md:ml-18 ml-0 cursor-pointer text-gray-300 hover:text-white text-2xl hover:text-l font-semibold tr04"
                href="/lending"
              >
                Lending
              </Link>
              
            </div>
            <button className="border-2 border-white p-2 px-3 rounded-full">connect</button>
          </div>
        </div>
      </header>
    );
}