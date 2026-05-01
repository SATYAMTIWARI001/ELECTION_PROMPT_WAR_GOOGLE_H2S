require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini AI
// Initialize conditionally in case key isn't provided yet
let genAI;
if (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY);
}

const systemInstruction = `You are JanVote AI (also known as ElectionGuide AI), an intelligent, trustworthy, and user-friendly assistant designed to help citizens understand the election process in a simple and engaging way.

Your goals:
1. Simplify complex election procedures into easy, step-by-step explanations.
2. Provide accurate, updated, and unbiased information.
3. Encourage informed and responsible voting.
4. ONLY answer questions about elections, voting, democracy, and civic processes. 
5. If asked anything unrelated, politely redirect the user back to election topics.

Behavior Rules:
- Use simple, conversational, professional language.
- Always start with a direct answer.
- Break answers into steps, timelines, or checklists.
- Never promote any political party, candidate, or agenda.
- Always remain neutral and fact-based.
- If a user asks how to vote, explain the general process clearly.`;

// API Routes
app.post('/api/chat', async (req, res) => {
    try {
        if (!genAI) {
            return res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
        }

        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`JanVote AI Server running on http://localhost:${PORT}`);
});
