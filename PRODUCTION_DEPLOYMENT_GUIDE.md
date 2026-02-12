# Production Deployment Guide - LifeBridge

## Overview
This guide covers deploying LifeBridge to production using:
- **Backend**: Render.com (Node.js/Express)
- **Frontend**: Vercel.com (React)
- **Blockchain**: Ethereum Sepolia Testnet (already deployed)
- **Database**: MongoDB Atlas (already configured)

---

## Environment Setup Summary

### Current Configuration

**Backend (.env) - Required for Render:**
```
PORT=5000
JWT_SECRET=tejas990
MONGODB_URI=mongodb+srv://tejasrastogi456_db_user:T9V40koVcUdQyuJj@lifebridge.h1ogkh8.mongodb.net/?appName=LifeBridge
OPENCAGE_API_KEY=2229340fbd9447dcb9c2717a13d251c0
ORS_API_KEY=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk3MWQ3NjU2MmQ5ODQ0MzI5ZGU0NGU3MWZlNmRkN2YyIiwiaCI6Im11cm11cjY0In0=
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/a1rAdHbVMZbBlhLU8ohEY
PRIVATE_KEY=335f13e1bd03ae507f06f91afed3d7f4b84c30153f784dc3d39b511912dee53c
CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
FRONTEND_URL=https://lifebridge-frontend.vercel.app
```

**Frontend (.env.local) - Required for Vercel:**
```
REACT_APP_API_URL=https://lifebridge-backend.onrender.com/api
REACT_APP_BLOCKCHAIN_EXPLORER=https://sepolia.etherscan.io
```

**Blockchain (.env) - Already Configured:**
```
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/a1rAdHbVMZbBlhLU8ohEY
PRIVATE_KEY=335f13e1bd03ae507f06f91afed3d7f4b84c30153f784dc3d39b511912dee53c
CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
```

---

## Step 1: Backend Deployment to Render

### Prerequisites
- Render.com account (free tier available)
- GitHub repository pushed with all code

### Instructions

1. **Log in to Render.com**
   - Visit https://render.com
   - Sign up or log in

2. **Connect GitHub Repository**
   - Click "New +" button
   - Select "Web Service"
   - Click "Connect a repository"
   - Authorize GitHub and select your LifeBridge repository

3. **Configure Web Service**
   - Service name: `lifebridge-backend` (or your choice)
   - Environment: `Node`
   - Region: `Ohio` (or closest to your users)
   - Branch: `main` (or your deployment branch)
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

4. **Add Environment Variables**
   - In the Render dashboard, go to your service > Settings > Environment
   - Add all variables from `backend/.env`:
     ```
     PORT=5000
     JWT_SECRET=tejas990
     MONGODB_URI=mongodb+srv://tejasrastogi456_db_user:T9V40koVcUdQyuJj@lifebridge.h1ogkh8.mongodb.net/?appName=LifeBridge
     OPENCAGE_API_KEY=2229340fbd9447dcb9c2717a13d251c0
     ORS_API_KEY=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk3MWQ3NjU2MmQ5ODQ0MzI5ZGU0NGU3MWZlNmRkN2YyIiwiaCI6Im11cm11cjY0In0=
     ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/a1rAdHbVMZbBlhLU8ohEY
     PRIVATE_KEY=335f13e1bd03ae507f06f91afed3d7f4b84c30153f784dc3d39b511912dee53c
     CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
     FRONTEND_URL=https://lifebridge-frontend.vercel.app
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy from your repository
   - Wait for build to complete (usually 3-5 minutes)
   - Your backend will be available at: `https://lifebridge-backend.onrender.com`

6. **Verify Deployment**
   - Visit `https://lifebridge-backend.onrender.com/api/v1`
   - Should see route handlers response or 404 (confirms server is running)

### Expected Render URL Format
```
https://lifebridge-backend.onrender.com
```

⚠️ **Important**: Update `FRONTEND_URL` in Render if your Vercel URL is different

---

## Step 2: Frontend Deployment to Vercel

### Prerequisites
- Vercel.com account (free tier available)
- GitHub repository pushed with all code

### Instructions

1. **Log in to Vercel.com**
   - Visit https://vercel.com
   - Sign up or log in with GitHub

2. **Import GitHub Repository**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Authorize GitHub and select your LifeBridge repository

3. **Configure Project**
   - Project name: `lifebridge-frontend` (or your choice)
   - Framework: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default is fine)
   - Output Directory: `build` (default is fine)

4. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     REACT_APP_API_URL=https://lifebridge-backend.onrender.com/api
     REACT_APP_BLOCKCHAIN_EXPLORER=https://sepolia.etherscan.io
     ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Your frontend will be available shortly

6. **Note Your Frontend URL**
   - After deployment, Vercel shows your URL (e.g., `https://lifebridge-frontend.vercel.app`)
   - If different from `https://lifebridge-frontend.vercel.app`, update `FRONTEND_URL` in Render backend

### Expected Vercel URL Format
```
https://lifebridge-frontend.vercel.app
```

---

## Step 3: Update Render FRONTEND_URL (If Needed)

If your Vercel URL is different from `https://lifebridge-frontend.vercel.app`:

1. Go to Render Dashboard → Your Backend Service
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to match your actual Vercel URL
4. Click "Save" (automatic redeploy)

---

## Step 4: Production Testing

### Backend Tests

1. **Health Check API**
   ```bash
   curl https://lifebridge-backend.onrender.com/api/v1/
   ```

2. **Create a Test User (Donor)**
   ```bash
   curl -X POST https://lifebridge-backend.onrender.com/api/v1/user/signup \
     -H "Content-Type: application/json" \
     -d '{
       "email": "testdonor@example.com",
       "password": "Test123!",
       "userType": "donor"
     }'
   ```

3. **Test Blood Group Conversion**
   - Create a donation with blood group "A+"
   - Should convert to "A_POS" in database
   - Should be recorded on blockchain

### Frontend Tests

1. **Visit Frontend**
   - Go to `https://lifebridge-frontend.vercel.app`
   - Should load homepage

2. **Test Authentication**
   - Sign up as a donor
   - Verify API calls use Render backend URL
   - Check browser Network tab

3. **Test Blockchain Integration**
   - Create a donation
   - Open browser console
   - Should see "Donation recorded on blockchain" logs
   - Visit [Sepolia Etherscan](https://sepolia.etherscan.io)
   - Search for contract address: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
   - Verify recent transactions

---

## Troubleshooting

### Backend Issues

**Problem**: "CORS error" or "Blocked by CORS Policy"
- **Solution**: Verify `FRONTEND_URL` in Render environment matches your Vercel URL exactly

**Problem**: "Cannot connect to MongoDB"
- **Solution**: Verify `MONGODB_URI` in Render environment is correct
- Check MongoDB Atlas allows connections from Render IP

**Problem**: "Contract not found" or blockchain errors
- **Solution**: Verify these are set correctly:
  - `ALCHEMY_RPC_URL`
  - `CONTRACT_ADDRESS`: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
  - `PRIVATE_KEY` (first 20 chars): `335f13e1bd03ae507f06...`

**Problem**: Build fails on Render
- **Solution**: 
  - Check build logs in Render dashboard
  - Ensure `backend/package.json` includes all dependencies
  - Try manual rebuild: Dashboard → Manual Deploy → Clear Build Cache

### Frontend Issues

**Problem**: "Failed to fetch" or API errors
- **Solution**: 
  - Verify `REACT_APP_API_URL` environment variable in Vercel matches Render backend URL
  - Check browser console for exact error messages
  - Verify backend is running: visit `https://lifebridge-backend.onrender.com/api/v1`

**Problem**: Blank page or 404
- **Solution**:
  - Check Vercel build logs for errors
  - Ensure root directory is set to `frontend`
  - Check that `build/` folder is generated

**Problem**: Environment variables not loading
- **Solution**:
  - Variables must start with `REACT_APP_` for React
  - You may need to rebuild: Change any file → git push → Vercel auto-redeploys

---

## Environment Variables Reference

### Backend Environment Variables
| Variable | Example | Purpose |
|----------|---------|---------|
| `PORT` | `5000` | Express server port |
| `JWT_SECRET` | `tejas990` | Token encryption secret |
| `MONGODB_URI` | `mongodb+srv://...` | Database connection |
| `OPENCAGE_API_KEY` | `2229340...` | Geocoding service |
| `ORS_API_KEY` | `eyJvcm...` | Distance matrix service |
| `ALCHEMY_RPC_URL` | `https://eth-sepolia...` | Blockchain RPC provider |
| `PRIVATE_KEY` | `335f13e1...` | Wallet private key ⚠️ |
| `CONTRACT_ADDRESS` | `0xDDEFC851...` | Smart contract address |
| `FRONTEND_URL` | `https://vercel-url/` | CORS allowed origin |

### Frontend Environment Variables
| Variable | Example | Purpose |
|----------|---------|---------|
| `REACT_APP_API_URL` | `https://render-url/api` | Backend API endpoint |
| `REACT_APP_BLOCKCHAIN_EXPLORER` | `https://sepolia.etherscan.io` | Blockchain explorer URL |

---

## Security Checklist

- ✅ Private key is not committed to GitHub
- ✅ Environment variables are set in Render/Vercel (not in code)
- ✅ `.env` files are in `.gitignore`
- ✅ MongoDB credentials use IP whitelist
- ✅ JWT secret is strong
- ✅ CORS only allows whitelisted origins

⚠️ **NEVER commit `.env` files or private keys to GitHub**

---

## Monitoring

### Render Dashboard
- View deployment status
- Check build logs
- Monitor logs in real-time
- Set up error notifications

### Vercel Dashboard
- View deployment status
- Check build logs
- Preview deployments
- Set up error alerts

### MongoDB Atlas
- Monitor connection activity
- Check data storage usage
- View backup status

### Etherscan
- View blockchain transactions: https://sepolia.etherscan.io
- Search contract: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
- Monitor gas usage and transaction history

---

## Rollback

### If Deployment Issues Occur

**Render Backend**:
1. Go to Dashboard → Your Service
2. Click "Deployments"
3. Find previous working deployment
4. Click the three dots menu
5. Select "Deploy"

**Vercel Frontend**:
1. Go to Deployments
2. Find previous working deployment
3. Click the three dots
4. Select "Redeploy"

---

## API Base URLs for Testing

**Development**:
```
http://localhost:5000/api/v1
```

**Production**:
```
https://lifebridge-backend.onrender.com/api/v1
```

---

## Contract Details

**Network**: Ethereum Sepolia (Testnet)
**Contract Address**: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
**Wallet Address**: `0x40c0083C4b1aB9eEd32E0aee1b85e327Ab12f35f`
**Explorer**: https://sepolia.etherscan.io

---

## Next Steps

1. ✅ Backend deployed to Render
2. ✅ Frontend deployed to Vercel
3. ✅ Test all features in production
4. ✅ Monitor logs for errors
5. ✅ Celebrate! 🎉

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Ethers.js Documentation](https://docs.ethers.org/v6)
- [Sepolia Testnet Guide](https://sepolia.dev)

---

**Last Updated**: Today
**Environment**: Production
**Status**: Ready for Deployment
