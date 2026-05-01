document.addEventListener('DOMContentLoaded', () => {
    // --- AI Chat Logic ---
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');
    const explainToggle = document.getElementById('explain-simply-toggle');

    if (!chatWindow || !chatInput || !sendBtn) return;

    let chatHistory = [];

    function addMessage(text, sender = 'user') {
        const emptyState = document.getElementById('chat-empty-state');
        if (emptyState) emptyState.remove();

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Strictly plain text formatting as requested
        contentDiv.innerText = text;

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    // 30 Hardcoded Questions Database (Indian Elections)
    // Basic Hardcoded Questions Database (Indian Elections)
    const qaDatabase = [
        {
            keywords: ["what is voting", "why vote", "meaning of voting"],
            answer: "Voting is the process where citizens choose their leaders in an election."
        },
        {
            keywords: ["who can vote", "voting age", "eligible to vote"],
            answer: "Any Indian citizen who is 18 years or older can vote."
        },
        {
            keywords: ["what is voter id", "what is epic", "election card", "voter id"],
            answer: "A Voter ID card (EPIC) is an official document issued by the Election Commission. It proves you are an eligible voter."
        },
        {
            keywords: ["what is evm", "electronic voting machine", "evm"],
            answer: "An EVM is a machine used to record votes electronically in elections."
        },
        {
            keywords: ["what is nota", "none of the above", "nota"],
            answer: "NOTA stands for 'None of the Above'. It is an option on the EVM used to reject all contesting candidates."
        },
        {
            keywords: ["how to vote", "basic steps to vote", "voting steps", "first time voting", "voting process"],
            answer: "Go to your polling booth with your Voter ID. An official will check your name and ink your finger. Then, press the button on the EVM next to your chosen candidate."
        },
        {
            keywords: ["documents required", "what to carry", "what id do i need", "required documents"],
            answer: "You need to carry your Voter ID card to the polling booth. If you do not have it, you can use a Passport, Driving License, or Aadhaar card."
        },
        {
            keywords: ["what is polling booth", "where to vote", "polling station", "polling booth"],
            answer: "A polling booth is the designated location where you must go to cast your vote on election day."
        },
        {
            keywords: ["what is constituency", "election area", "constituency"],
            answer: "A constituency is a specific geographic area that a candidate is elected to represent in the government."
        },
        {
            keywords: ["election commission", "who conducts elections", "eci", "election commission of india"],
            answer: "The Election Commission of India (ECI) is the official body responsible for conducting free and fair elections across the country."
        },
        {
            keywords: ["why is voting important", "importance of voting", "why should i vote"],
            answer: "Voting is important because it lets you choose the leaders who make laws and decisions for the country. It is your fundamental democratic right."
        },
        {
            keywords: ["types of elections", "lok sabha", "state elections"],
            answer: "The main types of elections in India are Lok Sabha (national), Vidhan Sabha (state level), and local body elections (like Panchayat or Municipal)."
        }
    ];

    function findAnswer(query) {
        const lowerQuery = query.toLowerCase();
        for (let item of qaDatabase) {
            for (let keyword of item.keywords) {
                if (lowerQuery.includes(keyword)) {
                    return item;
                }
            }
        }
        return null;
    }

    function sendMessage(text) {
        if (!text.trim()) return;

        // User message
        addMessage(text, 'user');
        chatInput.value = '';
        
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        // Show typing indicator
        const loadingEl = addMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'ai');

        setTimeout(() => {
            // Remove typing indicator
            loadingEl.remove();

            // Find match
            const match = findAnswer(text.trim());
            let answerText = "";
            
            if (match) {
                answerText = match.answer;
            } else {
                const complexKeywords = ["blockchain", "ai", "artificial intelligence", "hack", "advanced", "crypto"];
                const isComplex = complexKeywords.some(kw => text.toLowerCase().includes(kw));
                
                if (isComplex) {
                    answerText = "This is an advanced topic. I can only answer basic voting questions.";
                } else {
                    answerText = "I can only answer basic voting questions.";
                }
            }

            addMessage(answerText, 'ai');
            chatHistory.push({ role: "model", parts: [{ text: answerText }] });

        }, 800); // Mock AI delay
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            sendMessage(chip.innerText);
        });
    });

    // Voice Input Logic
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
