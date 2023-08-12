pragma solidity ^0.5.0;

contract PetRecord{
    // Model a pet
    struct Pet {
        string petName;
        string ownerName;
    }

    Pet[] public pets;
    uint public petsCount;

    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    function addPet (string memory _petname, string memory _ownername) public {
        pets.push(Pet(_petname, _ownername));
        petsCount ++;
    }

    function getOwnerName (string memory _petname) public view returns (string memory ownerName) {
        for (uint i = 0; i < petsCount; i++) {
            if (stringsEquals(pets[i].petName, _petname)) {
                return pets[i].ownerName;
            }
        }
        return "None";
    }
}