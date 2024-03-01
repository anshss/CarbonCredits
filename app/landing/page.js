"use client"
import React from 'react'
import { useState } from 'react';

import Link from 'next/link'
export default function Landing(){
 
    return(
    <div className="">
        <nav className="bg-white/60 dark:bg-zinc-900/60 fixed w-full z-20 top-0 start-0 border- border-gray-200 dark:border-gray-600 mt-5 backdrop-blur-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/landing" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://w7.pngwing.com/pngs/361/627/png-transparent-leaf-logo-green-leaves-green-and-teal-leaf-logo-text-maple-leaf-grass-thumbnail.png" className="h-12 rounded-full" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CarbonCredits</span>
        </a>
        <div className="  ">
        <Link href="/sale">
        <button type="button" className="text-white  focus:outline-none focus:ring-blue-300 font-medium rounded-lg   text-md  py-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 p-12">Launch App</button> 
        </Link>  
         
        </div>
        </div>
        </nav>

        
      
       <div className="relative overflow-hidden  before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-26 pb-10">
  
       
  
    <div className="mt-40 max-w-2xl text-center mx-auto">
      <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
        Lets Grow
        <span className="bg-clip-text bg-gradient-to-tl from-white to-green-700 text-transparent"> Together</span>
      </h1>
    </div>
   

    <div className="mt-5 max-w-3xl text-center mx-auto">
      <p className="text-2xl text-gray-600 dark:text-gray-400">Empower a Sustainable Future, One Credit at a Time.
Fuel the Change with Green Energy Credits.</p>
    </div>

  
    <div className="mt-8 gap-3 flex justify-center">
      
    <img className="w-full h-auto max-w-2xl rounded-lg" src="https://www.tickertape.in/blog/wp-content/uploads/2023/03/30-Mar-2023-These-2-Mutual-Funds-Invest-only-in-Energy-Sector-47.png" alt="image" />

    
    </div>
  </div>
</div>



        <div className="mt-20 ml-20 mb-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the <span className="underline underline-offset-3 decoration-8 decoration-green-300 dark:decoration-green-500">Green Potential .</span></h1>
            <p className="text-xl mr-72 mt-5 font-normal text-gray-500  dark:text-gray-400">
            Green energy credits, also known as renewable energy certificates (RECs), represent a significant mechanism in the promotion and adoption of renewable energy sources. Each credit certifies the generation of one megawatt-hour (MWh) of electricity from renewable resources, such as wind, solar, hydro, and biomass.</p>
            
        </div>

        <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
        <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        </div>
        </div>
        
        <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
        <p className="mb-3 ml-20 mr-5 text-xl text-gray-500 dark:text-gray-400">Furthermore, green energy trading is facilitated by various platforms and regulatory frameworks designed to ensure transparency, integrity, and accountability in the market. These systems help to match buyers with sellers, verify the renewable origin of the energy.</p>
        <blockquote className="mb-3 mr-24">
        <p className="text-xl italic font-semibold text-gray-900 dark:text-white"> This market-driven approach incentivizes the development of renewable energy projects, helps to finance new green power facilities, and promotes the shift away from fossil fuels towards a cleaner, more sustainable energy future. </p>
        </blockquote>
        </div>

        

<footer className="bg-white rounded-lg shadow ml-20 mr-20 mt-10 mb-8 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-md text-gray-500 sm:text-center dark:text-gray-400"> <a href="#" className="hover:underline">CarbonCredits™</a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-md font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="https://github.com/anshss/CarbonCredits" className="hover:underline me-4 md:me-6">About</a>
        </li>
       
        <li>
            <a  href="#" className="hover:underline" >Contact</a>
        </li>
        
    </ul>
    </div>
</footer>


    </div>
    )
}