# LifeBridge

LifeBridge is a full-stack organ donation and transplant coordination platform.

## Architecture
- Frontend: React (Create React App)
- Backend: Node.js + Express + MongoDB

## Project Structure
- `frontend/` React application
- `backend/` API server and business logic

## Local Development

### Backend
1. Go to `backend`
2. Install dependencies: `npm install`
3. Run server: `npm start`

### Frontend
1. Go to `frontend`
2. Install dependencies: `npm install`
3. Run app: `npm start`

## Docker

From project root:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## CI/CD

GitHub Actions workflows:
- `.github/workflows/ci.yml` runs backend checks and frontend build
- `.github/workflows/cd.yml` triggers deploy hooks after successful CI on `main`

Required GitHub repository secrets:
- `RENDER_DEPLOY_HOOK`
- `VERCEL_DEPLOY_HOOK`

## Environment Variables

Backend example (`backend/.env`):

```env
PORT=5000
JWT_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:3000
```

Frontend example (`frontend/.env.production`):

```env
REACT_APP_API_URL=https://your-backend-url/api/v1
```
