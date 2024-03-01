"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { createSellOrder, counterTest, getGwTokenBalance } from "../../utils";
export default function Main() {
  const [gwBalance, setGwBalance] = useState("Fetching ...");
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [price, setPrice] = useState(0);
  const [isOption, setIsOption] = useState(false);
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionDuration, setOptionDuration] = useState(0);
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

  async function handleSubmit() {
    createSellOrder(noOfTokens, price, optionPrice, optionDuration);
    setPrice(0);
    setNoOfTokens(0);
    setOptionPrice(0);
    setOptionDuration(0);
  }
  function handleNoOfTokenUpdate(noOfTokens) {
    console.log("incoming token", noOfTokens);
    setNoOfTokens(noOfTokens);
  }
  function handlepriceUpdate(price) {
    console.log("incoming token", price);
    setPrice(price);
  }
  function handleOptionPriceUpdate(price) {
    console.log("incoming token", price);
    setOptionPrice(price);
  }
  function handleOptionDurationUpdate(duration) {
    console.log("incoming token", duration);
    setOptionDuration(duration);
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
        <label
          for="default-input"
          class="block mb-2 font-roboto font-medium text-gray-900 dark:text-white    mt-20 ml-20 text-2xl"
        >
          List Sales
        </label>

        <div class="mt-0 ml-20 border-2 p-4 w-full flex flex-row rounded-md ">
          <label htmlFor="">no of tokens</label>
          <br />
          <input
            type="number"
            id="noOfTokensField"
            placeholder="No of tokens"
            value={noOfTokens}
            onChange={(e) => {
              handleNoOfTokenUpdate(e.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500"
          />
          <label htmlFor="">Total price</label>
          <input
            type="number"
            id="priceField"
            value={price}
            onChange={(e) => {
              handlepriceUpdate(e.target.value);
            }}
            class="mx-2 bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500"
          />
          <label htmlFor="">Price for optio</label>
          <input
            type="number"
            id="optionPriceField"
            value={optionPrice}
            onChange={(e) => {
              handleOptionPriceUpdate(e.target.value);
            }}
            class="mx-2 bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500"
          />
          <label htmlFor="">Duration for option</label>
          <input
            type="number"
            id="optionDurationField"
            value={optionDuration}
            onChange={(e) => {
              handleOptionDurationUpdate(e.target.value);
            }}
            class="mx-2 bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500"
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="ml-36 border-2 px-10 rounded-full hover:bg-white hover:border-black    hover:text-black font-roboto"
          >
            sale
          </button>
        </div>
      </div>

      <div class=" m-5 p-10"></div>
    </div>
  );
}
