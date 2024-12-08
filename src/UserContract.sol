// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";

contract UserContract {
    address public adminAddress;
    address public userAddress;
    address public anonAadhaarVerifierAddr;
    address public agentAddress;
    address public zkContractAddr;
    address public zkFactoryAddr;

    enum BlogStatus {
        Unverified,
        Verified,
        NSFW
    }
    struct Blog {
        string blobId; // valrus id
        string blobHash; // blob hash
        bool isPublished; // published status
        BlogStatus status; // status of the blog
        uint256 readabilityScore; // readability score
        uint256 estimatedReadTime; // estimated read time
        string[] tags; // tags
        address[] likes; // likes
    }

    mapping(string => Blog) public blogs; // map for storing blogs

    string[] public blogSlugs; // Array to store all blog slugs

    uint256 public createdTimestamp = block.timestamp;

    // Single user information
    bool public isVerified = false;
    bool public isAdult = false;
    uint256 public verificationTimestamp;
    uint public userNullifier;

    // Constructor to initialize the contract
    constructor(
        address _userAddress,
        address _adminAddress,
        address _anonAadhaarVerifierAddr,
        address _agentAddress,
        address _zkFactoryAddr
    ) {
        userAddress = _userAddress;
        adminAddress = _adminAddress;
        anonAadhaarVerifierAddr = _anonAadhaarVerifierAddr;
        agentAddress = _agentAddress;
        zkFactoryAddr = _zkFactoryAddr;
    }

    function linkZKContract(
        address _zkContractAddr,
        address userAddr
    ) external {
        require(
            msg.sender == adminAddress || msg.sender == zkFactoryAddr,
            "UserContract: Only admin or ZKFactory can link ZKContract"
        );
        require(userAddr == userAddress, "UserContract: Invalid user address");
        zkContractAddr = _zkContractAddr;
    }

    /// @dev Convert an address to uint256, used to check against signal.
    /// @param _addr: msg.sender address.
    /// @return Address msg.sender's address in uint256
    function addressToUint256(address _addr) private pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    /// @dev Register the single user in the contract.
    /// @param nullifierSeed: Nullifier Seed used while generating the proof.
    /// @param nullifier: Nullifier for the user's Aadhaar data.
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @param revealArray: Array of the values used as input for the proof generation.
    /// @param groth16Proof: SNARK Groth16 proof.
    function verifyUserProof(
        uint nullifierSeed,
        uint nullifier,
        uint timestamp,
        uint[4] memory revealArray,
        uint[8] memory groth16Proof
    ) public {
        require(
            msg.sender == userAddress || msg.sender == adminAddress,
            "UserContract: Only user or admin can verify"
        );
        require(!isVerified, "UserContract: User already verified");

        require(
            IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed,
                nullifier,
                timestamp,
                addressToUint256(userAddress),
                revealArray,
                groth16Proof
            ) == true,
            "UserContract: proof sent is not valid."
        );

        isVerified = true;
        verificationTimestamp = block.timestamp;
        userNullifier = nullifier;

        isAdult = revealArray[0] == 1;

        emit UserVerified(userAddress, block.timestamp, isAdult);
    }

    // Function to get user registration timestamp
    function getUserVerificationTime() public view returns (uint256) {
        require(isVerified, "UserContract: User not verified");
        return verificationTimestamp;
    }

    function isUserVerified() public view returns (bool) {
        return isVerified;
    }

    function isUserAdult() public view returns (bool) {
        return isAdult;
    }

    function addBlog(
        string memory slug,
        string memory blobId,
        string memory blobHash
    ) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );

        require(isVerified, "UserContract: Only verified users can add a blog");

        blogs[slug] = Blog(
            blobId,
            blobHash,
            false,
            BlogStatus.Unverified,
            0,
            0,
            new string[](0),
            new address[](0)
        );
        blogSlugs.push(slug);

        // Logic to add the blog (e.g., storing it in a mapping or emitting an event)
        // This is a placeholder for the actual implementation
        emit BlogAdded(msg.sender, slug, blobId, blobHash, block.timestamp);
    }

    function getAllBlogSlugs() public view returns (string[] memory) {
        return blogSlugs;
    }

    function getBlogBySlug(
        string memory slug
    ) public view returns (Blog memory) {
        return blogs[slug];
    }

    function publishBlog(string memory slug) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );
        require(
            isVerified,
            "UserContract: Only verified users can publish a blog"
        );

        // Logic to publish the blog (e.g., changing its status or emitting an event)
        blogs[slug].isPublished = true;

        emit BlogPublished(msg.sender, slug, block.timestamp);
    }

    function updateBlog(
        string memory slug,
        string memory newBlobHash,
        string memory newBlobId
    ) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can call this"
        );
        require(
            isVerified,
            "UserContract: Only verified users can update a blog"
        );
        require(
            !blogs[slug].isPublished,
            "UserContract: Blog is already published and cannot be updated"
        );

        blogs[slug].blobHash = newBlobHash;
        blogs[slug].blobId = newBlobId;

        emit BlogUpdated(
            msg.sender,
            slug,
            newBlobHash,
            newBlobId,
            block.timestamp
        );
    }

    function likeBlog(string memory slug, address user) public {
        // require(blogs[slug].isPublished, "UserContract: Blog is not published");
        require(bytes(slug).length > 0, "UserContract: Slug cannot be empty");

        require(
            msg.sender == zkContractAddr || msg.sender == userAddress,
            "UserContract: Only zk contract or user can like this blog"
        );

        if (!isLikedByUser(slug, user)) {
            blogs[slug].likes.push(user);
        }
    }

    function isLikedByUser(
        string memory slug,
        address user
    ) internal view returns (bool) {
        for (uint i = 0; i < blogs[slug].likes.length; i++) {
            if (blogs[slug].likes[i] == user) {
                return true;
            }
        }
        return false;
    }

    function hasUserLikedBlog(
        string memory slug,
        address user
    ) public view returns (bool) {
        return isLikedByUser(slug, user);
    }

    function updateAgentAddress(address newAgentAddress) public {
        require(
            msg.sender == adminAddress,
            "UserContract: Only admin can update agent address"
        );
        require(
            newAgentAddress != address(0),
            "UserContract: New agent address cannot be zero"
        );

        agentAddress = newAgentAddress;
    }

    function updateBlogMeta(
        string memory slug,
        string[] memory newTags,
        BlogStatus newStatus,
        uint256 newReadabilityScore,
        uint256 newEstimatedReadTime
    ) public {
        require(
            msg.sender == agentAddress || msg.sender == adminAddress,
            "UserContract: Only agent or admin can update blog meta"
        );
        require(
            blogs[slug].isPublished,
            "UserContract: Blog must be published to update its meta"
        );

        blogs[slug].tags = newTags;
        blogs[slug].status = newStatus;
        blogs[slug].readabilityScore = newReadabilityScore;
        blogs[slug].estimatedReadTime = newEstimatedReadTime;

        emit BlogUpdated(
            msg.sender,
            slug,
            blogs[slug].blobHash,
            blogs[slug].blobId,
            block.timestamp
        );
    }

    function deleteBlog(string memory slug) public {
        require(
            msg.sender == userAddress,
            "UserContract: Only user can delete a blog"
        );
        require(
            !blogs[slug].isPublished,
            "UserContract: Blog must not be published to delete"
        );

        delete blogs[slug];

        emit BlogDeleted(msg.sender, slug, block.timestamp);
    }

    // EVENTS

    event BlogDeleted(address indexed user, string slug, uint256 timestamp);

    event BlogUpdated(
        address indexed user,
        string slug,
        string newBlobHash,
        string newBlobId,
        uint256 timestamp
    );

    event BlogPublished(address indexed user, string blobId, uint256 timestamp);

    // EVENTS

    event UserVerified(address indexed user, uint256 timestamp, bool isAdult);

    // Event to log the addition of a new blog
    event BlogAdded(
        address indexed user,
        string slug,
        string blobId,
        string blobHash,
        uint256 timestamp
    );
}
