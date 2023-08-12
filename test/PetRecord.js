var PetRecord = artifacts.require("./PetRecord.sol");

contract("PetRecord", function(accounts) {
  var PetRecordInstance;

  it("initializes with one pet", function() {
    return PetRecord.deployed().then(function(instance) {
      PetRecordInstance = instance;
      return PetRecordInstance.addPet("Poodle", "Amy");
    });
  });

  it("check owner 1 name", function() {
    return PetRecord.deployed().then(function(instance) {
      PetRecordInstance = instance;
      return PetRecordInstance.getOwnerName("Poodle");
    }).then(function(ownerName) {
      assert.equal(ownerName, "Amy");
    });
  });

  it("check not existing pet name", function() {
    return PetRecord.deployed().then(function(instance) {
      PetRecordInstance = instance;
      return PetRecordInstance.getOwnerName("Bichon");
    }).then(function(ownerName) {
      assert.equal(ownerName, "None");
    });
  });

  it("add pet", function() {
    return PetRecord.deployed().then(function(instance) {
      PetRecordInstance = instance;
      return PetRecordInstance.addPet("Bichon", "Bob");
    });
  });

  it("check owner 2 name", function() {
    return PetRecord.deployed().then(function(instance) {
      PetRecordInstance = instance;
      return PetRecordInstance.getOwnerName("Bichon");
    }).then(function(ownerName) {
      assert.equal(ownerName, "Bob");
    });
  });

});
