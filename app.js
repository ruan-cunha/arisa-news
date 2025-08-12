document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    function navigateTo(page) {
        navLinks.forEach(link => {
            const linkPage = new URL(link.href).hash.substring(1) || 'home';
            link.classList.toggle('active', linkPage === page);
        });

        switch(page) {
            case 'home':
                renderHomePage();
                break;
            case 'news':
                renderNewsPage();
                break;
            case 'codex':
                renderCodexPage();
                break;
            case 'recruitment':
                renderRecruitmentPage();
                break;
            case 'advisories':
                renderAdvisoriesPage();
                break;
            default:
                renderNotFoundPage(page);
        }
        
        if (mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-open');
        }
    }

    function renderHomePage() {
        const latestNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        mainContent.innerHTML = `
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-motto">CONTAIN. PROTECT. INFORM. ADAPT.</h1>
                    <p class="hero-subtitle">The official mandate of the Awakened Response, Investigation & Security Agency.</p>
                </div>
            </section>
            <section class="content-section">
                <div class="section-container">
                    <h2>LATEST DIRECTIVE</h2>
                    <div class="latest-directive-card">
                        <p class="meta">${latestNews.category} // ${latestNews.date}</p>
                        <h3>${latestNews.headline}</h3>
                        <p>${latestNews.body.substring(0, 150)}...</p>
                        <a href="#news" class="read-more-link">Read More on the News Wire</a>
                    </div>
                </div>
            </section>
        `;

        document.querySelector('.read-more-link').addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('news');
            history.pushState(null, '', '#news');
        });
    }

    function renderAdvisoriesPage() {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>PUBLIC ADVISORIES</h2>
                    <div class="advisories-grid">
                        <div class="advisory-card informational">
                            <div class="advisory-header">
                                <span class="advisory-type">INFORMATIONAL BULLETIN</span>
                                <h3>Understanding the "Third Awakening"</h3>
                            </div>
                            <div class="advisory-body">
                                <p>ARISA has received numerous reports regarding the recent global luminous event, now designated the "Third Awakening." This phenomenon may trigger latent Awakened abilities in the general populace.</p>
                                <p>If you or someone you know experiences sudden anomalous phenomena or the appearance of a 'Saturn's Scar' mark, please remain calm. ARISA has established dedicated support channels to provide guidance and ensure public safety.</p>
                            </div>
                        </div>
                        
                        <div class="advisory-card protocol">
                            <div class="advisory-header">
                                <span class="advisory-type">CIVILIAN PROTOCOL</span>
                                <h3>Standard Procedure: Unforeseen Awakened Events</h3>
                            </div>
                            <div class="advisory-body">
                                <p>In the event of an unsanctioned Awakened incident in your vicinity, ARISA advises all civilians to adhere to the following protocol to ensure your safety:</p>
                                <ul>
                                    <li><strong>SHELTER:</strong> Immediately seek cover in a reinforced, indoor location away from windows.</li>
                                    <li><strong>DISTANCE:</strong> Maintain a minimum safe distance of 500 meters from any active conflict.</li>
                                    <li><strong>DO NOT ENGAGE:</strong> Never approach, film, or attempt to communicate with an active Awakened.</li>
                                    <li><strong>REPORT:</strong> Use the official S.E.R.A.P.H. mobile app to anonymously report the incident to ARISA.</li>
                                </ul>
                            </div>
                        </div>

                        <div class="advisory-card informational">
                            <div class="advisory-header">
                                <span class="advisory-type">INFORMATIONAL BULLETIN</span>
                                <h3>The National Awakened Registry</h3>
                            </div>
                            <div class="advisory-body">
                                <p>ARISA encourages all Awakened individuals to voluntarily enroll in the National Awakened Registry. Registration is a safe and secure process designed to provide support and legal protection.</p>
                                <p>Benefits of registration include:</p>
                                <ul>
                                    <li>Legal immunity in certain pre-approved self-defense scenarios.</li>
                                    <li>Access to sanctioned safe-use zones for ability testing and training.</li>
                                    <li>Eligibility for licensed professions that utilize Awakened abilities.</li>
                                    <li>Access to psychological and medical support tailored for Awakened individuals.</li>
                                </ul>
                                <p>While registration is not mandatory, unregistered public use of abilities may result in an official investigation.</p>
                            </div>
                        </div>                      
                    </div>
                </div>
            </section>
        `;
    }

    function renderFieldOperatorBriefingPage() {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>FIELD OPERATOR SIMULATION</h2>
                    <div class="briefing-container">
                        <h3>Welcome, Operator Candidate.</h3>
                        <p>The ARISA Field Operator Simulation is a tactical training program designed to test your decision-making capabilities under pressure. You will be presented with a series of real-world incident reports, complete with witness statements and analysis from our S.E.R.A.P.H. system.</p>
                        <p>Your objective is to analyze the available intelligence and dispatch the most suitable operative to resolve the crisis. Each decision has consequences. Time is a critical factor. Your performance will be evaluated based on efficiency, strategic thinking, and your ability to minimize collateral damage.</p>
                        <p>This is more than a test; it is a glimpse into the responsibilities of an ARISA dispatcher. Are you ready to take command?</p>
                        <a href="field-operator/field_operator.html" class="launch-sim-button">Launch Simulation</a>
                    </div>
                </div>
            </section>
        `;
    }

    function renderCodexPage(subpage = 'landing') {
        let contentHTML = '';
        let pageTitle = "ARISA CODEX";

        const codexLandingHTML = `
            <div class="codex-grid">
                <div class="codex-card" data-subpage="operatives">
                    <h3>Operative Files</h3>
                    <p>Access detailed dossiers on registered ARISA, Paramount, and Vanguards operatives.</p>
                </div>
                <div class="codex-card" data-subpage="timeline">
                    <h3>Event Timeline</h3>
                    <p>Review the timeline of major Awakened-related events, from the First Awakening to present day.</p>
                </div>
                <div class="codex-card" data-subpage="technology">
                    <h3>Technology & Arsenal</h3>
                    <p>Browse ARISA's non-lethal technology, vehicles, and the S.E.R.A.P.H. intelligence system.</p>
                </div>
            </div>
        `;

        switch (subpage) {
            case 'operatives':
                pageTitle = "CODEX // OPERATIVE FILES";
                contentHTML = renderOperativeDatabasePage();
                break;
            case 'timeline':
                pageTitle = "CODEX // EVENT TIMELINE";
                contentHTML = renderTimelinePage();
                break;
            case 'technology':
                pageTitle = "CODEX // TECHNOLOGY & ARSENAL";
                contentHTML = renderTechnologyPage();
                break;
            default: // landing
                contentHTML = codexLandingHTML;
        }
        
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>${pageTitle}</h2>
                    <div id="codex-content">
                        ${contentHTML}
                    </div>
                </div>
            </section>
            <!-- CORREÇÃO: A linha abaixo foi adicionada para garantir que o modal exista -->
            <div class="modal-overlay" id="modal-overlay"></div>
        `;
        
        // CORREÇÃO: Os listeners são adicionados DEPOIS que o HTML é inserido na página.
        if (subpage === 'landing') {
            document.querySelectorAll('.codex-card').forEach(card => {
                card.addEventListener('click', () => {
                    const newSubpage = card.dataset.subpage;
                    renderCodexPage(newSubpage);
                });
            });
        } else if (subpage === 'timeline') {
            initializeTimelineAnimations();
        } else if (subpage === 'operatives') {
            attachOperativeCardListeners();
        }
    }

    function renderTechnologyPage() {
        const techData = {
            non_lethal_armament: [
                { name: "Inhibitor Gel", description: "A rapidly expanding foam that immobilizes targets while disrupting the body's energy channels, effectively neutralizing most ability use on contact." },
                { name: "Focus Disruptors", description: "Devices that emit low-frequency sonic pulses, impairing the concentration required for psychic, telekinetic, and other cognitive-based abilities." },
                { name: "Vector Inhibitors", description: "Portable units that generate a localized field to limit high-speed movement, affecting abilities like teleportation, super-speed, and flight." }
            ],
            armor: {
                name: "Personal Armor Units (PAUs)",
                description: "Standard-issue for ARISA field agents, these multi-layered suits provide resistance to thermal, kinetic, and chemical-based powers. Integrated sensors monitor the user's vitals and ambient energy signatures."
            },
            vehicles: {
                name: "Rapid Response Vehicles (RRVs)",
                description: "A fleet of purpose-built, armored vehicles featuring signature green-and-white emergency lights. Each RRV is equipped with an onboard AI trained on Awakened behavior patterns to predict movements and suggest tactical responses."
            },
            software: {
                name: "S.E.R.A.P.H. System",
                description: "The Strategic Evaluation & Response Analysis for Paranormal Hazards is an AI assistant developed by Operative Seraphim. It serves as a public-facing reporting tool for civilians and a vital tactical advisor for operatives in the field, analyzing threats in real-time."
            }
        };

        let nonLethalHTML = techData.non_lethal_armament.map(item => `
            <div class="tech-item">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');

        return `
            <div class="tech-grid">
                <div class="tech-card">
                    <h3>Non-Lethal Armament</h3>
                    <div class="tech-item-list">
                        ${nonLethalHTML}
                    </div>
                </div>
                <div class="tech-card">
                    <h3>Personal Armor Units (PAUs)</h3>
                    <div class="tech-item-list">
                        <div class="tech-item">
                            <h4>${techData.armor.name}</h4>
                            <p>${techData.armor.description}</p>
                        </div>
                    </div>
                </div>
                <div class="tech-card">
                    <h3>Vehicles</h3>
                     <div class="tech-item-list">
                        <div class="tech-item">
                            <h4>${techData.vehicles.name}</h4>
                            <p>${techData.vehicles.description}</p>
                        </div>
                    </div>
                </div>
                <div class="tech-card">
                    <h3>Software</h3>
                     <div class="tech-item-list">
                        <div class="tech-item">
                            <h4>${techData.software.name}</h4>
                            <p>${techData.software.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function renderTimelinePage() {
        const timelineEvents = [
            {
                date: "November 3, 2004",
                title: "The First Awakening",
                description: "A mysterious, silent luminescence bathes the Earth. In the following months, the first 'Awakened' individuals with paranormal abilities and the 'Saturn's Scar' begin to emerge globally."
            },
            {
                date: "December 24, 2004",
                title: "First Public Appearance of 'Aegis'",
                description: "During a catastrophic bridge collapse in Chicago, an unknown, armored individual single-handedly saves hundreds of civilians. Dubbed 'Aegis' by the press, he becomes the first publicly declared hero, operating independently and setting a new precedent for the Awakened."
            },
            {
                date: "October 11, 2005",
                title: "The Paramount Forms as an Independent Team",
                description: "Inspired by Aegis's public heroism, a small group of powerful Awakened individuals form 'The Paramount'. Operating without government oversight, they aim to tackle larger-scale threats, gaining public support but raising concerns within federal agencies about unregulated power.  Aegis joins the initiative, solidifying the team as the public face of heroes."
            },
            {
                date: "August 18, 2008",
                title: "ARISA is Founded",
                description: "In response to the growing number of independent operatives like Aegis and The Paramount, the U.S. government establishes the Awakened Response, Investigation & Security Agency (ARISA). Its initial mandate is to monitor, investigate, and, if necessary, contain unsanctioned Awakened activity."
            },
            {
                date: "February 5, 2010",
                title: "The ARISA-Paramount Integration",
                description: "After months of tense negotiations, The Paramount agrees to a landmark integration deal. They become a sanctioned team operating under ARISA's oversight in exchange for funding, intelligence, and legal authority."
            },
            {
                date: "December 9, 2012",
                title: "ARJOC Signed into Law",
                description: "The Awakened Regulation & Justice Operations Code (ARJOC) is passed by Congress. This sweeping legislation grants ARISA broader powers and defines the legal framework for the use of abilities, formally establishing the National Awakened Registry."
            },
            {
                date: "October 30, 2018",
                title: "The Third Awakening",
                description: "A second, more intense and chaotic global luminescence occurs. This event activates latent abilities in a massive, unpredictable new wave of individuals, marking the beginning of a new era."
            }
        ];

        let timelineHTML = timelineEvents.map(event => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <p class="timeline-date">${event.date}</p>
                    <h4 class="timeline-title">${event.title}</h4>
                    <p class="timeline-description">${event.description}</p>
                </div>
            </div>
        `).join('');

        return `<div class="timeline-container">${timelineHTML}</div>`;
    }

    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.5 // O item aparece quando 50% dele está visível
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    function renderNewsPage() {
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const createSnippet = (htmlContent, length = 120) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";
            return plainText.substring(0, length) + (plainText.length > length ? "..." : "");
        };

        let articlesHTML = sortedNews.map((article, index) => `
            <div class="news-article" style="animation-delay: ${index * 0.1}s">
                <div>
                    <p class="meta">${article.category} // ${article.date}</p>
                    <h3>${article.headline}</h3>
                    <p class="news-snippet">${createSnippet(article.body)}</p>
                </div>
                <button class="read-more-btn" data-id="${article.id}">Read More...</button>
            </div>
        `).join('');

        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>ARISA NEWS WIRE</h2>
                    <div class="news-container">
                        ${articlesHTML}
                    </div>
                </div>
            </section>
            <div class="modal-overlay" id="modal-overlay"></div>
        `;

        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', () => {
                const newsId = button.dataset.id;
                renderNewsDetailModal(newsId);
            });
        });
    }

    function renderNewsDetailModal(newsId) {
        const modalOverlay = document.getElementById('modal-overlay');
        const article = newsData.find(item => item.id === newsId);

        if (!article) return;

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h2 class="codename">${article.headline}</h2>
                        <p class="affiliation">${article.category} // ${article.date}</p>
                    </div>
                    <button class="modal-close-button" id="modal-close">&times;</button>
                </div>
                <div class="modal-body news-modal-body">
                    ${article.body}
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        
        document.getElementById('modal-close').addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
    
    function renderOperativeDatabasePage() {
        let operativesHTML = loreData.map((operative, index) => `
            <div class="asset-card" data-id="${operative.id}" style="animation-delay: ${index * 0.05}s">
                <p class="affiliation">${operative.afiliacao}</p>
                <h2 class="codename">${operative.codinome}</h2>
                <p class="dossier-preview">${operative.dossier}</p>
            </div>
        `).join('');
        // CORREÇÃO: A função agora devolve o HTML construído.
        return `<div class="asset-grid">${operativesHTML}</div>`;
    }

    function attachOperativeCardListeners() {
        document.querySelectorAll('.asset-card').forEach(card => {
            card.addEventListener('click', () => {
                const heroId = card.dataset.id;
                const heroData = loreData.find(h => h.id === heroId);
                if (heroData) {
                    renderHeroDetailModal(heroData);
                }
            });
        });
    }

    function renderHeroDetailModal(hero) {
        const modalOverlay = document.getElementById('modal-overlay');
        
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h2 class="codename">${hero.codinome}</h2>
                        <p class="affiliation">${hero.afiliacao}</p>
                    </div>
                    <button class="modal-close-button" id="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>Full Dossier</h4>
                    <p>${hero.dossier || 'No dossier information available.'}</p>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        
        document.getElementById('modal-close').addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    function renderNotFoundPage(page) {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>SECTION [${page.toUpperCase()}] NOT AVAILABLE</h2>
                    <p>This section of the portal is currently under development. Please check back later for updates.</p>
                </div>
            </section>
        `;
    }

    function renderRecruitmentPage() {
        mainContent.innerHTML = `
            <section class="content-section quiz-section">
                <div class="section-container">
                    <div class="container">
                        <div id="start-screen" class="screen active">
                            <div class="header-logo"><h1>ARISA APTITUDE TEST</h1></div>
                            <p class="subtitle">A PUBLIC ENGAGEMENT INITIATIVE</p>
                            <h2>What's Your Mark?</h2>
                            <p class="description">
                                In a world of powers, every hero has a calling. Every Awakened has a Mark. This psychological and aptitude screening is a public outreach tool designed by ARISA to help you understand your place. It's a fun way to see how your instincts align with some of the world's most notable heroes.
                                <br><br>
                                This is not a formal evaluation. It's a glimpse into your potential.
                            </p>
                            <button id="start-btn" class="btn">Begin Assessment</button>
                        </div>
                        <div id="quiz-screen" class="screen">
                            <div id="question-container">
                                <p id="question-counter" class="question-counter-text"></p>
                                <h2 id="question-text"></h2>
                                <div id="answer-buttons" class="btn-grid"></div>
                            </div>
                            <div id="minigame-container"></div>
                        </div>
                        <div id="result-screen" class="screen">
                            <div class="header-logo"><h2>Assessment Complete</h2></div>
                            <h3>Your Awakened Profile:</h3>
                            <h1 id="hero-match-name"></h1>
                            <p id="hero-match-description"></p>
                            <div id="trait-breakdown">
                                <h4>Dominant Traits:</h4>
                                <p id="user-traits"></p>
                            </div>
                            <p class="share-text">Share your Mark with the world! #WhatsYourMark</p>
                            <div class="result-buttons">
                                <button id="restart-btn" class="btn">Take the Test Again</button>
                                <a id="twitter-share-btn" class="btn twitter-btn" href="#" target="_blank" rel="noopener noreferrer">Share on ?? (Twitter)</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        initializeNewQuiz();
    }
    

    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.getAttribute('href').startsWith('#')) {
                    return; 
                }

                e.preventDefault(); 
                const page = new URL(link.href).hash.substring(1) || 'home';
                history.pushState(null, '', `#${page}`);
                navigateTo(page);
            });
        });

        window.addEventListener('popstate', () => {
            const page = location.hash.substring(1) || 'home';
            navigateTo(page);
        });

        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-open');
        });

        const initialPage = location.hash.substring(1) || 'home';
        navigateTo(initialPage);
    }

    function initializeNewQuiz() {
        const startScreen = document.getElementById('start-screen');
        if (!startScreen) return; 

        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');
        const questionContainer = document.getElementById('question-container');
        const minigameContainer = document.getElementById('minigame-container');
        const questionCounterText = document.getElementById('question-counter');
        const questionText = document.getElementById('question-text');
        const answerButtons = document.getElementById('answer-buttons');
        const heroMatchName = document.getElementById('hero-match-name');
        const heroMatchDescription = document.getElementById('hero-match-description');
        const userTraitsText = document.getElementById('user-traits');
        
        let currentQuestionIndex = 0;
        let userScores = {
            protective: 0, direct: 0, strategic: 0, analytical: 0,
            empathetic: 0, independent: 0, charismatic: 0, disciplined: 0,
            impulsive: 0, optimistic: 0, indirect: 0, tech_savvy: 0,
            leader: 0, unconventional: 0
        };

        const quizQuestions = [
            { type: 'personality', question: "A large public festival is happening. As a hero, what is your primary role in ensuring its safety?", answers: [ { text: 'Patrol the perimeter, keeping a visible and reassuring presence.', traits: { protective: 1, disciplined: 1 } }, { text: 'Stay in the command center, analyzing crowd flow for potential issues.', traits: { strategic: 1, analytical: 1 } }, { text: 'Mingle with the crowd, ready to respond instantly if trouble starts.', traits: { direct: 1, charismatic: 1 } }, { text: 'Set up defensive measures beforehand, anticipating every possibility.', traits: { strategic: 2, indirect: 1 } } ] },
            { type: 'personality', question: 'A young, newly Awakened individual is scared of their powers. How do you approach them?', answers: [ { text: 'Show them how cool their powers can be to build their confidence.', traits: { optimistic: 1, charismatic: 1, impulsive: 1 } }, { text: 'Offer structured, patient guidance and share your own experiences.', traits: { empathetic: 2, disciplined: 1, leader: 1 } }, { text: 'Give them space but observe from a distance, ensuring they and others are safe.', traits: { protective: 1, indirect: 1 } }, { text: 'Provide them with technical manuals and safe, controlled training scenarios.', traits: { analytical: 1, tech_savvy: 1 } } ] },
            { type: 'dilemma', question: "Your team is facing an unknown threat. What's your first priority?", answers: [ { text: 'Engage directly to gauge its strength and weaknesses.', traits: { direct: 1, impulsive: 1 } }, { text: 'Evacuate all civilians and establish a secure perimeter.', traits: { protective: 2, leader: 1 } }, { text: 'Gather data. Information is the key to victory.', traits: { analytical: 2, strategic: 1 } }, { text: 'Rally the team, boost morale, and formulate a quick plan together.', traits: { charismatic: 1, optimistic: 1, leader: 1 } } ] },
            { type: 'personality', question: 'What does the word "power" mean to you?', answers: [ { text: 'A responsibility to protect those who cannot protect themselves.', traits: { protective: 1, empathetic: 1 } }, { text: 'A tool to achieve a specific, necessary objective.', traits: { disciplined: 1, direct: 1 } }, { text: 'A variable that must be understood and controlled.', traits: { analytical: 1, strategic: 1 } }, { text: 'A chance to make a real, positive difference in the world.', traits: { optimistic: 1, charismatic: 1 } } ] },
            { type: 'minigame', game: 'memory', question: 'ARISA Cognitive Exercise: A sharp mind is a hero\'s greatest asset. Match the hero team symbols under pressure.' },
            { type: 'dilemma', question: "You witness a member of the public being harassed for having a 'Saturn's Scar'. How do you intervene?", answers: [ { text: 'Publicly and forcefully shame the aggressor to make an example of them.', traits: { direct: 2, impulsive: 1 } }, { text: 'Discreetly create a distraction, then offer the victim a safe way out.', traits: { indirect: 2, strategic: 1 } }, { text: 'Physically place yourself between them, de-escalating with a calm voice.', traits: { protective: 2, empathetic: 1 } }, { text: 'Record the incident as evidence and report it to ARISA, trusting official channels.', traits: { disciplined: 1, analytical: 1 } } ] },
            { type: 'personality', question: 'When you\'re not on a mission, how do you spend your time?', answers: [ { text: 'Training. Honing my skills and body is a round-the-clock commitment.', traits: { disciplined: 2, direct: 1 } }, { text: 'Building and tinkering with my gear. There\'s always a new upgrade to create.', traits: { tech_savvy: 2, unconventional: 1 } }, { text: 'Connecting with the community. It\'s important they see heroes as people.', traits: { charismatic: 1, empathetic: 1 } }, { text: 'Studying past incidents and potential future threats. Preparation is everything.', traits: { analytical: 1, strategic: 1 } } ] },
            { type: 'minigame', game: 'incident_report', question: 'ARISA Intel Drop: A preliminary report on the "Inferno" incident just came in. Quickly identify the key facts.' },
            { type: 'personality', question: 'You are offered a new piece of experimental tech for your suit. You...', answers: [ { text: 'Immediately start tinkering with it to make it even better.', traits: { tech_savvy: 2, unconventional: 1 } }, { text: 'Test it rigorously in a simulation before ever using it in the field.', traits: { disciplined: 1, analytical: 1 } }, { text: 'Trust the engineers and incorporate it into your gear right away.', traits: { optimistic: 1, direct: 1 } }, { text: 'Analyze if it truly fits your established fighting style and methods.', traits: { strategic: 1, independent: 1 } } ] },
            { type: 'personality', question: 'How do you prefer to end a confrontation?', answers: [ { text: 'Decisively and quickly, with overwhelming action.', traits: { direct: 2, impulsive: 1 } }, { text: 'By outsmarting the opponent, making them realize they have lost.', traits: { strategic: 2, indirect: 1 } }, { text: 'With all parties safe and the threat neutralized without unnecessary damage.', traits: { protective: 2, empathetic: 1 } }, { text: 'By creating a situation where the conflict was prevented from the start.', traits: { leader: 1, analytical: 1 } } ] },
            { type: 'dilemma', question: 'A mission is complete, and the media wants a statement. What is your move?', answers: [ { text: 'Step up to the cameras. The public deserves to hear from us directly.', traits: { charismatic: 2, leader: 1 } }, { text: 'Let the team leader or designated spokesperson handle it.', traits: { disciplined: 1, indirect: 1 } }, { text: 'Send a pre-written statement through ARISA\'s press office.', traits: { strategic: 1, independent: 1 } }, { text: 'Avoid the cameras. The results of the mission speak for themselves.', traits: { indirect: 2 } } ] },
            { type: 'dilemma', question: "A powerful, newly Awakened is causing massive property damage, not out of malice, but out of fear. What's your approach?", answers: [ { text: 'Engage them in conversation, trying to understand their fear and talk them down.', traits: { empathetic: 2, charismatic: 1, leader: 1 } }, { text: 'Use the environment against them, creating barriers and traps to limit their movement.', traits: { strategic: 2, unconventional: 1 } }, { text: 'Deploy a non-lethal, high-impact takedown. The fastest end to the chaos is the safest.', traits: { direct: 1, disciplined: 1 } }, { text: 'Analyze their power from a distance to calculate the most efficient way to neutralize their ability.', traits: { analytical: 2, tech_savvy: 1, indirect: 1 } } ] },
            { type: 'personality', question: 'Which environment are you most comfortable operating in?', answers: [ { text: 'On the front lines, in the thick of the action.', traits: { direct: 1, impulsive: 1 } }, { text: 'In a support role, providing tactical aid and protection.', traits: { protective: 1, strategic: 1 } }, { text: 'From a distance, analyzing the field and directing teammates.', traits: { analytical: 1, indirect: 1, leader: 1 } }, { text: 'Working on my own, using my unique skills to flank the enemy.', traits: { independent: 1, unconventional: 1 } } ] },
            { type: 'dilemma', question: "You have the opportunity to join a highly structured, government-endorsed team like The Paramount. What's your reaction?", answers: [ { text: 'Accept immediately. The structure and resources are the best way to make a difference.', traits: { disciplined: 1, leader: 1 } }, { text: 'Decline. True heroism operates outside of bureaucracy and public relations.', traits: { independent: 2, unconventional: 1 } }, { text: 'Negotiate the terms. I\'ll work with them, but on my own terms.', traits: { strategic: 1, charismatic: 1 } }, { text: 'Consider it, but primarily as a way to understand the system from the inside.', traits: { analytical: 1, indirect: 1 } } ] },
            { type: 'personality', question: 'A complex problem requires a solution. You are most likely to:', answers: [ { text: 'Break it down into smaller, manageable parts to analyze.', traits: { analytical: 2, strategic: 1 } }, { text: 'Try a creative, out-of-the-box approach no one has considered.', traits: { unconventional: 2, impulsive: 1 } }, { text: 'Rely on established, proven methods that guarantee stability.', traits: { disciplined: 2, protective: 1 } }, { text: 'Collaborate with the team, believing a group solution is strongest.', traits: { charismatic: 1, empathetic: 1, leader: 1 } } ] }
        ];

        const heroProfiles = [
            { name: 'Aegis', traits: { protective: 2, disciplined: 2, leader: 2, charismatic: 1 }, description: "Your profile aligns with the 'Standard-Bearer.' You are calm, eloquent, and possess an unshakeable moral compass. Like Aegis, you are a natural leader who inspires trust and embodies the ideal of a protector, serving as a pillar of stability in uncertain times." },
            { name: 'Mosaic', traits: { analytical: 2, strategic: 2, indirect: 2, unconventional: 1 }, description: "Your profile aligns with the 'Cognitive Analyst.' You don't just face threats; you unravel them. Like Mosaic, your strength is in your intellect, seeing patterns and motives others miss. You bring clarity to chaos and solve problems with quiet, forensic precision." },
            { name: 'Battery', traits: { direct: 2, disciplined: 2, strategic: 1, unconventional: 1 }, description: "Your profile aligns with the 'Kinetic Specialist.' You are defined by brutal efficiency and containment. Like Battery, you understand that patience is a weapon. You store potential, wait for the perfect moment, and then end the fight with terrifying precision and speed." },
            { name: 'Downdraft', traits: { strategic: 2, indirect: 2, analytical: 1, tech_savvy: 1 }, description: "Your profile aligns with the 'Field Controller.' Your power is less about brute force and more about surgical control. Like Downdraft, you are a thinker who manipulates the battlefield itself, using intellect to disorient enemies and protect allies with subtle, tactical genius." },
            { name: 'Armory', traits: { disciplined: 2, protective: 2, strategic: 1, analytical: 1 }, description: "Your profile aligns with the 'Adaptive Tactician.' You are precise, controlled, and inaccessibly composed, a strategic cornerstone for your team. Like Armory, you believe that the right tool for the right moment is key, manifesting what is needed with focus and responsibility." },
            { name: 'Loop', traits: { unconventional: 2, strategic: 2, direct: 1, tech_savvy: 1 }, description: "Your profile aligns with the 'Temporal Strategist.' You don't just move fast; you manipulate time itself on a small scale. Like Loop, you are a clever and relentless strategist, using echoes of your past actions to outmaneuver opponents in ways they can't predict." },
            { name: 'Flashpoint', traits: { impulsive: 2, direct: 2, optimistic: 2 }, description: "Your profile aligns with the 'Kinetic Rocket.' You are impetuous, relentlessly optimistic, and full of boundless energy. Like Flashpoint, you are the first to charge in, turning danger into a challenge and inspiring your team with sheer, unadulterated confidence and momentum." },
            { name: 'Spoiler', traits: { indirect: 2, strategic: 2, analytical: 1, disciplined: 1 }, description: "Your profile aligns with the 'Silent Tactician.' You are the calm, quiet conscience of the team, speaking only when it matters. Like Spoiler, you are deliberate and observant, using your abilities to control the sensory field and ensure a mission's success with subtle, undeniable precision." },
            { name: 'Chisel', traits: { protective: 2, empathetic: 2, disciplined: 1 }, description: "Your profile aligns with the 'Steadfast Protector.' You are the definition of perseverance and humility. Like Chisel, your strength grows with your determination. You are the gentle giant who anchors the defensive line and supports your teammates without fail." },
            { name: 'Viceroy', traits: { charismatic: 2, strategic: 2, indirect: 1, leader: 1 }, description: "Your profile aligns with the 'Elegant Strategist.' You don't need to raise your voice to command a room. Like Viceroy, you are the team's master of debate and tactics, using grace and intellect to neutralize conflict with subtle, elegant control before it can even begin." },
            { name: 'Kinesis', traits: { tech_savvy: 2, optimistic: 1, direct: 1, unconventional: 1 }, description: "Your profile aligns with the 'Mobility Expert.' You are pure speed, powered by a love for technology. Like Kinesis, you are constantly innovating, upgrading equipment to make your team faster and more adaptable. You think fast, talk fast, and treat every challenge as a puzzle to be solved." },
            { name: 'Lockshot', traits: { disciplined: 2, analytical: 2, indirect: 1 }, description: "Your profile aligns with the 'Designated Marksman.' If your team is jazz, you are the metronome—steady, reserved, and unerringly precise. Like Lockshot, your focus is absolute. You believe actions speak louder than words and ensure your actions never, ever miss their mark." },
            { name: 'Seraphim', traits: { analytical: 3, leader: 2, protective: 1, empathetic: 1 }, description: "Your profile aligns with the 'Cognitive Oracle.' You don't just process information; you interpret probabilities and prevent disasters before they happen. Like Seraphim, you are a deeply empathetic and intelligent leader, guiding operations not just to victory, but to the best possible outcome for everyone involved." }
        ];

        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', startQuiz);

        function startQuiz() {
            currentQuestionIndex = 0;
            userScores = Object.fromEntries(Object.keys(userScores).map(key => [key, 0]));
            resultScreen.classList.remove('active');
            startScreen.classList.remove('active');
            quizScreen.classList.add('active');
            showNextQuestion();
        }
        
        function showNextQuestion() {
            resetState();
            if (currentQuestionIndex >= quizQuestions.length) {
                return showResult();
            }

            const question = quizQuestions[currentQuestionIndex];
            questionCounterText.innerText = `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
            questionText.innerText = question.question;

            if (question.type === 'minigame') {
                questionContainer.style.display = 'none';
                minigameContainer.style.display = 'block';
                if (question.game === 'memory') {
                    startMemoryGame();
                } else if (question.game === 'incident_report') {
                    startIncidentReportGame();
                }
            } else {
                questionContainer.style.display = 'block';
                minigameContainer.style.display = 'none';
                question.answers.forEach(answer => {
                    const button = document.createElement('button');
                    button.innerText = answer.text;
                    button.classList.add('btn');
                    button.addEventListener('click', () => selectAnswer(answer.traits));
                    answerButtons.appendChild(button);
                });
            }
        }

        function resetState() {
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
            minigameContainer.innerHTML = '';
        }

        function selectAnswer(traits) {
            for (const trait in traits) {
                if (userScores.hasOwnProperty(trait)) {
                    userScores[trait] += traits[trait];
                }
            }
            currentQuestionIndex++;
            showNextQuestion();
        }
        
        function showResult() {
            quizScreen.classList.remove('active');
            resultScreen.classList.add('active');

            let bestMatch = null;
            let highestScore = -Infinity;

            heroProfiles.forEach(hero => {
                let score = 0;
                for (const trait in hero.traits) {
                    if (userScores.hasOwnProperty(trait)) {
                        score += userScores[trait] * hero.traits[trait];
                    }
                }
                score += Math.random() * 0.1; 

                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = hero;
                }
            });
            
            const sortedUserTraits = Object.entries(userScores)
                .sort(([, a], [, b]) => b - a)
                .filter(([, score]) => score > 0)
                .slice(0, 3)
                .map(([trait]) => trait.charAt(0).toUpperCase() + trait.slice(1).replace('_', ' '));

            heroMatchName.innerText = bestMatch.name;
            heroMatchDescription.innerText = bestMatch.description;
            userTraitsText.innerText = sortedUserTraits.length > 0 ? sortedUserTraits.join(', ') : 'Balanced Profile';

            const twitterBtn = document.getElementById('twitter-share-btn');
            const heroName = bestMatch.name;
            const shareText = `My ARISA Aptitude Test profile is ${heroName}! Find out what's your Mark. #WhatsYourMark`;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            twitterBtn.href = twitterUrl;
        }

        function startMemoryGame() {
            let timer;
            let timeRemaining = 30;
            const symbols = ['???', '??', '?', '??', '??', '??', '???', '??', '?', '??', '??', '??'];
            symbols.sort(() => 0.5 - Math.random()); 

            minigameContainer.innerHTML = `<div id="timer">Time: ${timeRemaining}s</div><div class="memory-grid" id="memory-grid"></div>`;
            
            const grid = document.getElementById('memory-grid');
            let flippedCards = [];
            let matchedPairs = 0;
            
            symbols.forEach(symbol => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.symbol = symbol;
                card.innerHTML = `<div class="card-face card-front"></div><div class="card-face card-back">${symbol}</div>`;
                card.addEventListener('click', () => {
                    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                        flipCard(card);
                    }
                });
                grid.appendChild(card);
            });

            timer = setInterval(() => {
                timeRemaining--;
                document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;
                if (timeRemaining <= 0) { clearInterval(timer); endMemoryGame(false); }
            }, 1000);

            function flipCard(card) {
                card.classList.add('flipped');
                flippedCards.push(card);
                if (flippedCards.length === 2) { checkForMatch(); }
            }

            function checkForMatch() {
                const [card1, card2] = flippedCards;
                if (card1.dataset.symbol === card2.dataset.symbol) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === symbols.length / 2) { clearInterval(timer); endMemoryGame(true); }
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                    }, 700);
                }
            }

            function endMemoryGame(success) {
                const traits = success ? { analytical: 1, strategic: 1, disciplined: 1 } : { impulsive: 1 };
                selectAnswer(traits);
            }
        }

        function startIncidentReportGame() {
            const reportText = "Inferno was one of Brazil's most enigmatic villains. Its behavior was erratic; sometimes it would just appear and observe, then attack with violence, only to retreat as if it lost interest. Its actions had no clear objective. Its body of dark, menacing metal was incredibly resistant, withstanding blows from Titã and Madame Ímpeto. It was ultimately defeated by the Defenders of Saturn.";
            const reportQuestions = [
                { question: "What was Inferno's most notable characteristic?", answers: ["Unpredictable behavior", "Extreme speed", "Telepathic abilities", "Invulnerability to heat"], correct: "Unpredictable behavior" },
                { question: "According to the report, what was Inferno's final status?", answers: ["Escaped", "Destroyed", "Defeated", "Joined a new group"], correct: "Defeated" },
                { question: "Which group was primarily responsible for stopping Inferno?", answers: ["The Paramount", "The Vanguards", "ARISA", "Defenders of Saturn"], correct: "Defenders of Saturn" }
            ];
            let currentReportQuestionIndex = 0;
            let correctAnswers = 0;

            function showReportQuestion() {
                const q = reportQuestions[currentReportQuestionIndex];
                minigameContainer.innerHTML = `<div class="report-text">${reportText}</div><h3>${q.question}</h3><div id="report-answers" class="btn-grid"></div>`;

                const answerGrid = document.getElementById('report-answers');
                q.answers.forEach(text => {
                    const button = document.createElement('button');
                    button.innerText = text;
                    button.classList.add('btn');
                    button.addEventListener('click', () => {
                        if (text === q.correct) { correctAnswers++; }
                        currentReportQuestionIndex++;
                        if (currentReportQuestionIndex < reportQuestions.length) {
                            showReportQuestion();
                        } else {
                            endIncidentReportGame();
                        }
                    });
                    answerGrid.appendChild(button);
                });
            }
            
            function endIncidentReportGame() {
                const success = correctAnswers >= 2;
                const traits = success ? { analytical: 2, strategic: 1 } : { impulsive: 1 };
                selectAnswer(traits);
            }

            showReportQuestion();
        }
    }

    // =====================================================================
    // --- FIELD OPERATOR SIMULATION LOGIC ---
    // =====================================================================
   


    // --- Portal Initialization ---
    setupNavigation();
});






















