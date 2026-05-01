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

    const showQuestionsBtn = document.getElementById('show-questions-btn');
    let gridContainer = null;
    let welcomeMessageDiv = null;

    // The 30 specific questions requested
    const qaDatabase = [
        { question: "What documents are required to vote?", answer: "You need your Voter ID card to vote. Alternatively, you can use Aadhaar, PAN card, Driving License, or Passport." },
        { question: "How do I register to vote?", answer: "You can register online through the Voter Helpline App or the official Election Commission portal." },
        { question: "What is a Voter ID card?", answer: "It is an official identity document issued by the Election Commission of India to eligible voters." },
        { question: "What is an EPIC card?", answer: "EPIC stands for Electors Photo Identity Card. It is simply another name for your Voter ID card." },
        { question: "How do I find my polling booth?", answer: "You can search for your polling booth details online using the Voter Helpline App or ECI website." },
        { question: "What is the minimum age to vote?", answer: "You must be at least 18 years old to be eligible to vote in India." },
        { question: "What is EVM?", answer: "EVM stands for Electronic Voting Machine. It is used to record votes electronically instead of using paper ballots." },
        { question: "What is VVPAT?", answer: "VVPAT is a machine attached to the EVM that prints a paper slip to verify your vote was cast correctly." },
        { question: "How do I check my name on the voter list?", answer: "You can verify your name online on the electoral search portal using your EPIC number." },
        { question: "How do I vote for the first time?", answer: "Go to your polling booth with your ID, let officials check your name, get your finger inked, and press the button on the EVM." },
        { question: "Can NRI citizens vote in India?", answer: "Yes, Non-Resident Indians can vote if registered as overseas electors, but they must vote in person in India." },
        { question: "What is the model code of conduct?", answer: "It is a set of guidelines issued by the Election Commission to ensure free and fair elections." },
        { question: "What is the role of Election Commission of India?", answer: "The Election Commission of India is the constitutional body responsible for conducting fair elections across the country." },
        { question: "Who is eligible to be a candidate in elections?", answer: "Any Indian citizen who is at least 25 years old and registered as a voter can stand for Lok Sabha or Assembly elections." },
        { question: "What is the nomination process for elections?", answer: "Candidates must file nomination papers and submit a security deposit to the returning officer before the deadline." },
        { question: "What is the difference between Lok Sabha and Rajya Sabha elections?", answer: "Lok Sabha members are elected directly by the public. Rajya Sabha members are elected by state legislature members." },
        { question: "What is NOTA?", answer: "NOTA stands for 'None of the Above.' It allows you to reject all contesting candidates on the EVM." },
        { question: "How does postal ballot work?", answer: "Postal ballots allow specific groups, like armed forces or election duty staff, to vote safely by mail." },
        { question: "What is a mock poll?", answer: "A mock poll is a test run of the EVM conducted before actual voting starts to ensure the machine works perfectly." },
        { question: "What happens during re-polling?", answer: "Re-polling is ordered by the Election Commission if the original voting process was severely disrupted or tampered with." },
        { question: "How are election results counted?", answer: "Votes recorded in EVMs are electronically tallied by authorized officials on a designated counting day." },
        { question: "How do I file a complaint about election violations?", answer: "You can report violations using the cVIGIL mobile app provided by the Election Commission." },
        { question: "What is a voter slip?", answer: "It is an official slip distributed before election day that contains your polling booth details and serial number." },
        { question: "How do I correct mistakes in my voter ID?", answer: "You can apply for corrections online using Form 8 on the Voter Helpline App or the NVSP portal." },
        { question: "What if I lost my voter ID card?", answer: "You can still vote using alternative IDs like an Aadhaar card, as long as your name is on the official voter list." },
        { question: "Can I get a duplicate voter ID?", answer: "Yes, you can apply for a replacement Voter ID online using Form 8 if your original is lost or damaged." },
        { question: "How do disabled persons get voting assistance?", answer: "Polling booths provide ramps, wheelchairs, and volunteers to assist voters with disabilities." },
        { question: "What are state elections?", answer: "State elections are held to elect Members of the Legislative Assembly (MLAs) who form the state government." },
        { question: "What is proxy voting?", answer: "Proxy voting allows specific service personnel, like the military, to authorize someone else to vote on their behalf." },
        { question: "How do I vote as an overseas voter?", answer: "Overseas voters must register using Form 6A and cast their vote in person at their designated polling booth in India." }
    ];

    function renderWelcomeAndGrid() {
        if (!gridContainer) {
            welcomeMessageDiv = addMessage("Hello! I am JanVote AI. Here are some common questions you can ask me. Click any question to get an instant answer.", 'ai');
            
            gridContainer = document.createElement('div');
            gridContainer.className = 'in-chat-chips-grid fade-in-up';
            
            qaDatabase.forEach(item => {
                const chip = document.createElement('button');
                chip.className = 'in-chat-chip';
                chip.innerText = item.question;
                chip.addEventListener('click', () => {
                    sendMessage(item.question);
                });
                gridContainer.appendChild(chip);
            });
            
            chatWindow.appendChild(gridContainer);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        } else {
            gridContainer.style.display = 'grid';
            welcomeMessageDiv.style.display = 'flex';
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
        
        if (showQuestionsBtn) showQuestionsBtn.style.display = 'none';
    }

    // Initialize welcome grid
    renderWelcomeAndGrid();

    if (showQuestionsBtn) {
        showQuestionsBtn.addEventListener('click', () => {
            renderWelcomeAndGrid();
        });
    }

    function findAnswer(query) {
        const lowerQuery = query.toLowerCase().trim();
        for (let item of qaDatabase) {
            // Check exact or loose match
            if (lowerQuery === item.question.toLowerCase() || item.question.toLowerCase().includes(lowerQuery) || lowerQuery.includes(item.question.toLowerCase().replace('?',''))) {
                return item;
            }
        }
        return null;
    }

    function sendMessage(text) {
        if (!text.trim()) return;

        // Hide the grid and welcome message when user sends a message
        if (gridContainer) gridContainer.style.display = 'none';
        if (welcomeMessageDiv) welcomeMessageDiv.style.display = 'none';
        if (showQuestionsBtn) showQuestionsBtn.style.display = 'block';

        // User message
        addMessage(text, 'user');
        chatInput.value = '';
        
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        // Find match immediately
        const match = findAnswer(text.trim());
        let answerText = "";
        
        if (match) {
            answerText = match.answer;
        } else {
            answerText = "For this query, please visit the official Election Commission of India website at eci.gov.in or call the National Voter Helpline at 1950.";
        }

        addMessage(answerText, 'ai');
        chatHistory.push({ role: "model", parts: [{ text: answerText }] });
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
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
