document.addEventListener('DOMContentLoaded', () => {
    // Apontar para o novo container de notícias
    const newsFeedContent = document.getElementById('news-feed-content');

    function loadNews() {
        if (!newsData || newsData.length === 0) {
            newsFeedContent.innerHTML = "<p>No articles found.</p>";
            return;
        }

        // Ordenar notícias pela data mais recente primeiro
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedNews.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-article';
            
            articleElement.innerHTML = `
                <p class="meta">${article.category} // ${article.date}</p>
                <h2>${article.headline}</h2>
                <p>${article.body}</p>
            `;
            newsFeedContent.appendChild(articleElement);
        });
    }

    // Registra o Service Worker (inalterado, mas importante)
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
