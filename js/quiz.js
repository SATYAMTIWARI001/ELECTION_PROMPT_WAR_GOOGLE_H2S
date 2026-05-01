document.addEventListener('DOMContentLoaded', () => {
    // --- Quiz Logic ---
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizStart = document.getElementById('quiz-start');
    const quizQuestion = document.getElementById('quiz-question');
    const quizResults = document.getElementById('quiz-results');
    const questionText = document.getElementById('question-text');
    const optionsGrid = document.getElementById('options-grid');
    const scoreDisplay = document.getElementById('score-display');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const detailedFeedback = document.getElementById('detailed-feedback');
    const quizProgress = document.getElementById('quiz-progress');

    // Only run if we are on the quiz page
    if (!startQuizBtn) return;

    const allQuestions = [
        {
            question: "What is the minimum age required to vote in India?",
            options: ["16", "18", "21", "25"],
            correct: 1,
            explanation: "The voting age in India was lowered from 21 to 18 years in 1989 through the 61st Amendment."
        },
        {
            question: "What document is officially used to verify a voter's identity at the polling booth?",
            options: ["Ration Card", "Driving License", "Voter ID Card (EPIC)", "Aadhaar Card"],
            correct: 2,
            explanation: "While other IDs can sometimes be used, the Electoral Photo Identity Card (EPIC) is the primary document issued by the Election Commission."
        },
        {
            question: "What does EVM stand for in Indian elections?",
            options: ["Electoral Voting Member", "Electronic Voting Machine", "Election Validation Method", "Electronic Voter Matrix"],
            correct: 1,
            explanation: "Electronic Voting Machines (EVMs) have been used in all general and state assembly elections since 2004."
        },
        {
            question: "What does the NOTA option on an EVM allow a voter to do?",
            options: ["Vote for multiple candidates", "Reject all candidates", "Register a complaint", "Skip voting entirely"],
            correct: 1,
            explanation: "NOTA stands for 'None Of The Above', allowing voters to officially register their rejection of all contesting candidates."
        },
        {
            question: "Who is responsible for conducting free and fair elections in India?",
            options: ["The Prime Minister", "The Supreme Court", "Election Commission of India", "The President"],
            correct: 2,
            explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes."
        },
        {
            question: "When is National Voters' Day celebrated in India?",
            options: ["January 25", "August 15", "January 26", "October 2"],
            correct: 0,
            explanation: "National Voters' Day is celebrated on January 25 every year to mark the foundation day of the Election Commission of India."
        },
        {
            question: "What is the maximum number of candidates an EVM can cater to (including NOTA)?",
            options: ["16", "64", "384", "None of these"],
            correct: 2,
            explanation: "A single EVM can cater to a maximum of 384 candidates, using 24 ballot units connected together."
        },
        {
            question: "What ink is used to mark a voter's finger during elections in India?",
            options: ["Permanent marker", "Silver nitrate ink", "Iodine solution", "Invisible ink"],
            correct: 1,
            explanation: "Indelible ink containing silver nitrate is used to mark a voter's finger to prevent multiple voting."
        },
        {
            question: "VVPAT stands for:",
            options: ["Voter Verifiable Paper Audit Trail", "Voting Validation Paper Audit Trail", "Voter Verification Process and Tracking", "Valid Voter Print And Track"],
            correct: 0,
            explanation: "VVPAT provides a paper slip to the voter confirming that their vote has been correctly recorded for the intended candidate."
        },
        {
            question: "Which form is used for applying for a new Voter ID card in India?",
            options: ["Form 6", "Form 7", "Form 8", "Form 9"],
            correct: 0,
            explanation: "Form 6 is the application form for the inclusion of a name in the electoral roll for first-time voters."
        },
        {
            question: "Can an NRI (Non-Resident Indian) vote in Indian elections?",
            options: ["No, never", "Yes, but only via postal ballot", "Yes, by being physically present at their polling booth", "Yes, through internet voting"],
            correct: 2,
            explanation: "NRIs can vote in Indian elections, but they must be physically present at their designated polling station."
        },
        {
            question: "What is the Model Code of Conduct (MCC)?",
            options: ["A law passed by Parliament", "Guidelines issued by ECI for political parties and candidates", "Rules for voters to follow at the booth", "The procedure for counting votes"],
            correct: 1,
            explanation: "The MCC is a set of guidelines issued by the Election Commission of India to regulate political parties and candidates prior to elections."
        },
        {
            question: "How long does a voter get to see the VVPAT slip through the glass window before it falls?",
            options: ["3 seconds", "7 seconds", "10 seconds", "Until the next voter comes"],
            correct: 1,
            explanation: "The VVPAT slip is visible through a transparent window for about 7 seconds before it automatically cuts and falls into a sealed drop box."
        },
        {
            question: "Which form is used for correction of entries in the Electoral Roll?",
            options: ["Form 6", "Form 7", "Form 8", "Form 8A"],
            correct: 2,
            explanation: "Form 8 is used by voters to request corrections to their existing details (name, age, photo, etc.) in the electoral roll."
        },
        {
            question: "Who was the first Chief Election Commissioner of India?",
            options: ["T.N. Seshan", "Sukumar Sen", "Sunil Arora", "Rajiv Kumar"],
            correct: 1,
            explanation: "Sukumar Sen served as the first Chief Election Commissioner of India from 1950 to 1958."
        },
        {
            question: "Is voting compulsory by law in India?",
            options: ["Yes, for everyone", "Yes, for government employees", "No, it is a right but not a legal duty", "Yes, but only in national elections"],
            correct: 2,
            explanation: "While highly encouraged as a civic responsibility, voting is not legally compulsory in India."
        },
        {
            question: "What does 'EPIC' stand for?",
            options: ["Election Photo Identity Card", "Electoral Photo Identity Card", "Electronic Polling Identity Card", "Election Process Identification Card"],
            correct: 1,
            explanation: "EPIC stands for Electoral Photo Identity Card, commonly known as the Voter ID card."
        },
        {
            question: "Which of these groups can currently use the Postal Ballot facility?",
            options: ["All citizens living away from home", "Armed forces personnel and specific government officials on election duty", "Students studying in other states", "Anyone who applies online"],
            correct: 1,
            explanation: "Postal ballots are restricted to specific groups like armed forces, personnel on election duty, and in some cases, senior citizens (80+) and PwD voters."
        },
        {
            question: "Can a person who is confined in prison vote in India?",
            options: ["Yes", "No", "Only for state elections", "Only if serving a sentence of less than 1 year"],
            correct: 1,
            explanation: "Under the Representation of the People Act, a person confined in a prison (under sentence or otherwise) is not entitled to vote."
        },
        {
            question: "How are EVMs powered?",
            options: ["Direct electricity from the grid", "Solar panels", "In-built battery packs", "Generators provided at the booth"],
            correct: 2,
            explanation: "EVMs run on standard power packs (batteries) provided by the Election Commission, ensuring they work even in areas without electricity."
        }
    ];

    let questions = [];
    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    function initializeQuiz() {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        questions = shuffled.slice(0, 5);
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
    }

    function loadQuestion() {
        optionsGrid.innerHTML = '';
        quizProgress.innerText = `Question ${currentQuestion + 1}/5`;
        
        const q = questions[currentQuestion];
        questionText.innerText = q.question;
        
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerText = opt;
            btn.addEventListener('click', () => handleAnswer(index));
            optionsGrid.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex) {
        userAnswers.push(selectedIndex);
        
        if (selectedIndex === questions[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizQuestion.classList.add('hidden');
        quizResults.classList.remove('hidden');
        scoreDisplay.innerText = score;
        
        let badgeHtml = '';
        if (score <= 2) {
            badgeHtml = '<div style="margin: 1rem 0; padding: 1rem; background: rgba(255, 153, 51, 0.1); border: 1px solid var(--accent-saffron); border-radius: var(--radius-md);"><h3 style="color: var(--accent-saffron);">🌱 Beginner Voter</h3><p>Good start! Keep learning about the voting process.</p></div>';
        } else if (score <= 4) {
            badgeHtml = '<div style="margin: 1rem 0; padding: 1rem; background: rgba(11, 61, 145, 0.1); border: 1px solid var(--primary-blue); border-radius: var(--radius-md);"><h3 style="color: var(--primary-blue);">🌟 Aware Citizen</h3><p>Great job! You know your stuff.</p></div>';
        } else {
            badgeHtml = '<div style="margin: 1rem 0; padding: 1rem; background: rgba(19, 136, 8, 0.1); border: 1px solid var(--success-green); border-radius: var(--radius-md);"><h3 style="color: var(--success-green);">Responsible Voter ✅</h3><p>Perfect score! You are a highly responsible citizen.</p></div>';
        }
        
        let correctHtml = '<h4>Correct Answers:</h4><ul style="margin-bottom: 1rem; list-style: none; padding:0;">';
        let incorrectHtml = '<h4>Incorrect Answers:</h4><ul style="margin-bottom: 1rem; list-style: none; padding:0;">';
        let explanationsHtml = '<h4>Explanations:</h4><ul style="padding-left: 1.2rem;">';
        
        let hasCorrect = false;
        let hasIncorrect = false;

        questions.forEach((q, i) => {
            const userAnswerIndex = userAnswers[i];
            const isCorrect = userAnswerIndex === q.correct;
            
            if (isCorrect) {
                correctHtml += `<li style="margin-bottom: 0.5rem;">${i+1}. ${q.question} <br><span style="color: var(--success-green); font-weight: 600;">→ ${q.options[q.correct]}</span></li>`;
                hasCorrect = true;
            } else {
                incorrectHtml += `<li style="margin-bottom: 0.5rem;">${i+1}. ${q.question} <br>Your answer: <span style="color: var(--danger-red);">❌ ${q.options[userAnswerIndex]}</span> | Correct answer: <span style="color: var(--success-green); font-weight: 600;">✅ ${q.options[q.correct]}</span></li>`;
                hasIncorrect = true;
            }
            
            explanationsHtml += `<li style="margin-bottom: 0.5rem;"><strong>Q${i+1}:</strong> ${q.explanation}</li>`;
        });

        correctHtml += '</ul>';
        incorrectHtml += '</ul>';
        explanationsHtml += '</ul>';

        detailedFeedback.innerHTML = `
            ${badgeHtml}
            ${hasCorrect ? correctHtml : ''}
            ${hasIncorrect ? incorrectHtml : ''}
            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #eee;">
            ${explanationsHtml}
        `;

        // Trigger Confetti Animation
        if (typeof confetti === 'function') {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
              return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
              const timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              const particleCount = 50 * (timeLeft / duration);
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }

    startQuizBtn.addEventListener('click', () => {
        quizStart.classList.add('hidden');
        quizQuestion.classList.remove('hidden');
        initializeQuiz();
        loadQuestion();
    });

    restartQuizBtn.addEventListener('click', () => {
        quizResults.classList.add('hidden');
        quizStart.classList.remove('hidden');
    });
});
