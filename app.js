// Data Sources

const timelineData = [
    { phase: 'Announcement', tag: 'Start', color: 'var(--success)', desc: 'The election commission or head of state announces the election dates.' },
    { phase: 'Nominations', tag: 'Candidates', color: 'var(--primary-color)', desc: 'Candidates submit their nomination papers to run for office.' },
    { phase: 'Campaigning', tag: 'Public', color: 'var(--warning)', desc: 'Parties and candidates rally, debate, and present manifestos.' },
    { phase: 'Voting Day', tag: 'Crucial', color: 'var(--danger)', desc: 'Citizens cast their ballots at designated polling stations.' },
    { phase: 'Counting', tag: 'Results', color: 'var(--accent-color)', desc: 'Votes are tallied under strict supervision.' },
    { phase: 'Declaration', tag: 'Outcome', color: 'var(--success)', desc: 'Official results are declared, determining the winners.' },
    { phase: 'Govt Formation', tag: 'Power', color: 'var(--primary-color)', desc: 'The majority party or coalition forms the new government.' }
];

const stepsData = [
    { title: '1. Election Called', desc: 'The official notification is issued, dissolving the previous house if necessary.' },
    { title: '2. Voter Registration', desc: 'Citizens ensure their names are on the electoral roll to be eligible to vote.' },
    { title: '3. Nominations Filed', desc: 'Candidates file paperwork and deposits. Scrutiny of nominations takes place.' },
    { title: '4. The Campaign', desc: 'Candidates campaign. Spending limits and model codes of conduct are enforced.' },
    { title: '5. Polling Day', desc: 'Voters cast their secret ballots using EVMs or paper ballots.' },
    { title: '6. Exit Polls', desc: 'Media outlets project results based on voter surveys immediately after polling.' },
    { title: '7. Counting & Results', desc: 'Votes are counted and constituency winners are officially declared.' },
    { title: '8. Government Formed', desc: 'The party or coalition with a majority proves their numbers and takes oath.' }
];

const comparisonData = [
    { feature: 'Voting System', ind: 'First Past the Post (FPTP)', ger: 'Mixed-Member Proportional', usa: 'Electoral College / FPTP', aus: 'Ranked Choice', uk: 'First Past the Post', fra: 'Two-Round System' },
    { feature: 'Frequency', ind: 'Every 5 years', ger: 'Every 4 years', usa: 'Every 4 years (Presidential)', aus: 'Every 3 years', uk: 'Every 5 years (max)', fra: 'Every 5 years' },
    { feature: 'Authority', ind: 'Election Commission', ger: 'Federal Returning Officer', usa: 'State/Local Boards', aus: 'Electoral Commission', uk: 'Electoral Commission', fra: 'Constitutional Council' },
    { feature: 'Turnout (Avg)', ind: '~67%', ger: '~76%', usa: '~66%', aus: '~90% (Compulsory)', uk: '~67%', fra: '~72%' },
    { feature: 'Notable Feature', ind: 'Electronic Voting Machines (EVM)', ger: 'Two votes per person', usa: 'Swing States decide outcome', aus: 'Voting is legally mandatory', uk: 'Unwritten Constitution', fra: 'Run-off if no 50% majority' }
];

const quizData = [
    { q: 'Which country uses a Mixed-Member Proportional representation system?', options: ['USA', 'India', 'Germany', 'France'], correct: 2, exp: 'Germany uses MMP where voters get two votes: one for a direct candidate and one for a party.' },
    { q: 'What does "First Past the Post" mean?', options: ['Winning absolute majority', 'Winning more votes than any other candidate', 'Voting before noon', 'Passing a specific threshold'], correct: 1, exp: 'FPTP means the candidate with the highest number of votes wins, even without an absolute majority.' },
    { q: 'In which country is voting legally compulsory?', options: ['Australia', 'UK', 'USA', 'India'], correct: 0, exp: 'Australia enforces compulsory voting, leading to turnout rates consistently around 90%.' },
    { q: 'Who officially conducts federal elections in India?', options: ['Supreme Court', 'Parliament', 'Election Commission', 'Prime Minister'], correct: 2, exp: 'The Election Commission of India is an autonomous constitutional authority responsible for administering elections.' },
    { q: 'How often are Presidential elections held in the USA?', options: ['Every 3 years', 'Every 4 years', 'Every 5 years', 'Every 6 years'], correct: 1, exp: 'US Presidential elections are held every 4 years on the first Tuesday after the first Monday in November.' },
    { q: 'What is a "Swing State"?', options: ['A state that always votes for one party', 'A state with a high population', 'A state where electoral races are highly competitive', 'A state that uses paper ballots'], correct: 2, exp: 'Swing states (or battleground states) are those where both major political parties have similar levels of support among voters.' }
];

const glossaryData = [
    { term: 'Constituency', def: 'A specific geographic area that is represented by a single elected official or multiple officials in a legislative body.' },
    { term: 'Gerrymandering', def: 'The manipulation of electoral district boundaries with the intent to create an undue advantage for a party, group, or socio-economic class within the constituency.' },
    { term: 'Mandate', def: 'The authority granted by a constituency to act as its representative, generally assumed to be given to a winning candidate or party.' },
    { term: 'Manifesto', def: 'A published declaration of the intentions, motives, or views of a political party or candidate.' },
    { term: 'Incumbent', def: 'The current holder of a political office.' },
    { term: 'Bipartisan', def: 'Involving the agreement or cooperation of two political parties that usually oppose each other.' },
    { term: 'Coalition', def: 'An alliance for combined action, especially a temporary alliance of political parties forming a government.' },
    { term: 'Filibuster', def: 'An action such as a prolonged speech that obstructs progress in a legislative assembly while not technically contravening the required procedures.' },
    { term: 'Suffrage', def: 'The right to vote in political elections.' },
    { term: 'Electoral College', def: 'A body of electors chosen or appointed by a larger group, specifically the system used to elect the US President.' },
    { term: 'Psephology', def: 'The statistical study of elections and trends in voting.' },
    { term: 'Referendum', def: 'A general vote by the electorate on a single political question which has been referred to them for a direct decision.' }
];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderTimeline();
    renderStepByStep();
    renderComparison();
    initQuiz();
    renderGlossary(glossaryData);
    initAskAIChips();
});

// Tab Navigation
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            
            // Function to perform the actual DOM update
            const updateDOM = () => {
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => {
                    c.classList.remove('active');
                    c.classList.add('hidden');
                });

                // Add active class to clicked
                btn.classList.add('active');
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            };

            // Use View Transitions API if supported
            if (document.startViewTransition) {
                document.startViewTransition(() => updateDOM());
            } else {
                // Fallback for older browsers
                updateDOM();
            }
        });
    });
}

// Render Timeline
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    timelineData.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const el = document.createElement('div');
        el.className = `timeline-item ${side}`;
        el.innerHTML = `
            <div class="timeline-content glass">
                <span class="phase-tag" style="background-color: ${item.color}20; color: ${item.color}; border: 1px solid ${item.color}">${item.tag}</span>
                <h3>${item.phase}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        container.appendChild(el);
    });
}

// Render Step by Step
function renderStepByStep() {
    const container = document.getElementById('step-by-step-container');
    container.innerHTML = '';

    stepsData.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'step-card glass';
        el.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="step-details">
                <ul>
                    <li>Official documentation is verified.</li>
                    <li>Public awareness campaigns begin.</li>
                    <li>Resources are mobilized.</li>
                </ul>
            </div>
        `;
        
        el.addEventListener('click', () => {
            el.classList.toggle('expanded');
        });
        
        container.appendChild(el);
    });
}

// Render Comparison
function renderComparison() {
    const tbody = document.getElementById('comparison-tbody');
    tbody.innerHTML = '';

    comparisonData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 600; color: var(--accent-color);">${item.feature}</td>
            <td>${item.ind}</td>
            <td>${item.ger}</td>
            <td>${item.usa}</td>
            <td>${item.aus}</td>
            <td>${item.uk}</td>
            <td>${item.fra}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Quiz Logic
let currentQuestionIndex = 0;
let score = 0;

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    
    if (currentQuestionIndex >= quizData.length) {
        container.innerHTML = `
            <div class="glass" style="padding: 3rem;">
                <span style="font-size: 4rem;">🏆</span>
                <h2 style="margin-bottom: 1rem;">Quiz Complete!</h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">You scored ${score} out of ${quizData.length}</p>
                <button class="quiz-next-btn show" id="restart-quiz">Restart Quiz</button>
            </div>
        `;
        document.getElementById('restart-quiz').addEventListener('click', initQuiz);
        return;
    }

    const qData = quizData[currentQuestionIndex];
    
    let optionsHtml = '';
    qData.options.forEach((opt, idx) => {
        optionsHtml += `<div class="quiz-option" data-idx="${idx}">${opt}</div>`;
    });

    container.innerHTML = `
        <div class="glass" style="padding: 2rem;">
            <div class="quiz-header">
                <span>Question ${currentQuestionIndex + 1} of ${quizData.length}</span>
                <span>Score: ${score}</span>
            </div>
            <div class="quiz-question">${qData.q}</div>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
            <div class="quiz-feedback glass" id="quiz-feedback"></div>
            <button class="quiz-next-btn" id="next-btn">Next Question</button>
        </div>
    `;

    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');

    let answered = false;

    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            if (answered) return;
            answered = true;
            
            const selectedIdx = parseInt(e.target.getAttribute('data-idx'));
            
            if (selectedIdx === qData.correct) {
                e.target.classList.add('correct');
                score++;
                feedback.innerHTML = `<span style="color: var(--success); font-weight: bold;">Correct!</span> ${qData.exp}`;
            } else {
                e.target.classList.add('incorrect');
                options[qData.correct].classList.add('correct');
                feedback.innerHTML = `<span style="color: var(--danger); font-weight: bold;">Incorrect.</span> ${qData.exp}`;
            }
            
            feedback.classList.add('show');
            nextBtn.classList.add('show');
            
            // Update score display
            document.querySelector('.quiz-header span:last-child').innerText = `Score: ${score}`;
        });
    });

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuiz();
    });
}

// Render Glossary
function renderGlossary(data) {
    const container = document.getElementById('glossary-container');
    container.innerHTML = '';

    data.forEach(item => {
        const el = document.createElement('div');
        el.className = 'glossary-item glass';
        el.innerHTML = `
            <h3>${item.term}</h3>
            <p>${item.def}</p>
        `;
        container.appendChild(el);
    });

    // Setup search
    const searchInput = document.getElementById('glossary-search');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = glossaryData.filter(g => 
            g.term.toLowerCase().includes(term) || g.def.toLowerCase().includes(term)
        );
        
        container.innerHTML = '';
        if(filtered.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No terms found matching your search.</p>';
        } else {
            filtered.forEach(item => {
                const el = document.createElement('div');
                el.className = 'glossary-item glass';
                el.innerHTML = `
                    <h3>${item.term}</h3>
                    <p>${item.def}</p>
                `;
                container.appendChild(el);
            });
        }
    });
}

// Ask AI Chips functionality
function initAskAIChips() {
    const chips = document.querySelectorAll('.ask-ai-chip');
    const modal = document.getElementById('ai-modal');
    const closeBtn = document.getElementById('close-modal');
    const promptText = document.getElementById('ai-prompt-text');
    const modalTitle = document.getElementById('modal-title');
    
    // New Elements
    const apiKeySection = document.getElementById('api-key-section');
    const chatSection = document.getElementById('chat-section');
    const apiKeyInput = document.getElementById('gemini-api-key');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const clearKeyBtn = document.getElementById('clear-key-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const responseContent = document.getElementById('ai-response-content');

    // Check for existing API key
    let currentApiKey = localStorage.getItem('gemini_api_key');

    // Simple markdown parser for Gemini response
    function parseMarkdown(text) {
        let html = text
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Fix overlapping tags from simple regex
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            // Paragraphs & Line Breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>');
        return '<p>' + html + '</p>';
    }

    const voteWiseSystemPrompt = `You are VoteWise AI, an intelligent and user-friendly assistant designed to help users understand the election process in India (and globally when asked).

Your goals:
1. Simplify complex election procedures into easy, step-by-step explanations.
2. Provide accurate, updated, and unbiased information.
3. Personalize responses based on user's age, location, and election type.
4. Encourage informed and responsible voting without influencing political opinions.

Behavior Rules:
- Use simple, conversational language.
- Always start with a direct answer.
- Break answers into steps, timelines, or checklists.
- Ask follow-up questions when needed (e.g., "Are you a first-time voter?").
- Never promote any political party or candidate.
- Always remain neutral and fact-based.

Core Features You Must Support:
1. Voter Registration Guidance
2. Election Timeline Explanation
3. Required Documents Checklist
4. Polling Day Instructions
5. FAQ Handling
6. Localized Information
7. Myth-busting

Response Format:
- Direct answer first
- Then step-by-step explanation
- End with a helpful follow-up question`;

    async function fetchGeminiResponse(prompt) {
        if (!currentApiKey) return;
        
        loadingSpinner.classList.remove('hidden');
        responseContent.innerHTML = '';
        
        try {
            // Using gemini-2.5-flash endpoint
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${currentApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: voteWiseSystemPrompt }]
                    },
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });
            
            if (!response.ok) {
                throw new Error('API request failed. Please check your API key.');
            }
            
            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            responseContent.innerHTML = parseMarkdown(text);
        } catch (error) {
            responseContent.innerHTML = `<p style="color: var(--danger);"><strong>Error:</strong> ${error.message}</p>`;
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    }

    // Modal UI state management
    function updateModalState() {
        if (currentApiKey) {
            apiKeySection.classList.add('hidden');
            chatSection.classList.remove('hidden');
        } else {
            apiKeySection.classList.remove('hidden');
            chatSection.classList.add('hidden');
        }
    }

    // Event Listeners for API Key Management
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('gemini_api_key', key);
            currentApiKey = key;
            apiKeyInput.value = '';
            updateModalState();
            // Automatically fetch if there's a prompt queued
            if (promptText.innerText) {
                fetchGeminiResponse(promptText.innerText);
            }
        }
    });

    clearKeyBtn.addEventListener('click', () => {
        localStorage.removeItem('gemini_api_key');
        currentApiKey = null;
        updateModalState();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            const prompt = chip.getAttribute('data-prompt');
            const aiName = chip.getAttribute('data-ai') || 'Gemini';
            
            promptText.innerText = prompt;
            modalTitle.innerText = `Ask ${aiName}`;
            
            updateModalState();
            modal.classList.remove('hidden');

            if (currentApiKey) {
                fetchGeminiResponse(prompt);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}
