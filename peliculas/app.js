// App Logic for 007 Forever
document.addEventListener('DOMContentLoaded', () => {
    // Internationalization logic
    let currentLang = localStorage.getItem('007_lang') || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('007_lang', lang);
        updateUI();
    }

    function updateUI() {
        // Update static text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Update active class on switcher
        document.querySelectorAll('.lang-switcher span').forEach(s => s.classList.remove('active'));
        const activeLangEl = document.getElementById(`lang-${currentLang}`);
        if (activeLangEl) activeLangEl.classList.add('active');

        // Re-render movies if we are on the movies page
        if (document.getElementById('movieGrid')) {
            renderMovies(currentMovies); // Re-render with current filters but new language version suffix
        }
    }

    // Language switcher event listeners
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');

    if (langEs) langEs.onclick = () => setLanguage('es');
    if (langEn) langEn.onclick = () => setLanguage('en');

    // Movie related logic
    const movieGrid = document.getElementById('movieGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoModal = document.getElementById('videoModal');
    const mainPlayer = document.getElementById('mainPlayer');
    const closeModal = document.getElementById('closeModal');

    let currentMovies = (typeof movies !== 'undefined') ? movies : [];

    if (movieGrid) {
        // Initial Render for movies
        renderMovies(currentMovies);

        // Filtering Logic
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Update
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                if (filter === 'all') {
                    currentMovies = movies;
                } else if (filter === 'classic' || filter === 'modern') {
                    currentMovies = movies.filter(m => m.era === filter);
                } else if (filter === 'mkv' || filter === 'mp4') {
                    currentMovies = movies.filter(m => m.format === filter);
                }
                renderMovies(currentMovies);
            });
        });
    }

    function renderMovies(movieList) {
        if (!movieGrid) return;
        movieGrid.innerHTML = '';
        movieList.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            const versionText = translations[currentLang].version_suffix;
            card.innerHTML = `
                <div class="thumb-wrapper">
                    <img src="${movie.thumb}" alt="${movie.title}" onerror="this.src='james-bond-6-1.jpg'">
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.format.toUpperCase()} ${versionText}</p>
                </div>
            `;
            card.onclick = () => openPlayer(movie.src);
            movieGrid.appendChild(card);
        });
    }

    // Modal Logic
    function openPlayer(src) {
        if (!mainPlayer) return;
        mainPlayer.src = src;
        videoModal.classList.add('active');
        mainPlayer.play();
    }

    if (closeModal) {
        closeModal.onclick = () => {
            videoModal.classList.remove('active');
            mainPlayer.pause();
            mainPlayer.src = "";
        };

        // Close on outside click
        window.onclick = (event) => {
            if (event.target == videoModal) {
                closeModal.onclick();
            }
        };
    }

    // Initial language run
    updateUI();
});
