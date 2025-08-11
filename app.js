document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-item');
    const newsFeedContent = document.getElementById('news-feed-content');

    // --- Page Navigation Logic ---
    function navigateTo(pageId) {
        // Hide all page sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        // Show the target page section
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        // Update active state on nav links
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });
    }

    // Add click listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const pageId = link.dataset.page;
            navigateTo(pageId);
        });
    });

    // --- News Loading Logic ---
    function loadNews() {
        if (!newsData || newsData.length === 0) {
            newsFeedContent.innerHTML = "<p>No articles found.</p>";
            return;
        }
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

    // --- Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful:', registration.scope);
            }).catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }

    // Initial load
    loadNews();
    navigateTo('home'); // Start on the home page
});
