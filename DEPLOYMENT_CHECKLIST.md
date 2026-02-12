# LifeBridge Production Deployment Checklist

## Pre-Deployment ✅

- [ ] All code is committed to GitHub
- [ ] `.env` files are NOT committed (check `.gitignore`)
- [ ] Backend `package.json` has all dependencies
- [ ] Frontend `package.json` has all dependencies
- [ ] Tested locally: `npm start` (frontend) and `npm start` (backend) work
- [ ] Read `PRODUCTION_DEPLOYMENT_GUIDE.md`

---

## Backend Deployment to Render

### Create Render Account
- [ ] Visit https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize GitHub access

### Deploy Backend
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Set service name: `lifebridge-backend`
- [ ] Set environment: `Node`
- [ ] Set build command: `cd backend && npm install`
- [ ] Set start command: `cd backend && npm start`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)

### Configure Environment Variables
Go to Settings → Environment Variables and add:
- [ ] `PORT=5000`
- [ ] `JWT_SECRET=tejas990`
- [ ] `MONGODB_URI=mongodb+srv://tejasrastogi456_db_user:T9V40koVcUdQyuJj@lifebridge.h1ogkh8.mongodb.net/?appName=LifeBridge`
- [ ] `OPENCAGE_API_KEY=2229340fbd9447dcb9c2717a13d251c0`
- [ ] `ORS_API_KEY=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk3MWQ3NjU2MmQ5ODQ0MzI5ZGU0NGU3MWZlNmRkN2YyIiwiaCI6Im11cm11cjY0In0=`
- [ ] `ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/a1rAdHbVMZbBlhLU8ohEY`
- [ ] `PRIVATE_KEY=335f13e1bd03ae507f06f91afed3d7f4b84c30153f784dc3d39b511912dee53c`
- [ ] `CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
- [ ] `FRONTEND_URL=https://lifebridge-frontend.vercel.app`

### Verify Backend
- [ ] Deployment shows "Live" status
- [ ] Copy backend URL (e.g., `https://lifebridge-backend.onrender.com`)
- [ ] Test: Visit `https://lifebridge-backend.onrender.com/api/v1`
- [ ] Should see response or 404 (backend is running)

---

## Frontend Deployment to Vercel

### Create Vercel Account
- [ ] Visit https://vercel.com
- [ ] Sign up with GitHub
- [ ] Authorize GitHub access

### Deploy Frontend
- [ ] Click "Add New..." → "Project"
- [ ] Import your GitHub repository
- [ ] Select `lifebridge` repository
- [ ] Set project name: `lifebridge-frontend`
- [ ] Set root directory: `frontend`
- [ ] Leave build settings as default
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)

### Configure Environment Variables
Go to Settings → Environment Variables and add:
- [ ] `REACT_APP_API_URL=https://lifebridge-backend.onrender.com/api`
- [ ] `REACT_APP_BLOCKCHAIN_EXPLORER=https://sepolia.etherscan.io`

### Redeploy After Environment Variables
- [ ] Go to Deployments
- [ ] Click the latest deployment
- [ ] Click three dots menu
- [ ] Select "Redeploy"
- [ ] Wait for redeploy to complete

### Verify Frontend
- [ ] Deployment shows "Ready" status
- [ ] Copy frontend URL (e.g., `https://lifebridge-frontend.vercel.app`)
- [ ] Visit the frontend URL in browser
- [ ] Should see LifeBridge homepage
- [ ] Check browser console for any errors

---

## Update Render CORS (If Needed)

If your Vercel URL is different from `https://lifebridge-frontend.vercel.app`:
- [ ] Go to Render Dashboard
- [ ] Go to Backend Service
- [ ] Go to Settings → Environment Variables
- [ ] Update `FRONTEND_URL` to your actual Vercel URL
- [ ] Save (automatic redeploy)

---

## Post-Deployment Testing

### Backend Health Check
- [ ] curl `https://lifebridge-backend.onrender.com/api/v1/`
- [ ] Should return response (not 404)

### Frontend Loading
- [ ] Visit `https://lifebridge-frontend.vercel.app`
- [ ] Page loads without errors
- [ ] Check DevTools console (F12) for errors

### User Signup Test
- [ ] Sign up as a donor on frontend
- [ ] Check backend logs in Render
- [ ] Should see successful registration
- [ ] Verify user in MongoDB Atlas

### Blood Group Conversion Test
- [ ] Create a donation with blood group "A+"
- [ ] Backend should convert to "A_POS"
- [ ] Blockchain should record allocation
- [ ] Check Etherscan: https://sepolia.etherscan.io

### Blockchain Transaction Test
- [ ] Create an allocation
- [ ] Check browser console for blockchain message
- [ ] Visit Etherscan with contract: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
- [ ] Should see recent transaction

---

## Troubleshooting

### Backend Won't Start
- [ ] Check Render logs: Dashboard → Logs (bottom)
- [ ] Verify all environment variables are set
- [ ] Ensure `MONGODB_URI` is correct
- [ ] Try manual rebuild in Render

### Frontend Won't Load
- [ ] Check Vercel logs: Deployments → Click latest
- [ ] Verify `REACT_APP_API_URL` is set
- [ ] Check Network tab in DevTools for failed requests

### CORS Errors
- [ ] Verify `FRONTEND_URL` in Render matches Vercel URL exactly
- [ ] Verify `REACT_APP_API_URL` in Vercel matches Render URL exactly

### Blockchain Not Recording
- [ ] Verify `CONTRACT_ADDRESS` is: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
- [ ] Verify `ALCHEMY_RPC_URL` is correct
- [ ] Check backend logs for blockchain errors

---

## Monitoring

### Check Backend Status
- [ ] Render Dashboard → Your service
- [ ] Should show "Live" in green
- [ ] Check "Logs" for any errors

### Check Frontend Status
- [ ] Vercel Dashboard → Your project
- [ ] Should show "Ready" in blue
- [ ] Check "Deployments" for recent activity

### Monitor Database
- [ ] MongoDB Atlas Console
- [ ] Verify data is being written
- [ ] Check connection activity

### Monitor Blockchain
- [ ] Etherscan: https://sepolia.etherscan.io
- [ ] Search contract: `0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349`
- [ ] Verify recent transactions

---

## Success Indicators ✅

When deployment is complete and working:
- [ ] Frontend loads without errors
- [ ] User can sign up and log in
- [ ] API calls go to Render backend (DevTools → Network)
- [ ] Donations can be created
- [ ] Blood group "A+" converts to "A_POS" in database
- [ ] Blockchain records allocations
- [ ] Etherscan shows contract interactions
- [ ] No CORS errors in browser console
- [ ] No database connectivity errors in backend logs

---

## URLs to Bookmark

**Frontend**: https://lifebridge-frontend.vercel.app
**Backend API**: https://lifebridge-backend.onrender.com/api/v1
**Dashboard (Render)**: https://dashboard.render.com
**Dashboard (Vercel)**: https://vercel.com/dashboard
**MongoDB Atlas**: https://cloud.mongodb.com
**Etherscan Contract**: https://sepolia.etherscan.io/address/0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349

---

## Environment Variables Summary

```
# Backend (Render)
PORT=5000
JWT_SECRET=tejas990
MONGODB_URI=mongodb+srv://tejasrastogi456_db_user:T9V40koVcUdQyuJj@lifebridge.h1ogkh8.mongodb.net/?appName=LifeBridge
OPENCAGE_API_KEY=2229340fbd9447dcb9c2717a13d251c0
ORS_API_KEY=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk3MWQ3NjU2MmQ5ODQ0MzI5ZGU0NGU3MWZlNmRkN2YyIiwiaCI6Im11cm11cjY0In0=
ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/a1rAdHbVMZbBlhLU8ohEY
PRIVATE_KEY=335f13e1bd03ae507f06f91afed3d7f4b84c30153f784dc3d39b511912dee53c
CONTRACT_ADDRESS=0xDDEFC851308878427Cd8Df8f896D25FfA3dA6349
FRONTEND_URL=https://lifebridge-frontend.vercel.app

# Frontend (Vercel)
REACT_APP_API_URL=https://lifebridge-backend.onrender.com/api
REACT_APP_BLOCKCHAIN_EXPLORER=https://sepolia.etherscan.io
```

---

## Final Checklist

- [ ] Render shows "Live" status
- [ ] Vercel shows "Ready" status
- [ ] Frontend URL works in browser
- [ ] Backend health check passes
- [ ] User signup works
- [ ] Blockchain integration works
- [ ] No errors in console or logs
- [ ] Everything is backed up
- [ ] `.env` files are NOT in git
- [ ] Ready to show recruiters! 🚀

---

**Time to complete**: ~15-20 minutes
**Difficulty**: Easy
**Risk**: Low

**Questions?** Check `PRODUCTION_DEPLOYMENT_GUIDE.md` for detailed instructions.
