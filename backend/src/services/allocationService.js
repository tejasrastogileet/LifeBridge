const Allocation = require("../models/Allocation");
const BlockchainService = require("./blockchainService");
const { validateAllocationTransition } = require("./allocationStateService");
const crypto = require("crypto");

class AllocationService {
  constructor() {
    this.blockchainService = new BlockchainService();
  }

  /**
   * Generate allocation data hash for blockchain
   */
  generateAllocationHash(data) {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
  }

  /**
   * Create a new allocation
   */
  async createAllocation(allocationData) {
    try {
      // Create allocation in database
      const allocation = new Allocation({
        organId: allocationData.organId,
        requestId: allocationData.requestId,
        hospitalId: allocationData.hospitalId,
        status: "PENDING_CONFIRMATION",
        matchScore: allocationData.matchScore,
        dispatchedBy: allocationData.dispatchedBy,
        blockchainHistory: []
      });

      await allocation.save();

      // Record on blockchain
      const blockchainResult = await this.blockchainService.recordAllocation(
        allocation._id.toString(),
        {
          allocationId: allocation._id.toString(),
          organId: allocationData.organId,
          requestId: allocationData.requestId,
          hospitalId: allocationData.hospitalId,
          status: "PENDING_CONFIRMATION",
          matchScore: allocationData.matchScore,
          timestamp: new Date().toISOString()
        }
      );

      // Update blockchain history
      if (blockchainResult.blockchain) {
        allocation.blockchainHistory.push({
          status: "PENDING_CONFIRMATION",
          hash: blockchainResult.hash,
          txHash: blockchainResult.txHash,
          timestamp: new Date()
        });
        allocation.lastBlockchainHash = blockchainResult.hash;
        await allocation.save();
      }

      console.log("✅ Allocation created successfully:", allocation._id);
      return {
        success: true,
        allocation,
        blockchain: blockchainResult.blockchain
      };
    } catch (error) {
      console.error("❌ Error creating allocation:", error.message);
      throw error;
    }
  }

  /**
   * Update allocation status
   */
  async updateAllocationStatus(allocationId, newStatus, updatedBy) {
    try {
      const allocation = await Allocation.findById(allocationId);
      if (!allocation) {
        throw new Error("Allocation not found");
      }

      const currentStatus = allocation.status;

      // Validate state transition
      validateAllocationTransition(currentStatus, newStatus);

      // Update status in database
      allocation.status = newStatus;

      if (newStatus === "COMPLETED") {
        allocation.completionTime = new Date();
        allocation.completedBy = updatedBy;
      } else if (newStatus === "FAILED") {
        allocation.completionTime = new Date();
      }

      // Prepare data for blockchain
      const allocationData = {
        allocationId: allocation._id.toString(),
        status: newStatus,
        previousStatus: currentStatus,
        timestamp: new Date().toISOString(),
        updatedBy: updatedBy
      };

      // Update on blockchain
      const blockchainResult = await this.blockchainService.updateAllocationStatus(
        allocation._id.toString(),
        allocation.lastBlockchainHash || "0x0",
        newStatus,
        allocationData
      );

      // Update blockchain history
      if (blockchainResult.blockchain) {
        allocation.blockchainHistory.push({
          status: newStatus,
          hash: blockchainResult.hash,
          txHash: blockchainResult.txHash,
          timestamp: new Date()
        });
        allocation.lastBlockchainHash = blockchainResult.hash;
      }

      await allocation.save();

      console.log(
        `✅ Allocation status updated: ${currentStatus} → ${newStatus}`
      );
      return {
        success: true,
        allocation,
        blockchain: blockchainResult.blockchain
      };
    } catch (error) {
      console.error("❌ Error updating allocation status:", error.message);
      throw error;
    }
  }

  /**
   * Get allocation with blockchain history
   */
  async getAllocation(allocationId) {
    try {
      const allocation = await Allocation.findById(allocationId)
        .populate("organId")
        .populate("requestId")
        .populate("hospitalId")
        .populate("dispatchedBy")
        .populate("completedBy");

      if (!allocation) {
        throw new Error("Allocation not found");
      }

      // Get blockchain record if available
      let blockchainRecord = null;
      if (this.blockchainService.isConfigured) {
        blockchainRecord = await this.blockchainService.getAllocationRecord(allocationId);
      }

      return {
        success: true,
        allocation,
        blockchainRecord
      };
    } catch (error) {
      console.error("❌ Error fetching allocation:", error.message);
      throw error;
    }
  }

  /**
   * Get allocation history
   */
  async getAllocationHistory(allocationId) {
    try {
      const allocation = await Allocation.findById(allocationId);
      if (!allocation) {
        throw new Error("Allocation not found");
      }

      let blockchainHistory = [];
      if (this.blockchainService.isConfigured) {
        blockchainHistory = await this.blockchainService.getAllocationHistory(
          allocationId
        );
      }

      return {
        success: true,
        databaseHistory: allocation.blockchainHistory,
        blockchainHistory
      };
    } catch (error) {
      console.error("❌ Error fetching allocation history:", error.message);
      throw error;
    }
  }

  /**
   * List all allocations with pagination
   */
  async listAllocations(page = 1, limit = 10, filters = {}) {
    try {
      const query = {};

      if (filters.status) {
        query.status = filters.status;
      }

      const total = await Allocation.countDocuments(query);
      const allocations = await Allocation.find(query)
        .populate("organId")
        .populate("requestId")
        .populate("hospitalId")
        .populate("dispatchedBy")
        .populate("completedBy")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return {
        success: true,
        allocations,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error("❌ Error listing allocations:", error.message);
      throw error;
    }
  }
}

module.exports = AllocationService;
