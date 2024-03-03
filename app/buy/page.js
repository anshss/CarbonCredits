"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getOrdersArray,
  createSellOrder,
  counterTest,
  buyOrder,
  buyOption,
  getGwTokenBalance,
} from "../../utils";
export default function Main() {
  const [gwBalance, setGwBalance] = useState("Fetching ...");
  const [ordersArray, setOrdersArray] = useState([]);

  async function handleGwBalanceUpdate() {
    console.log("Fetching GW token balance...");
    try {
      const updatedBalance = await getGwTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setGwBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch GW token balance:", error);
    }
  }
  useEffect(() => {
    handleGwBalanceUpdate();
  }, []);
 

  return (
    <div className="w-full h-screen">
     <Navbar />
        <div className="text-center text-3xl pt-40">
          You have generated <span className="text-green-400">{gwBalance}</span>{" "}
          GW tokens{" "}
          <button
          className="border rounded-xl ml-10 text-2xl px-8 hover:bg-slate-50 hover:text-black"
          onClick={async () => {
            console.log(await getOrdersArray());
          }}
        >
          Click
        </button>
        </div>

        

        <div class="w-full max-w-sm bg-white border-2 border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-300 mt-14 ml-12 pt-5">
          <span className="ml-5 mt-5">owner</span>
         <div className="border m-2 ml-5 text-xl px-3">
            hello
         </div>
         <span className="ml-5">seller</span>
         <div className="border m-2 ml-5 text-xl px-3">
            Seller address
         </div>
         <span className="ml-5">Order ID</span>
         <div className="border m-2 ml-5 w-3/5 text-xl px-3">
            Order ID
         </div>
         <span className="ml-5">Seller price</span>
         <div className="border m-2 mb-5 ml-5 w-3/5 text-xl px-3">
            Price
         </div>

          <div class="px-5 pb-5">
          <div class="mx-10 items-center justify-between">
          <button className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800">Buy</button>

          <button className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800 ml-20">Sell</button>
          </div>
          </div>
        </div>
    </div>
  );
}
