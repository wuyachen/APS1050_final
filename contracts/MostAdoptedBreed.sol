pragma solidity ^0.5.0;

contract MostAdoptedBreed {
    struct Breed {
        string breedName;
        uint adoptCount;
    }

    uint public breedsCount;
    Breed[] public breeds;

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

    function addBreed (string memory _breedName) public {
        breedsCount ++;
        breeds.push(Breed(_breedName, 0));
    }

    function addAdoption (string memory _breedName) public {
        for (uint i = 0; i < breedsCount; i++) {
            if (stringsEquals(breeds[i].breedName, _breedName)) {
                breeds[i].adoptCount ++;
                return;
            }
        }
    }

    function getMostAdoptedBreed () public view returns (string memory breedName) {
        uint maxAdoptCount = 0;
        string memory maxAdoptBreedName = "";
        for (uint i = 0; i < breedsCount; i++) {
            if (breeds[i].adoptCount > maxAdoptCount) {
                maxAdoptCount = breeds[i].adoptCount;
                maxAdoptBreedName = breeds[i].breedName;
            }
        }
        return maxAdoptBreedName;
    }
}