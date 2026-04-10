# Bank Project Documentation (Basic English)

This document explains your full project from installation to deployment.
It is written in simple language.

---

## 1) Project Overview

This project is a **full-stack fashion e-commerce app**.

- **Frontend**: React + Vite (`client/moon-client`)
- **Backend**: Node.js + Express + MongoDB (`server`)
- **Payment**: Razorpay Sandbox (test mode)
- **Auth**: JWT token (login/register/profile APIs)
- **Hosting**: GitHub Pages for frontend

Main user flow:

1. User registers
2. User logs in
3. User views products and adds to cart
4. User opens checkout (address page)
5. User pays (UPI/Net Banking via Razorpay) or chooses COD
6. After successful payment/COD confirm, order is saved
7. User sees order tracking and My Orders

---

## 2) Folder Structure

```text
ec/
  client/
    moon-client/          # React frontend
  server/                 # Express backend
  .github/workflows/      # GitHub Actions deployment workflow
```

---

## 3) Prerequisites

Install these first:

- Node.js (recommended LTS)
- npm
- MongoDB Atlas account (or local MongoDB)
- Razorpay account (Test mode keys)
- Git

---

## 4) Installation Steps

### 4.1 Clone and open project

```bash
git clone <your-repo-url>
cd ec
```

### 4.2 Install backend packages

```bash
cd server
npm install
```

### 4.3 Install frontend packages

```bash
cd ../client/moon-client
npm install
```

---

## 5) Environment Setup (Important)

Create file: `server/.env`

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
```

Why each variable is used:

- `PORT`: backend server port
- `MONGO_URI`: where user data is saved
- `JWT_SECRET`: signs/verifies login tokens
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`: create Razorpay test orders securely on backend

Optional on the server (CORS):

- `CORS_ORIGINS`: comma-separated list of allowed browser origins. If empty, defaults include `http://localhost:5173` and `https://subha29042000.github.io`.

### 5.1 Why GitHub Pages cannot use `localhost`

The live site is opened from `https://subha29042000.github.io`. The browser runs on each visitor’s computer. It **cannot** call `http://localhost:5000` on your laptop.

So for the live website you must:

1. **Deploy the backend** to a public URL (for example Render, Railway, Fly.io).
2. Tell the frontend that URL at **build time** using `VITE_API_URL`.

Copy `client/moon-client/.env.example` to `client/moon-client/.env` for local builds, or set a GitHub Actions secret (see section 13).

---

## 6) Run Project Locally

Open 2 terminals.

### Terminal 1 (backend)

```bash
cd server
npm run dev
```

### Terminal 2 (frontend)

```bash
cd client/moon-client
npm run dev
```

Open browser:

- Local app: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 7) Backend Flow (Step by Step)

Backend entry file: `server/server.js`

What happens:

1. Loads environment variables
2. Creates Express app
3. Adds middleware:
   - `cors(...)` -> allows local Vite and GitHub Pages origins (override with `CORS_ORIGINS`)
   - `express.json()` -> reads JSON request body
4. Connects MongoDB
5. Mounts routes:
   - `/api/auth` -> auth routes
   - `/api/payment` -> payment routes
6. Starts server

---

## 8) Frontend Flow (Step by Step)

Frontend entry routing: `client/moon-client/src/App.jsx`

Routes:

- `/` -> Register
- `/login` -> Login
- `/home` -> Product listing + cart
- `/address` -> Shipping + payment
- `/order-track` -> Payment success status
- `/profile` -> View/update/delete account
- `/my-orders` -> User order history

Important:

- Token and user info are stored in `localStorage`
- Protected pages fetch profile with `Authorization: Bearer <token>`

---

## 9) API Documentation (Methods + Where Used)

Base URL: `http://localhost:5000`

### 9.1 Auth APIs

#### `POST /api/auth/register`

- Used in: `Register.jsx`
- Purpose: create new user
- Body:

```json
{
  "username": "john",
  "email": "john@mail.com",
  "password": "john123"
}
```

#### `POST /api/auth/login`

- Used in: `Login.jsx`
- Purpose: login user and return JWT token
- Body:

```json
{
  "email": "john@mail.com",
  "password": "john123"
}
```

- Response includes:
  - `token`
  - `user` object

#### `POST /api/auth/logout`

- Used in: `Home.jsx`
- Purpose: logout confirmation endpoint (token-protected)
- Note: JWT is stateless, frontend also clears localStorage

#### `GET /api/auth/me`

- Used in: `Home.jsx`, `Profile.jsx`
- Purpose: fetch current logged-in user profile
- Header needed:
  - `Authorization: Bearer <token>`

#### `PUT /api/auth/me`

- Used in: `Profile.jsx`
- Purpose: update username/email/password

#### `DELETE /api/auth/me`

- Used in: `Profile.jsx`
- Purpose: permanently delete user account

---

### 9.2 Payment API

#### `POST /api/payment/create-order`

- Used in: `Address.jsx`
- Purpose: create Razorpay order on backend (secure)
- Body:

```json
{
  "amount": 1499
}
```

- Backend converts to paise and returns:
  - Razorpay order id
  - amount
  - currency
  - public key id (`RAZORPAY_KEY_ID`)

Why backend creates order:

- Secret key must never be exposed in frontend
- Backend validates amount and creates valid Razorpay order

---

## 10) Razorpay Sandbox Connection (Most Important)

### 10.1 Get test keys

1. Login to Razorpay dashboard
2. Switch to **Test Mode**
3. Copy:
   - Key ID
   - Key Secret
4. Put these in `server/.env`

### 10.2 How payment works in your project

File: `Address.jsx`

1. Frontend calls `POST /api/payment/create-order`
2. Backend returns Razorpay order data
3. Frontend opens Razorpay Checkout popup
4. If payment success:
   - handler receives `razorpay_payment_id`
   - order is saved in localStorage
   - user moves to tracking page
5. If user cancels/fails:
   - no order is created
   - user gets cancel/fail message

### 10.3 Recent bug fix included

You had issue: order created even on cancel.

Now fixed:

- order save happens only with valid successful payment id
- cancel/fail path explicitly does not save order

---

## 11) Where GET/POST/PUT/DELETE Are Used

### GET

- `GET /api/auth/me` -> read user profile

### POST

- `POST /api/auth/register` -> create user
- `POST /api/auth/login` -> login
- `POST /api/auth/logout` -> logout confirmation
- `POST /api/payment/create-order` -> create Razorpay order

### PUT

- `PUT /api/auth/me` -> update profile

### DELETE

- `DELETE /api/auth/me` -> delete account

---

## 12) Security Notes

- Passwords are hashed using bcrypt on backend
- JWT token is verified by auth middleware
- Razorpay secret key stays only in backend `.env`
- Never commit `.env` file to GitHub

---

## 13) GitHub Pages Deployment (Bank Repo)

Repo: `Subha29042000/Bank`

Website URL:

- `https://subha29042000.github.io/Bank/`

Project settings already use Vite base path:

- `base: '/Bank/'` in `vite.config.js`

Workflow file:

- `.github/workflows/deploy-pages.yml`

### 13.1 Live site: set `VITE_API_URL` (required for login/register)

1. Deploy `server/` somewhere public. Note the base URL (example: `https://moon-api.onrender.com`).
2. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `VITE_API_URL`
   - Value: your API base URL **with no trailing slash** (example: `https://moon-api.onrender.com`)
3. Push to `main` or **re-run** the “Deploy React app to Pages” workflow.

The build reads `VITE_API_URL` and bakes it into the static files. Without this secret, register/login on the live site will not work.

If deployment fails:

1. `Settings -> Pages` -> Source = GitHub Actions
2. `Settings -> Actions -> General` -> Workflow permissions = Read and write
3. Re-run workflow

---

## 14) Quick Testing Checklist

1. Register new account
2. Login
3. Add products to cart
4. Go to checkout
5. Try cancel payment -> verify no new order in My Orders
6. Try successful test payment -> verify order appears
7. Try COD -> verify order appears
8. Open profile -> update profile -> check saved values
9. Open website deployment link

---

## 15) Common Errors and Fix

### "MongoDB connection error"

- Check `MONGO_URI` in `server/.env`

### "Invalid or expired token"

- Login again to get fresh JWT token

### "Razorpay is not configured on server"

- Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`
- Restart backend server

### GitHub Pages 404

- Ensure Pages uses GitHub Actions
- Ensure workflow deploy succeeded
- Verify URL includes repo name: `/Bank/`

### Live site: “Error registering” / login does not go to Home

- The API is not reachable from the browser. Set the `VITE_API_URL` GitHub secret and redeploy (section 13.1).
- Ensure the deployed backend has the same `MONGO_URI`, `JWT_SECRET`, and Razorpay keys as your local `.env`.

---

## 16) Useful Commands

Frontend:

```bash
cd client/moon-client
npm run dev
npm run lint
npm run build
```

Backend:

```bash
cd server
npm run dev
npm start
```

---

## 17) Final Note

If you want, next I can also create:

- API request/response examples in Postman format
- `.env.example` file
- Sequence diagram (frontend <-> backend <-> Razorpay)

