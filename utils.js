"use client";

import { ethers } from "ethers";
import { registryAbi, registryAddress } from "./contractRefs";

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
    _sellPrice,
    _noOfGWTokens,
    _leasePrice,
    _duration
  );
  console.log(tx);
}

export async function buyOrder(orderId) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.createBuyOrder(orderId);
  console.log(tx);
}

export async function buyOption(orderId) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.takeOnLease(orderId);
  console.log(tx);
}

export async function createLeaseOrder(_sellPrice, _noOfGWTokens, _duration) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.createSellOrder(
    _sellPrice,
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

export async function getUserAddress() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

export async function getRegistryContract(providerOrSigner) {
  const modal = new web3modal();
  const connection = await modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const contract = new ethers.Contract(addressRegistry, abiRegistry, provider);
  if (providerOrSigner == true) {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressRegistry, abiRegistry, signer);
    return contract;
  }
  return contract;
}

export async function getBWContractAddress() {
  const address = await getUserAddress(); //fetch user address
  const contract = await getRegistryContract();
  const id = await contract.userAddressToContractId(address.toString());
  const contractAddress = await contract.contracts(id);
  return contractAddress;
}

export async function getBWContract(providerOrSigner) {
  const contractAddress = await getBWContractAddress();
  const modal = new web3modal();
  const connection = await modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const contract = new ethers.Contract(contractAddress, abiBW, provider);
  if (providerOrSigner == true) {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abiBW, signer);
    return contract;
  }
  return contract;
}

// Updating Registry

export async function addCredStation(_code) {
  const contract = await getRegistryContract(true);
  const tx = await contract.addCredStation([`${_code}`]);
  await tx.wait();
  console.log("Added Cred Station");
}

export async function createSellOrderx(_sellPrice, _noOfGWTokens) {
  const contract = await getRegistryContract(true);
  const tx = await contract.createSellOrder(_sellPrice, _noOfGWTokens);
  await tx.wait();
  console.log("Created Sell Order");
}

export async function createBuyOrder(_orderId) {
  const contract = await getRegistryContract(true);
  const tx = await contract.createBuyOrder(_orderId);
  await tx.wait();
  console.log("Created Buy Order");
}

export async function createLeaseOrderx(
  _leasePrice,
  _noOfGWTokens,
  _collateral,
  _duration
) {
  const contract = await getRegistryContract(true);
  const tx = await contract.createLeaseOrder(
    _leasePrice,
    _noOfGWTokens,
    _collateral,
    _duration
  );
  await tx.wait();
  console.log("Lease Order Created");
}

export async function takeOnLease(_leaseId, _collateralAmount) {
  const contract = await getRegistryContract(true);
  const tx = await contract.takeOnLease(_leaseId, _collateralAmount);
  await tx.wait();
  console.log("Took Lease");
}

export async function endLease(_leaseId) {
  const contract = await getRegistryContract(true);
  const tx = await contract.endLease(_leaseId);
  await tx.wait();
  console.log("Lease Ended");
}

// Updating BW

export async function stakeCreds() {
  const contract = await getBWContract(true);
  const tx = await contract.stakeCreds(ticketId);
  await tx.wait();
  console.log("Staked");
}

export async function claimYield() {
  const contract = await getBWContract(true);
  const tx = await contract.claimYield(ticketId);
  await tx.wait();
  console.log("Claimed Yield");
}

export async function unstakeCreds() {
  const contract = await getBWContract(true);
  const tx = await contract.unstakeCreds(ticketId);
  await tx.wait();
  console.log("Claimed Yield");
}

// fetching Registry

export async function hasDeployed() {
  const contract = await getRegistryContract(true);
  const address = await getUserAddress();
  const data = await contract.hasDeployed(address.toString());
  return data;
}

export async function fetchOrders() {}

export async function fetchBids() {}

export async function fetchLeases() {}

// web3storage

async function makeStorageClient() {
  const client = await create();
  const space = await client.createSpace("iks");
  const myAccount = await client.login("anshsaxena4190@gmail.com");
  console.log(space);
  await myAccount.provision(space.did());
  await space.createRecovery(myAccount.did());
  await space.save();
  await client.setCurrentSpace(space.did());

  return client;
}

export const uploadToIPFS = async (files) => {
  const client = await makeStorageClient();
  const directoryCid = await client.uploadDirectory(files);
  return directoryCid;
};
