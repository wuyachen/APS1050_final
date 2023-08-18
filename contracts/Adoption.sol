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
	}

	mapping(address => bool) public voters;
	mapping(uint => Pet) public candidates;
	uint public petsCount;

	function addPet(string memory _name) private {
		petsCount ++;
		candidates[petsCount] = Pet(petsCount, _name, 0);
	}

	constructor () public {
		addPet("Frieda");
		addPet("Gina");
		addPet("Collins");
		addPet("Melissa");
		addPet("Jeanine");
		addPet("Elvia");
		addPet("Latisha");
		addPet("Coleman");
		addPet("Nichole");
		addPet("Fran");
		addPet("Leonor");
		addPet("Dean");
		addPet("Stevenson");
		addPet("Kristina");
		addPet("Ethel");
		addPet("Terry");
	}

	event voteAnimal (uint petId);

	function vote(uint petId) public {
		require(petId >= 0 && petId <= 15);
		candidates[petId].count ++;
		voters[msg.sender] = true;

		emit voteAnimal(petId);
	}


}