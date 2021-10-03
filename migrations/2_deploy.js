const Store = artifacts.require("Store");

module.exports = async (deployer) => {
  const store = await deployer.deploy(Store);
  console.log("contract deploye!!");
};
