"use client";

import { ethers, parseEther } from "ethers";
import { registryAbi, registryAddress } from "./contractRefs";
import { getSHA256Hash } from "boring-webcrypto-sha256";

let signer = null;

let provider;

async function connectWithMetamask() {
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = await new ethers.BrowserProvider(window.ethereum);

    signer = await provider.getSigner();
  }
}
connectWithMetamask();

export async function counterTest() {
  connectWithMetamask();
  console.log(provider);
  console.log(signer);
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newNumber",
          type: "uint256",
        },
      ],
      name: "updateNumber",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "number",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const address = "0x3ae16B796f9e3aCa9Ae7E830679D53658d6Eb63d";
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.updateNumber(10);

  console.log(tx);
}

export async function createSellOrder(
  _noOfGWTokens = 0,
  _sellPrice = 0,
  _leasePrice = 0,
  _duration = 0
) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.listOrder(
    ethers.parseEther(_sellPrice.toString()),
    _noOfGWTokens,
    ethers.parseEther(_leasePrice.toString()),
    _duration
  );
  console.log(tx);
}

export async function buyOrder(orderId, value) {
  console.log(typeof value);
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.createBuyOrder(orderId, {
    value: value,
  });
  console.log(tx);
}

export async function buyOption(orderId, value) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.takeOnOption(orderId, { value: value });
  console.log(tx);
}

export async function createLeaseOrder(_sellPrice, _noOfGWTokens, _duration) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.createSellOrder(
    ethers.parseEther(_sellPrice),
    _noOfGWTokens,
    _duration
  );
  console.log(tx);
}

export async function getGwTokenBalance() {
  await connectWithMetamask();
  // console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  // console.log(address);
  // console.log(abi);
  // console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.balances(signer.address);
  //await tx.wait();
  //console.log(tx.toString());
  return tx.toString();
}

export async function getMarketPrice() {
  await connectWithMetamask();
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.credsMarketPrice();

  return ((Number(tx/1000000000000000n))/1000).toString();
}

export async function getOrdersArray() {
  await connectWithMetamask();
  //console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  //console.log(address);
  //console.log(abi);
  //console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const arrayLength = await contract.returnOrdersArrayLength();
  const ordersArray = [];
  //await tx.wait();
  //console.log(Number(arrayLength));
  for (let i = 0; i <= Number(arrayLength) - 1; i++) {
    //console.log(i);
    const currOrder = await contract.orderArray(i);
    //console.log(currOrder);
    ordersArray.push(currOrder);
    //console.log(ordersArray);
  }
  return ordersArray;
}

export async function addGenStation(_code) {
  const encodedCode = await getSHA256Hash(_code);
  console.log(encodedCode);
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.addGenStation(encodedCode);
  console.log(tx);
}
