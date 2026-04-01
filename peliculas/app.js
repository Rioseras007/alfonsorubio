// App Logic for 007 Forever
document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Logic
    const header = document.querySelector('header');
    const nav = document.getElementById('mainNav');
    if (header && nav) {
        // Create hamburger button dynamically
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }

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
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const sortChronoBtn = document.getElementById('sortChrono');
    const sortAlphaBtn = document.getElementById('sortAlpha');
    const videoModal = document.getElementById('videoModal');
    const mainPlayer = document.getElementById('mainPlayer');
    const closeModal = document.getElementById('closeModal');

    let currentMovies = (typeof movies !== 'undefined') ? movies : [];
    let currentSort = 'chrono'; // Default chronological

    if (movieGrid) {
        // Initial Render for movies
        // renderMovies(currentMovies); // This will now be handled by filterAndRender initially

        const movieSearch = document.getElementById('movieSearch');
        let currentFilter = 'all';
        let currentSearch = '';

        function filterAndRender() {
            let filtered = movies; // Start with the full list of movies

            // Apply actor filter
            if (currentFilter !== 'all') {
                filtered = filtered.filter(m => m.actor === currentFilter);
            }

            // Apply search filter
            if (currentSearch) {
                const query = currentSearch.toLowerCase();
                filtered = filtered.filter(m =>
                    m.title.toLowerCase().includes(query) ||
                    m.actor.toLowerCase().includes(query)
                );
            }

            // Apply sorting to the filtered list
            if (currentSort === 'chrono') {
                filtered.sort((a, b) => a.year - b.year);
            } else {
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            }

            currentMovies = filtered; // Update currentMovies to reflect filtered and sorted list
            renderMovies(currentMovies);
        }

        // Filtering Logic (modified to use filterAndRender)
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Update
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentFilter = btn.getAttribute('data-filter');
                filterAndRender();
            });
        });

        // Search Input Logic
        if (movieSearch) {
            movieSearch.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                filterAndRender();
            });
        }

        // Initial render with all filters and sorting applied
        filterAndRender();


        // Sorting Logic (modified to use filterAndRender)
        if (sortChronoBtn) {
            sortChronoBtn.addEventListener('click', () => {
                currentSort = 'chrono';
                sortChronoBtn.classList.add('active');
                sortAlphaBtn.classList.remove('active');
                applySorting();
                renderMovies(currentMovies);
            });
        }

        if (sortAlphaBtn) {
            sortAlphaBtn.addEventListener('click', () => {
                currentSort = 'alpha';
                sortAlphaBtn.classList.add('active');
                sortChronoBtn.classList.remove('active');
                applySorting();
                renderMovies(currentMovies);
            });
        }
    }

    function applySorting() {
        if (currentSort === 'chrono') {
            currentMovies.sort((a, b) => a.year - b.year);
        } else {
            currentMovies.sort((a, b) => a.title.localeCompare(b.title));
        }
    }

    function renderMovies(movieList) {
        if (!movieGrid) return;
        movieGrid.innerHTML = '';
        movieList.forEach((movie, index) => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            // Calc Mission Number (for historic archive feel)
            const missionNumber = (index + 1).toString().padStart(3, '0');

            // Build format buttons HTML
            let formatButtons = '';
            if (movie.mkv) {
                formatButtons += `<button class="format-badge mkv-btn" data-src="${movie.mkv}">MKV</button>`;
            }
            if (movie.mp4) {
                formatButtons += `<button class="format-badge mp4-btn" data-src="${movie.mp4}">MP4</button>`;
            }

            // Fallback play logic (defaults to first available)
            const defaultSrc = movie.mkv || movie.mp4;

            // Generate dossier slug (must match generate_all_dossiers.py SLUG_MAP keys)
            const slugMap = {
                "Agente 007 contra el Dr. No (1962)": "dr_no",
                "Desde Rusia con amor (1963)": "desde_rusia_con_amor",
                "James Bond Contra Goldfinger (1964)": "james_bond_contra_goldfinger",
                "Operacion Trueno (1965)": "operacion_trueno",
                "Solo Se Vive Dos Veces (1967)": "solo_se_vive_dos_veces",
                "Al Servicio Secreto de su Majestad (1969)": "al_servicio_secreto_de_su_majestad",
                "Diamantes para La Eternidad (1971)": "diamantes_para_la_eternidad",
                "Vive y deja Morir (1973)": "vive_y_deja_morir",
                "El hombre de la pistola de oro (1974)": "el_hombre_de_la_pistola_de_oro",
                "La Espia Que Me Amo (1977)": "la_espia_que_me_amo",
                "Moonraker (1979)": "moonraker",
                "Solo para sus Ojos (1981)": "solo_para_sus_ojos",
                "Octopussy (1983)": "octopussy",
                "Panorama para Matar (1985)": "panorama_para_matar",
                "Alta tension (1987)": "alta_tension",
                "Licencia para Matar (1989)": "licencia_para_matar",
                "Goldeneye (1995)": "goldeneye",
                "El Mañana nunca Muere (1997)": "el_manana_nunca_muere",
                "El Mundo nunca es Suficiente (1999)": "el_mundo_nunca_es_suficiente",
                "Muere otro Dia (2002)": "muere_otro_dia",
                "Casino Royale (2006)": "casino_royale_2006",
                "Quantum Of Solace (2008)": "quantum_of_solace",
                "Skyfall (2012)": "skyfall",
                "Spectre (2015)": "spectre",
                "Sin tiempo para morir (2022)": "sin_tiempo_para_morir"
            };

            const dossierSlug = slugMap[movie.title] || null;
            const dossierLink = dossierSlug ? `<a href="${dossierSlug}.html" class="dossier-btn">DOSSIER</a>` : '';

            card.innerHTML = `
                <div class="thumb-wrapper">
                    <div class="mission-tag">MISSION ${missionNumber}</div>
                    <img src="${movie.thumb}" alt="${movie.title}" onerror="this.src='james-bond-6-1.jpg'">
                    <div class="card-overlay">
                        ${dossierLink}
                    </div>
                </div>
                <div class="movie-info">
                    <span class="movie-year">${movie.year}</span>
                    <h3>${movie.title}</h3>
                    <p style="color: var(--text-dim); font-size: 0.8rem; margin-bottom: 8px;">${movie.actor}</p>
                    <div class="format-selector" style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
                        <div style="display: flex; gap: 8px;">
                            ${formatButtons}
                        </div>
                    </div>
                </div>
            `;

            // Default card click plays default source
            card.onclick = (e) => {
                // Ignore if clicked on a specific badge
                if (e.target.classList.contains('format-badge')) return;

                gunshotSound.currentTime = 0;
                gunshotSound.play().catch(e => console.log('Audio error:', e));
                openPlayer(defaultSrc);
            };

            // Add listeners to badges
            const badges = card.querySelectorAll('.format-badge');
            badges.forEach(badge => {
                badge.onclick = (e) => {
                    e.stopPropagation(); // Prevent card click
                    gunshotSound.currentTime = 0;
                    gunshotSound.play().catch(e => console.log('Audio error:', e));
                    openPlayer(badge.getAttribute('data-src'));
                }
            });

            movieGrid.appendChild(card);
        });

        // Re-attach sounds for new elements
        attachSoundEffects();
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

    // Sound FX Logic
    const gunshotSound = new Audio('fxsounds/gunshot.wav');
    gunshotSound.volume = 0.4;

    function playGunshotAndNavigate(e) {
        // Only trigger if it's a left click and no modifier keys
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const target = e.currentTarget;
        const href = target.getAttribute('href');
        const targetAttr = target.getAttribute('target');

        // If open in new tab, just play sound
        if (targetAttr === '_blank') {
            gunshotSound.currentTime = 0;
            gunshotSound.play().catch(e => console.log('Audio error:', e));
            return;
        }

        // If valid internal link, delay navigation
        if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
            e.preventDefault();
            gunshotSound.currentTime = 0;
            gunshotSound.play().catch(e => console.log('Audio error:', e));

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        } else {
            // Just play sound
            gunshotSound.currentTime = 0;
            gunshotSound.play().catch(e => console.log('Audio error:', e));
        }
    }

    // Attach to Nav and Buttons
    function attachSoundEffects() {
        const interactiveElements = document.querySelectorAll('nav a, .btn-primary, .actor-card a, .logo, .filter-btn, .dossier-btn, .back-button');
        interactiveElements.forEach(el => {
            // Remove old listeners to avoid duplicates if re-run
            el.removeEventListener('click', playGunshotAndNavigate);
            el.addEventListener('click', playGunshotAndNavigate);
        });
    }

    attachSoundEffects();

    // Initial language run
    updateUI();
});
