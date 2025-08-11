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
            // Compara o data-page do link com a página atual
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
            case 'database':
                renderAssetDatabasePage();
                break;
            // Casos para outras páginas serão adicionados aqui no futuro
            default:
                renderNotFoundPage(page);
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

    // Função para renderizar o banco de dados de heróis
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


    // --- Lógica do Menu de Navegação ---
    // Adiciona o atributo data-page a cada link para facilitar a identificação
    navLinks.forEach(link => {
        const pageName = link.textContent.trim().toLowerCase().replace(' ', '');
        if (pageName === 'newswire') {
            link.dataset.page = 'news';
        } else if (pageName === 'assetdatabase') {
            link.dataset.page = 'database';
        } else {
            link.dataset.page = pageName;
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.currentTarget.dataset.page);
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
