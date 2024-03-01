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
    <div class=" pb-5  w-full flex flex-row m-10 -ml-3">
      <Navbar />
      <button
        onClick={() => {
          handleGwBalanceUpdate();
        }}
      >
        click
      </button>

      <div class="  m-5 p-10">
        <div>
          You have generated <span className="text-green-400">{gwBalance}</span>{" "}
          GW tokens{" "}
        </div>
      </div>

      <div class=" m-5 p-10"></div>
    </div>
  );
}
