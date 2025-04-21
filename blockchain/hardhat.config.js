require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0", // Must EXACTLY match your .sol pragma
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  }
};