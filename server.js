require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bcrypt = require('bcrypt');
const { sendNotification } = require('./emailService');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Chat route removed for pure offline handling
// Auth and Notification Endpoint
app.post('/api/user-login', async (req, res) => {
    try {
        const { name, email, state, password } = req.body;
        
        // Securely hash password if it was provided
        let passwordHash = null;
        if (password) {
            const saltRounds = 10;
            passwordHash = await bcrypt.hash(password, saltRounds);
            // In a real application, you would store this hash in a database
            // e.g., db.users.create({ name, email, state, passwordHash })
        }

        const timestamp = new Date().toLocaleString();
        
        // Construct SAFE email body (NO PASSWORDS)
        const subject = "New User Activity - JanVote AI";
        const body = `
New activity on JanVote AI!

Name: ${name || 'Unknown'}
Email: ${email || 'Not provided'}
State: ${state || 'Not provided'}
Time: ${timestamp}

[Note: Passwords are never sent via email or stored in plaintext for security reasons.]
`;
        
        // Send email notification in the background
        sendNotification(subject, body);

        res.json({ message: 'Login successful', success: true });
    } catch (error) {
        console.error('Error in /api/user-login:', error);
        res.status(500).json({ error: 'Internal server error during authentication' });
    }
});

// Test Email Route
app.get('/api/test-email', async (req, res) => {
    try {
        const body = `This is a test notification from the /api/test-email route.
        
If you are reading this, your Nodemailer setup and Gmail App Password are correct!`;
        
        await sendNotification("🗳️ JanVote AI - Test Notification", body);
        res.send("✅ Test email sent successfully! Please check your Gmail inbox.");
    } catch (error) {
        console.error(error);
        res.status(500).send("❌ Email failed. Please check your server logs and .env file.");
    }
});

// Start Server
let currentPort = process.env.PORT || 5175;

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`\n✅ JanVote AI Server successfully running on http://localhost:${port}\n`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`⚠️ Port ${port} is already in use by another terminal. Trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });
};

startServer(currentPort);
