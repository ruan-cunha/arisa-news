document.addEventListener('DOMContentLoaded', () => {
    const newsFeed = document.getElementById('news-feed');

    // Carrega e exibe as notícias do arquivo news.js
    function loadNews() {
        if (!newsData || newsData.length === 0) {
            newsFeed.innerHTML = "<p>No articles found.</p>";
            return;
        }

        newsData.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-article';
            
            articleElement.innerHTML = `
                <p class="meta">${article.category} // ${article.date}</p>
                <h2>${article.headline}</h2>
                <p>${article.body}</p>
            `;
            newsFeed.appendChild(articleElement);
        });
    }

    // Registra o Service Worker para fazer o app funcionar offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
    }

    // Inicia o app
    loadNews();
});