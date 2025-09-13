// Contract ABI for ArcaneReputeVault
export const ARCANE_REPUTE_VAULT_ABI = [
  // Events
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  "event ContributionAdded(uint256 indexed contributionId, address indexed contributor, uint32 points)",
  "event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title)",
  "event VoteCast(uint256 indexed proposalId, address indexed voter, bool support)",
  "event AchievementUnlocked(uint256 indexed achievementId, address indexed recipient, string name)",
  "event MemberVerified(address indexed member, bool isVerified)",
  
  // Functions
  "function initializeReputation(address user, bytes calldata initialScore, bytes calldata inputProof) external",
  "function addContribution(address contributor, bytes calldata points, bytes calldata category, string memory description, bytes calldata inputProof) external returns (uint256)",
  "function verifyContribution(uint256 contributionId, bool isVerified) external",
  "function createProposal(string memory title, string memory description, uint256 duration, bytes calldata requiredQuorum, bytes calldata inputProof) external returns (uint256)",
  "function castVote(uint256 proposalId, bool support, bytes calldata votingPower, bytes calldata inputProof) external",
  "function executeProposal(uint256 proposalId) external",
  "function unlockAchievement(address recipient, bytes calldata points, bytes calldata rarity, string memory name, string memory description, bytes calldata inputProof) external returns (uint256)",
  "function verifyMember(address member, bool isVerified) external",
  "function updateVotingPower(address member, bytes calldata power, bytes calldata inputProof) external",
  
  // View functions
  "function getReputationInfo(address user) external view returns (bool isActive, uint256 lastUpdated, address owner)",
  "function getContributionInfo(uint256 contributionId) external view returns (bool isVerified, address contributor, uint256 timestamp, string memory description)",
  "function getProposalInfo(uint256 proposalId) external view returns (bool isActive, bool isExecuted, address proposer, uint256 startTime, uint256 endTime, string memory title, string memory description)",
  "function getAchievementInfo(uint256 achievementId) external view returns (bool isUnlocked, address recipient, uint256 unlockedAt, string memory name, string memory description)",
  
  // Admin functions
  "function pauseReputation(address user) external",
  "function unpauseReputation(address user) external",
  "function transferOwnership(address newOwner) external",
  "function updateVerifier(address newVerifier) external",
  
  // State variables
  "function owner() external view returns (address)",
  "function verifier() external view returns (address)",
  "function contributionCounter() external view returns (uint256)",
  "function proposalCounter() external view returns (uint256)",
  "function achievementCounter() external view returns (uint256)"
] as const;

// Contract configuration
export const CONTRACT_CONFIG = {
  // Contract addresses (to be updated after deployment)
  ARCANE_REPUTE_VAULT: "0x...", // Will be set after contract deployment
  
  // Network configuration
  CHAIN_ID: 11155111, // Sepolia testnet
  
  // Gas limits
  GAS_LIMITS: {
    INITIALIZE_REPUTATION: 500000,
    ADD_CONTRIBUTION: 300000,
    VERIFY_CONTRIBUTION: 100000,
    CREATE_PROPOSAL: 400000,
    CAST_VOTE: 200000,
    EXECUTE_PROPOSAL: 150000,
    UNLOCK_ACHIEVEMENT: 250000,
    VERIFY_MEMBER: 100000,
    UPDATE_VOTING_POWER: 100000,
  },
  
  // Default values
  DEFAULTS: {
    PROPOSAL_DURATION: 7 * 24 * 60 * 60, // 7 days in seconds
    MIN_REPUTATION_FOR_PROPOSAL: 100,
    MIN_VOTING_POWER: 1,
  }
} as const;

// FHE configuration
export const FHE_CONFIG = {
  NETWORK: 'sepolia',
  RPC_URL: 'https://rpc.fhenix.xyz',
  EXPLORER_URL: 'https://explorer.fhenix.xyz',
  
  // FHE-specific settings
  ENCRYPTION_KEY_SIZE: 32,
  PROOF_SIZE: 128,
  
  // Supported data types
  SUPPORTED_TYPES: {
    EUINT32: 'euint32',
    EUINT8: 'euint8',
    EBOOL: 'ebool',
  }
} as const;
