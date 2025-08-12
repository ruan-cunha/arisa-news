document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Simple Page Router ---
    function navigateTo(page) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const linkPage = href.substring(1) || 'home';
                link.classList.toggle('active', linkPage === page);
            } else {
                link.classList.remove('active');
            }
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

    // --- Main Content Rendering Functions ---

    function renderHomePage() {
        const latestNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = latestNews.body;
        const plainTextBody = tempDiv.textContent || tempDiv.innerText || "";
        
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
                        <p>${plainTextBody.substring(0, 150)}...</p>
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
            <div class="modal-overlay" id="modal-overlay"></div>
        `;
        
        // Add event listeners AFTER HTML is rendered
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

    // --- Sub-page Rendering Functions (called by Codex) ---

    function renderTimelinePage() {
        const timelineEvents = [
            { date: "November 3, 2004", title: "The First Awakening", description: "A mysterious, silent luminescence bathes the Earth. In the following months, the first 'Awakened' individuals with paranormal abilities and the 'Saturn's Scar' begin to emerge globally." },
            { date: "April 16, 2007", title: "First Public Appearance of 'Aegis'", description: "During a catastrophic bridge collapse in Chicago, an unknown, armored individual single-handedly saves hundreds of civilians. Dubbed 'Aegis' by the press, he becomes the first publicly declared hero, operating independently and setting a new precedent for the Awakened." },
            { date: "March 8, 2009", title: "The Paramount Forms as an Independent Team", description: "Inspired by Aegis's public heroism, a small group of powerful Awakened individuals form 'The Paramount'. Operating without government oversight, they aim to tackle larger-scale threats, gaining public support but raising concerns within federal agencies about unregulated power." },
            { date: "May 20, 2011", title: "ARISA is Founded", description: "In response to the growing number of independent operatives like Aegis and The Paramount, the U.S. government establishes the Awakened Response, Investigation & Security Agency (ARISA). Its initial mandate is to monitor, investigate, and, if necessary, contain unsanctioned Awakened activity." },
            { date: "February 2, 2012", title: "The ARISA-Paramount Integration", description: "After months of tense negotiations, The Paramount agrees to a landmark integration deal. They become a sanctioned team operating under ARISA's oversight in exchange for funding, intelligence, and legal authority. Aegis joins the initiative, solidifying the team as the public face of sanctioned heroics." },
            { date: "August 1, 2015", title: "ARJOC Signed into Law", description: "The Awakened Regulation & Justice Operations Code (ARJOC) is passed by Congress. This sweeping legislation grants ARISA broader powers and defines the legal framework for the use of abilities, formally establishing the National Awakened Registry." },
            { date: "October 30, 2018", title: "The Third Awakening", description: "A second, more intense and chaotic global luminescence occurs. Unlike the first, this event triggers widespread emotional instability and activates latent abilities in a massive, unpredictable new wave of individuals, marking the beginning of a volatile new era." }
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
        }, { threshold: 0.5 });
        timelineItems.forEach(item => observer.observe(item));
    }

    function renderTechnologyPage() {
        const techData = {
            non_lethal_armament: [
                { name: "Inhibitor Gel", description: "A rapidly expanding foam that immobilizes targets while disrupting the body's energy channels, effectively neutralizing most ability use on contact." },
                { name: "Focus Disruptors", description: "Devices that emit low-frequency sonic pulses, impairing the concentration required for psychic, telekinetic, and other cognitive-based abilities." },
                { name: "Vector Inhibitors", description: "Portable units that generate a localized field to limit high-speed movement, affecting abilities like teleportation, super-speed, and flight." }
            ],
            armor: { name: "Personal Armor Units (PAUs)", description: "Standard-issue for ARISA field agents, these multi-layered suits provide resistance to thermal, kinetic, and chemical-based powers. Integrated sensors monitor the user's vitals and ambient energy signatures." },
            vehicles: { name: "Rapid Response Vehicles (RRVs)", description: "A fleet of purpose-built, armored vehicles featuring signature green-and-white emergency lights. Each RRV is equipped with an onboard AI trained on Awakened behavior patterns to predict movements and suggest tactical responses." },
            software: { name: "S.E.R.A.P.H. System", description: "The Strategic Evaluation & Response Analysis for Paranormal Hazards is an AI assistant developed by Operative Seraphim. It serves as a public-facing reporting tool for civilians and a vital tactical advisor for operatives in the field, analyzing threats in real-time." }
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
                    <div class="tech-item-list">${nonLethalHTML}</div>
                </div>
                <div class="tech-card">
                    <h3>Personal Armor Units (PAUs)</h3>
                    <div class="tech-item-list"><div class="tech-item"><h4>${techData.armor.name}</h4><p>${techData.armor.description}</p></div></div>
                </div>
                <div class="tech-card">
                    <h3>Vehicles</h3>
                     <div class="tech-item-list"><div class="tech-item"><h4>${techData.vehicles.name}</h4><p>${techData.vehicles.description}</p></div></div>
                </div>
                <div class="tech-card">
                    <h3>Software</h3>
                     <div class="tech-item-list"><div class="tech-item"><h4>${techData.software.name}</h4><p>${techData.software.description}</p></div></div>
                </div>
            </div>
        `;
    }

    function renderOperativeDatabasePage() {
        let operativesHTML = loreData.map((operative, index) => `
            <div class="asset-card" data-id="${operative.id}" style="animation-delay: ${index * 0.05}s">
                <p class="affiliation">${operative.afiliacao}</p>
                <h2 class="codename">${operative.codinome}</h2>
                <p class="dossier-preview">${operative.dossier}</p>
            </div>
        `).join('');
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

    // --- Modal Rendering Functions ---
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
        document.getElementById('modal-close').addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
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
        document.getElementById('modal-close').addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }
    
    // --- Other Page Rendering Functions ---
    function renderAdvisoriesPage() {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>PUBLIC ADVISORIES</h2>
                    <div class="advisories-grid">
                        <div class="advisory-card protocol">
                            <div class="advisory-header"><span class="advisory-type">CIVILIAN PROTOCOL</span><h3>Standard Procedure: Unforeseen Awakened Events</h3></div>
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
                            <div class="advisory-header"><span class="advisory-type">INFORMATIONAL BULLETIN</span><h3>The National Awakened Registry</h3></div>
                            <div class="advisory-body">
                                <p>ARISA encourages all Awakened individuals to voluntarily enroll in the National Awakened Registry. Registration is a safe and secure process designed to provide support and legal protection.</p>
                                <ul>
                                    <li>Legal immunity in certain pre-approved self-defense scenarios.</li>
                                    <li>Access to sanctioned safe-use zones for ability testing and training.</li>
                                    <li>Eligibility for licensed professions that utilize Awakened abilities.</li>
                                    <li>Access to psychological and medical support tailored for Awakened individuals.</li>
                                </ul>
                                <p>While registration is not mandatory, unregistered public use of abilities may result in an official investigation.</p>
                            </div>
                        </div>
                        <div class="advisory-card informational">
                            <div class="advisory-header"><span class="advisory-type">INFORMATIONAL BULLETIN</span><h3>Understanding the "Third Awakening"</h3></div>
                            <div class="advisory-body">
                                <p>ARISA has received numerous reports regarding the recent global luminous event, now designated the "Third Awakening." This phenomenon may trigger latent Awakened abilities in the general populace.</p>
                                <p>If you or someone you know experiences sudden anomalous phenomena or the appearance of a 'Saturn's Scar' mark, please remain calm. ARISA has established dedicated support channels to provide guidance and ensure public safety.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderNotFoundPage(page) {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>SECTION [${page.toUpperCase()}] NOT FOUND</h2>
                    <p>The requested content could not be located. Please check the URL or navigate using the main menu.</p>
                </div>
            </section>
        `;
    }

    // --- Navigation & Initialization ---
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href.startsWith('#')) {
                    // Allow browser to handle external links or different pages
                    return;
                }
                e.preventDefault();
                const page = href.substring(1) || 'home';
                history.pushState(null, '', href);
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
    
    setupNavigation();
});
