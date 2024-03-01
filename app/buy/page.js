"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { createSellOrder, counterTest, getGwTokenBalance } from "../../utils";
export default function Main() {
  const [gwBalance, setGwBalance] = useState("Fetching ...");

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
    <div className=" pb-5  w-full flex flex-row m-10 -ml-3">
      <Navbar />
      

      <div className="w-full m-5 p-10">
        <div className="text-center text-3xl">
          You have generated <span className="text-green-400">{gwBalance}</span>{" "}
          GW tokens{" "}
        </div>

        <button
        className="border rounded-xl  text-2xl px-8 hover:bg-slate-50 hover:text-black"
        onClick={() => {
          handleGwBalanceUpdate();
        }}
      >
        Click
      </button>
      </div>

      <div className=" m-5 p-10"></div>
    </div>
  );
}
