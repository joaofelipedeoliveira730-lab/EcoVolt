/**
 * LÓGICA E INTERAÇÃO DO PORTAL INFOTEC
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. TEMA CLARO / ESCURO
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Verificar se existe preferência no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // Guardar preferência
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    /* ==========================================================================
       2. FILTROS E PESQUISA DE JOGOS (DENTRO DA GRELHA)
       ========================================================================== */
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const gameCards = document.querySelectorAll('.game-card');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterGames() {
        gameCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchQuery);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Evento de Digitação na barra de Pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterGames();
        });
    }

    // Evento de Clique nos Filtros de Categorias
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeCategory = btn.getAttribute('data-category');
            filterGames();
        });
    });

});