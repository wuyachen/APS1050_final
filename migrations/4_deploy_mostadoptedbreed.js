var MostAdoptedBreed = artifacts.require("./MostAdoptedBreed.sol");

module.exports = function(deployer) {
  deployer.deploy(MostAdoptedBreed);
};