const crypto = require("crypto");
const { ethers } = require("ethers");

const ABI = [
  "event AllocationRecorded(bytes32 indexed allocationId, bytes32 dataHash, string status, uint256 timestamp, address recordedBy)",
  "event AllocationUpdated(bytes32 indexed allocationId, string newStatus, bytes32 newHash, uint256 timestamp)",
  "event AllocationVerified(bytes32 indexed allocationId, bool isValid)",
  "function recordAllocation(bytes32 _allocationId, bytes32 _dataHash, string _status, bytes32 _previousHash) public",
  "function updateAllocationStatus(bytes32 _allocationId, string _newStatus, bytes32 _newHash) public",
  "function getAllocationRecord(bytes32 _allocationId) public view returns (tuple(bytes32 allocationId, bytes32 dataHash, string status, uint256 timestamp, address recordedBy, bytes32 previousHash))",
  "function getAllocationHistory(bytes32 _allocationId) public view returns (bytes32[])",
  "function verifyAllocation(bytes32 _allocationId) public",
  "function getTotalAllocations() public view returns (uint256)"
];

class BlockchainService {

  constructor() {
    // Check if blockchain is configured
    this.isConfigured = !!(
      process.env.ALCHEMY_RPC_URL &&
      process.env.PRIVATE_KEY &&
      process.env.CONTRACT_ADDRESS
    );

    if (!this.isConfigured) {
      console.log("⚠️  Blockchain service not configured. Running in development mode without blockchain.");
      return;
    }

    this.provider = new ethers.JsonRpcProvider(
      process.env.ALCHEMY_RPC_URL
    );

    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY,
      this.provider
    );

    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      ABI,
      this.wallet
    );
  }

  /**
   * Generate SHA256 hash from data
   */
  generateHash(data) {
    return "0x" + crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
  }

  /**
   * Record initial allocation on blockchain
   */
  async recordAllocation(allocationId, allocationData) {
    if (!this.isConfigured) {
      console.log("ℹ️  Allocation recording skipped (blockchain not configured)");
      return { success: true, blockchain: false };
    }

    try {
      const dataHash = this.generateHash(allocationData);
      const allocationIdBytes32 = ethers.toBeHex(allocationId, 32);

      const tx = await this.contract.recordAllocation(
        allocationIdBytes32,
        dataHash,
        allocationData.status || "PENDING_CONFIRMATION",
        ethers.ZeroHash
      );

      const receipt = await tx.wait();

      console.log("✅ Allocation recorded on blockchain:", receipt.transactionHash);

      return {
        success: true,
        blockchain: true,
        hash: dataHash,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error("❌ Error recording allocation on blockchain:", error.message);
      throw error;
    }
  }

  /**
   * Update allocation status on blockchain
   */
  async updateAllocationStatus(allocationId, previousHash, newStatus, newData) {
    if (!this.isConfigured) {
      console.log("ℹ️  Status update skipped (blockchain not configured)");
      return { success: true, blockchain: false };
    }

    try {
      const newHash = this.generateHash(newData);
      const allocationIdBytes32 = ethers.toBeHex(allocationId, 32);

      const tx = await this.contract.updateAllocationStatus(
        allocationIdBytes32,
        newStatus,
        newHash
      );

      const receipt = await tx.wait();

      console.log("✅ Allocation status updated on blockchain:", receipt.transactionHash);

      return {
        success: true,
        blockchain: true,
        hash: newHash,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error("❌ Error updating allocation status on blockchain:", error.message);
      throw error;
    }
  }

  /**
   * Get allocation record from blockchain
   */
  async getAllocationRecord(allocationId) {
    if (!this.isConfigured) {
      return null;
    }

    try {
      const allocationIdBytes32 = ethers.toBeHex(allocationId, 32);
      const record = await this.contract.getAllocationRecord(allocationIdBytes32);
      return record;
    } catch (error) {
      console.error("❌ Error fetching allocation record:", error.message);
      return null;
    }
  }

  /**
   * Get allocation history from blockchain
   */
  async getAllocationHistory(allocationId) {
    if (!this.isConfigured) {
      return [];
    }

    try {
      const allocationIdBytes32 = ethers.toBeHex(allocationId, 32);
      const history = await this.contract.getAllocationHistory(allocationIdBytes32);
      return history;
    } catch (error) {
      console.error("❌ Error fetching allocation history:", error.message);
      return [];
    }
  }

  /**
   * Verify allocation integrity
   */
  async verifyAllocation(allocationId) {
    if (!this.isConfigured) {
      return { verified: false, reason: "Blockchain not configured" };
    }

    try {
      const allocationIdBytes32 = ethers.toBeHex(allocationId, 32);
      await this.contract.verifyAllocation(allocationIdBytes32);
      return { verified: true };
    } catch (error) {
      console.error("❌ Error verifying allocation:", error.message);
      return { verified: false, reason: error.message };
    }
  }

  /**
   * Get total allocations from blockchain
   */
  async getTotalAllocations() {
    if (!this.isConfigured) {
      return 0;
    }

    try {
      const total = await this.contract.getTotalAllocations();
      return total.toString();
    } catch (error) {
      console.error("❌ Error fetching total allocations:", error.message);
      return 0;
    }
  }
}

module.exports = BlockchainService;
