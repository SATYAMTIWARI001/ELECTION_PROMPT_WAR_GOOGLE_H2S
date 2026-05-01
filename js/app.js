document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic & Profile System
    const loginBtn = document.getElementById('login-btn');
    const userProfileContainer = document.getElementById('user-profile-container');
    const userProfileText = document.getElementById('user-profile');
    
    const modalOverlay = document.getElementById('login-modal');
    const modalClose = document.getElementById('modal-close');
    const loginForm = document.getElementById('login-form');
    const loginNameInput = document.getElementById('login-name-input');

    // 1. Check LocalStorage on Load
    function checkProfile() {
        const storedName = localStorage.getItem('username');
        
        if (storedName) {
            if (loginBtn) loginBtn.parentElement.style.display = 'none';
            if (userProfileContainer) {
                userProfileContainer.style.display = 'inline-block';
                userProfileText.innerText = `👤 ${storedName}`;
            }
        }

        // Initialize Dashboard on index.html regardless of login status
        const dashboard = document.getElementById('user-dashboard');
        const welcome = document.getElementById('dashboard-welcome');
        if (dashboard) {
            if (storedName && welcome) {
                welcome.innerText = `Welcome, ${storedName} 👋`;
            }
            initDashboard();
        }
    }

    function initDashboard() {
        // Document Checker
        const docSelect = document.getElementById('doc-select');
        const docResult = document.getElementById('doc-result');
        if (docSelect) {
            docSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                if (!val) { docResult.innerHTML = ''; return; }
                if (['aadhaar', 'pan', 'voterid'].includes(val)) {
                    docResult.innerHTML = '<span style="color: var(--success-green);">✅ Valid for voting</span>';
                } else {
                    docResult.innerHTML = '<span style="color: var(--danger-red);">❌ Not valid for voting</span>';
                }
            });
        }

        // Daily Fact
        const facts = [
            "You can vote without a Voter ID using other approved IDs like Aadhaar or Passport.",
            "The Election Commission of India was established on 25th January 1950.",
            "NOTA (None of the Above) was introduced in Indian elections in 2013.",
            "India holds the record for the largest democratic elections in the world."
        ];
        const factText = document.getElementById('daily-fact-text');
        if (factText) {
            factText.innerText = facts[Math.floor(Math.random() * facts.length)];
        }

        // State Redirect Logic
        const stateSelect = document.getElementById('state-select');
        const stateBtn = document.getElementById('state-redirect-btn');
        if (stateSelect && stateBtn) {
            stateSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    stateBtn.href = e.target.value;
                    stateBtn.style.display = 'block';
                } else {
                    stateBtn.style.display = 'none';
                }
            });
        }

        // Checklist Logic
        const checkboxes = document.querySelectorAll('.readiness-cb');
        const progressBar = document.getElementById('readiness-progress-bar');
        const scoreText = document.getElementById('readiness-score-text');
        const suggestion = document.getElementById('readiness-suggestion');
        const journeySteps = document.querySelectorAll('#journey-tracker li');

        function updateScore() {
            let checkedCount = 0;
            checkboxes.forEach((cb, idx) => {
                if (cb.checked) {
                    checkedCount++;
                    if(journeySteps[idx]) journeySteps[idx].style.opacity = '1';
                } else {
                    if(journeySteps[idx]) journeySteps[idx].style.opacity = '0.5';
                }
            });

            const score = (checkedCount / 3) * 100;
            progressBar.style.width = `${score}%`;
            scoreText.innerText = `${Math.round(score)}% Ready to Vote`;

            if (score === 0) suggestion.innerText = "You should start by registering to vote.";
            else if (score < 100) suggestion.innerText = "Keep going! Find your polling booth next.";
            else suggestion.innerText = "You are 100% ready for election day! 🎉";
            
            if (score === 100 && journeySteps[3]) journeySteps[3].style.opacity = '1';
            else if (journeySteps[3]) journeySteps[3].style.opacity = '0.5';

            // Save state
            const state = Array.from(checkboxes).map(cb => cb.checked);
            localStorage.setItem('readiness_state', JSON.stringify(state));
        }

        // Load state
        const savedState = JSON.parse(localStorage.getItem('readiness_state'));
        if (savedState) {
            checkboxes.forEach((cb, idx) => {
                cb.checked = savedState[idx];
            });
        }
        
        checkboxes.forEach(cb => cb.addEventListener('change', updateScore));
        updateScore();
    }

    checkProfile();

    // 2. Open / Close Modal
    if (loginBtn && modalOverlay && modalClose) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
        });

        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // 3. Handle Login Submit
    if (loginForm && loginNameInput) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = loginNameInput.value.trim();
            if (name) {
                localStorage.setItem('username', name);
                window.location.href = 'index.html'; // Redirect to homepage
            }
        });
    }

    // 4. Set Active Nav Link based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileLinks = document.querySelectorAll('.mobile-bottom-nav a');

    function setActiveLinks(links) {
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveLinks(navLinks);
    setActiveLinks(mobileLinks);

    // 5. Global Gov-Link Interceptor
    document.addEventListener('click', (e) => {
        // Find if click was on or inside a gov-link
        const govLink = e.target.closest('.gov-link');
        if (govLink && !govLink.id.includes('service-modal')) {
            e.preventDefault();
            const href = govLink.getAttribute('href');
            if (href && href !== '#') {
                if (confirm("You are being redirected to an official government website. Do you want to continue?")) {
                    window.open(href, '_blank');
                }
            }
        }
    });

    // 6. AI Service Action Modal Logic
    const serviceTriggers = document.querySelectorAll('.ai-service-trigger');
    const serviceModal = document.getElementById('ai-service-modal');
    const serviceClose = document.getElementById('service-modal-close');
    const serviceTitle = document.getElementById('service-modal-title');
    const serviceBody = document.getElementById('service-modal-body');
    const serviceActionBtn = document.getElementById('service-modal-action-btn');
    const serviceLoading = document.getElementById('service-modal-loading');

    const serviceData = {
        'eligibility': {
            title: 'Check Eligibility',
            url: 'https://voters.eci.gov.in/',
            body: `<strong>How it works:</strong><br>You must be an Indian citizen, 18 years or older as of the qualifying date, and ordinarily resident of the polling area.<br><br><strong>Steps:</strong><ul><li>Keep your Date of Birth proof ready.</li><li>Check the official ECI portal for age cutoffs.</li></ul><br>💡 <em>Tip: You can apply in advance if you are turning 18 soon!</em>`
        },
        'register': {
            title: 'Register to Vote',
            url: 'https://voters.eci.gov.in/',
            body: `<strong>How it works:</strong><br>Form 6 is used to register a new voter. You can file it entirely online.<br><br><strong>Steps:</strong><ul><li>Go to the portal and create an account.</li><li>Fill out Form 6.</li><li>Upload your photo and address proof.</li></ul><br>💡 <em>Tip: Keep scanned copies of Aadhaar/Passport ready (under 2MB).</em>`
        },
        'booth': {
            title: 'Find Polling Booth',
            url: 'https://electoralsearch.eci.gov.in/',
            body: `<strong>How it works:</strong><br>Your polling booth is assigned based on the address you provided during registration.<br><br><strong>Steps:</strong><ul><li>Enter your EPIC (Voter ID) number.</li><li>Or search by your personal details.</li><li>The portal will show your exact Part Number and Booth Name.</li></ul><br>💡 <em>Tip: Screenshot your booth slip before leaving home!</em>`
        },
        'status': {
            title: 'Check Voter Status',
            url: 'https://electoralsearch.eci.gov.in/',
            body: `<strong>How it works:</strong><br>It takes a few weeks to process a new application. You can track it online.<br><br><strong>Steps:</strong><ul><li>Use the Reference ID provided during registration.</li><li>Enter it in the tracking portal.</li></ul><br>💡 <em>Tip: If it says 'Accepted', you can download the e-EPIC immediately.</em>`
        },
        'update': {
            title: 'Update Details',
            url: 'https://voters.eci.gov.in/',
            body: `<strong>How it works:</strong><br>Form 8 is used for shifting residence, correcting entries, or replacing a lost EPIC.<br><br><strong>Steps:</strong><ul><li>Login to the portal.</li><li>Select Form 8.</li><li>Submit the required proof for the change.</li></ul><br>💡 <em>Tip: Updating mobile numbers is essential for downloading e-EPIC!</em>`
        }
    };

    if (serviceModal && serviceTriggers.length > 0) {
        serviceTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceKey = btn.getAttribute('data-service');
                const data = serviceData[serviceKey];
                
                if (data) {
                    serviceTitle.innerText = data.title;
                    serviceBody.style.display = 'none';
                    serviceActionBtn.style.display = 'none';
                    serviceLoading.style.display = 'block';
                    
                    serviceActionBtn.setAttribute('href', data.url);
                    
                    serviceModal.classList.add('active');

                    // Mock AI delay
                    setTimeout(() => {
                        serviceLoading.style.display = 'none';
                        serviceBody.innerHTML = data.body;
                        serviceBody.style.display = 'block';
                        serviceActionBtn.style.display = 'block';
                    }, 800);
                }
            });
        });

        if (serviceClose) {
            serviceClose.addEventListener('click', () => {
                serviceModal.classList.remove('active');
            });
        }
        
        serviceActionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = serviceActionBtn.getAttribute('href');
            if (confirm("You are being redirected to an official government website. Do you want to continue?")) {
                window.open(href, '_blank');
                serviceModal.classList.remove('active');
            }
        });
    }

    // 7. Mock Constituency PIN Search
    const pinBtn = document.getElementById('pin-search-btn');
    const pinInput = document.getElementById('pin-input');
    const constResult = document.getElementById('constituency-result');
    if (pinBtn && pinInput && constResult) {
        pinBtn.addEventListener('click', () => {
            if (pinInput.value.length > 3) {
                constResult.style.display = 'block';
            } else {
                alert("Please enter a valid PIN code.");
            }
        });
    }
});
