document.addEventListener('DOMContentLoaded', () => {
    // --- AI Chat Logic ---
    const chatWindow = document.getElementById('chat-window');
    const promptChips = document.querySelectorAll('.prompt-chip');

    if (!chatWindow) return;

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
            let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            formattedText = formattedText.replace(/\n/g, '<br>');
            formattedText = formattedText.replace(/✅/g, '<br>✅');
            formattedText = formattedText.replace(/1️⃣/g, '<br>1️⃣');
            formattedText = formattedText.replace(/2️⃣/g, '<br>2️⃣');
            formattedText = formattedText.replace(/3️⃣/g, '<br>3️⃣');
            formattedText = formattedText.replace(/4️⃣/g, '<br>4️⃣');
            formattedText = formattedText.replace(/5️⃣/g, '<br>5️⃣');
            formattedText = formattedText.replace(/6️⃣/g, '<br>6️⃣');
            formattedText = formattedText.replace(/7️⃣/g, '<br>7️⃣');
            if(formattedText.startsWith('<br>')) formattedText = formattedText.substring(4);
            contentDiv.innerHTML = formattedText;
        } else {
            contentDiv.innerText = text;
        }

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    // 30 Hardcoded Questions Database
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

    function sendMessage(text) {
        if (!text.trim()) return;

        // User message
        addMessage(text, 'user');
        
        chatHistory.push({ role: "user", parts: [{ text: text }] });

        // Show typing indicator
        const loadingEl = addMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'ai');

        setTimeout(() => {
            // Remove typing indicator
            loadingEl.remove();

            // Find exact match or default fallback
            let answerText = qaDatabase[text.trim()];
            
            if (!answerText) {
                // simple fallback
                answerText = "For this information please visit your official government election website at vote.gov 🗳️";
            }

            addMessage(answerText, 'ai');
            chatHistory.push({ role: "model", parts: [{ text: answerText }] });

        }, 800); // Mock AI delay
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            sendMessage(chip.innerText);
        });
    });

});
