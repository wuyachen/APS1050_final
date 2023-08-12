var MostAdoptedBreed = artifacts.require("./MostAdoptedBreed.sol");

contract("MostAdoptedBreed", function(accounts) {
    var MostAdoptedBreedInstance;

    it("initializes with breed Amy", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addBreed("Amy");
        });
    });

    it("initializes with breed Bob", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addBreed("Bob");
        });
    });

    it("initializes with breed Cathy", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addBreed("Cathy");
        });
    });

    it("vote for Amy", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addAdoption("Amy");
        }); 
    });
  
    it("vote for Amy", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addAdoption("Amy");
        });
    });

    it("vote for Amy", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addAdoption("Amy");
        });
    });

    it("vote for Bob", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.addAdoption("Bob");
        });
    });

    it("check most adopted breed", function() {
        return MostAdoptedBreed.deployed().then(function(instance) {
            MostAdoptedBreedInstance = instance;
            return MostAdoptedBreedInstance.getMostAdoptedBreed();
        }).then(function(breed) {
            assert.equal(breed, "Amy");
        });
    });

});
