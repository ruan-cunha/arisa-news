document.addEventListener('DOMContentLoaded', () => {
    console.log("ARISA Official Portal Initialized.");

    // Seletores dos elementos principais da UI
    const mainContent = document.querySelector('main');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    /**
     * Função principal que controla a navegação entre as "páginas" do portal.
     * @param {string} page - O identificador da página a ser exibida (ex: 'home', 'news').
     */
    function navigateTo(page) {
        // Atualiza qual link de navegação está com a classe 'active'
        navLinks.forEach(link => {
            // O href do link (removendo o '#') deve ser igual à página
            link.classList.toggle('active', link.hash === `#${page}`);
        });

        // Com base no identificador, chama a função que renderiza o conteúdo correto
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
                // Se a página não for encontrada, renderiza a página 'home' como padrão
                // ou uma página de "não encontrado", se preferir.
                renderHomePage(); 
        }
        
        // Se o menu mobile estiver aberto, fecha ele após o clique
        if (mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-open');
        }
    }

    // --- Funções que "desenham" o conteúdo de cada página ---

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
        // Acessa a variável `newsData` do arquivo news.js
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
    
    // Adiciona o "ouvinte" de clique para cada link da navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão de pular a página
            const page = e.currentTarget.hash.substring(1); // Pega o nome da página do href (ex: #news -> news)
            
            // Atualiza a URL para refletir a nova página (bom para compartilhar links)
            history.pushState(null, '', `#${page}`);
            
            navigateTo(page);
        });
    });

    // Adiciona a lógica para o botão de menu mobile
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
        mobileNavToggle.classList.toggle('is-open');
    });


    // --- Inicialização ---
    // Verifica se a URL já tem um # (ex: se alguém compartilhou o link para a página de notícias)
    const initialPage = window.location.hash.substring(1) || 'home';
    navigateTo(initialPage);
});
