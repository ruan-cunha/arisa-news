document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Roteador de Páginas Simples ---
    function navigateTo(page) {
        // Atualiza o link ativo na navegação
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Renderiza o conteúdo da página correspondente
        switch(page) {
            case 'home':
                renderHomePage();
                break;
            case 'news':
                renderNewsPage();
                break;
            // Casos para outras páginas serão adicionados aqui no futuro
            default:
                renderNotFoundPage();
        }
        
        // Fecha o menu mobile após a navegação
        if (mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-open');
        }
    }

    // --- Funções de Renderização de Conteúdo ---
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
                    <p>Content for latest news will go here later.</p>
                </div>
            </section>
        `;
    }

    function renderNewsPage() {
        // Acessa a variável `newsData` do arquivo news.js
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        let articlesHTML = sortedNews.map(article => `
            <div class="news-article" style="animation-delay: ${sortedNews.indexOf(article) * 0.1}s">
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

    function renderNotFoundPage() {
        mainContent.innerHTML = `
            <section class="content-section">
                <div class="section-container">
                    <h2>SECTION NOT AVAILABLE</h2>
                    <p>This section of the portal is currently under development. Please check back later for updates.</p>
                </div>
            </section>
        `;
    }


    // --- Lógica do Menu de Navegação ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            // Adiciona um "data-page" aos links do header para funcionar
            if (page) {
                navigateTo(page);
            } else {
                navigateTo('home'); // Página padrão
            }
        });
    });

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
        mobileNavToggle.classList.toggle('is-open');
    });


    // --- Inicialização ---
    // Começa na página inicial
    navigateTo('home');

});
