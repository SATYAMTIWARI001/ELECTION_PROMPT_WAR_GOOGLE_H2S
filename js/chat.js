document.addEventListener('DOMContentLoaded', () => {
    // --- AI Chat Logic ---
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    if (!chatWindow || !chatInput || !sendBtn) return;

    // API Calling
    // The backend now handles the Gemini API calls securely
    function getGeminiApiUrl() {
        return `/api/chat`;
    }

    let chatHistory = [];

    function addMessage(text, sender = 'user') {
        const emptyState = document.getElementById('chat-empty-state');
        if (emptyState) emptyState.remove();

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        if (sender === 'ai') {
            // Render basic markdown (bold, lists, breaks)
            let formattedText = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
            formattedText = formattedText.replace(/\\n/g, '<br>');
            contentDiv.innerHTML = formattedText;
        } else {
            contentDiv.innerText = text;
        }

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    function promptForApiKey(errorMsg) {
        const aiMessageDiv = addMessage(`⚠️ Oops! The API request failed. (${errorMsg})\\n\\nIt seems the default API key has reached its limit or is invalid. Please enter your own Google Gemini API key to continue chatting.`, 'ai');
        
        const keyPromptBox = document.createElement('div');
        keyPromptBox.style.marginTop = '1rem';
        keyPromptBox.style.padding = '1rem';
        keyPromptBox.style.background = 'rgba(255, 255, 255, 0.8)';
        keyPromptBox.style.borderRadius = 'var(--radius-md)';
        keyPromptBox.style.border = '1px solid #ccc';
        
        keyPromptBox.innerHTML = `
            <p style="font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 600;">Enter your Gemini API Key:</p>
            <div style="display: flex; gap: 0.5rem;">
                <input type="password" id="custom-api-key-input" placeholder="AIzaSy..." style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                <button id="save-custom-key-btn" class="btn btn-primary small">Save Key</button>
            </div>
            <p style="font-size: 0.75rem; color: #666; margin-top: 0.5rem;">Your key is stored securely in your browser's local storage and is only used to connect directly to Google's API.</p>
        `;
        
        aiMessageDiv.appendChild(keyPromptBox);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        const saveBtn = keyPromptBox.querySelector('#save-custom-key-btn');
        const inputField = keyPromptBox.querySelector('#custom-api-key-input');
        
        saveBtn.addEventListener('click', () => {
            const key = inputField.value.trim();
            if (key) {
                localStorage.setItem('user_gemini_api_key', key);
                keyPromptBox.innerHTML = '<p style="color: var(--success-green); font-weight: 600;">✅ API Key saved! You can now send your message again.</p>';
            }
        });
    }

    const systemInstruction = `You are JanVote AI, an intelligent assistant that helps users understand the election process in a simple, interactive, and step-by-step way.

🎯 YOUR PURPOSE:
- Explain voting and election processes clearly
- Guide users step-by-step (registration → voting → results)
- Provide accurate and neutral information
- Personalize responses based on user intent

🧠 BEHAVIOR RULES:
- Always start with a clear, direct answer
- Then explain in simple step-by-step format
- Keep responses clean, structured, and easy to read
- Use bullet points when needed
- Ask helpful follow-up questions when relevant
- DO NOT use scripted or placeholder responses
- DO NOT say things like: "Let me check..." or "Here is an example..."
- Give real, useful answers immediately

📌 STRICT RESPONSE FORMAT:
You MUST format EVERY response exactly like this, no exceptions:

**Answer:**
[Short direct answer here]

**Steps:**
- [Actionable step 1]
- [Actionable step 2]

**Tip:**
💡 [One single helpful tip]

📚 CORE FEATURES YOU MUST SUPPORT:
1. Voter registration guidance
2. Election timeline explanation
3. Polling booth guidance
4. Required documents checklist
5. Voting day instructions
6. FAQ handling
7. Myth-busting (correct misinformation clearly)

🌍 LOCALIZATION:
- If user asks location-based questions (e.g., booth location), respond clearly with guidance on how to find it. Keep answers practical and actionable.

💬 TONE:
- Friendly but professional
- Clear and confident
- Never robotic
- Never biased toward any political party

🚫 IMPORTANT RESTRICTIONS:
- Do NOT generate fake data or exact booth locations
- Instead guide users to official methods
- Do NOT give incomplete answers
- Avoid filler phrases`;

    async function sendMessage(text) {
        if (!text.trim()) return;

        // User message
        addMessage(text, 'user');
        chatInput.value = '';
        
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        // Show typing indicator
        const loadingEl = addMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'ai');

        try {
            const explainToggle = document.getElementById('explain-simply-toggle');
            let finalSystemInstruction = systemInstruction;
            if (explainToggle && explainToggle.checked) {
                finalSystemInstruction += "\n\nCRITICAL: The user has requested 'Explain Simply'. You MUST explain this as if speaking to an absolute beginner. Use very simple words, analogies, and keep it extremely easy to understand.";
            }

            const requestBody = {
                contents: chatHistory,
                system_instruction: { parts: [{ text: finalSystemInstruction }] },
                generationConfig: {
            // Updated to hit local backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: text })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Remove typing indicator
            loadingEl.remove();
            
            if (data.response) {
                const aiText = data.response;
                const aiMessageDiv = addMessage(aiText, 'ai');
                chatHistory.push({ role: "model", parts: [{ text: aiText }] });
                
                // Add Dynamic Suggestions
                const suggestionsBox = document.createElement('div');
                suggestionsBox.style.marginTop = '0.5rem';
                suggestionsBox.innerHTML = `
                    <p style="font-size: 0.8rem; color: #666; margin-bottom: 0.3rem;">You might also want to know:</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="dyn-chip" style="font-size: 0.8rem; padding: 0.3rem 0.6rem; border: 1px solid var(--primary-blue); border-radius: 12px; background: transparent; color: var(--primary-blue); cursor: pointer;">How to register?</button>
                        <button class="dyn-chip" style="font-size: 0.8rem; padding: 0.3rem 0.6rem; border: 1px solid var(--primary-blue); border-radius: 12px; background: transparent; color: var(--primary-blue); cursor: pointer;">Required documents?</button>
                        <button class="dyn-chip" style="font-size: 0.8rem; padding: 0.3rem 0.6rem; border: 1px solid var(--primary-blue); border-radius: 12px; background: transparent; color: var(--primary-blue); cursor: pointer;">Polling booth info?</button>
                    </div>
                    
                    <div style="margin-top: 1rem; padding-top: 0.8rem; border-top: 1px solid #eee;">
                        <p style="font-size: 0.85rem; font-weight: 600; color: var(--primary-blue); margin-bottom: 0.5rem;">👉 Want to take action?</p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <a href="https://voters.eci.gov.in/" class="btn btn-primary small gov-link" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Register Now 🔗</a>
                            <a href="https://electoralsearch.eci.gov.in/" class="btn btn-outline small gov-link" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Check Status 🔗</a>
                            <a href="https://electoralsearch.eci.gov.in/" class="btn btn-outline small gov-link" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Find Booth 🔗</a>
                        </div>
                    </div>
                `;
                aiMessageDiv.appendChild(suggestionsBox);
                
                // Attach click handlers to dynamic suggestions
                suggestionsBox.querySelectorAll('.dyn-chip').forEach(chip => {
                    chip.addEventListener('click', () => {
                        chatInput.value = chip.innerText;
                        sendMessage(chatInput.value);
                    });
                });
                
                chatWindow.scrollTop = chatWindow.scrollHeight;
            } else {
                promptForApiKey(data.error ? data.error.message : 'Unknown error');
            }
        } catch (err) {
            loadingEl.remove();
            if (err.name === 'AbortError') {
                promptForApiKey('Request timed out');
            } else {
                promptForApiKey('Network Error');
            }
        }
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.innerText;
            const suggestedContainer = document.getElementById('suggested-prompts');
            if (suggestedContainer) suggestedContainer.style.display = 'none'; // hide chips after use
            sendMessage(chatInput.value);
        });
    });

    // Voice Input Logic
    const micBtn = document.getElementById('mic-btn');
    if (micBtn && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        micBtn.addEventListener('click', () => {
            micBtn.style.backgroundColor = 'var(--danger-red)';
            micBtn.style.color = 'white';
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            micBtn.style.backgroundColor = 'transparent';
            micBtn.style.color = 'inherit';
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            micBtn.style.backgroundColor = 'transparent';
            micBtn.style.color = 'inherit';
        };

        recognition.onend = () => {
            micBtn.style.backgroundColor = 'transparent';
            micBtn.style.color = 'inherit';
        };
    }
});
