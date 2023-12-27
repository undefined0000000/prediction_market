require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const INFURA_API_KEY = "2fc1eb836acd42e4b39f2f29a6d1cd07";

const SEPOLIA_PRIVATE_KEY =
  "2843848f80ad95db21917e79e769b430b9adb13fa87b548a7f505e4eb6d5c8e3";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 31337, // Chain ID for the local network
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/2fc1eb836acd42e4b39f2f29a6d1cd07",
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "src/artifacts",
  },
};
