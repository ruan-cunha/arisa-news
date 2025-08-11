document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- Roteador de Páginas Simples ---
    function navigateTo(page) {
        navLinks.forEach(link => {
            // Usa o href para encontrar a página correta
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
            default:
                renderHomePage(); // Volta para a Home se a página não for encontrada
        }
        
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

    // NEW: Função para renderizar o banco de dados de heróis
    function renderAssetDatabasePage() {
        // Acessa a variável `loreData` do arquivo lore.js
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

    // --- Lógica do Menu de Navegação ---
    // Atualizado para usar hashes na URL para navegação
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = new URL(e.currentTarget.href).hash.substring(1) || 'home';
                history.pushState(null, '', `#${page}`);
                navigateTo(page);
            });
        });

        // Garante que a página correta seja carregada ao usar os botões de voltar/avançar do navegador
        window.addEventListener('popstate', () => {
            const page = location.hash.substring(1) || 'home';
            navigateTo(page);
        });

        // Carrega a página inicial ou a página no hash da URL
        const initialPage = location.hash.substring(1) || 'home';
        navigateTo(initialPage);
    }

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
        mobileNavToggle.classList.toggle('is-open');
    });

    // --- Inicialização ---
    setupNavigation();
});
