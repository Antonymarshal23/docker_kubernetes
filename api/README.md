Great — let me give you a fully working minimal setup (React + Express + Cookies with login), designed for:

✅ Two different devices (e.g., your laptop + your friend's laptop on LAN)

✅ Using HTTP, not HTTPS

✅ Cookie-based auth with res.cookie()

✅ Fixes all the usual cross-origin + cookie pitfalls

✅ Full Working Setup
🖥️ Backend (Express + Cookie Auth)
1. 📁 server/index.js
js
Copy code
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://192.168.1.6:4000"; // frontend device

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

// CORS config to allow credentials
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// Dummy user
const user = {
  id: 1,
  username: "demo",
  password: "1234",
};

const jwtSecret = "mysecret"; // Put in .env in real use

import jwt from "jsonwebtoken";

// 🔐 Login route
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        // ❗ HTTP only
      sameSite: "lax",      // ✅ needed for cross-device
      path: "/",            // ✅ allow all routes
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Protected route
app.get("/api/protected", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ message: "Access granted", userId: decoded.id });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://192.168.1.5:${PORT}`);
});
2. 📁 .env (backend)
ini
Copy code
CLIENT_ORIGIN=http://192.168.1.6:4000
PORT=3000
3. 📦 Dependencies
Install:

bash
Copy code
npm install express cors cookie-parser dotenv jsonwebtoken
🖥️ Frontend (React + Axios + Cookie Auth)
1. 📁 src/apiRequest.js
js
Copy code
import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://192.168.1.5:3000", // IP of backend machine
  withCredentials: true,
});

export default apiRequest;
2. 📁 src/App.jsx
jsx
Copy code
import { useState } from "react";
import apiRequest from "./apiRequest";

function App() {
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("1234");

  const handleLogin = async () => {
    try {
      const res = await apiRequest.post("/api/auth/login", {
        username,
        password,
      });
      setStatus(res.data.message);
    } catch (err) {
      setStatus(err.response?.data?.message || "Login error");
    }
  };

  const getProtected = async () => {
    try {
      const res = await apiRequest.get("/api/protected");
      setStatus(res.data.message + " (userId: " + res.data.userId + ")");
    } catch (err) {
      setStatus(err.response?.data?.message || "Access error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React + Express Cookie Auth</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={getProtected}>Get Protected Data</button>
      <p>Status: {status}</p>
    </div>
  );
}

export default App;
3. 📁 .env (frontend)
ini
Copy code
VITE_API_BASE_URL=http://192.168.1.5:3000
4. 📦 Install dependencies
bash
Copy code
npm create vite@latest my-app --template react
cd my-app
npm install axios
🌐 Example Network Setup
Machine	Role	IP	Port
Your PC	Backend	192.168.1.5	3000
Friend	Frontend	192.168.1.6	4000

Ensure both are on same WiFi

Access backend from friend’s machine at: http://192.168.1.5:3000

✅ How to Test
Start backend:

bash
Copy code
node index.js
Start frontend on your friend’s laptop:

bash
Copy code
npm run dev
Open http://192.168.1.6:4000 in friend’s browser

Click "Login" → cookie gets set

Click "Get Protected Data" → cookie gets sent → protected data returned ✅

✅ Final Checks
❌ Don’t use localhost

✅ Use actual LAN IPs

❌ Don’t set secure: true on HTTP

✅ Use sameSite: "lax"

✅ Use withCredentials: true on all Axios calls

Let me know if you'd like me to zip this into a ready-to-run GitHub repo or if you want the HTTPS + deployment-ready version too.







