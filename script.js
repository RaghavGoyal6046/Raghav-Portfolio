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
        "Machine Learning Models",
        "Scalable Web Applications",
        "DevOps Pipelines",
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
            - <span class="text-white">about</span>       : Brief introduction of my background<br>
            - <span class="text-white">skills</span>      : Technical skills overview<br>
            - <span class="text-white">experience</span>  : Academic & corporate internships list<br>
            - <span class="text-white">projects</span>    : Details on key code systems built<br>
            - <span class="text-white">messages</span>    : View messages submitted via contact form<br>
            - <span class="text-white">contact</span>     : Direct contacts and channels<br>
            - <span class="text-white">clear</span>       : Empty the shell terminal logs
        `,
        about: `
            <span class="text-green">Bio:</span> Raghav Goyal is a final year B.Tech student in Computer Science & Engineering 
            (Data Science) at SKIT Jaipur. He specializes in designing robust machine learning classifications 
            and scalable REST API platforms, balancing advanced analytic structures with premium web designs.
        `,
        skills: `
            <span class="text-green">Languages:</span> C++, Python, JavaScript, SQL<br>
            <span class="text-green">Web Dev:</span> Node.js, Express.js, MongoDB, REST APIs, HTML/CSS<br>
            <span class="text-green">DevOps & Cloud:</span> AWS, Azure, Docker, Kubernetes, Linux, Git/GitHub, CI/CD<br>
            <span class="text-green">ML/DS Libraries:</span> Scikit-learn, NumPy, Pandas, Matplotlib
        `,
        experience: `
            1. <span class="text-white">Celebal Technologies</span> (May 2026 -- Present)<br>
               Role: Celebal Excellence Intern (CEI)<br>
               Focus: Emerging technologies training and database scaling pipelines.<br><br>
            2. <span class="text-white">Svaarogym Medical Devices (MNIT)</span> (Jun 2025 -- Jul 2025)<br>
               Role: Machine Learning Intern<br>
               Focus: ECG/EMG/GSR signals preprocessing, SVM model classification.<br><br>
            3. <span class="text-white">Kistechno Software</span> (Jul 2024 -- Aug 2024)<br>
               Role: Web Development Intern<br>
               Focus: Front-end engineering, modular layouts, responsive UI optimizations.
        `,
        projects: `
            1. <span class="text-cyan">Fork & Flames</span>: Full-Stack Restaurant system containerized in Docker, running REST APIs via Express.js/MongoDB.<br>
            2. <span class="text-cyan">PainMeter</span>: Automated pain level classifier reaching 81% accuracy utilizing signal processing and SVM/PCA.<br>
            3. <span class="text-cyan">Churn Classifier</span>: Customer retention analysis models investigating key user churning trends in Python.
        `,
        contact: `
            <span class="text-cyan">Direct Channels:</span><br>
            - <span class="text-white">Email:</span> <a href="mailto:raghavgoyal6046@gmail.com" class="text-green">raghavgoyal6046@gmail.com</a><br>
            - <span class="text-white">Phone:</span> +91-6375498396<br>
            - <span class="text-white">GitHub:</span> <a href="https://github.com/RaghavGoyal6046" target="_blank" class="text-green">github.com/RaghavGoyal6046</a><br>
            - <span class="text-white">LinkedIn:</span> <a href="https://linkedin.com/in/raghav-goyal-2b6245326" target="_blank" class="text-green">linkedin.com/in/raghav-goyal-2b6245326</a>
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
