document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LIGHT/DARK THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check local storage preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleIcon) {
            themeToggleIcon.className = 'fas fa-sun';
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeToggleIcon) {
            themeToggleIcon.className = 'fas fa-moon';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            if (themeToggleIcon) {
                themeToggleIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            // Toggle hamburger animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Scroll Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       HERO TYPING TEXT CAROUSEL
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const phrases = [
        "Time-Series Forecasting Pipelines",
        "Machine Learning Classification Models",
        "Data Preprocessing & EDA Workflows",
        "Data-Driven Solutions"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // normal typing
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    if (typingSpan) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       EXPERIENCE SECTION TABS
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });

            // Deactivate all panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // Activate current
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       FEATURED PROJECTS FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Active button class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter project cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                    // Add subtle fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       INTERACTIVE TERMINAL SIMULATOR
       ========================================================================== */
    const terminalInput = document.getElementById('terminalInput');
    const terminalHistory = document.getElementById('terminalHistory');
    const terminalWindow = document.getElementById('terminalWindow');

    const terminalCommands = {
        help: `
            <span class="text-cyan">Available commands:</span><br>
            - <span class="text-white">about</span>        : Brief introduction of my background<br>
            - <span class="text-white">skills</span>       : Technical skills overview<br>
            - <span class="text-white">experience</span>   : Corporate & research internships list<br>
            - <span class="text-white">projects</span>     : Details on Machine Learning systems<br>
            - <span class="text-white">achievements</span> : Algorithmic metrics & credentials<br>
            - <span class="text-white">messages</span>     : View messages submitted via contact form<br>
            - <span class="text-white">codolio</span>      : View Codolio coding profile and metrics<br>
            - <span class="text-white">contact</span>      : Direct contacts and channels<br>
            - <span class="text-white">clear</span>        : Empty the shell terminal logs
        `,
        about: `
            <span class="text-green">Bio:</span> Raghav Goyal is a B.Tech student in Computer Science & Engineering 
            (Data Science) at SKIT Jaipur (CGPA: 8.8). He specializes in building Python data processing workflows, 
            time-series demand forecasting pipelines (93.72% R²), and machine learning signal classification models.
        `,
        skills: `
            <span class="text-green">Languages:</span> C++, Python, SQL<br>
            <span class="text-green">CS Fundamentals:</span> Data Structures & Algorithms, OOP, DBMS<br>
            <span class="text-green">Machine Learning:</span> Scikit-learn, Supervised & Unsupervised Learning, Feature Engineering, Model Evaluation, Cross Validation<br>
            <span class="text-green">Data Analysis:</span> Pandas, NumPy, EDA, Data Cleaning, Data Visualization<br>
            <span class="text-green">Databases:</span> MySQL<br>
            <span class="text-green">Tools:</span> Git, GitHub, Jupyter, Antigravity, VS Code
        `,
        experience: `
            1. <span class="text-white">Celebal Technologies</span> (May 2026 – July 2026, Jaipur)<br>
               Role: Data Science Intern<br>
               Focus: Python data processing workflows, modular ML preprocessing pipelines, EDA.<br><br>
            2. <span class="text-white">Svaarogym Medical Devices Pvt. Ltd. (MNIT)</span> (June 2025 – July 2025, Jaipur)<br>
               Role: Machine Learning Intern<br>
               Focus: Physiological signal analysis, feature extraction, classification model evaluation.
        `,
        projects: `
            1. <span class="text-cyan">Multi-Series Retail Demand Forecasting</span>: Forecasted 500 store-item combinations using XGBoost/LightGBM (93.72% R²).<br>
            2. <span class="text-cyan">Customer Churn Prediction</span>: ColumnTransformer pipeline & Precision-Recall optimization (Recall: 70.0% -> 87.5%).<br>
            3. <span class="text-cyan">PainMeter – Pain Assessment</span>: Machine learning pipeline for physiological signal classification.
        `,
        achievements: `
            1. <span class="text-white">Algorithmic Proficiency:</span> Solved 500+ DSA problems across LeetCode & GeeksforGeeks.<br>
            2. <span class="text-white">Professional Credential:</span> Earned HackerRank SQL Certification.<br>
            3. <span class="text-white">Leadership & Teamwork:</span> Coordinated college annual fest operations & logistics.
        `,
        contact: `
            <span class="text-cyan">Direct Channels:</span><br>
            - <span class="text-white">Email:</span> <a href="mailto:raghavgoyal6046@gmail.com" class="text-green">raghavgoyal6046@gmail.com</a><br>
            - <span class="text-white">Phone:</span> +91-6375498396<br>
            - <span class="text-white">GitHub:</span> <a href="https://github.com/RaghavGoyal6046" target="_blank" class="text-green">github.com/RaghavGoyal6046</a><br>
            - <span class="text-white">LinkedIn:</span> <a href="https://linkedin.com/in/raghav-goyal-2b6245326" target="_blank" class="text-green">linkedin.com/in/raghav-goyal-2b6245326</a>
        `,
        codolio: `
            <span class="text-green">Codolio Profile:</span> Aggregates competitive programming data & metrics.<br>
            - <span class="text-white">Profile URL:</span> <a href="https://codolio.com/profile/RaghavGoyal5105/card" target="_blank" class="text-cyan">codolio.com/profile/RaghavGoyal5105</a><br>
            - <span class="text-white">Total Solved:</span> 500+ Problems (across platforms)<br>
            - <span class="text-white">Skills:</span> Data Structures & Algorithms, Problem Solving, SQL
        `,
        messages: () => {
            const list = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            if (list.length === 0) {
                return `<span class="text-muted">No messages found. Try sending a message via the Contact Form first!</span>`;
            }
            return list.map((msg, idx) => `
                <div style="border-bottom: 1px dashed var(--border-color); padding: 0.6rem 0; margin-bottom: 0.4rem;">
                    <span class="text-cyan">[Message #${idx + 1}]</span> - <span class="text-muted">${msg.time}</span><br>
                    <span class="text-white">From:</span> ${msg.name} (&lt;${msg.email}&gt;)<br>
                    <span class="text-white">Subject:</span> ${msg.subject}<br>
                    <span class="text-white">Message:</span> ${msg.message}
                </div>
            `).join('');
        }
    };

    if (terminalInput && terminalHistory) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Create terminal row for user query
                const userLine = document.createElement('div');
                userLine.className = 'terminal-line';
                userLine.innerHTML = `<span class="terminal-prompt">raghav@portfolio:~$</span> <span class="text-white">${value}</span>`;
                terminalHistory.appendChild(userLine);

                if (value === '') {
                    // Empty enter key
                } else if (value === 'clear') {
                    terminalHistory.innerHTML = '';
                } else if (terminalCommands[value]) {
                    const responseLine = document.createElement('div');
                    responseLine.className = 'terminal-line';
                    const cmdResult = typeof terminalCommands[value] === 'function' 
                        ? terminalCommands[value]() 
                        : terminalCommands[value];
                    responseLine.innerHTML = cmdResult;
                    terminalHistory.appendChild(responseLine);
                } else {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-line';
                    errorLine.innerHTML = `<span class="text-red">Command not found: '${value}'. Type 'help' to see list of valid commands.</span>`;
                    terminalHistory.appendChild(errorLine);
                }

                // Auto Scroll to bottom
                terminalWindow.scrollTop = terminalWindow.scrollHeight;
            }
        });

        // Ensure clicking anywhere in terminal window focuses input
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    /* ==========================================================================
       CONTACT FORM VALIDATION & SIMULATED SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formSubmitBtn && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple front-end validation
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all details before submitting.', 'error');
                return;
            }

            // Save message to localStorage for viewing via terminal
            const messagesList = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            messagesList.push({
                name,
                email,
                subject,
                message,
                time: new Date().toLocaleString()
            });
            localStorage.setItem('portfolio_messages', JSON.stringify(messagesList));

            // Simulate form submission
            const btnText = formSubmitBtn.querySelector('span');
            const btnIcon = formSubmitBtn.querySelector('i');
            const originalText = btnText.textContent;
            
            formSubmitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';

            setTimeout(() => {
                showFormStatus(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                contactForm.reset();
                
                // Restore button
                formSubmitBtn.disabled = false;
                btnText.textContent = originalText;
                btnIcon.className = 'fas fa-paper-plane';

                // Reset floating labels (by triggering empty values)
                const inputs = contactForm.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.blur();
                });
            }, 1500);
        });
    }

    function showFormStatus(text, statusClass) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${statusClass}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});
