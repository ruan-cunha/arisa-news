document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    // Lógica de navegação simples para destacar o item ativo
    function handleNavClick(event) {
        // Impede o comportamento padrão do link
        event.preventDefault(); 
        
        // Remove a classe 'active' de todos os itens
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Adiciona a classe 'active' ao item clicado
        const clickedItem = event.currentTarget;
        clickedItem.classList.add('active');

        const page = clickedItem.dataset.page;
        console.log(`Navigation: Switched to ${page} page.`);
        
        // No futuro, aqui carregaremos o conteúdo da página correspondente
    }

    // Adiciona o "ouvinte" de clique a cada item da navegação
    navItems.forEach(item => {
        item.addEventListener('click', handleNavClick);
    });

    console.log("ARISA Portal Initialized.");
});
