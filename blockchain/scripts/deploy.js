const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying AllocationAudit Contract...");
  console.log("");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`📝 Deploying with account: ${deployer.address}`);

  // Get account balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`💰 Account balance: ${hre.ethers.formatEther(balance)} ETH`);
  console.log("");

  // Deploy contract
  const Contract = await hre.ethers.getContractFactory("AllocationAudit");
  console.log("📦 Compiling contract...");
  
  const contract = await Contract.deploy();
  console.log("⏳ Waiting for deployment...");
  
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("");
  console.log("✅ Contract deployed successfully!");
  console.log("");
  console.log("📋 Deployment Details:");
  console.log(`   Contract Address: ${contractAddress}`);
  console.log(`   Deployer Address: ${deployer.address}`);
  console.log("");
  console.log("📝 Next steps:");
  console.log(`   1. Add to backend/.env:`);
  console.log(`      CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`   2. Verify on Sepolia Etherscan:`);
  console.log(`      https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("");
}

main().catch((error) => {
  console.error("❌ Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});
