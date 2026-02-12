const Allocation = require("../models/Allocation");
const RequestedOrgan = require("../models/RequestedOrgan");
const User = require("../models/User");
const DonorRepository = require("../repository/donorRepo");
const requestOrgan = require("../repository/doctorRepo");
const userRepository = require("../repository/userRepo");
const Notification = require("../models/Notification");
const DonatedOrgan = require("../models/DonatedOrgan");
const GeocodingService = require("./geocodingService");
const BlockchainService = require("./blockchainService");

class DonorService {

  constructor() {
    this.userRepository = new userRepository();
    this.DonorRepository = new DonorRepository();
    this.requestOrganRepo = new requestOrgan();
    this.geocodingService = new GeocodingService();
    this.blockchainService = new BlockchainService();
  }

  /**
   * Convert blood group from standard format (A+, B-, etc) to enum format (A_POS, B_NEG, etc)
   */
  convertBloodGroup(bloodGroup) {
    if (!bloodGroup) return bloodGroup;
    
    const mapping = {
      'A+': 'A_POS',
      'A-': 'A_NEG',
      'B+': 'B_POS',
      'B-': 'B_NEG',
      'AB+': 'AB_POS',
      'AB-': 'AB_NEG',
      'O+': 'O_POS',
      'O-': 'O_NEG'
    };
    
    return mapping[bloodGroup] || bloodGroup;
  }

  async createDonation(data) {
    const donor = await User.findById(data.donorId);
    if (!donor) throw new Error("Donor not found");

    // Convert blood group to enum format
    data.bloodGroup = this.convertBloodGroup(data.bloodGroup);
    
    // Use donor's address if not provided
    data.address = data.address || donor.address || "Not provided";
    data.location = donor.location;
    data.phoneNumber = donor.phoneNumber;

    return await this.DonorRepository.createDonation(data);
  }

  async confirmDonation(donatedOrganId, donorId, consentType) {
    try {
      return await this.DonorRepository.confirmDonation(
        donatedOrganId,
        donorId,
        consentType
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllRequests(data) {
    try {
      return await this.DonorRepository.findAllRequests(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async confirmAllocation(organId) {
    const organ = await DonatedOrgan.findById(organId);
    if (!organ) throw new Error("Organ not found");

    const allocation = await Allocation.findById(organ.allocationId);
    if (!allocation) throw new Error("Allocation not found");

    const request = await RequestedOrgan.findById(allocation.requestId);

    allocation.status = "MATCHED";
    organ.status = "ALLOCATED";

    await organ.save();

    const timestamp = Date.now();

    const hash = this.blockchainService.generateHash({
      allocationId: allocation._id.toString(),
      status: "MATCHED",
      previousHash: allocation.lastBlockchainHash,
      timestamp
    });

    const txHash =
      await this.blockchainService.storeHash(hash);

    allocation.lastBlockchainHash = hash;

    allocation.blockchainHistory.push({
      status: "MATCHED",
      hash,
      txHash,
      timestamp: new Date(timestamp)
    });

    await allocation.save();
    if (request) {
      await Notification.create({
        userId: request.doctorId,
        message: "Donor confirmed transplant request.",
        allocationId: allocation._id
      });
    }
    return allocation;
  }

  async rejectAllocation(allocationId) {

    const allocation = await Allocation.findById(allocationId);
    if (!allocation) throw new Error("Allocation not found");

    const organ = await DonatedOrgan.findById(allocation.organId);
    const request = await RequestedOrgan.findById(allocation.requestId);

    allocation.status = "REJECTED";
    organ.status = "AVAILABLE";
    request.status = "WAITING";
    request.allocationId = null;

    await allocation.save();
    await organ.save();
    await request.save();

    await Notification.create({
      userId: request.createdByDoctorId,
      message:
        "Donor has REJECTED the transplant request. Organ returned to pool.",
      allocationId: allocation._id
    });

    return allocation;
  }

  async findAll(donorId) {
    try {
      return await this.DonorRepository.findAll(donorId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async acceptOrganById({ organId, donorId }) {
  try {
    const requestId = organId;
    console.log("requestid : ",requestId,"\n")
    const donation = await this.DonorRepository.findByOrganId(requestId);

    if (!donation) throw new Error("Donation not found");

    donation.status = "MATCHED";
    donation.donorId = donorId;

    const allocation = await Allocation.create({
          requestId,
          hospitalId: donation.hospitalId,
          matchScore: 100,
          status: "MATCHED"
        });
        
        donation.allocationId = allocation._id;
        donation.status = "MATCHED";

        console.log(donation);
        console.log(allocation);

    await donation.save();

    return donation;

  } catch (error) {
    throw error;
  }
}

}

module.exports = DonorService;
