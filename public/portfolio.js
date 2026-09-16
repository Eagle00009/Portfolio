
        // Mobile Menu Toggle
        const btn = document.getElementById('menu-btn');
        const nav = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                nav.classList.add('hidden');
                (this.getAttribute('href') === '#' ? document.body : document.querySelector(this.getAttribute('href')))?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-2xl');
                navbar.classList.add('bg-dark/95');
            } else {
                navbar.classList.remove('shadow-2xl');
                navbar.classList.remove('bg-dark/95');
            }
        });

        /* --- AI Chatbot Logic --- */
        // ⚠️ SECURITY WARNING: Putting your API key here makes it visible to anyone who views your website source code.
        // It is recommended to restrict this key in Google Cloud Console to your specific domain (e.g., your-portfolio.vercel.app).


        const chatToggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const messagesArea = document.getElementById('messages-area');
        const chatForm = document.getElementById('chat-form');
        const userInput = document.getElementById('user-input');

        // Jeevesh's Resume Context
        const portfolioContext = "You are the assistant for Jeevesh Singh's portfolio. Be concise and use only the facts below; say when details are unavailable.\nPROFILE: Jeevesh Singh, Noida, Uttar Pradesh. Email: singhjeevesh2005@gmail.com. Phone: +91 9628290979.\nCURRENT ROLE: Implementation Engineer at CBO ERP Limited, February 2026 to Present. Implemented ERP solutions for 10+ manufacturing client organizations. Business requirements, workflow mapping, ERP configuration, master and transactional data validation/cleaning/migration using Advanced Excel, UAT, issue resolution with cross-functional teams, reporting, reconciliation, user training, go-live and post-implementation support.\nEDUCATION: B.Tech in Electronics and Communication Engineering, ABES Engineering College, 2022–2026. Class XII, Mahamana Malviya Inter College, Varanasi, UP, 2020–2021. Do not infer a graduation status or grades.\nSKILLS: Python, SQL, C, Pandas, NumPy, data cleaning, EDA, Power BI, DAX, Advanced Excel, Google Sheets, SQL queries/joins/aggregations, Jupyter Notebook, Git, CodeChef, HackerRank, dashboard development, data storytelling, problem solving.\nCURRENT PROJECT: AI Chatbot for Implementation Work — In Development. The user confirmed it is for implementation work. Technology stack, specific features, completion date and demo are not yet specified. Do not claim this project is complete or assume it is this portfolio assistant.\nPROJECTS: Predict Blood Donation using Machine Learning (Aug 2025): Blood Transfusion dataset, 748 records, Python/Pandas/NumPy/Scikit-learn/TPOT, cleaning, log transformation, EDA; compared Logistic Regression and TPOT, Logistic Regression ROC AUC 0.78. Indian Job Market Post-COVID Dashboard (Jul 2025): Power BI, Advanced Excel, DAX measures, slicers, maps, industry/role/skill demand and regional trends.\nADDITIONAL PORTFOLIO WORK: Sales Dashboard, Guardian Drive, Smart Plant Monitor, Smart Dustbin. Earlier internships: MedTourEasy Data Analytics Trainee, July–Aug 2025; UPPCL Engineering Intern, July 2025.\nLEADERSHIP: Light De Literacy NGO Overall Coordinator, Dec 2022–Present: 5+ drives, 200+ participants, awareness increased 60%. Eco-NSS Event Head, Oct 2023–Jun 2025: plantation, clean-up and sustainability events, participation increased 50%.\nCERTIFICATES: Google Data Analytics (Coursera), Power BI Desktop (Udemy), Python Basic and Problem Solving Basic (HackerRank).\nThe latest downloadable resume was supplied as RESUME 02-09-26.pdf. Do not invent additional experience or achievements.";

        // Toggle Chat Window
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');
            chatToggle.classList.add('hidden');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            chatToggle.classList.remove('hidden');
        });

        // Chat Functionality
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = userInput.value.trim();
            if (!message) return;

            // Add User Message
            addMessage(message, 'user');
            userInput.value = '';

            // Show Loading
            const loadingId = addLoading();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: message }]
                        }],
                        systemInstruction: {
                            parts: [{ text: portfolioContext }]
                        }
                    })
                });

                const data = await response.json();
                removeLoading(loadingId);

                if (data.error) {
                    throw new Error(data.error.message);
                }

                const aiText = data.candidates[0].content.parts[0].text;
                addMessage(aiText, 'ai');

            } catch (error) {
                removeLoading(loadingId);
                addMessage("Oops! Something went wrong. Please check the API Key configuration or try again.", 'ai');
                console.error(error);
            }
        });

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.className = `flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`;

            const avatar = sender === 'ai'
                ? `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"><i class="fas fa-user-astronaut"></i></div>`
                : `<div class="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"><i class="fas fa-user"></i></div>`;

            const bubbleClass = sender === 'ai'
                ? 'bg-slate-800/80 border border-slate-700 text-slate-200'
                : 'bg-blue-600 text-white';

            // Parse Markdown for AI responses
            const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const content = safeText;

            div.innerHTML = `
                ${avatar}
                <div class="${bubbleClass} p-3 rounded-2xl ${sender === 'ai' ? 'rounded-tl-none' : 'rounded-tr-none'} text-sm max-w-[80%] overflow-hidden">
                    ${content}
                </div>
            `;

            messagesArea.appendChild(div);
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }

        function addLoading() {
            const id = 'loading-' + Date.now();
            const div = document.createElement('div');
            div.id = id;
            div.className = 'flex gap-3';
            div.innerHTML = `
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white"><i class="fas fa-user-astronaut"></i></div>
                <div class="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tl-none text-sm text-slate-200 flex gap-1 items-center h-10">
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                </div>
            `;
            messagesArea.appendChild(div);
            messagesArea.scrollTop = messagesArea.scrollHeight;
            return id;
        }

        function removeLoading(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }
