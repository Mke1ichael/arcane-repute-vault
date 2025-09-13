// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ArcaneReputeVault is SepoliaConfig {
    using FHE for *;
    
    // Reputation data structure with FHE encryption
    struct ReputationData {
        euint32 reputationScore;      // Encrypted reputation score
        euint32 contributionCount;    // Encrypted contribution count
        euint32 achievementPoints;    // Encrypted achievement points
        euint32 governanceVotes;      // Encrypted governance vote count
        bool isActive;               // Public status
        uint256 lastUpdated;         // Public timestamp
        address owner;               // Public address
    }
    
    // Contribution record with FHE encryption
    struct Contribution {
        euint32 contributionId;      // Encrypted contribution ID
        euint32 points;              // Encrypted points awarded
        euint32 category;            // Encrypted category (1=governance, 2=development, 3=community)
        bool isVerified;             // Public verification status
        address contributor;         // Public contributor address
        uint256 timestamp;           // Public timestamp
        string description;          // Public description
    }
    
    // Governance proposal with FHE encryption
    struct Proposal {
        euint32 proposalId;          // Encrypted proposal ID
        euint32 yesVotes;            // Encrypted yes votes
        euint32 noVotes;             // Encrypted no votes
        euint32 requiredQuorum;      // Encrypted required quorum
        bool isActive;               // Public status
        bool isExecuted;             // Public execution status
        address proposer;            // Public proposer address
        uint256 startTime;           // Public start time
        uint256 endTime;             // Public end time
        string title;                // Public title
        string description;          // Public description
    }
    
    // Achievement with FHE encryption
    struct Achievement {
        euint32 achievementId;       // Encrypted achievement ID
        euint32 points;              // Encrypted points value
        euint32 rarity;              // Encrypted rarity level (1=common, 2=rare, 3=epic, 4=legendary)
        bool isUnlocked;             // Public unlock status
        address recipient;           // Public recipient address
        uint256 unlockedAt;          // Public unlock timestamp
        string name;                 // Public achievement name
        string description;          // Public description
    }
    
    // Storage mappings
    mapping(address => ReputationData) public reputations;
    mapping(uint256 => Contribution) public contributions;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Achievement) public achievements;
    mapping(address => euint32) public votingPower;
    mapping(address => bool) public isVerifiedMember;
    
    // Counters
    uint256 public contributionCounter;
    uint256 public proposalCounter;
    uint256 public achievementCounter;
    
    // Contract state
    address public owner;
    address public verifier;
    euint32 public totalReputationPoints;
    euint32 public totalContributions;
    
    // Events
    event ReputationUpdated(address indexed user, uint32 reputation);
    event ContributionAdded(uint256 indexed contributionId, address indexed contributor, uint32 points);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event AchievementUnlocked(uint256 indexed achievementId, address indexed recipient, string name);
    event MemberVerified(address indexed member, bool isVerified);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        totalReputationPoints = FHE.asEuint32(0);
        totalContributions = FHE.asEuint32(0);
    }
    
    // Initialize reputation for new member
    function initializeReputation(
        address user,
        externalEuint32 initialScore,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can initialize reputation");
        require(reputations[user].owner == address(0), "Reputation already initialized");
        
        euint32 internalScore = FHE.fromExternal(initialScore, inputProof);
        
        reputations[user] = ReputationData({
            reputationScore: internalScore,
            contributionCount: FHE.asEuint32(0),
            achievementPoints: FHE.asEuint32(0),
            governanceVotes: FHE.asEuint32(0),
            isActive: true,
            lastUpdated: block.timestamp,
            owner: user
        });
        
        // Update total reputation points
        totalReputationPoints = FHE.add(totalReputationPoints, internalScore);
        
        emit ReputationUpdated(user, 0); // Will be decrypted off-chain
    }
    
    // Add contribution with FHE encryption
    function addContribution(
        address contributor,
        externalEuint32 points,
        externalEuint32 category,
        string memory description,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(reputations[contributor].owner != address(0), "User reputation not initialized");
        require(reputations[contributor].isActive, "User reputation is inactive");
        
        uint256 contributionId = contributionCounter++;
        
        euint32 internalPoints = FHE.fromExternal(points, inputProof);
        euint32 internalCategory = FHE.fromExternal(category, inputProof);
        
        contributions[contributionId] = Contribution({
            contributionId: FHE.asEuint32(0), // Will be set properly later
            points: internalPoints,
            category: internalCategory,
            isVerified: false,
            contributor: contributor,
            timestamp: block.timestamp,
            description: description
        });
        
        // Update user reputation
        reputations[contributor].contributionCount = FHE.add(
            reputations[contributor].contributionCount, 
            FHE.asEuint32(1)
        );
        reputations[contributor].achievementPoints = FHE.add(
            reputations[contributor].achievementPoints, 
            internalPoints
        );
        reputations[contributor].lastUpdated = block.timestamp;
        
        // Update total contributions
        totalContributions = FHE.add(totalContributions, FHE.asEuint32(1));
        
        emit ContributionAdded(contributionId, contributor, 0); // Will be decrypted off-chain
        return contributionId;
    }
    
    // Verify contribution
    function verifyContribution(uint256 contributionId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify contributions");
        require(contributions[contributionId].contributor != address(0), "Contribution does not exist");
        
        contributions[contributionId].isVerified = isVerified;
        
        if (isVerified) {
            // Update user reputation with verified contribution points
            address contributor = contributions[contributionId].contributor;
            euint32 points = contributions[contributionId].points;
            
            reputations[contributor].reputationScore = FHE.add(
                reputations[contributor].reputationScore, 
                points
            );
            reputations[contributor].lastUpdated = block.timestamp;
            
            emit ReputationUpdated(contributor, 0); // Will be decrypted off-chain
        }
    }
    
    // Create governance proposal
    function createProposal(
        string memory title,
        string memory description,
        uint256 duration,
        externalEuint32 requiredQuorum,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(reputations[msg.sender].owner != address(0), "User reputation not initialized");
        require(reputations[msg.sender].isActive, "User reputation is inactive");
        require(isVerifiedMember[msg.sender], "Only verified members can create proposals");
        
        uint256 proposalId = proposalCounter++;
        
        euint32 internalQuorum = FHE.fromExternal(requiredQuorum, inputProof);
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            yesVotes: FHE.asEuint32(0),
            noVotes: FHE.asEuint32(0),
            requiredQuorum: internalQuorum,
            isActive: true,
            isExecuted: false,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            title: title,
            description: description
        });
        
        emit ProposalCreated(proposalId, msg.sender, title);
        return proposalId;
    }
    
    // Cast vote on proposal
    function castVote(
        uint256 proposalId,
        bool support,
        externalEuint32 votingPower,
        bytes calldata inputProof
    ) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(reputations[msg.sender].owner != address(0), "User reputation not initialized");
        require(reputations[msg.sender].isActive, "User reputation is inactive");
        
        euint32 internalVotingPower = FHE.fromExternal(votingPower, inputProof);
        
        if (support) {
            proposals[proposalId].yesVotes = FHE.add(
                proposals[proposalId].yesVotes, 
                internalVotingPower
            );
        } else {
            proposals[proposalId].noVotes = FHE.add(
                proposals[proposalId].noVotes, 
                internalVotingPower
            );
        }
        
        // Update user governance vote count
        reputations[msg.sender].governanceVotes = FHE.add(
            reputations[msg.sender].governanceVotes, 
            FHE.asEuint32(1)
        );
        reputations[msg.sender].lastUpdated = block.timestamp;
        
        emit VoteCast(proposalId, msg.sender, support);
    }
    
    // Execute proposal
    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period has not ended");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        
        // Check if proposal passed (this would need to be done off-chain with FHE decryption)
        // For now, we'll mark it as executed
        proposals[proposalId].isExecuted = true;
        proposals[proposalId].isActive = false;
    }
    
    // Unlock achievement
    function unlockAchievement(
        address recipient,
        externalEuint32 points,
        externalEuint32 rarity,
        string memory name,
        string memory description,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == verifier, "Only verifier can unlock achievements");
        require(reputations[recipient].owner != address(0), "User reputation not initialized");
        require(reputations[recipient].isActive, "User reputation is inactive");
        
        uint256 achievementId = achievementCounter++;
        
        euint32 internalPoints = FHE.fromExternal(points, inputProof);
        euint32 internalRarity = FHE.fromExternal(rarity, inputProof);
        
        achievements[achievementId] = Achievement({
            achievementId: FHE.asEuint32(0), // Will be set properly later
            points: internalPoints,
            rarity: internalRarity,
            isUnlocked: true,
            recipient: recipient,
            unlockedAt: block.timestamp,
            name: name,
            description: description
        });
        
        // Update user achievement points
        reputations[recipient].achievementPoints = FHE.add(
            reputations[recipient].achievementPoints, 
            internalPoints
        );
        reputations[recipient].lastUpdated = block.timestamp;
        
        emit AchievementUnlocked(achievementId, recipient, name);
        return achievementId;
    }
    
    // Verify member
    function verifyMember(address member, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify members");
        require(reputations[member].owner != address(0), "User reputation not initialized");
        
        isVerifiedMember[member] = isVerified;
        emit MemberVerified(member, isVerified);
    }
    
    // Update voting power
    function updateVotingPower(address member, externalEuint32 power, bytes calldata inputProof) public {
        require(msg.sender == verifier, "Only verifier can update voting power");
        require(reputations[member].owner != address(0), "User reputation not initialized");
        
        euint32 internalPower = FHE.fromExternal(power, inputProof);
        votingPower[member] = internalPower;
    }
    
    // Get reputation info (returns public data only)
    function getReputationInfo(address user) public view returns (
        bool isActive,
        uint256 lastUpdated,
        address owner
    ) {
        ReputationData storage reputation = reputations[user];
        return (
            reputation.isActive,
            reputation.lastUpdated,
            reputation.owner
        );
    }
    
    // Get contribution info (returns public data only)
    function getContributionInfo(uint256 contributionId) public view returns (
        bool isVerified,
        address contributor,
        uint256 timestamp,
        string memory description
    ) {
        Contribution storage contribution = contributions[contributionId];
        return (
            contribution.isVerified,
            contribution.contributor,
            contribution.timestamp,
            contribution.description
        );
    }
    
    // Get proposal info (returns public data only)
    function getProposalInfo(uint256 proposalId) public view returns (
        bool isActive,
        bool isExecuted,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        string memory title,
        string memory description
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.isActive,
            proposal.isExecuted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.title,
            proposal.description
        );
    }
    
    // Get achievement info (returns public data only)
    function getAchievementInfo(uint256 achievementId) public view returns (
        bool isUnlocked,
        address recipient,
        uint256 unlockedAt,
        string memory name,
        string memory description
    ) {
        Achievement storage achievement = achievements[achievementId];
        return (
            achievement.isUnlocked,
            achievement.recipient,
            achievement.unlockedAt,
            achievement.name,
            achievement.description
        );
    }
    
    // Emergency functions
    function pauseReputation(address user) public {
        require(msg.sender == owner || msg.sender == verifier, "Unauthorized");
        require(reputations[user].owner != address(0), "User reputation not initialized");
        
        reputations[user].isActive = false;
        reputations[user].lastUpdated = block.timestamp;
    }
    
    function unpauseReputation(address user) public {
        require(msg.sender == owner || msg.sender == verifier, "Unauthorized");
        require(reputations[user].owner != address(0), "User reputation not initialized");
        
        reputations[user].isActive = true;
        reputations[user].lastUpdated = block.timestamp;
    }
    
    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership");
        require(newOwner != address(0), "New owner cannot be zero address");
        
        owner = newOwner;
    }
    
    function updateVerifier(address newVerifier) public {
        require(msg.sender == owner, "Only owner can update verifier");
        require(newVerifier != address(0), "New verifier cannot be zero address");
        
        verifier = newVerifier;
    }
}
