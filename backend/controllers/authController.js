const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";

  db.query(sql, [username, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).send("Error registering user");
    res.send("User registered");
  });
};

// Login
exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).send("Error");

    if (result.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
};