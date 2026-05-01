/**
 * dashboard.js
 * Handles the logic for the JanVote AI Dashboard, including
 * the dropdown menu, the rotating quick tips, and the offline chatbot.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. User Profile Setup ---
    const username = localStorage.getItem('username') || 'User';
    const email = localStorage.getItem('user_email') || 'Not provided';
    const firstInitial = username.charAt(0).toUpperCase();

    // Populate Navbar
    document.getElementById('navFirstName').innerText = username.split(' ')[0];
    document.getElementById('navAvatarInit').innerText = firstInitial;
    document.getElementById('heroWelcomeText').innerText = `Welcome back, ${username.split(' ')[0]}! 🗳️`;

    // Populate Profile Card
    document.getElementById('profileFullName').innerText = username;
    document.getElementById('profileEmail').innerText = email;
    document.getElementById('profileAvatarInit').innerText = firstInitial;

    // Load saved phone/location and color if available
    const savedPhone = localStorage.getItem('user_phone');
    const savedLocation = localStorage.getItem('user_location');
    const savedColor = localStorage.getItem('user_avatar_color') || '#1a237e'; // Default navy

    // Apply color to avatars
    document.getElementById('navAvatarInit').style.backgroundColor = savedColor;
    document.getElementById('profileAvatarInit').style.backgroundColor = savedColor;

    if (savedPhone || savedLocation) {
        document.getElementById('profileExtraDetails').style.display = 'block';
        if (savedPhone) {
            const phoneEl = document.getElementById('profilePhoneDisplay');
            phoneEl.style.display = 'inline-block';
            phoneEl.innerText = `📞 ${savedPhone}`;
        }
        if (savedLocation) {
            const locEl = document.getElementById('profileLocationDisplay');
            locEl.style.display = 'inline-block';
            locEl.innerText = `📍 ${savedLocation}`;
        }
    }

    // --- 1.5 Profile Editor Logic ---
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    
    const viewMode = document.getElementById('profileViewMode');
    const editMode = document.getElementById('profileEditMode');
    
    // Inputs
    const editName = document.getElementById('editNameInput');
    const editEmail = document.getElementById('editEmailInput');
    const editPhone = document.getElementById('editPhoneInput');
    const editLocation = document.getElementById('editLocationInput');

    // Errors
    const errName = document.getElementById('editNameError');
    const errEmail = document.getElementById('editEmailError');
    const errPhone = document.getElementById('editPhoneError');

    // Toggle to Edit Mode
    editBtn.addEventListener('click', () => {
        // Pre-fill inputs
        editName.value = localStorage.getItem('username') || 'User';
        editEmail.value = localStorage.getItem('user_email') || '';
        editPhone.value = localStorage.getItem('user_phone') || '';
        editLocation.value = localStorage.getItem('user_location') || '';
        
        // Hide errors
        errName.style.display = 'none';
        errEmail.style.display = 'none';
        errPhone.style.display = 'none';

        // Select the active color
        const activeColor = localStorage.getItem('user_avatar_color') || '#1a237e';
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.style.boxShadow = 'none';
            if (opt.dataset.color === activeColor) {
                opt.classList.add('selected');
                opt.style.boxShadow = '0 0 0 2px #ccc';
            }
        });

        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    });

    // Toggle to View Mode
    cancelBtn.addEventListener('click', () => {
        editMode.style.display = 'none';
        viewMode.style.display = 'block';
    });

    // Color Selector
    let selectedColor = savedColor;
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(o => o.style.boxShadow = 'none');
            this.style.boxShadow = '0 0 0 2px #ccc';
            selectedColor = this.dataset.color;
        });
    });

    // Save Profile
    saveBtn.addEventListener('click', () => {
        let valid = true;
        
        // Validate Name
        if (!editName.value.trim()) {
            errName.style.display = 'block';
            valid = false;
        } else { errName.style.display = 'none'; }
        
        // Validate Email (Basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editEmail.value.trim())) {
            errEmail.style.display = 'block';
            valid = false;
        } else { errEmail.style.display = 'none'; }
        
        // Validate Phone (Numbers only)
        if (editPhone.value.trim() && !/^\\d+$/.test(editPhone.value.trim().replace(/[\\s\\-()]/g, ''))) {
            errPhone.style.display = 'block';
            valid = false;
        } else { errPhone.style.display = 'none'; }

        if (!valid) return;

        // Visual Loading
        const originalText = saveBtn.innerText;
        saveBtn.innerText = '💾 Saving...';
        saveBtn.disabled = true;

        setTimeout(() => {
            // Save to localStorage
            localStorage.setItem('username', editName.value.trim());
            localStorage.setItem('user_email', editEmail.value.trim());
            if(editPhone.value.trim()) localStorage.setItem('user_phone', editPhone.value.trim());
            else localStorage.removeItem('user_phone');
            
            if(editLocation.value.trim()) localStorage.setItem('user_location', editLocation.value.trim());
            else localStorage.removeItem('user_location');

            localStorage.setItem('user_avatar_color', selectedColor);

            // Update UI instantly
            const newName = editName.value.trim();
            const newInit = newName.charAt(0).toUpperCase();

            document.getElementById('navFirstName').innerText = newName.split(' ')[0];
            document.getElementById('navAvatarInit').innerText = newInit;
            document.getElementById('navAvatarInit').style.backgroundColor = selectedColor;
            
            document.getElementById('heroWelcomeText').innerText = `Welcome back, ${newName.split(' ')[0]}! 🗳️`;

            document.getElementById('profileFullName').innerText = newName;
            document.getElementById('profileEmail').innerText = editEmail.value.trim();
            document.getElementById('profileAvatarInit').innerText = newInit;
            document.getElementById('profileAvatarInit').style.backgroundColor = selectedColor;

            const finalPhone = editPhone.value.trim();
            const finalLoc = editLocation.value.trim();
            
            if (finalPhone || finalLoc) {
                document.getElementById('profileExtraDetails').style.display = 'block';
                const pEl = document.getElementById('profilePhoneDisplay');
                if (finalPhone) { pEl.style.display = 'inline-block'; pEl.innerText = `📞 ${finalPhone}`; }
                else { pEl.style.display = 'none'; }
                
                const lEl = document.getElementById('profileLocationDisplay');
                if (finalLoc) { lEl.style.display = 'inline-block'; lEl.innerText = `📍 ${finalLoc}`; }
                else { lEl.style.display = 'none'; }
            } else {
                document.getElementById('profileExtraDetails').style.display = 'none';
            }

            // Restore state
            saveBtn.innerText = originalText;
            saveBtn.disabled = false;
            
            // Show toast (temporary div)
            const toast = document.createElement('div');
            toast.innerText = '✅ Profile updated successfully!';
            toast.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#4CAF50; color:white; padding:10px 20px; border-radius:8px; z-index:9999; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2); transition:opacity 0.3s;';
            document.body.appendChild(toast);
            
            setTimeout(() => { toast.style.opacity = '0'; setTimeout(()=>toast.remove(), 300); }, 3000);

            // Switch view
            editMode.style.display = 'none';
            viewMode.style.display = 'block';

        }, 600); // Simulate network delay
    });

    // --- 2. Dropdown Logic ---
    const dropdownToggle = document.getElementById('userDropdownToggle');
    const dropdownMenu = document.getElementById('userDropdownMenu');

    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'login.html';
    });

    // --- 3. Quick Tips Rotator ---
    const tips = [
        "Over 150 million Americans voted in 2020.",
        "The first US election was held in 1788.",
        "18 is the minimum voting age in the US.",
        "Election day is always a Tuesday.",
        "Local elections impact your daily life the most!"
    ];
    const tipElement = document.getElementById('quickTipText');
    let tipIndex = 0;

    setInterval(() => {
        tipIndex = (tipIndex + 1) % tips.length;
        tipElement.innerText = `"${tips[tipIndex]}"`;
    }, 5000); // Rotates every 5 seconds


    // --- 4. OFFLINE CHATBOT LOGIC ---

    const chatWindow = document.get    // 30 Hardcoded Questions Database
    const qaDatabase = {
        "How do I register to vote?": "To register visit vote.gov or your state election website. You need your name, address, date of birth, and ID number. Most states allow online registration. Register at least 15-30 days before election day!",
        "What is the voter registration deadline?": "Most states require registration 15-30 days before election day. Some states allow same-day registration. Always check your state's official election website for your exact deadline.",
        "Am I eligible to vote?": "You are eligible if you are:\n✅ A US citizen\n✅ At least 18 years old on election day\n✅ A resident of your registered state\n✅ Not serving a felony sentence\nMeet all four? You can vote!",
        "What ID do I need to vote?": "Most states accept:\n✅ Driver's license\n✅ State ID card\n✅ Passport\n✅ Military ID\nSome states accept utility bills too.\nCheck your state's specific rules!",
        "Where do I go to vote?": "You vote at your assigned polling station based on your registered address. Find yours at vote.gov by entering your address. Many states also mail you a voter card showing your exact polling location.",
        "What time do polls open and close?": "Most polls open between 6am-7am and close between 7pm-8pm on election day. Times vary by state. If you are in line before closing time you must be allowed to vote!",
        "What happens on election day?": "On election day you:\n1️⃣ Go to your polling station with ID\n2️⃣ Check in with election worker\n3️⃣ Receive your official ballot\n4️⃣ Vote privately in a booth\n5️⃣ Submit your ballot\n6️⃣ Get your I Voted sticker! 🎉",
        "How do I cast my vote?": "Go to your polling station with your ID.\nCheck in and receive your ballot.\nGo to a private booth and mark choices.\nReview everything carefully.\nSubmit your ballot in the machine or box.\nYou are done — great job!",
        "What is early voting?": "Early voting lets you vote before official election day. It starts 1-2 weeks early. Go to an early voting location, show ID, and vote just like on election day. Perfect for avoiding long lines!",
        "What is mail-in voting?": "Mail-in voting lets you vote from home!\nRequest a ballot from your election office.\nFill it out at home carefully.\nMail it back before the deadline or drop at an official ballot drop box.\nSafe, legal, and fully secure!",
        "How are votes counted?": "After polls close all ballots are collected. Secure scanning machines count them accurately and quickly. Mail-in ballots may take extra days. All counting is watched by representatives from all parties to ensure complete fairness.",
        "When are results announced?": "Preliminary results come election night. Final official results may take days or weeks for close races or many mail-in ballots. Official results are certified by states within 2-4 weeks after election day.",
        "What is the electoral college?": "The Electoral College elects the President. Each state gets electoral votes equal to its senators plus representatives. 538 total electoral votes exist. A candidate needs 270 votes to win! Your presidential vote chooses electors who then cast electoral votes.",
        "What is a primary election?": "A primary happens before the general election. Democrats choose their candidate. Republicans choose their candidate. Winners then compete against each other in the main general election. Primaries narrow down the field!",
        "What is Congress?": "Congress makes US laws. It has two parts:\n🏛️ Senate: 100 senators, 2 per state, 6-year terms\n🏛️ House: 435 members based on state population, 2-year terms\nBoth parts must agree to pass a law!",
        "How long is a presidential term?": "The US President serves a 4-year term. Maximum 2 terms — 8 years total. Presidential elections happen every 4 years always on the first Tuesday after the first Monday in November!",
        "Why is voting important?": "Voting is your most powerful right!\n✅ You choose your leaders directly\n✅ You influence laws affecting your life\n✅ Healthcare, education, taxes all depend on who gets elected\n✅ Many elections decided by few votes\nEvery single vote truly matters!",
        "What if I make a mistake on my ballot?": "Tell an election worker immediately BEFORE submitting your ballot. They will give you a fresh new ballot. Once submitted you cannot change it. Always review your choices carefully before submitting!",
        "Can I register online?": "Yes! Most states offer online registration at vote.gov or your state election website. You need a valid driver's license or state ID to register online. A few states still require paper registration by mail.",
        "What is a polling station?": "A polling station is the official location where you cast your ballot on election day. Usually set up in schools, community centers, libraries, or fire stations. Each voter is assigned one based on their home address.",
        "What is a recount?": "A recount happens when a race is very close usually within 0.5% of total votes. All ballots are counted again carefully. Watched by all party representatives to ensure complete fairness and accuracy.",
        "What is absentee voting?": "Absentee voting is another name for mail-in voting. Any eligible voter can request an absentee ballot in most states. Fill it out at home and return by mail or official drop box. Completely legal and fully secure!",
        "Can I vote if I moved recently?": "Update your registration to your new address at vote.gov first. Deadlines are same as new registration deadlines. Some states allow election day address updates. Always update before the deadline!",
        "What is a ballot?": "A ballot is the official document you use to cast your votes. It lists all races and candidates you can vote for. Can be paper you mark by hand or electronic touchscreen. All ballots are secure official government documents.",
        "How does the president get elected?": "The presidential election process:\n1️⃣ Primaries — parties pick candidates\n2️⃣ Conventions — candidates made official\n3️⃣ Campaigns — debates and rallies\n4️⃣ Election Day — citizens vote\n5️⃣ Electoral College votes in December\n6️⃣ Congress certifies in January\n7️⃣ Inauguration on January 20th!",
        "What is voter suppression?": "Voter suppression means any illegal tactic used to stop eligible voters from voting. Spreading false info about election rules or locations is suppression. It is illegal in the United States. Report it to your state election authority immediately!",
        "What is a swing state?": "A swing state is where both major parties have similar support levels. The winner is hard to predict. These states often decide presidential elections. Examples: Pennsylvania, Michigan, Wisconsin, Arizona, and Georgia.",
        "How many people vote in US elections?": "Voter turnout varies by election:\n🗳️ 2020 Presidential: 159 million voters — 66% of eligible voters — highest turnout in over 100 years!\n📊 Midterm elections: 40-50% turnout\n🏘️ Local elections: sometimes only 20%\nYour vote matters more in low turnout!",
        "When is election day in the US?": "Election Day is always the first Tuesday after the first Monday in November. Presidential elections every 4 years. Midterm elections every 2 years. Local elections vary by city and state. Mark your calendar every November!",
        "What happens after the election?": "After election day:\n✅ Votes counted and tallied\n✅ Results reported publicly\n✅ States certify official results\n✅ Electoral College meets in December\n✅ Congress certifies in January\n✅ Inauguration on January 20th\nThe full process takes about 2-3 months!"
    };

    // Show Welcome Message
    setTimeout(() => {
        const welcomeText = `👋 Hello ${username.split(' ')[0]}! I am JanVote AI.\nClick any question below to learn about elections and voting! 🗳️`;
        addMessage(welcomeText, 'ai');
    }, 500);

    // Handle Chip Clicks (Only input method now)
    chatChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const questionText = chip.innerText.trim();
            
            // 1. Add user message to UI
            addMessage(questionText, 'user');
            
            // 2. Show typing indicator
            const typingId = addTypingIndicator();

            // 3. Process answer offline
            setTimeout(() => {
                // Remove typing indicator
                const typingEl = document.getElementById(typingId);
                if(typingEl) typingEl.remove();

                // Get exact offline answer
                const answerText = qaDatabase[questionText] || "For this information please visit your official government election website at vote.gov 🗳️";
                
                // Show AI answer
                addMessage(answerText, 'ai');
            }, 800); // 800ms delay as requested
        });
    });

    // Helper: Add Message to UI
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-message`;

        const timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        let metaHtml = '';
        if (sender === 'ai') {
            metaHtml = `<div class="message-meta">🗳️ JanVote AI • ${timeString}</div>`;
            msgDiv.innerHTML = `
                ${metaHtml}
                <div class="ai-bubble">${formatText(text)}</div>
            `;
        } else {
            metaHtml = `<div class="message-meta">${timeString} • 👤 ${username.split(' ')[0]}</div>`;
            msgDiv.innerHTML = `
                <div class="user-bubble">${text}</div>
                ${metaHtml}
            `;
        }

        chatWindow.appendChild(msgDiv);
        scrollToBottom();
    }

    // Helper: Typing Indicator
    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ai-message`;
        msgDiv.id = id;
        
        const timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        msgDiv.innerHTML = `
            <div class="message-meta">🗳️ JanVote AI • ${timeString}</div>
            <div class="ai-bubble typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatWindow.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    // Helper: Scroll to bottom
    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Helper: Simple markdown formatting
    function formatText(text) {
        // Convert basic newlines to <br>
        let formatted = text.replace(/\n/g, '<br>');
        // Convert pseudo-bullet points
        formatted = formatted.replace(/✅/g, '<br>✅');
        formatted = formatted.replace(/1️⃣/g, '<br>1️⃣');
        formatted = formatted.replace(/2️⃣/g, '<br>2️⃣');
        formatted = formatted.replace(/3️⃣/g, '<br>3️⃣');
        formatted = formatted.replace(/4️⃣/g, '<br>4️⃣');
        formatted = formatted.replace(/5️⃣/g, '<br>5️⃣');
        formatted = formatted.replace(/6️⃣/g, '<br>6️⃣');
        formatted = formatted.replace(/7️⃣/g, '<br>7️⃣');
        formatted = formatted.replace(/🏛️/g, '<br>🏛️');
        formatted = formatted.replace(/🗳️/g, '<br>🗳️');
        formatted = formatted.replace(/📊/g, '<br>📊');
        formatted = formatted.replace(/🏘️/g, '<br>🏘️');
        // Clean up any double br created at the start if needed
        if(formatted.startsWith('<br>')) {
            formatted = formatted.substring(4);
        }
        return formatted;
    }

});
