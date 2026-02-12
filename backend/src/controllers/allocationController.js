const AllocationVerificationService =
  require("../services/allocationVerificationService");
const AllocationService = require("../services/allocationService");

const verificationService =
  new AllocationVerificationService();
const allocationService = new AllocationService();

const createAllocation = async (req, res) => {
  try {
    const allocationData = {
      organId: req.body.organId,
      requestId: req.body.requestId,
      hospitalId: req.body.hospitalId,
      matchScore: req.body.matchScore,
      dispatchedBy: req.user?.id
    };

    const result = await allocationService.createAllocation(allocationData);

    return res.status(201).json({
      success: true,
      data: result.allocation,
      blockchainRecorded: result.blockchain
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateAllocationStatus = async (req, res) => {
  try {
    const { newStatus } = req.body;
    const allocationId = req.params.id;

    const result = await allocationService.updateAllocationStatus(
      allocationId,
      newStatus,
      req.user?.id
    );

    return res.json({
      success: true,
      data: result.allocation,
      blockchainUpdated: result.blockchain
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllocation = async (req, res) => {
  try {
    const result = await allocationService.getAllocation(req.params.id);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllocationHistory = async (req, res) => {
  try {
    const result = await allocationService.getAllocationHistory(req.params.id);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const listAllocations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
      status: req.query.status
    };

    const result = await allocationService.listAllocations(page, limit, filters);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyAllocation = async (req, res) => {
  try {
    const result = await verificationService.verifyAllocation(
      req.params.id
    );

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAllocation,
  updateAllocationStatus,
  getAllocation,
  getAllocationHistory,
  listAllocations,
  verifyAllocation
};
