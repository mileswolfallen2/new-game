const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your_jwt_secret_key'; // Change this to a secure key in production

app.use(cors());
app.use(bodyParser.json());

// Data storage files
const usersFile = path.join(__dirname, 'users.json');
const mapsFile = path.join(__dirname, 'maps.json');

// Helper to read JSON file
function readJsonFile(file) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }
  const data = fs.readFileSync(file);
  return JSON.parse(data);
}

// Helper to write JSON file
function writeJsonFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const users = readJsonFile(usersFile);
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeJsonFile(usersFile, users);
  res.status(201).json({ message: 'User created' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readJsonFile(usersFile);
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Get maps endpoint
app.get('/api/maps', (req, res) => {
  const maps = readJsonFile(mapsFile);
  res.json(maps);
});

// Publish map endpoint (authenticated)
app.post('/api/maps', authenticateToken, (req, res) => {
  const { title, chartData } = req.body;
  if (!title || !chartData) {
    return res.status(400).json({ message: 'Title and chartData required' });
  }
  const maps = readJsonFile(mapsFile);
  const newMap = {
    id: Date.now(),
    title,
    author: req.user.username,
    chartData
  };
  maps.push(newMap);
  writeJsonFile(mapsFile, maps);
  res.status(201).json({ message: 'Map published', map: newMap });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
