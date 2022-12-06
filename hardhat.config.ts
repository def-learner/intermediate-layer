import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "polygon_mumbai",
  networks: {
    polygon_mumbai: {
      url: `${process.env.API_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
