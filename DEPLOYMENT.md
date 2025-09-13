# Arcane Repute Vault - Deployment Guide

## Project Overview

Arcane Repute Vault is a decentralized reputation management system built with FHE (Fully Homomorphic Encryption) technology for secure and private reputation tracking.

## Features Implemented

✅ **Wallet Integration**: Real wallet connection using RainbowKit and Wagmi
✅ **FHE Smart Contract**: Complete Solidity contract with FHE encryption for core data
✅ **Frontend Interface**: Modern React UI with contract interaction capabilities
✅ **English Localization**: All code comments and documentation in English
✅ **Lovable Removal**: All Lovable tags and references removed
✅ **Browser Icon**: Custom favicon matching the design theme
✅ **Vercel Ready**: Configured for Vercel deployment

## Smart Contract Features

The `ArcaneReputeVault.sol` contract includes:

- **FHE-Protected Reputation Data**: All sensitive reputation scores are encrypted
- **Contribution Tracking**: Secure tracking of user contributions with FHE encryption
- **Governance Proposals**: DAO governance with encrypted voting
- **Achievement System**: Encrypted achievement tracking and rewards
- **Member Verification**: Role-based access control for verifiers

## Frontend Features

- **Wallet Connection**: RainbowKit integration for seamless wallet connection
- **Contract Interaction**: Full contract interaction capabilities
- **Reputation Dashboard**: View encrypted reputation data
- **Contribution System**: Submit and track contributions
- **Governance Interface**: Create and vote on proposals
- **Achievement Display**: View unlocked achievements

## Deployment Instructions

### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### 2. Environment Variables

Set the following environment variables in Vercel:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_FHE_NETWORK_RPC=https://rpc.fhenix.xyz
```

### 3. Smart Contract Deployment

1. Deploy the `ArcaneReputeVault.sol` contract to the FHE network
2. Update the contract address in `src/lib/contract-abi.ts`
3. Update the contract address in `src/lib/wallet-config.ts`

### 4. WalletConnect Setup

1. Create a WalletConnect project at https://cloud.walletconnect.com/
2. Get your project ID
3. Update `YOUR_WALLET_CONNECT_PROJECT_ID` in `src/lib/wallet-config.ts`

## File Structure

```
arcane-repute-vault/
├── contracts/
│   └── ArcaneReputeVault.sol          # FHE smart contract
├── src/
│   ├── components/
│   │   ├── ContractInteraction.tsx    # Contract interaction UI
│   │   ├── MemberCard.tsx            # Member display component
│   │   ├── Navbar.tsx                # Navigation with wallet connection
│   │   └── ReputationDashboard.tsx   # Main dashboard
│   ├── hooks/
│   │   └── useContract.ts            # Contract interaction hooks
│   ├── lib/
│   │   ├── contract-abi.ts           # Contract ABI and config
│   │   ├── utils.ts                  # Utility functions
│   │   └── wallet-config.ts          # Wallet configuration
│   ├── pages/
│   │   ├── Contribute.tsx            # Contribution page
│   │   ├── Governance.tsx            # Governance page
│   │   ├── Index.tsx                 # Home page
│   │   └── Profile.tsx               # Profile page
│   └── App.tsx                       # Main app component
├── public/
│   └── favicon.ico                   # Custom browser icon
├── vercel.json                       # Vercel configuration
└── README.md                         # Project documentation
```

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Wallet Integration**: RainbowKit + Wagmi
- **Smart Contract**: Solidity with FHE (Fully Homomorphic Encryption)
- **Deployment**: Vercel
- **State Management**: TanStack Query

## Security Features

- **FHE Encryption**: All sensitive reputation data is encrypted on-chain
- **Role-Based Access**: Verifier and owner roles for contract management
- **Input Validation**: Comprehensive input validation and error handling
- **Secure Wallet Integration**: Industry-standard wallet connection

## Next Steps

1. Deploy the smart contract to the FHE network
2. Update contract addresses in the configuration files
3. Set up WalletConnect project and update project ID
4. Deploy to Vercel with environment variables
5. Test all contract interactions and wallet connections

## Support

For technical support or questions about the deployment, please refer to the project documentation or contact the development team.
