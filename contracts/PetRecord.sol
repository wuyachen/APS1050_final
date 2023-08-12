pragma solidity ^0.5.0;

contract PetRecord{
    // Read/write candidate
    string public Pet;

    // Model a Candidate
    struct Pet {
        string petName;
        string ownerName;
    }

    Pet[] public pets;
    uint public petsCount;

    function addPet (string memory _petname, string memory _ownername) public {
        pets.push(Pet(_petname, _ownername));
        petsCount ++;
    }

    function getOwnerName (string _petname) public view returns (string memory ownerName) {
        for (uint i = 0; i < petsCount; i++) {
            if (pets[i].petName == _petname) {
                return pets[i].ownerName;
            }
        }
        return "None";
    }
}