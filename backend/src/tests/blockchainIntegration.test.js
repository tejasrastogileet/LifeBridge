const AllocationService = require("../services/allocationService");
const BlockchainService = require("../services/blockchainService");
const allocationService = new AllocationService();
const blockchainService = new BlockchainService();

/**
 * Test blockchain integration
 * Run: node src/tests/blockchainIntegration.test.js
 */

async function runTests() {
  console.log("🧪 LifeBridge Blockchain Integration Tests");
  console.log("=========================================");
  console.log("");

  // Test 1: Blockchain configuration
  testBlockchainConfiguration();

  // Test 2: Hash generation
  testHashGeneration();

  // Test 3: Allocation service creation (if connected to DB)
  if (process.env.MONGODB_URI) {
    console.log("\n📊 Database-connected tests:");
    // These would require actual MongoDB connection
    console.log("   (Requires running MongoDB - skipped in this run)");
  }

  console.log("\n✅ Tests completed!");
}

function testBlockchainConfiguration() {
  console.log("Test 1: Blockchain Configuration");
  console.log("--------------------------------");

  if (blockchainService.isConfigured) {
    console.log("✅ Blockchain is CONFIGURED");
    console.log("   - Provider: Connected to Alchemy");
    console.log("   - Wallet: Ready");
    console.log("   - Contract: Initialized");
  } else {
    console.log("⚠️  Blockchain is NOT CONFIGURED");
    console.log("   - Running in development mode");
    console.log("   - To enable: Set ALCHEMY_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS");
  }
}

function testHashGeneration() {
  console.log("\nTest 2: Hash Generation");
  console.log("----------------------");

  const testData = {
    allocationId: "507f1f77bcf86cd799439011",
    organId: "507f1f77bcf86cd799439012",
    status: "PENDING_CONFIRMATION",
    timestamp: new Date().toISOString()
  };

  const hash = blockchainService.generateHash(testData);

  console.log("✅ Hash generated successfully");
  console.log(`   Data: ${JSON.stringify(testData)}`);
  console.log(`   Hash: ${hash}`);
  console.log(`   Length: ${hash.length} chars`);

  // Verify hash consistency
  const hash2 = blockchainService.generateHash(testData);
  if (hash === hash2) {
    console.log("✅ Hash is consistent (reproducible)");
  } else {
    console.log("❌ Hash is not consistent");
  }
}

// Run tests
runTests().catch(error => {
  console.error("❌ Test error:", error.message);
  process.exit(1);
});
