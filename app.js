document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Roteador de Páginas Simples ---
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
            case 'database':
                renderAssetDatabasePage();
                break;
            case 'recruitment':
                renderRecruitmentPage();
                break;
            default:
                renderNotFoundPage(page);
        }
        
        if (mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-open');
        }
    }

    // --- Funções de Renderização de Conteúdo do Portal ---
    function renderHomePage() {
        mainContent.innerHTML = `
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-motto">CONTAIN. PROTECT. INFORM. ADAPT.</h1>
                    <p class="hero-subtitle">The official mandate of the Awakened Response, Investigation & Security Agency.</p>
                </div>
            </section>
            <section class="content-section">
                <div class="section-container">
                    <h2>LATEST DIRECTIVES</h2>
                    <p>Content for the latest news and public advisories will be displayed here.</p>
                </div>
            </section>
        `;
    }

    function renderNewsPage() {
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        let articlesHTML = sortedNews.map((article, index) => `
            <div class="news-article" style="animation-delay: ${index * 0.1}s">
                <p class="meta">${article.category} // ${article.date}</p>
                <h3>${article.headline}</h3>
                <p>${article.body}</p>
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
        `;
    }

    function renderAssetDatabasePage() {
        let assetsHTML = loreData.map((asset, index) => `
            <div class="asset-card" style="animation-delay: ${index * 0.05}s">
                <p class="affiliation">${asset.afiliacao}</p>
                <h2 class="codename">${asset.codinome}</h2>
                <p class="dossier-preview">${asset.dossier}</p>
            </div>
        `).join('');

        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>ASSET DATABASE</h2>
                    <div class="asset-grid">
                        ${assetsHTML}
                    </div>
                </div>
            </section>
        `;
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
            <section class="content-section">
                <div class="section-container">
                    <h2>RECRUITMENT & APTITUDE</h2>
                    <div id="quiz-container">
                        <!-- O JOGO DE QUIZ SERÁ INJETADO AQUI -->
                    </div>
                </div>
            </section>
        `;
        // Inicia o quiz dentro do container que acabamos de criar
        initializeQuiz(document.getElementById('quiz-container'));
    }

    // --- Lógica do Menu de Navegação ---
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = new URL(e.currentTarget.href).hash.substring(1) || 'home';
                history.pushState(null, '', `#${page}`);
                navigateTo(page);
            });
        });

        window.addEventListener('popstate', () => {
            const page = location.hash.substring(1) || 'home';
            navigateTo(page);
        });

        const initialPage = location.hash.substring(1) || 'home';
        navigateTo(initialPage);
    }

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
        mobileNavToggle.classList.toggle('is-open');
    });

    // =====================================================================
    // --- LÓGICA DO QUIZ INTEGRADA ---
    // =====================================================================

    const quizData = {
        archetypes: {
            tactician: 0, guardian: 0, aggressor: 0, analyst: 0
        },
        archetypeData: {
            tactician: { title: "THE TACTICIAN", description: "You approach problems with planning, control, and a broad view of the battlefield. Your priority is efficiency and the execution of a well-defined plan, ensuring order even in the midst of chaos.", heroMatches: { default: "Aegis", guardian: "Aegis", aggressor: "Armory", analyst: "Seraphim" } },
            guardian: { title: "THE GUARDIAN", description: "Your primary motivation is the protection of the innocent. You act with empathy and do not hesitate to put yourself on the front line to defend others, prioritizing safety and well-being above all else.", heroMatches: { default: "Chisel", tactician: "Chisel", aggressor: "Flashpoint", analyst: "Spoiler" } },
            aggressor: { title: "THE AGGRESSOR", description: "You believe the best defense is a swift and decisive offense. You act with energy and prefer to resolve threats directly and forcefully, eliminating danger before it has a chance to escalate.", heroMatches: { default: "Battery", tactician: "Battery", guardian: "Flashpoint", analyst: "Loop" } },
            analyst: { title: "THE ANALYST", description: "For you, information is power. You prefer to observe, collect data, and fully understand a situation before acting. Your approach is stealthy, precise, and based on facts, not impulse.", heroMatches: { default: "Mosaic", tactician: "Mosaic", guardian: "Spoiler", aggressor: "Lockshot" } }
        },
        questions: [
            { text: "An energy anomaly emerges downtown, causing panic. What is your first action?", answers: [ { text: "Establish a perimeter and evacuate civilians immediately.", effects: { guardian: 2, tactician: 1 } }, { text: "Advance directly to the source of the anomaly to neutralize it as quickly as possible.", effects: { aggressor: 2 } }, { text: "Analyze the anomaly from a distance, gathering data before taking any action.", effects: { analyst: 2 } }, { text: "Coordinate local emergency teams, creating a containment plan.", effects: { tactician: 2, guardian: 1 } } ] },
            { text: "You must confront a volatile Awakened in a dense urban area. What is your approach?", answers: [ { text: "A non-lethal, stealth-based takedown to minimize panic and collateral damage.", effects: { analyst: 2, guardian: 1 } }, { text: "Create a diversion to lure the target to a less populated area before engaging.", effects: { tactician: 2 } }, { text: "A swift, overwhelming show of force to end the confrontation immediately.", effects: { aggressor: 2 } }, { text: "Attempt to de-escalate the situation through communication, using force only as a last resort.", effects: { guardian: 2, tactician: 1 } } ] },
            { text: "During a rescue mission, you must choose between saving a large group of civilians or capturing the villain. What is your priority?", answers: [ { text: "Saving the civilians is the only priority. The villain can be captured later.", effects: { guardian: 2 } }, { text: "Split your resources to attempt both at once, even if it's risky.", effects: { tactician: 1, aggressor: 1 } }, { text: "Go after the villain to ensure they don't cause more destruction elsewhere.", effects: { aggressor: 2, guardian: -1 } }, { text: "Analyze the villain's escape route to intercept them later, while focusing on the civilians now.", effects: { analyst: 1, tactician: 1, guardian: 1 } } ] },
            { text: "An allied hero is trapped behind enemy lines. What is the plan?", answers: [ { text: "A full-frontal assault to break their defenses and create an escape path.", effects: { aggressor: 2 } }, { text: "An infiltration mission, moving through the shadows to extract the hero without being seen.", effects: { analyst: 2 } }, { text: "Provide covering fire and defensive support while they extract themselves.", effects: { guardian: 2 } }, { text: "Analyze enemy patrols and structural weaknesses to orchestrate the most efficient rescue possible.", effects: { tactician: 2, analyst: 1 } } ] },
            { text: "You discover a new technology that is powerful but ethically questionable. What do you do?", answers: [ { text: "Destroy the technology. Some things are too dangerous to exist.", effects: { guardian: 2, aggressor: 1 } }, { text: "Hand it over to ARISA command, trusting the system to handle it responsibly.", effects: { tactician: 2 } }, { text: "Study it to understand its weaknesses in case an enemy develops the same tech.", effects: { analyst: 2 } }, { text: "Hide it, believing no single group should have that much power.", effects: { guardian: 1, analyst: 1 } } ] },
            { text: "Which statement best describes your view on teamwork?", answers: [ { text: "A team is a precision instrument; every member must follow the plan.", effects: { tactician: 2 } }, { text: "A team is a family; protecting each other is the top priority.", effects: { guardian: 2 } }, { text: "A team is a force multiplier; together we hit harder and faster.", effects: { aggressor: 2 } }, { text: "A team is an information network; sharing data is the key to success.", effects: { analyst: 2 } } ] },
            { text: "The mission is complete, but the public is frightened by the display of power. How do you handle the media?", answers: [ { text: "Give a press conference, speaking calmly and reassuring the public.", effects: { tactician: 1, guardian: 1 } }, { text: "Avoid the media. The results speak for themselves.", effects: { analyst: 1 } }, { text: "Focus on the positive, highlighting the lives saved and the threat neutralized.", effects: { aggressor: 1, guardian: 1 } }, { text: "Provide a detailed, technical breakdown to the press to ensure accurate reporting.", effects: { tactician: 1, analyst: 1 } } ] }
        ]
    };
    
    let quizState = {};

    function initializeQuiz(container) {
        container.innerHTML = `
            <div class="aptitude-test-container">
                <div id="welcome-quiz">
                    <p>This Aptitude Test is a preliminary screening tool designed to identify potential candidates whose cognitive and ethical profiles align with the core values of our agency. This is not a test of power, but of judgment.</p>
                    <p class="call-to-action">Are you ready to discover your mark?</p>
                    <button id="start-quiz-button" class="start-test-button">BEGIN APTITUDE TEST</button>
                </div>
            </div>
        `;
        document.getElementById('start-quiz-button').addEventListener('click', startTest);
    }

    function startTest() {
        quizState = {
            currentQuestionIndex: 0,
            scores: { ...quizData.archetypes }
        };
        
        const container = document.getElementById('quiz-container');
        container.innerHTML = `
            <div class="aptitude-test-container">
                <div id="progress-bar-container"><div id="progress-bar-fill"></div></div>
                <p id="question-text"></p>
                <div id="answers-container"></div>
            </div>
        `;
        displayQuestion(quizState.currentQuestionIndex);
    }

    function displayQuestion(index) {
        const question = quizData.questions[index];
        document.getElementById('progress-bar-fill').style.width = `${((index + 1) / quizData.questions.length) * 100}%`;
        document.getElementById('question-text').textContent = question.text;
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'answer-button';
            button.textContent = answer.text;
            button.onclick = () => handleAnswerClick(answer.effects);
            answersContainer.appendChild(button);
        });
    }

    function handleAnswerClick(effects) {
        for (const archetype in effects) {
            quizState.scores[archetype] += effects[archetype];
        }
        quizState.currentQuestionIndex++;
        if (quizState.currentQuestionIndex < quizData.questions.length) {
            displayQuestion(quizState.currentQuestionIndex);
        } else {
            displayResults();
        }
    }

    function displayResults() {
        const sortedArchetypes = Object.keys(quizState.scores).sort((a, b) => quizState.scores[b] - quizState.scores[a]);
        const primary = sortedArchetypes[0];
        const secondary = sortedArchetypes[1];
        
        const primaryData = quizData.archetypeData[primary];
        const secondaryData = quizData.archetypeData[secondary];
        const heroMatchName = primaryData.heroMatches[secondary] || primaryData.heroMatches.default;

        const container = document.getElementById('quiz-container');
        container.innerHTML = `
            <div class="results-content aptitude-test-container">
                <h2 class="results-title">Profile Analysis Complete</h2>
                <div class="archetype-primary">
                    <div id="primary-archetype-symbol" class="${primary}"></div>
                    <h2 id="primary-archetype-title">${primaryData.title}</h2>
                    <p id="primary-archetype-desc">${primaryData.description}</p>
                </div>
                <div class="results-footer">
                    <div class="archetype-secondary">
                        <h4>Secondary Archetype</h4>
                        <p>${secondaryData.title}</p>
                    </div>
                    <div class="hero-affinity">
                        <h4>Hero Affinity</h4>
                        <p>${heroMatchName}</p>
                    </div>
                </div>
                <button id="restart-quiz-button" class="restart-test-button">RETAKE TEST</button>
            </div>
        `;
        document.getElementById('restart-quiz-button').addEventListener('click', startTest);
    }

    // --- Inicialização do Portal ---
    setupNavigation();
});
