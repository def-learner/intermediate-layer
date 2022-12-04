// Decrypt file nodejs
const {ethers} = require("ethers");
const fs = require("fs");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const decrypt = async() =>{
  const cid = "cid";
  const publicKey = "";
  const privateKey = "";

  // Get file encryption key
  const signed_message = await sign_auth_message(publicKey, privateKey);
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signed_message
  );

  console.log(fileEncryptionKey.data.key);

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key
  );
  console.log(decrypted);

  // Save File
  fs.createWriteStream("fileName.jpg").write(Buffer.from(decrypted))  
}

decrypt()