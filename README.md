# JanVote AI 🇮🇳

JanVote AI is a premium, interactive web application designed to help citizens understand the democratic election process in India. It bridges the gap between complex civic procedures and everyday citizens using an intelligent AI assistant, interactive UI, and accessible design.

This project was built for the **Google Prompt Solution Challenge** under the **Civic Education** vertical.

## 🚀 Features
- **AI Chat Assistant**: Powered by Google Gemini, the JanVote assistant is strictly prompted to answer only civic and election-related questions in a simple, neutral, and beginner-friendly tone.
- **Glassmorphism Premium UI**: A highly attractive, modern interface blending government trustworthiness with startup elegance.
- **Interactive Election Timeline**: A step-by-step visual tracker of the electoral phases.
- **Free Polling Station Finder**: Integrated with Leaflet.js and OpenStreetMap (Nominatim API) to provide interactive, key-free map visualizations of polling areas.
- **Smart Quiz Mode**: A custom-built, delayed-feedback quiz that tests users on Indian electoral rules (EVMs, NOTA, voting age) and provides detailed explanations.

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Design System**: Custom CSS variables, Glassmorphism, Responsive Mobile-First Design (Sticky Nav)
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`) via direct REST fetch.
- **Maps Integration**: Leaflet.js + OpenStreetMap (100% Free and Open Source)
- **Architecture**: Zero-dependency static site for instant deployment and high performance.

## ⚙️ How to Run Locally
Because this project is built using pure, zero-dependency Vanilla JS, it is incredibly easy to run. No complex build tools or `npm install` required!

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/votewise-ai.git
   cd votewise-ai
   ```

2. **Serve the project**
   You can run it using any simple local server. If you have Node.js installed, you can use `npx serve`:
   ```bash
   npx serve .
   ```
   Or use Python:
   ```bash
   python3 -m http.server 3000
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000` to interact with JanVote AI.

## 🔑 API Keys Note
The current prototype uses a hardcoded Gemini API key for immediate demonstration purposes during the hackathon evaluation. In a production environment, this application would be ported to a Node.js/Express backend to securely handle the API keys via `.env` variables. 
The Map integration (OpenStreetMap) requires **zero API keys** and is completely free to use.

## 📝 Problem Statement
Many citizens, especially first-time voters, find the election process confusing due to a lack of awareness, complex procedures, and scattered information. This leads to low voter participation, misinformation, and missed registration deadlines.

**JanVote AI** solves this by simplifying the entire process through an interactive assistant that provides clear, personalized, and localized guidance.

---
*Built with ❤️ for the Google Prompt Solution Challenge.*
