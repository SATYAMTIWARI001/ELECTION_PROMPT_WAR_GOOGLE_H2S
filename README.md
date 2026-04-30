# VoteWise AI

An intelligent, interactive, and personalized assistant designed to help users understand the election process in India and globally.

Built for the **Google Prompt Solution Challenge**.

## The Problem
Many citizens, especially first-time voters, find the election process confusing due to a lack of awareness, complex procedures, and scattered information. This leads to:
- Low voter participation
- Susceptibility to misinformation
- Missed registration deadlines

## The Solution
**VoteWise AI** is not just a chatbot. It simplifies the entire democratic process through an interactive AI assistant that provides clear, personalized, and step-by-step guidance. It is:
- **Guided** (Step-by-step checklists)
- **Personalized** (Based on the user's profile and voter status)
- **Localized** (Based on region)
- **Interactive** (Chat + Voice + Quizzes)

## Core Features & Modes
1. **First-Time Voter Mode**: Guided onboarding and step-by-step registration checklists.
2. **Smart Timeline Generator**: Input a state or election name to receive a full election schedule.
3. **Document Verification (AI Vision)**: Upload ID to check validity (Proposed).
4. **Myth Buster Mode**: Detects misinformation and provides correct, neutral facts.
5. **Offline Lite Mode**: Basic guidance available without an active internet connection.
6. **Voting Readiness Score**: Visualizes the % completion of voting steps.
7. **Gamification**: Earn badges like "Registered Voter" and "Informed Citizen" (Inspired by Duolingo).

## Proposed Tech Stack Architecture
While this repository currently hosts a lightweight Vanilla JS frontend prototype demonstrating the UI and Gemini API integration, the full production architecture is designed as follows:
- **Frontend**: React.js / Next.js
- **Backend**: Node.js / Firebase
- **Database**: Firestore
- **AI Integration**: Gemini API (System prompt engineered for VoteWise AI)
- **Maps**: Google Maps API (For polling booth navigation)
- **Authentication**: Firebase Auth

## Gemini API Integration (VoteWise Persona)
The core of this application is powered by the **Gemini API**. It utilizes advanced `system_instructions` to enforce the VoteWise AI persona:
- **Goals**: Simplify complex procedures, provide accurate/unbiased info, personalize responses, and encourage voting.
- **Behavior Rules**: Uses conversational language, provides direct answers followed by step-by-step checklists, remains strictly neutral, and always ends with an engaging follow-up question.
- **Response Format**: Direct Answer → Step-by-Step Explanation → Follow-up Question.

## How to Run the Prototype Locally
1. Clone this repository.
2. Open the directory in your terminal and run a local server (e.g., `npm run dev` if `serve` is configured, or `python3 -m http.server`).
3. Open the provided `localhost` link in your browser.
4. Navigate to any tab, click an "Ask Gemini" button, and enter your Gemini API Key (saved securely in your local browser storage) to experience the VoteWise AI persona live!
