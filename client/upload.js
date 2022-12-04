require("dotenv").config();
const { ethers } = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');
const { ChainId } = require("@biconomy/core-types");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const SmartAccount = require("@biconomy/smart-account").default;

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const deployEncrypted = async() =>{
  const path = "";	//Give absolute path
  const apiKey = "";
  const publicKey = "";
  const privateKey = "";
  const signed_message = await sign_auth_message(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signed_message
  );
  return response.data.Hash
}

const pkey = "";
const polygonRPC = "https://rpc-mumbai.maticvigil.com/";

const main = async () => {
  const Model_Hash = await deployEncrypted();
  console.log(Model_Hash)
  let provider = new HDWalletProvider(pkey, polygonRPC);
  const walletProvider = new ethers.providers.Web3Provider(provider);
  let options = {
    activeNetworkId: ChainId.POLYGON_MUMBAI,
    supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
    networkConfig: [
      {
        chainId: ChainId.POLYGON_MUMBAI,
        dappAPIKey: "",
      },
    ],
  };

  let smartAccount = new SmartAccount(walletProvider, options);
  smartAccount = await smartAccount.init();

  // Transaction subscription

  smartAccount.on("txHashGenerated", (response) => {
    console.log("txHashGenerated event received via emitter", response);
  });

  smartAccount.on("txMined", (response) => {
    console.log("txMined event received via emitter", response);
  });

  smartAccount.on("error", (response) => {
    console.log("error event received via emitter", response);
  });

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

  console.log(Model_Hash)

  const data = fileInterface.encodeFunctionData("uploadModel", [
    Model_Hash,
    1000,
    "",
  ]);

  const tx1 = {
    to: "",
    data: data,
    // value can also be added for example ethers.utils.parseEther("1")
  };

  // Gasless
  const txResponse = await smartAccount.sendGasLessTransaction({
    transaction: tx1,
  });
};
main();
