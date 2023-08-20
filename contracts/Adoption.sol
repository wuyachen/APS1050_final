pragma solidity ^0.5.0;

contract Adoption {
	address[16] public adopters;

	event AdoptedAnimal(uint petId);

	// Adopting a pet
	function adopt(uint petId) public returns (uint) {
  		require(petId >= 0 && petId <= 15);

  		adopters[petId] = msg.sender;

		emit AdoptedAnimal(petId);

 		return petId;
	}

	// Retrieving the adopters
	function getAdopters() public view returns (address[16] memory) {
 	 	return adopters;
	}

    event ReturnAnimal(uint petId);

    function returnBack(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        if (adopters[petId] == msg.sender) {
            adopters[petId] = address(0);
        }

        emit ReturnAnimal(petId);

        return petId;
    }

	struct Pet {
		uint id;
		string name;
		uint count;
		string breed;
	}

	mapping(address => bool) public voters;
	mapping(uint => Pet) public candidates;
	uint public petsCount;
	uint public STCount; //Scottish Terrier
		uint public FBCount; //French Bulldog
		uint public BXCount; //Boxer
		uint public GRCount; //Golden Retrieve

	function addPet(string memory _name, string memory _breed) private {
		petsCount ++;
		
		candidates[petsCount] = Pet(petsCount, _name, 0, _breed);
	}

	constructor () public {
		addPet("Frieda", "Scottish Terrier");
		addPet("Gina", "Scottish Terrier");
		addPet("Collins", "French Bulldog");
		addPet("Melissa", "Boxer");
		addPet("Jeanine", "French Bulldog");
		addPet("Elvia", "French Bulldog");
		addPet("Latisha", "Golden Retriever");
		addPet("Coleman", "Golden Retriever");
		addPet("Nichole", "French Bulldog");
		addPet("Fran", "Boxer");
		addPet("Leonor", "Boxer");
		addPet("Dean", "Scottish Terrier");
		addPet("Stevenson", "French Bulldog");
		addPet("Kristina", "Golden Retriever");
		addPet("Ethel", "Golden Retriever");
		addPet("Terry", "Golden Retriever");
	}

	event voteAnimal (uint petId);

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


	function vote(uint petId) public {
		require(petId >= 0 && petId <= 15);
		candidates[petId].count ++;
		voters[msg.sender] = true;
		emit voteAnimal(petId);

		if (stringsEquals(candidates[petId].breed, "Scottish Terrier")) {
			STCount ++;
		} else if (stringsEquals(candidates[petId].breed, "French Bulldog")) {
			FBCount ++;
		} else if (stringsEquals(candidates[petId].breed, "Boxer")) {
			BXCount ++;
		} else if (stringsEquals(candidates[petId].breed, "Golden Retriever")) {
			GRCount ++;
		} else {
			//error Invalid breed
		}

		
	}

	function mostAdopted() public returns (string memory){
		if (STCount >= FBCount && STCount >= BXCount && STCount >= GRCount) {
			return "Scottish Terrier";
		} else if (FBCount >= STCount && FBCount >= BXCount && FBCount >= GRCount) {
			return "French Bulldog";
		} else if (BXCount >= STCount && BXCount >= FBCount && BXCount >= GRCount) {
			return "Boxer";
		} else if (GRCount >= STCount && GRCount >= FBCount && GRCount >= BXCount) {
			return "Golden Retriever";
		} else {
			return "No breed is most adopted";
		}
	}


}