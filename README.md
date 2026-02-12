# LifeBridge - Organ Donation & Transplant Platform

![LifeBridge](https://img.shields.io/badge/Organ%20Donation-Platform-brightgreen) ![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue) ![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react) ![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)

**LifeBridge is a decentralized organ donation and transplant allocation platform powered by blockchain technology, ensuring transparency, accountability, and trust in life-saving organ transfers.**

---

## 🎯 Problem Statement

In India, **2+ million people die annually waiting for organ transplants**, while precious organs go to waste due to:
- ❌ Lack of transparency in allocation decisions
- ❌ Potential corruption & nepotism in hospital systems
- ❌ No verifiable audit trail for regulatory compliance
- ❌ Limited geographic reach for optimal organ matching

**LifeBridge solves this** with blockchain-based immutable records and AI-powered matching.

---

## ✨ Key Features

### **For Donors**
- 🩸 Register organ donation preferences with consent management
- 📍 Real-time location tracking for geographic optimization
- 📜 Transparent blockchain verification of where organ goes
- ✅ Confirm/revoke consent anytime
- 🔗 View allocation on immutable blockchain ledger

### **For Hospitals & Doctors**
- 🏥 Request organs for waiting patients instantly
- 🤖 AI-powered organ matching algorithm (blood type, distance, urgency)
- 📊 Real-time compatibility score calculation
- ✅ Allocation with automatic blockchain recording
- 📈 Complete audit trail dashboard
- 🔐 Cryptographic proof of every decision

### **For Patients**
- 📋 Register in urgent need with priority flagging
- 🗺️ Real-time matching across network
- ⏱️ Receive instant alerts when compatible organ found
- 🔍 Verify allocation fairness on blockchain

### **For Administrators & Auditors**
- 📊 Monitor all allocations in real-time
- 🔍 Verify allocations for tampering (detect modifications)
- 📄 Generate compliance reports automatically
- 🔗 View immutable history on public blockchain

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────┐
│          FRONTEND (React 19 + Tailwind)          │
│  • Donor Dashboard    • Hospital Dashboard       │
│  • Real-time Updates  • Blockchain Verification │
│  • Geolocation Map    • Allocation Tracker      │
└─────────────────────┬──────────────────────────┘
                      │ HTTP/REST API
                      ↓
┌──────────────────────────────────────────────────┐
│      BACKEND (Node.js + Express + Auth)          │
│                                                  │
│  • JWT Authentication     • Notification System │
│  • Allocation Service     • Blockchain Service  │
│  • Matching Algorithm     • Geolocation Service │
│  • Database Operations    • Ethers.js Web3      │
└──────────┬──────────────────────────┬──────────┘
           │ MongoDB                  │ Ethers.js
           ↓                          ↓
    ┌──────────────┐        ┌──────────────────────┐
    │   MongoDB    │        │  Ethereum Blockchain │
    │              │        │   (Sepolia Testnet)  │
    │ • Donors     │        │                      │
    │ • Patients   │        │ AllocationAudit.sol  │
    │ • Organs     │        │ • Records allocations│
    │ • Allocations│        │ • Status updates     │
    │ • Consents   │        │ • Immutable proof    │
    └──────────────┘        │ • Event logging      │
                            └──────────────────────┘
                                    ↑
                            Alchemy RPC Node
```

---

## 🔗 WHY BLOCKCHAIN? (Most Important for Recruiters)

### **The Problem: Corruption Without Blockchain**
```
❌ Doctor allocates Kidney to Patient X (records in hospital database only)
❌ Hospital admin can delete the record
❌ Doctor claims it never happened
❌ No proof who made the decision
❌ Auditors have nothing to verify
❌ Corrupt officials hide evidence
```

### **LifeBridge Solution: Immutable Blockchain Records**

**Stage 1: Donor Registers Organ**
```
✅ Stored in Database (fast queries)
```

**Stage 2: Doctor Creates Allocation** ← BLOCKCHAIN RECORDS 🔗
```
✅ Save to DB: Queryable by frontend
🔗 RECORD ON BLOCKCHAIN:
   • Event: AllocationRecorded
   • Data Hash: SHA256(all allocation data)
   • Doctor's Address: Proof of who did it
   • Timestamp: Block timestamp (cannot be modified)
   • On Etherscan: Public, permanently visible
```

**Stage 3: Doctor Updates Status (PENDING → MATCHED)** ← BLOCKCHAIN UPDATES 🔗
```
✅ Update Database
🔗 NEW BLOCKCHAIN ENTRY:
   • Event: AllocationUpdated
   • New Hash: Different from previous (proves data changed)
   • Links to Previous Hash: Proves chain integrity
   • Cannot fake the previous state (cryptographically linked)
```

**Stage 4: Completion (MATCHED → COMPLETED)** ← FINAL RECORD 🔗
```
✅ Mark as complete in DB
🔗 FINAL BLOCKCHAIN RECORD:
   • Journey complete
   • All 3 states visible on Etherscan
   • Auditors can verify entire history
```

### **Why This Matters: Real-World Comparison**

| Scenario | Without Blockchain ❌ | With LifeBridge 🔗 |
|----------|---|---|
| **Doctor hides allocation** | Deletes DB record, no evidence | IMPOSSIBLE - On public blockchain |
| **Corrupt official changes recipient** | Modifies hospital database | DETECTED - Hash changes, cryptographically provable |
| **"I never allocated this organ"** | No way to prove otherwise | Ethereum shows wallet address & timestamp |
| **Auditor verification** | Manual paper trail, can be fabricated | Permanent, cryptographic, provable on Etherscan |
| **System-wide corruption** | One person controls all records | Distributed ledger, requires majority approval |

### **Blockchain Value Proposition** 📊

**Technical Impact:**
- ✅ **Immutability**: Cannot delete/modify allocations
- ✅ **Transparency**: Every decision public on Etherscan
- ✅ **Accountability**: Doctor's wallet linked to action
- ✅ **Auditability**: Timestamps from blockchain (not system clock)
- ✅ **Compliance**: Regulatory requirements auto-satisfied

**Real-World Impact:**
- 📈 **Trust**: People trust system, more donors register
- 🏥 **Hospital Accountability**: Hospitals compete on fairness
- 👨‍⚖️ **Legal Proof**: Court-admissible evidence of decisions
- 🌍 **Scalability**: Works across state/national boundaries
- 💪 **Corruption Prevention**: Significantly reduces organ trafficking

---

## 💻 Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **Frontend** | React 19, Tailwind, Framer Motion | Modern, responsive, smooth UX |
| **Backend** | Node.js, Express, MongoDB | Scalable, real-time capable |
| **Authentication** | JWT (custom) | Secure, stateless, industry standard |
| **Blockchain** | Solidity, Hardhat, Ethers.js v6 | Smart contracts, Web3 integration |
| **Networking** | OpenCage, OpenRoute Service | Geolocation & distance optimization |
| **RPC Provider** | Alchemy | Reliable Ethereum Sepolia access |
| **Testnet** | Ethereum Sepolia | Safe testing before mainnet |

---

## 📋 API Endpoints

### **Authentication**
- `POST /api/user/signup` - Register
- `POST /api/user/login` - Login (returns JWT)

### **Donor Operations**
- `POST /api/donor/create-donation` - Register organ
- `GET /api/donor/all-requests` - View requests
- `POST /api/donor/confirm-donation` - Confirm

### **Doctor Operations**
- `POST /api/doctor/request-organ` - Request for patient
- `GET /api/doctor/all-requests` - View requests

### **Allocations (Blockchain-Enabled)** 🔗
- `POST /api/allocation` - Create → **RECORDS ON BLOCKCHAIN**
- `GET /api/allocation` - List all
- `GET /api/allocation/:id` - Get + blockchain record
- `PATCH /api/allocation/:id/status` - Update → **UPDATES BLOCKCHAIN**
- `GET /api/allocation/:id/history` - DB + blockchain history
- `GET /api/allocation/:id/verify` - Verify integrity (detect tampering)

---

## 🚀 Getting Started

### **Prerequisites**
```
• Node.js 16+
• MongoDB Atlas account
• Alchemy account (free tier)
• MetaMask wallet
```

### **Installation**
```bash
cd VitaMatch-Organs-Donation

# Backend setup
cd backend && npm install
cd ../backend && npm start          # Runs on :5000

# Frontend setup (new terminal)
cd frontend && npm install
npm start                            # Runs on :3000
```

### **Configuration** (.env)
```env
# Backend
PORT=5000
JWT_SECRET=your_secret
MONGODB_URI=mongodb+srv://...
OPENCAGE_API_KEY=...
ORS_API_KEY=...

# Blockchain
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_key_here
CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
```

---

## 🔍 Live Example: Creating Allocation with Blockchain

### **Step 1: Create Allocation**
```bash
curl -X POST http://localhost:5000/api/allocation \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "organId": "507f1f77bcf86cd799439011",
    "requestId": "507f1f77bcf86cd799439012",
    "hospitalId": "507f1f77bcf86cd799439013",
    "matchScore": 92.5
  }'
```

### **Step 2: Backend Response**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "status": "PENDING_CONFIRMATION",
    "blockchainHistory": [
      {
        "status": "PENDING_CONFIRMATION",
        "hash": "0x5f9e883abcd1234...",
        "txHash": "0x2a1f3e5c7b9d1f...",
        "timestamp": "2026-02-12T10:30:45Z"
      }
    ]
  },
  "blockchainRecorded": true
}
```

### **Step 3: View on Etherscan** 👀
Visit: https://sepolia.etherscan.io/tx/0x2a1f3e5c7b9d1f...

**See:**
- ✅ AllocationRecorded event
- ✅ Doctor's wallet address
- ✅ Block timestamp (immutable proof)
- ✅ Transaction hash
- ✅ Event parameters (hash, data, status)

### **Step 4: Update Status** (Status changed on-chain)
```bash
curl -X PATCH http://localhost:5000/api/allocation/65a1b2c3d4e5f6g7h8i9j0k1/status \
  -d '{"newStatus": "MATCHED"}'
```

**New blockchain transaction created:**
- New hash (different from previous)
- Linked to previous hash (chain integrity)
- New timestamp
- Visible immediately on Etherscan

---

## 📊 Smart Contract: AllocationAudit.sol

**Deployed at:** `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349` (Sepolia)

**Key Functions:**
```solidity
// Record allocation
recordAllocation(bytes32 allocationId, bytes32 dataHash, string status, bytes32 previousHash)

// Update status
updateAllocationStatus(bytes32 allocationId, string newStatus, bytes32 newHash)

// Get record
getAllocationRecord(bytes32 allocationId)

// Get history
getAllocationHistory(bytes32 allocationId)

// Verify (no tampering)
verifyAllocation(bytes32 allocationId)
```

**Events Emitted:**
- `AllocationRecorded(bytes32 indexed allocationId, bytes32 dataHash, string status, uint256 timestamp, address recordedBy)`
- `AllocationUpdated(bytes32 indexed allocationId, string newStatus, bytes32 newHash, uint256 timestamp)`

---

## 🎓 FOR RECRUITERS & INTERVIEWS

### **Why This Project Stands Out** 🌟

1. **Solves Real-World Problem**
   - Healthcare is critical infrastructure
   - Blockchain adds tangible value (not buzzword)
   - Actual lives depend on transparency

2. **Full-Stack Mastery**
   - Frontend: React modern patterns
   - Backend: Scalable Node.js architecture
   - Blockchain: Smart contract deployment
   - DevOps: Environment management

3. **Blockchain Done Right**
   - Not NFT/crypto gambling (credible use case)
   - Understands when blockchain needed (immutability requirement)
   - Proper Web3 integration (Ethers.js)
   - Testnet deployment & verification

4. **System Design Thinking**
   - Geographic optimization algorithms
   - Medical matching logic
   - Real-time notifications
   - Scalable architecture

5. **Security & Best Practices**
   - JWT authentication
   - Never storing Private Key In Code
   -  Environment-based config
   - Error handling & validation

### **30-Second Pitch to Recruiter** 🎯
> "LifeBridge is a blockchain-powered organ donation platform. The key innovation: every allocation decision is cryptographically recorded on Ethereum,  creating an immutable audit trail that prevents corruption and ensures transparency. Built with React frontend, Node.js backend, and Solidity smart contracts. Geolocation algorithms optimize matching, while blockchain provides regulatory compliance and legal proof."

### **Technical Interview Talking Points** 💡

**Q: Why use blockchain here?**
> "Database alone can be modified or deleted by insiders. Blockchain provides immutability—once recorded on Sepolia network, the allocation cannot be changed, deleted, or denied. It creates cryptographic proof of every decision with timestamp and doctor's wallet address."

**Q: What happens if blockchain goes down?**
> "System failsafe: allocations still saved to MongoDB, blockchain recording is best-effort. If Alchemy RPC fails, allocation completes but `blockchainRecorded: false` in response. Once recovered, all pending allocations can be batched to blockchain."

**Q: How do you prevent doctor from faking timestamps?**
> "Timestamps come from the blockchain (block.timestamp in Solidity), not our server. Doctor cannot modify blockchain—they would need to control 51% of Sepolia network nodes, which is cryptographically impossible."

---

## 📈 Scalability & Roadmap

**Current State:**
- ✅ Single hospital deployment
- ✅ Sepolia testnet only
- ✅ Core functionality

**Production Roadmap:**
- [ ] Deploy to Ethereum Mainnet (post security audit)
- [ ] Multi-state expansion across India
- [ ] Mobile app (React Native)
- [ ] Advanced ML matching algorithm
- [ ] Real-time push notifications
- [ ] Integration with NOTTO (National Organ & Tissue Transplantation Organisation)
- [ ] Insurance provider integration
- [ ] Payment processing

---

## 🧪 Testing Blockchain Integration

**Quick Test Flow:**
```bash
# 1. Login as donor
curl -X POST http://localhost:5000/api/user/login \
  -d '{"email":"donor@example.com","password":"password"}'

# 2. Create organ donation
curl -X POST http://localhost:5000/api/donor/create-donation

# 3. Login as doctor
curl -X POST http://localhost:5000/api/user/login \
  -d '{"email":"doctor@hospital.com","password":"password"}'

# 4. Request organ
curl -X POST http://localhost:5000/api/doctor/request-organ

# 5. Allocate organ (creates blockchain record)
curl -X POST http://localhost:5000/api/allocation

# 6. Check Etherscan
# Visit: https://sepolia.etherscan.io/address/0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
# See your transaction!
```

---

## 📚 Documentation

- [BLOCKCHAIN_SETUP_GUIDE.md](./BLOCKCHAIN_SETUP_GUIDE.md) - Complete blockchain setup
- [BLOCKCHAIN_TESTING_GUIDE.md](./BLOCKCHAIN_TESTING_GUIDE.md) - Testing procedures
- [BLOCKCHAIN_QUICK_REFERENCE.md](./BLOCKCHAIN_QUICK_REFERENCE.md) - Quick reference

---

## 📄 License

MIT License - Open source for public good in healthcare

---

**Made with ❤️ to save lives through blockchain transparency**

- Track allocations
- Dashboard analytics (My Requests + Hospital Requests)

---

### Security
- JWT authentication
- Protected routes
- Role validation
- Secure API headers

---

##  Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Framer Motion
- Lottie Animations

---

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt

---
