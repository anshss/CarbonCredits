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
import Card from "../../components/Card";
export default function Main() {
  const [gwBalance, setGwBalance] = useState("Fetching ...");
  const [ordersArray, setOrdersArray] = useState([]);

  async function handleGwBalanceUpdate() {
    //console.log("Fetching GW token balance...");
    try {
      const updatedBalance = await getGwTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setGwBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch GW token balance:", error);
    }
  }
  async function updateArray() {
    const arr = await getOrdersArray();
    //console.log(arr);
    setOrdersArray(arr);

    //console.log(ordersArray);
    // for (let i = 0; i < ordersArray.length; i++) {
    //     if(ordersArray[i][9]){
    //         const currArr = ordersArray[i];
    //         //console.log(currArr[i]);
    //         <Card array={currArr}></Card>
    //     }
    //   //console.log(ordersArray[i][0]);
    //   for (let j = 0; j < ordersArray[i].length; j++) {
    //     //console.log(ordersArray[i][j]);
    //   }
    // }
  }

  useEffect(() => {
    handleGwBalanceUpdate();
    updateArray();
  }, [ordersArray]);

  return (
    <div className="w-full h-screen">
      <Navbar />

      <div className="text-center text-3xl pt-40">
        You have generated <span className="text-green-400">{gwBalance}</span>{" "}
        GW tokens{" "}
        <button
          className="border rounded-xl ml-10 text-2xl px-8 hover:bg-slate-50 hover:text-black"
          onClick={() => {
            updateArray();
          }}
        >
          Click
        </button>
      </div>
      {ordersArray.map((data) => {
        return <Card array={data}></Card>;
      })}
    </div>
  );
}
