#!/bin/bash

# LifeBridge Blockchain Deployment Helper
# This script helps with deploying and testing the blockchain integration

set -e

echo "🔗 LifeBridge Blockchain Setup Helper"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
  echo -e "${BLUE}➜${NC} $1"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_step "Checking prerequisites..."

if ! command_exists node; then
  print_error "Node.js is not installed"
  exit 1
fi
print_success "Node.js found: $(node -v)"

if ! command_exists npm; then
  print_error "npm is not installed"
  exit 1
fi
print_success "npm found: $(npm -v)"

# Check .env file in backend
print_step "Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
  print_error "backend/.env file not found"
  exit 1
fi

if grep -q "ALCHEMY_RPC_URL=" backend/.env && [ -z "$(grep '^ALCHEMY_RPC_URL=' backend/.env | cut -d= -f2)" ]; then
  print_warning "ALCHEMY_RPC_URL is not configured in backend/.env"
fi

print_success "Environment file exists"

# Menu
show_menu() {
  echo ""
  echo "What would you like to do?"
  echo "1. Install blockchain dependencies"
  echo "2. Deploy smart contract to Sepolia"
  echo "3. Display deployment instructions"
  echo "4. Check blockchain configuration"
  echo "5. Start backend with blockchain"
  echo "6. Generate sample test data"
  echo "7. Display contract ABI"
  echo "8. Exit"
  echo ""
  read -p "Enter your choice (1-8): " choice
}

# Option 1: Install dependencies
install_dependencies() {
  print_step "Installing blockchain dependencies..."
  cd blockchain
  npm install
  cd ..
  print_success "Dependencies installed"
}

# Option 2: Deploy contract
deploy_contract() {
  print_step "Preparing to deploy smart contract..."
  
  if [ ! -f "blockchain/.env" ]; then
    print_step "Copying .env to blockchain directory..."
    cp backend/.env blockchain/.env
  fi

  cd blockchain
  
  if ! grep -q "ALCHEMY_RPC_URL=https" .env 2>/dev/null || ! grep -q "PRIVATE_KEY=0x" .env 2>/dev/null; then
    print_error "Blockchain environment variables not configured"
    echo ""
    echo "Please configure:"
    echo "  ALCHEMY_RPC_URL - Your Alchemy RPC URL for Sepolia"
    echo "  PRIVATE_KEY - Your wallet's private key"
    echo ""
    echo "Then run this script again"
    cd ..
    return 1
  fi

  print_step "Deploying contract to Sepolia..."
  npx hardhat run scripts/deploy.js --network sepolia
  
  print_success "Contract deployed!"
  print_warning "Please copy the contract address and add to backend/.env as CONTRACT_ADDRESS"
  
  cd ..
}

# Option 3: Display instructions
display_instructions() {
  echo ""
  echo -e "${BLUE}📚 Blockchain Setup Instructions${NC}"
  echo "================================"
  echo ""
  echo "1. Get Alchemy API Key:"
  echo "   - Visit https://www.alchemy.com"
  echo "   - Create a new app on Sepolia network"
  echo "   - Copy the RPC URL"
  echo ""
  echo "2. Get Private Key:"
  echo "   - Export from MetaMask or hardware wallet"
  echo "   - Format: 0x... (including 0x prefix)"
  echo ""
  echo "3. Update backend/.env:"
  echo "   ALCHEMY_RPC_URL=your_rpc_url"
  echo "   PRIVATE_KEY=your_private_key"
  echo ""
  echo "4. Get Sepolia ETH:"
  echo "   - Visit https://sepoliafaucet.com"
  echo "   - Paste your wallet address"
  echo "   - Wait for ETH to appear"
  echo ""
  echo "5. Deploy contract (choose option 2)"
  echo ""
  echo "6. Copy deployed contract address to backend/.env:"
  echo "   CONTRACT_ADDRESS=0x..."
  echo ""
  echo "7. Start backend (choose option 5)"
  echo ""
}

# Option 4: Check configuration
check_configuration() {
  echo ""
  echo -e "${BLUE}🔍 Blockchain Configuration Status${NC}"
  echo "======================================"
  echo ""
  
  if grep -q "ALCHEMY_RPC_URL=https" backend/.env; then
    print_success "ALCHEMY_RPC_URL is configured"
  else
    print_error "ALCHEMY_RPC_URL is not configured"
  fi

  if grep -q "PRIVATE_KEY=0x" backend/.env; then
    KEY=$(grep "PRIVATE_KEY=" backend/.env | cut -d= -f2)
    print_success "PRIVATE_KEY is configured (${KEY:0:15}...)"
  else
    print_error "PRIVATE_KEY is not configured"
  fi

  if grep -q "CONTRACT_ADDRESS=0x" backend/.env; then
    ADDR=$(grep "CONTRACT_ADDRESS=" backend/.env | cut -d= -f2)
    print_success "CONTRACT_ADDRESS is configured ($ADDR)"
  else
    print_warning "CONTRACT_ADDRESS is not configured yet (deploy contract first)"
  fi

  echo ""
}

# Option 5: Start backend
start_backend() {
  print_step "Starting backend with blockchain..."
  cd backend
  npm start
}

# Option 6: Generate test data
generate_test_data() {
  echo ""
  echo -e "${BLUE}📝 Sample Test Data${NC}"
  echo "==================="
  echo ""
  echo "Sample Allocation Creation Request:"
  echo ""
  echo "curl -X POST http://localhost:5000/api/v1/allocations \\"
  echo "  -H 'Content-Type: application/json' \\"
  echo "  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \\"
  echo "  -d '{"
  echo "    \"organId\": \"507f1f77bcf86cd799439011\","
  echo "    \"requestId\": \"507f1f77bcf86cd799439012\","
  echo "    \"hospitalId\": \"507f1f77bcf86cd799439013\","
  echo "    \"matchScore\": 92.5"
  echo "  }'"
  echo ""
}

# Option 7: Display ABI
display_abi() {
  echo ""
  echo -e "${BLUE}📋 Smart Contract ABI${NC}"
  echo "====================="
  echo ""
  cat << 'EOF'
[
  {
    "type": "event",
    "name": "AllocationRecorded",
    "inputs": [
      { "name": "allocationId", "type": "bytes32", "indexed": true },
      { "name": "dataHash", "type": "bytes32" },
      { "name": "status", "type": "string" },
      { "name": "timestamp", "type": "uint256" },
      { "name": "recordedBy", "type": "address" }
    ]
  },
  {
    "type": "function",
    "name": "recordAllocation",
    "inputs": [
      { "name": "_allocationId", "type": "bytes32" },
      { "name": "_dataHash", "type": "bytes32" },
      { "name": "_status", "type": "string" },
      { "name": "_previousHash", "type": "bytes32" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "updateAllocationStatus",
    "inputs": [
      { "name": "_allocationId", "type": "bytes32" },
      { "name": "_newStatus", "type": "string" },
      { "name": "_newHash", "type": "bytes32" }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "getAllocationRecord",
    "inputs": [{ "name": "_allocationId", "type": "bytes32" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "allocationId", "type": "bytes32" },
          { "name": "dataHash", "type": "bytes32" },
          { "name": "status", "type": "string" },
          { "name": "timestamp", "type": "uint256" },
          { "name": "recordedBy", "type": "address" },
          { "name": "previousHash", "type": "bytes32" }
        ]
      }
    ]
  }
]
EOF
  echo ""
}

# Main loop
while true; do
  show_menu
  
  case $choice in
    1)
      install_dependencies
      ;;
    2)
      if deploy_contract; then
        print_success "Deployment successful!"
      else
        print_error "Deployment failed"
      fi
      ;;
    3)
      display_instructions
      ;;
    4)
      check_configuration
      ;;
    5)
      start_backend
      ;;
    6)
      generate_test_data
      ;;
    7)
      display_abi
      ;;
    8)
      print_success "Goodbye!"
      exit 0
      ;;
    *)
      print_error "Invalid choice"
      ;;
  esac
done
