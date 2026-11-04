# Deployment Guide: Digital Diwali

This guide details deployment options for production environments.

---

## 1. Production Architecture Overview

The system consists of two elements:
1. **Frontend Static Bundle:** React SPA compiled into optimized HTML, CSS, and JS (`/dist`). Can be served by Nginx, Vercel, Netlify, Cloudflare Pages, or AWS S3 + CloudFront.
2. **Real-Time Multiplayer Server:** Node.js WebSocket service running on port 3001 (or custom `PORT`). Can be hosted on Railway, Render, Fly.io, or AWS ECS/EC2.

---

## 2. Environment Variables

Create `.env` in the root directory:

```env
# Frontend (Client)
VITE_SERVER_URL=http://localhost:3001

# Backend (Server)
PORT=3001
CORS_ORIGIN=*
```

---

## 3. Build & Run Commands

```bash
# Install all dependencies
npm install

# Run unit & integration test suites
npm test

# Build optimized production bundle
npm run build

# Start the multiplayer real-time server
npm run server

# Preview the built frontend locally
npm run preview
```

---

## 4. Docker Deployment (Optional)

```dockerfile
# Multi-stage Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
EXPOSE 3001
CMD ["node", "--loader", "ts-node/esm", "server/index.ts"]
```

