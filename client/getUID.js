const { ethers } = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

// Get the EOA and provider from you choice of your wallet.
const pkey = "pkey";
const polygonRPC = "https://rpc-mumbai.maticvigil.com/";
const main = async () => {
  let provider = new HDWalletProvider(pkey, polygonRPC);
  const walletProvider = new ethers.providers.Web3Provider(provider);

  const fileInterface = new ethers.utils.Interface([
    {
      inputs: [
        {
          internalType: "address payable",
          name: "viewerNode",
          type: "address",
        },
      ],
      name: "fetchModel",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "modelCount",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "models",
      outputs: [
        {
          internalType: "string",
          name: "modelHash",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "fileSize",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "node",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_modelHash",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_modelSize",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "callerNode",
          type: "address",
        },
      ],
      name: "uploadModel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]);

  const fileContract = new ethers.Contract(
    "",
    fileInterface,
    walletProvider
  );

  let fetchedHash = await fileContract.fetchModel(
    ""
  );
  console.log("Fetched Hash", fetchedHash);
};
main();
