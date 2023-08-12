var PetRecord = artifacts.require("./PetRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(PetRecord);
};