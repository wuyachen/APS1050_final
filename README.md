Executive Summary
The Pet Shop DApp serves as a blockchain-based platform facilitating decentralized and secure transactions involving pets, encompassing purchase, sale, adoption, and management, alongside associated services. Capitalizing on blockchain technology, this innovative solution disrupts the conventional pet industry by introducing transparency, immutability, and confidence to diverse stakeholders, ranging from pet enthusiasts, breeders, and veterinarians to shelters and pet owners.

For the present endeavor, we are adopting the Pet Shop DApp from the truffle box. Concurrently, our project harnesses essential tools like the Node Package Manager (npm), the truffle framework, Ganache, and Metamask. Following the petshop tutorial, we have successfully integrated features 2, 7, 9, 12 and 13. Moreover, to refine search outcomes, we have extended the functionality by incorporating feature 5 into the final project.

1. Favorite Pet Voting (Feature 2):
Users can vote for their preferred pets, with each user having a single vote. This feature involves frontend adjustments in adoption.sol, as well as modifications in app.js and index.html.

2. Pet Filtering Options (Feature 5):
Utilizing three filters—age, location, and breed—users can refine their search for pets. This functionality can be accessed on both the main and archive pages. The frontend components are adapted from index.html, archive.html, and app.js.

3. Most Adopted Breed Tracking (Feature 7):
This feature monitors users' votes to identify the most frequently adopted breed. The top breed is displayed upon request. Implementation involves frontend updates in adoption.sol, along with modifications in app.js and index.html.

4. Pet Ownership Tracking (Feature 9):
Ownership of each pet is recorded, linked to a unique owner ID (address). After adoption, the owner's ID is displayed beneath the pet, while unadopted pets show the owner as 0x0. Frontend changes in adoption.sol are combined with adjustments in app.js and index.html.

5. Tracking Customer and Pet Adoption Count (Feature 12):
This functionality involves monitoring the count of both customers served and adopted pets. The frontend adjustments encompass adoption.sol, app.js, and index.html.

6. Pet Return for a Fee (Feature 13):
Adopted pets can be returned for a fee, subsequently marked as available and associated with the previous owner. The frontend aspect is created through adoption.sol and is tailored in app.js and index.html.
