# LifeBridge Blockchain Module

This directory contains the Ethereum smart contract and deployment tools for the LifeBridge organ allocation audit system.

## Overview

The blockchain module provides an immutable audit trail of organ allocation transactions using Ethereum smart contracts deployed on the Sepolia testnet.

## Directory Structure

```
blockchain/
├── contracts/
│   └── AllocationAudit.sol      # Main smart contract
├── ignition/
│   └── modules/
│       └── Lock.js               # Hardhat ignition module
├── scripts/
│   └── deploy.js                 # Deployment script
├── hardhat.config.js             # Hardhat configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Smart Contract: AllocationAudit.sol

The `AllocationAudit` contract manages the blockchain recording of organ allocations.

### Features

- **Allocation Recording**: Record new allocations with initial data hash
- **Status Updates**: Track allocation status changes through defined state transitions
- **History Audit**: Maintain complete history of all changes
- **Integrity Verification**: Verify that allocation data hasn't been tampered with
- **Access Control**: All operations recorded with caller's address

### Events

- `AllocationRecorded` - Emitted when a new allocation is recorded
- `AllocationUpdated` - Emitted when allocation status changes
- `AllocationVerified` - Emitted when allocation integrity is verified

### State Structure

```solidity
struct AllocationRecord {
    bytes32 allocationId;     // Unique allocation ID
    bytes32 dataHash;         // SHA256 hash of allocation data
    string status;            // Current status
    uint256 timestamp;        // Block timestamp
    address recordedBy;       // Address that recorded the transaction
    bytes32 previousHash;     // Previous hash for chain integrity
}
```

## Setup & Deployment

### Prerequisites

1. **Node.js** >= 16.x
2. **Alchemy Account** - Get free API key at https://www.alchemy.com
3. **Wallet with Sepolia ETH** - Get testnet ETH from https://sepoliafaucet.com
4. **MetaMask or similar** - To manage private keys securely

### Installation

```bash
# Install dependencies
npm install

# Copy environment from backend
cp ../backend/.env .env
```

### Configuration

Edit `.env` file:

```dotenv
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=0xyour_private_key_here
```

### Deployment

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Output will show contract address - add to backend/.env
```

## Usage

See [BLOCKCHAIN_SETUP_GUIDE.md](../BLOCKCHAIN_SETUP_GUIDE.md) for comprehensive integration guide.

### Quick Test

```bash
# Test blockchain configuration
node -e "
  require('dotenv').config();
  const BlockchainService = require('../backend/src/services/blockchainService');
  const service = new BlockchainService();
  console.log('Configured:', service.isConfigured);
"
```

## Networks

- **Sepolia Testnet** (Primary for development)
  - Chain ID: 11155111
  - RPC: https://eth-sepolia.g.alchemy.com/v2/{apiKey}
  - Explorer: https://sepolia.etherscan.io
  - Faucet: https://sepoliafaucet.com

## Contract Verification

Verify contract on Etherscan (optional):

```bash
npx hardhat verify \
  --network sepolia \
  <CONTRACT_ADDRESS>
```

Then view at:
```
https://sepolia.etherscan.io/address/<CONTRACT_ADDRESS>
```

## Hardhat Tasks

```bash
# Compile contracts
npx hardhat compile

# Run local test network
npx hardhat node

# Run tests (if available)
npx hardhat test

# Check gas estimates
npx hardhat coverage
```

## Gas Optimization

- Contract size: ~6 KB (well below limit)
- Average transaction cost: ~50k gas
- Estimated cost per allocation: ~$0.01 USD on Sepolia

## Security

⚠️ **Important**:
1. Never commit `.env` file with real private keys
2. Use hardware wallets for production
3. Keep private keys secure and never share
4. Test thoroughly on testnet before mainnet
5. Consider smart contract audit before production use

## Dependencies

- **hardhat** - Ethereum development environment
- **@nomicfoundation/hardhat-ethers** - Ethers.js integration
- **ethers** - Web3 library (v6)
- **dotenv** - Environment variable management

## Troubleshooting

### Issue: "Insufficient funds"
Solution: Get Sepolia ETH from faucet

### Issue: "Invalid RPC URL"
Solution: Check ALCHEMY_RPC_URL format in .env

### Issue: "Out of gas"
Solution: Increase gas limit in hardhat config

## Resources

- [Ethereum Documentation](https://ethereum.org/developers/docs)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org)
- [Solidity Documentation](https://docs.soliditylang.org)
- [Sepolia Testnet](https://sepolia.etherscan.io)

## Support

For issues or questions:
1. Check [BLOCKCHAIN_SETUP_GUIDE.md](../BLOCKCHAIN_SETUP_GUIDE.md)
2. Review error messages carefully
3. Check Etherscan for transaction details
4. Verify environment configuration
