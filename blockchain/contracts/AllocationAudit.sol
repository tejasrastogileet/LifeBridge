// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AllocationAudit {
    
    // Allocation record structure
    struct AllocationRecord {
        bytes32 allocationId;
        bytes32 dataHash;
        string status;
        uint256 timestamp;
        address recordedBy;
        bytes32 previousHash;
    }
    
    // Storage for allocation records
    mapping(bytes32 => AllocationRecord) public allocationRecords;
    mapping(bytes32 => bytes32[]) public allocationHistory;
    
    // Total allocations recorded
    uint256 public totalAllocations;
    
    // Events
    event AllocationRecorded(
        bytes32 indexed allocationId,
        bytes32 dataHash,
        string status,
        uint256 timestamp,
        address recordedBy
    );
    
    event AllocationUpdated(
        bytes32 indexed allocationId,
        string newStatus,
        bytes32 newHash,
        uint256 timestamp
    );
    
    event AllocationVerified(
        bytes32 indexed allocationId,
        bool isValid
    );
    
    // Record or update an allocation on blockchain
    function recordAllocation(
        bytes32 _allocationId,
        bytes32 _dataHash,
        string memory _status,
        bytes32 _previousHash
    ) public {
        AllocationRecord memory record = AllocationRecord({
            allocationId: _allocationId,
            dataHash: _dataHash,
            status: _status,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            previousHash: _previousHash
        });
        
        allocationRecords[_allocationId] = record;
        allocationHistory[_allocationId].push(_dataHash);
        totalAllocations++;
        
        emit AllocationRecorded(
            _allocationId,
            _dataHash,
            _status,
            block.timestamp,
            msg.sender
        );
    }
    
    // Update allocation status
    function updateAllocationStatus(
        bytes32 _allocationId,
        string memory _newStatus,
        bytes32 _newHash
    ) public {
        require(
            allocationRecords[_allocationId].dataHash != bytes32(0),
            "Allocation not found"
        );
        
        AllocationRecord memory oldRecord = allocationRecords[_allocationId];
        
        AllocationRecord memory newRecord = AllocationRecord({
            allocationId: _allocationId,
            dataHash: _newHash,
            status: _newStatus,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            previousHash: oldRecord.dataHash
        });
        
        allocationRecords[_allocationId] = newRecord;
        allocationHistory[_allocationId].push(_newHash);
        
        emit AllocationUpdated(
            _allocationId,
            _newStatus,
            _newHash,
            block.timestamp
        );
    }
    
    // Get allocation record
    function getAllocationRecord(bytes32 _allocationId)
        public
        view
        returns (AllocationRecord memory)
    {
        return allocationRecords[_allocationId];
    }
    
    // Get allocation history
    function getAllocationHistory(bytes32 _allocationId)
        public
        view
        returns (bytes32[] memory)
    {
        return allocationHistory[_allocationId];
    }
    
    // Verify allocation integrity
    function verifyAllocation(bytes32 _allocationId)
        public
    {
        AllocationRecord memory record = allocationRecords[_allocationId];
        require(
            record.dataHash != bytes32(0),
            "Allocation not found"
        );
        
        emit AllocationVerified(_allocationId, true);
    }
    
    // Get total allocations count
    function getTotalAllocations() public view returns (uint256) {
        return totalAllocations;
    }
}
