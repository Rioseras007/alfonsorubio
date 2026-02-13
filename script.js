document.addEventListener('DOMContentLoaded', () => {
    // --- LIBRARIES & INITIALIZATION ---
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // --- UTILS & CORE SYSTEM ---
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const showToast = (msg, isError = false) => {
        const t = document.createElement('div');
        t.className = `toast ${isError ? 'error' : ''}`;
        const icon = isError ? 'alert-octagon' : 'check-circle';
        t.innerHTML = `<i data-lucide="${icon}"></i> <span>${msg}</span>`;
        document.body.appendChild(t);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        setTimeout(() => {
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 500);
        }, isError ? 10000 : 4000); // 10s for errors
    };

    window.onerror = (msg, url, line) => {
        // console.error("Vaultify Error:", msg, "at", url, ":", line);
        // showToast(`Error de inicialización: ${msg}`, true);
        return false;
    };

    const $ = (id) => document.getElementById(id);
    const on = (id, event, handler) => {
        const el = $(id);
        if (el) el.addEventListener(event, handler);
    };
    const onClick = (id, handler) => on(id, 'click', handler);

    function toBase64(arr) { return btoa(String.fromCharCode(...new Uint8Array(arr))); }
    function fromBase64(str) {
        try {
            const binary = atob(str);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return bytes;
        } catch (e) { return new Uint8Array(); }
    }

    async function deriveKey(password, salt) {
        const pwBytes = encoder.encode(password);
        const baseKey = await crypto.subtle.importKey("raw", pwBytes, "PBKDF2", false, ["deriveBits", "deriveKey"]);
        return await crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 600000, hash: "SHA-256" },
            baseKey, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
        );
    }

    async function encrypt(text, key) {
        if (!key) return { iv: "", data: "" };
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(text));
        return { iv: toBase64(iv), data: toBase64(new Uint8Array(encrypted)) };
    }

    async function decrypt(encObj, key) {
        if (!key || !encObj || !encObj.iv || !encObj.data) return "ERROR";
        try {
            const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(encObj.iv) }, key, fromBase64(encObj.data));
            return decoder.decode(decrypted);
        } catch (e) { return "ERROR"; }
    }

    async function hashMaster(pass) {
        const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(pass));
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // --- AUDIO SYSTEM (Web Audio API) ---
    let isSoundEnabled = localStorage.getItem('v2_sound_enabled') !== 'false';
    let audioCtx = null;

    const playSound = (type) => {
        if (!isSoundEnabled) return;
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(10, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);

                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(783.99, now + 0.05);
                gain2.gain.setValueAtTime(0.05, now + 0.05);
                gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc2.start(now + 0.05);
                osc2.stop(now + 0.35);
            } else if (type === 'error') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            }
        } catch (e) { console.warn("Audio Context blocked or failed."); }
    };

    window.toggleSoundFromUI = () => {
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('v2_sound_enabled', isSoundEnabled);
        updateSoundUI();
        playSound('click');
    };

    const updateSoundUI = () => {
        const thumb = $('sound-toggle-thumb');
        const btn = $('sound-toggle-btn');
        const text = $('sound-status-text');
        if (!thumb || !btn || !text) return;

        if (isSoundEnabled) {
            thumb.style.left = '23px';
            btn.style.background = 'var(--primary)';
            text.textContent = 'Activado';
            text.style.color = 'var(--primary)';
        } else {
            thumb.style.left = '3px';
            btn.style.background = 'rgba(255,255,255,0.1)';
            text.textContent = 'Silenciado';
            text.style.color = 'var(--text-dim)';
        }
    };

    const setTheme = (theme) => {
        document.body.classList.remove('light-mode', 'emerald-mode', 'cyber-mode');
        if (theme !== 'default') document.body.classList.add(`${theme}-mode`);
        currentTheme = theme;
        localStorage.setItem('v2_theme', theme);

        // Update selection UI
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) btn.classList.add('active');
        });
    };

    // --- STATE & UI ---
    let currentFilter = 'all';
    let profiles = [];
    let pendingAvatar = null;
    let currentTheme = localStorage.getItem('v2_theme') || 'default';
    let activeUser = null;
    let sessionKey = null;
    let credentials = [];

    // Global Error Catcher for Debugging
    window.addEventListener('error', (e) => {
        console.error("Vaultify Runtime Error:", e.message, "at", e.filename, ":", e.lineno);
        // Uncomment the next line if you want to see errors as toasts
        // showToast(`Error Crítico: ${e.message}`, true);
    });

    const getStoreKey = (suffix) => activeUser ? `v2_${activeUser.id}_${suffix}` : null;

    const loadProfiles = () => {
        const raw = localStorage.getItem('v2_profiles');
        profiles = raw ? JSON.parse(raw) : [];

        // Legacy Migration Check (from very old versions)
        if (localStorage.getItem('v2_master') && profiles.length === 0) {
            const legacyUser = { id: 'default', name: 'Principal', avatar: null };
            profiles.push(legacyUser);
            localStorage.setItem('v2_profiles', JSON.stringify(profiles));
            localStorage.setItem('v2_default_master', localStorage.getItem('v2_master'));
            localStorage.setItem('v2_default_salt', localStorage.getItem('v2_salt'));
            localStorage.setItem('v2_default_data', localStorage.getItem('v2_data'));
        }
    };

    const saveProfiles = () => {
        localStorage.setItem('v2_profiles', JSON.stringify(profiles));
    };

    const renderProfiles = () => {
        const list = document.getElementById('profiles-list');
        if (!list) return;
        list.innerHTML = '';

        profiles.forEach(p => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            card.style.position = 'relative';
            card.onclick = (e) => {
                if (e.target.closest('.profile-actions')) return;
                selectProfile(p);
            };

            const avatarImg = p.avatar ? `<img src="${p.avatar}" class="profile-avatar">` :
                `<div class="profile-avatar"><i data-lucide="user" style="width: 50% !important;"></i></div>`;

            card.innerHTML = `
                <div class="profile-actions">
                    <button class="p-action-btn" onclick="event.stopPropagation(); openProfileModal('${p.id}')" title="Editar Perfil">
                        <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="p-action-btn delete" onclick="event.stopPropagation(); deleteProfile('${p.id}')" title="Eliminar Miembro">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                    </button>
                </div>
                ${avatarImg}
                <span class="profile-name">${p.name}</span>
            `;
            list.appendChild(card);
        });

        const addBtn = document.createElement('div');
        addBtn.className = 'profile-card btn-add-profile';
        addBtn.innerHTML = `
            <div class="profile-avatar"><i data-lucide="user-plus"></i></div>
            <span class="profile-name">Añadir Miembro</span>
        `;
        addBtn.onclick = () => openProfileModal();
        list.appendChild(addBtn);
        lucide.createIcons();
    };

    window.deleteProfile = (id) => {
        const p = profiles.find(x => x.id === id);
        if (!p) return;
        if (confirm(`¿Estás seguro de que quieres eliminar a ${p.name}? Se perderán todos sus datos y contraseñas para siempre.`)) {
            localStorage.removeItem(`v2_${id}_master`);
            localStorage.removeItem(`v2_${id}_salt`);
            localStorage.removeItem(`v2_${id}_data`);
            profiles = profiles.filter(x => x.id !== id);
            saveProfiles();
            renderProfiles();
            showToast(`Perfil de ${p.name} eliminado.`);
        }
    };

    const selectProfile = (user) => {
        activeUser = user;
        const pScreen = $('profiles-screen');
        if (pScreen) pScreen.classList.remove('active');
        const aScreen = $('auth-screen');
        if (aScreen) aScreen.classList.add('active');
        const aName = $('auth-user-name');
        if (aName) aName.textContent = user.name;

        // Update Auth View
        const container = $('active-user-avatar');
        if (container) {
            container.innerHTML = user.avatar ? `<img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` :
                `<i data-lucide="user" style="width:60px; height:60px;"></i>`;
        }

        const hName = $('header-user-name');
        if (hName) hName.textContent = user.name;

        const hAvatar = $('header-avatar');
        if (hAvatar) {
            hAvatar.innerHTML = user.avatar ? `<img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` :
                `<i data-lucide="user" style="width:20px; height:20px;"></i>`;
        }

        checkSetup();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // --- WEBCAM LOGIC ---
    let webcamStream = null;

    window.openProfileModal = async (editId = null) => {
        const modal = $('profile-modal');
        const title = $('p-modal-title');
        const submitBtn = $('p-submit-btn');
        const idInput = $('p-id');
        const nameInput = $('profile-name');
        const video = $('webcam-video');
        const preview = $('webcam-preview');

        if (modal) modal.classList.add('active');
        pendingAvatar = null;

        if (editId) {
            const p = profiles.find(x => x.id === editId);
            if (p) {
                if (title) title.textContent = "Editar Perfil";
                if (submitBtn) submitBtn.textContent = "GUARDAR CAMBIOS";
                if (idInput) idInput.value = p.id;
                if (nameInput) nameInput.value = p.name;
                if (p.avatar) {
                    if (preview) {
                        preview.src = p.avatar;
                        preview.style.display = 'block';
                    }
                    if (video) video.style.display = 'none';
                    const capBtn = $('capture-photo-btn');
                    if (capBtn) capBtn.classList.add('hidden');
                    const retBtn = $('retake-photo-btn');
                    if (retBtn) retBtn.classList.remove('hidden');
                    pendingAvatar = p.avatar;
                } else {
                    startWebcam();
                }
            }
        } else {
            if (title) title.textContent = "Nuevo Miembro";
            if (submitBtn) submitBtn.textContent = "AÑADIR A LA FAMILIA";
            if (idInput) idInput.value = '';
            if (nameInput) nameInput.value = '';
            startWebcam();
        }
    };

    const startWebcam = async () => {
        const video = $('webcam-video');
        const preview = $('webcam-preview');
        if (video) video.style.display = 'block';
        if (preview) preview.style.display = 'none';
        const capBtn = $('capture-photo-btn');
        if (capBtn) capBtn.classList.remove('hidden');
        const retBtn = $('retake-photo-btn');
        if (retBtn) retBtn.classList.add('hidden');

        try {
            webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (video) video.srcObject = webcamStream;
        } catch (err) {
            showToast("Cámara no disponible. Puedes subir una foto.", true);
        }
    };

    const stopWebcam = () => {
        if (webcamStream) {
            webcamStream.getTracks().forEach(track => track.stop());
            webcamStream = null;
        }
    };

    onClick('close-profile-modal', () => {
        const m = $('profile-modal');
        if (m) m.classList.remove('active');
        stopWebcam();
    });

    onClick('capture-photo-btn', () => {
        const video = $('webcam-video');
        const preview = $('webcam-preview');
        const canvas = $('webcam-canvas');
        if (!video || !preview || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        pendingAvatar = canvas.toDataURL('image/jpeg', 0.8);

        preview.src = pendingAvatar;
        video.style.display = 'none';
        preview.style.display = 'block';

        const capBtn = $('capture-photo-btn');
        if (capBtn) capBtn.classList.add('hidden');
        const retBtn = $('retake-photo-btn');
        if (retBtn) retBtn.classList.remove('hidden');

        showToast("¡Foto capturada!");
        stopWebcam();
    });

    onClick('retake-photo-btn', () => {
        const idInput = $('p-id');
        openProfileModal(idInput ? idInput.value : null);
    });

    onClick('upload-photo-btn', () => {
        const up = $('avatar-upload');
        if (up) up.click();
    });

    on('avatar-upload', 'change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            pendingAvatar = event.target.result;
            const preview = $('webcam-preview');
            const video = $('webcam-video');
            if (preview) {
                preview.src = pendingAvatar;
                preview.style.display = 'block';
            }
            if (video) video.style.display = 'none';
            const capBtn = $('capture-photo-btn');
            if (capBtn) capBtn.classList.add('hidden');
            const retBtn = $('retake-photo-btn');
            if (retBtn) retBtn.classList.remove('hidden');
            showToast("Foto cargada.");
        };
        reader.readAsDataURL(file);
    });

    on('profile-form', 'submit', (e) => {
        e.preventDefault();
        const idInput = $('p-id');
        const nameInput = $('profile-name');
        if (!idInput || !nameInput) return;

        const id = idInput.value;
        const name = nameInput.value;

        if (id) {
            const p = profiles.find(x => x.id === id);
            p.name = name;
            p.avatar = pendingAvatar || p.avatar;
            showToast("Perfil actualizado.");
        } else {
            const newId = 'u-' + Date.now();
            profiles.push({ id: newId, name, avatar: pendingAvatar });
            showToast(`¡Bienvenido a la familia, ${name}!`);
        }

        saveProfiles();
        renderProfiles();
        const m = $('profile-modal');
        if (m) m.classList.remove('active');
        stopWebcam();
    });

    // --- SETUP CHECK ---
    const checkSetup = () => {
        const isSetup = !localStorage.getItem(getStoreKey('master'));
        const submitBtn = $('auth-submit-btn');
        const submitText = $('auth-submit-text');
        const subtitle = $('auth-subtitle');
        const label = $('pass-label');
        if (!submitBtn) return;
        const icon = submitBtn.querySelector('i, svg');

        if (isSetup) {
            submitBtn.classList.add('btn-setup');
            if (submitText) submitText.textContent = "CONFIGURAR BÓVEDA";
            if (subtitle) subtitle.textContent = "Bienvenido. Crea tu llave maestra para empezar.";
            if (label) label.textContent = "Nueva Llave Maestra";
            if (icon) icon.setAttribute('data-lucide', 'shield-plus');
        } else {
            submitBtn.classList.remove('btn-setup');
            if (submitText) submitText.textContent = "DESBLOQUEAR BÓVEDA";
            if (subtitle) subtitle.textContent = "Protección Web Crypto Nivel Bitwarden";
            if (label) label.textContent = "Llave Maestra";
            if (icon) icon.setAttribute('data-lucide', 'unlock');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // --- STATE & STORAGE UPDATES ---
    const loadData = () => {
        const raw = localStorage.getItem(getStoreKey('data'));
        credentials = raw ? JSON.parse(raw) : [];
    };

    const saveData = () => {
        localStorage.setItem(getStoreKey('data'), JSON.stringify(credentials));
        updateBanner();
    };

    const updateBanner = () => {
        const banner = $('migration-banner');
        if (!banner) return;
        if (credentials.length === 0) banner.classList.remove('hidden');
        else banner.classList.add('hidden');
    };

    const getScore = (pass) => {
        let score = 0;
        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const render = async (filter = '') => {
        const rowsContainer = $('credentials-rows');
        if (!rowsContainer) return;
        rowsContainer.innerHTML = '';

        let processed = [];
        for (const c of credentials) {
            const pass = await decrypt(c.pass, sessionKey);
            const notes = c.notes ? await decrypt(c.notes, sessionKey) : '';
            processed.push({ ...c, decryptedPass: pass, decryptedNotes: notes, score: getScore(pass) });
        }

        let filtered = processed.filter(c =>
            c.site.toLowerCase().includes(filter.toLowerCase()) ||
            c.user.toLowerCase().includes(filter.toLowerCase())
        );

        if (currentFilter === 'weak') {
            // Audit Mode: Show all but sort by strength (weakest first)
            filtered.sort((a, b) => a.score - b.score);
        } else if (currentFilter !== 'all') {
            filtered = filtered.filter(c => c.category === currentFilter);
        }

        if (filtered.length === 0) {
            rowsContainer.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--text-dim);">
                    <i data-lucide="inbox" style="width: 48px; height: 48px; opacity: 0.2; margin-bottom: 1rem;"></i>
                    <p>No se encontraron registros en esta categoría.</p>
                </div>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        for (const c of filtered) {
            const row = document.createElement('div');
            row.className = 'cred-row';
            const pass = c.decryptedPass;
            const badgeClass = `badge-${(c.category || 'Otros').toLowerCase()}`;

            // Favicon Logic
            let domain = "";
            if (c.url) {
                try { domain = new URL(c.url).hostname; } catch (e) { domain = c.url; }
            } else {
                domain = c.site.toLowerCase().replace(/\s+/g, '') + ".com";
            }
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

            row.innerHTML = `
                <div class="favicon-container">
                    <img src="${faviconUrl}" onerror="this.src='https://www.google.com/s2/favicons?domain=google.com&sz=64'">
                </div>
                <div class="col-site">
                    ${c.url ?
                    `<a href="${c.url.startsWith('http') ? c.url : 'https://' + c.url}" 
                            target="_blank" 
                            style="color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;" 
                            title="Ir a ${c.site}">
                            <span>${c.site}</span>
                            <i data-lucide="external-link" style="width:14px; opacity: 0.7;"></i>
                         </a>` :
                    `<span>${c.site}</span>`
                }
                </div>
                <div><span class="badge ${badgeClass}">${c.category || 'Otros'}</span></div>
                <div class="col-user">${c.user} <button class="copy-btn" onclick="copyText('${c.user}')"><i data-lucide="copy" style="width:14px;"></i></button></div>
                <div class="col-pass">
                    <span class="pass-mask">••••••••</span>
                    <button class="copy-btn" onclick="togglePass(this, '${pass.replace(/'/g, "\\'")}')"><i data-lucide="eye" style="width:14px;"></i></button>
                    <button class="copy-btn" onclick="copyText('${pass.replace(/'/g, "\\'")}')"><i data-lucide="copy" style="width:14px;"></i></button>
                </div>
                <div>
                    <span style="font-size: 0.7rem; font-weight: 800; color: ${c.score < 3 ? '#ef4444' : '#10b981'};">${c.score < 3 ? 'DÉBIL' : 'FUERTE'}</span>
                </div>
                <div class="col-actions">
                    ${c.decryptedNotes ? `<button class="action-btn btn-sm-action" onclick="alert('NOTAS: ' + '${c.decryptedNotes.replace(/'/g, "\\'")}')" title="Ver Notas"><i data-lucide="sticky-note"></i></button>` : ''}
                    <button class="action-btn btn-sm-action btn-edit" onclick="editCred('${c.id}')"><i data-lucide="edit-3"></i> EDITAR</button>
                    <button class="action-btn btn-sm-action btn-delete" onclick="deleteCred('${c.id}')"><i data-lucide="trash-2"></i> BORRAR</button>
                </div>
            `;
            rowsContainer.appendChild(row);
        }
        lucide.createIcons();
    };

    // --- HANDLERS ---
    window.copyText = (text) => {
        navigator.clipboard.writeText(text);
        showToast("¡Copiado al portapapeles!");
        playSound('click');
    };

    window.togglePass = (btn, pass) => {
        if (!btn) return;
        const span = btn.parentElement.querySelector('.pass-mask');
        const icon = btn.querySelector('i, svg');
        if (!span || !icon) return;

        if (span.textContent === '••••••••••••') {
            span.textContent = pass;
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            span.textContent = '••••••••••••';
            icon.setAttribute('data-lucide', 'eye');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    window.deleteCred = (id) => {
        if (confirm("¿Eliminar esta cuenta para siempre?")) {
            credentials = credentials.filter(c => c.id !== id);
            saveData();
            render();
            showToast("Cuenta eliminada.");
            playSound('error');
        }
    };

    window.editCred = async (id) => {
        const c = credentials.find(cred => cred.id === id);
        const title = $('modal-title');
        if (title) title.textContent = "Editar Cuenta";
        const idInput = $('cred-id');
        if (idInput) idInput.value = c.id;
        const siteInput = $('cred-site');
        if (siteInput) siteInput.value = c.site;
        const urlInput = $('cred-url');
        if (urlInput) urlInput.value = c.url || '';
        const userInput = $('cred-user');
        if (userInput) userInput.value = c.user;
        const catInput = $('cred-category');
        if (catInput) catInput.value = c.category || 'Otros';
        const passInput = $('cred-pass');
        if (passInput) {
            const dec = await decrypt(c.pass, sessionKey);
            passInput.value = dec;
            updateStrength(dec);
        }
        const notesInput = $('cred-notes');
        if (notesInput) {
            notesInput.value = c.notes ? await decrypt(c.notes, sessionKey) : '';
        }
        const modal = $('cred-modal');
        if (modal) modal.classList.add('active');
    };

    // Auth Form
    on('auth-form', 'submit', async (e) => {
        e.preventDefault();
        const passInput = $('master-pass');
        if (!passInput) return;
        const pass = passInput.value;
        const hashed = await hashMaster(pass);

        const mKey = getStoreKey('master');
        const sKey = getStoreKey('salt');

        if (!localStorage.getItem(mKey)) {
            const salt = crypto.getRandomValues(new Uint8Array(16));
            localStorage.setItem(mKey, hashed);
            localStorage.setItem(sKey, toBase64(salt));
            showToast("¡Bóveda configurada con éxito!");
            playSound('success');
        }

        if (hashed === localStorage.getItem(mKey)) {
            const salt = fromBase64(localStorage.getItem(sKey));
            sessionKey = await deriveKey(pass, salt);
            loadData();
            playSound('success');
            const auth = $('auth-screen');
            if (auth) auth.classList.remove('active');
            const dash = $('dashboard-screen');
            if (dash) dash.classList.add('active');
            render();
            updateBanner();
        } else {
            const err = $('auth-error');
            if (err) err.style.display = 'block';
        }
    });

    onClick('back-to-profiles', () => {
        const auth = $('auth-screen');
        if (auth) auth.classList.remove('active');
        const prof = $('profiles-screen');
        if (prof) prof.classList.add('active');
    });

    // Credential Form
    on('cred-form', 'submit', async (e) => {
        e.preventDefault();
        const idIn = $('cred-id');
        const siteIn = $('cred-site');
        const urlIn = $('cred-url');
        const userIn = $('cred-user');
        const catIn = $('cred-category');
        const passIn = $('cred-pass');

        if (!siteIn || !userIn || !catIn || !passIn) return;

        const id = idIn?.value || Date.now().toString();
        const site = siteIn.value;
        const url = urlIn?.value || '';
        const user = userIn.value;
        const category = catIn.value;
        const passPlain = passIn.value;
        const notesPlain = $('cred-notes')?.value || "";

        const encrypted = await encrypt(passPlain, sessionKey);
        const encryptedNotes = notesPlain ? await encrypt(notesPlain, sessionKey) : null;
        const entry = { id, site, url, user, category, pass: encrypted, notes: encryptedNotes };

        const idx = credentials.findIndex(c => c.id === id);
        if (idx > -1) credentials[idx] = entry;
        else credentials.push(entry);

        saveData();
        render();
        const modal = $('cred-modal');
        if (modal) modal.classList.remove('active');
        showToast("Cuenta asegurada en la bóveda.");
        playSound('success');
    });

    // UI Controls
    onClick('add-btn', () => {
        playSound('click');
        const f = $('cred-form');
        if (f) f.reset();
        const idInput = $('cred-id');
        if (idInput) idInput.value = '';
        const title = $('modal-title');
        if (title) title.textContent = "Nueva Cuenta";
        const m = $('cred-modal');
        if (m) m.classList.add('active');
    });

    onClick('close-modal', () => {
        const m = $('cred-modal');
        if (m) m.classList.remove('active');
    });

    onClick('lock-btn', () => {
        sessionKey = null;
        credentials = [];
        const d = $('dashboard-screen');
        if (d) d.classList.remove('active');
        renderProfiles();
        const p = $('profiles-screen');
        if (p) p.classList.add('active');
    });

    onClick('gen-pass-btn', () => {
        const lengthEl = $('gen-length');
        const length = lengthEl ? parseInt(lengthEl.value) : 18;
        const useSym = $('gen-sym')?.checked ?? true;
        const useNum = $('gen-num')?.checked ?? true;
        const useUpper = $('gen-upper')?.checked ?? true;
        const useLower = $('gen-lower')?.checked ?? true;

        let charset = "";
        if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useNum) charset += "0123456789";
        if (useSym) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (!charset) {
            showToast("Selecciona al menos un tipo de carácter", true);
            return;
        }

        let pass = "";
        const bytes = crypto.getRandomValues(new Uint8Array(length));
        for (let i = 0; i < length; i++) {
            pass += charset[bytes[i] % charset.length];
        }

        const input = $('cred-pass');
        if (input) {
            input.value = pass;
            input.type = 'text';
            updateStrength(pass);
        }
        showToast("Contraseña segura generada.");
    });

    on('gen-length', 'input', (e) => {
        const v = $('gen-length-val');
        if (v) v.textContent = e.target.value;
    });

    const updateStrength = (pass) => {
        const bar = $('strength-bar');
        const text = $('strength-text');
        if (!bar || !text) return;

        let score = 0;
        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
        const labels = ['Muy Débil', 'Débil', 'Media', 'Fuerte', 'Excelente'];

        const idx = Math.min(score, 4);
        bar.style.width = `${(idx + 1) * 20}%`;
        bar.style.background = colors[idx];
        text.textContent = labels[idx];
        text.style.color = colors[idx];
    };

    on('cred-pass', 'input', (e) => updateStrength(e.target.value));

    onClick('toggle-modal-pass', () => {
        const input = $('cred-pass');
        const toggleBtn = $('toggle-modal-pass');
        if (!input || !toggleBtn) return;
        const icon = toggleBtn.querySelector('i, svg');
        if (!icon) return;

        if (input.type === 'password') {
            input.type = 'text';
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            input.type = 'password';
            icon.setAttribute('data-lucide', 'eye');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });

    on('search-input', 'input', (e) => render(e.target.value));

    onClick('open-migrate-btn', () => {
        showToast("Selecciona el archivo 'datos_recuperados.json' de tu carpeta.");
        const input = $('legacy-migrator-input');
        if (input) input.click();
    });

    // Export to Excel (.xlsx)
    onClick('export-excel-btn', async () => {
        if (credentials.length === 0) {
            showToast("No hay datos para exportar.");
            return;
        }

        try {
            const data = [];
            for (const c of credentials) {
                const pass = await decrypt(c.pass, sessionKey);
                data.push({
                    "Categoría": c.category || 'Otros',
                    "Servicio/Sitio": c.site,
                    "Usuario/Email": c.user,
                    "Contraseña": pass,
                    "Notas": c.notes ? await decrypt(c.notes, sessionKey) : '',
                    "URL": c.url || ''
                });
            }

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Mis Contraseñas");

            // Set column widths
            const wscols = [
                { wch: 15 }, // Category
                { wch: 25 }, // Site
                { wch: 30 }, // User
                { wch: 20 }, // Pass
                { wch: 30 }, // Notes
                { wch: 35 }  // URL
            ];
            ws['!cols'] = wscols;

            XLSX.writeFile(wb, `vaultify_backup_${new Date().toISOString().split('T')[0]}.xlsx`);
            showToast("Archivo Excel (.xlsx) generado con éxito.");
        } catch (err) {
            console.error("Excel Export Error:", err);
            showToast("Error al exportar a Excel.", true);
        }
    });

    // Export to PDF
    onClick('export-pdf-btn', async () => {
        if (credentials.length === 0) {
            showToast("No hay datos para exportar.");
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Header
            doc.setFontSize(22);
            doc.setTextColor(59, 130, 246); // Primary color
            doc.text("VAULTIFY: Reporte de Seguridad", 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(100);
            const dateStr = new Date().toLocaleString();
            doc.text(`Fecha de exportación: ${dateStr}`, 14, 28);
            doc.text("ADVERTENCIA: Mantenga este documento en un lugar seguro y bajo llave.", 14, 33);

            const tableData = [];
            for (const c of credentials) {
                const pass = await decrypt(c.pass, sessionKey);
                const notes = c.notes ? await decrypt(c.notes, sessionKey) : '---';
                tableData.push([
                    c.category || 'Otros',
                    c.site,
                    c.user,
                    pass,
                    notes,
                    c.url || '---'
                ]);
            }

            doc.autoTable({
                startY: 40,
                head: [['Categoría', 'Servicio', 'Usuario', 'Contraseña', 'Notas', 'URL']],
                body: tableData,
                headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 247, 250] },
                margin: { top: 40 },
                styles: { fontSize: 9, cellPadding: 3 },
                columnStyles: {
                    3: { fontStyle: 'bold' } // Password column bold
                }
            });

            doc.save(`vaultify_reporte_${new Date().toISOString().split('T')[0]}.pdf`);
            showToast("Reporte PDF generado con éxito.");
        } catch (err) {
            console.error("PDF Export Error:", err);
            showToast("Error al exportar a PDF.", true);
        }
    });

    // Migration logic
    const performMigration = async (data) => {
        try {
            if (!Array.isArray(data)) throw new Error("Los datos no son un formato de lista válido.");
            showToast(`Iniciando importación de ${data.length} elementos...`);

            let count = 0;
            for (const item of data) {
                const encrypted = await encrypt(item.pass || "", sessionKey);
                credentials.push({
                    id: 'm-' + Date.now() + '-' + Math.floor(Math.random() * 1000000),
                    site: item.site || "Sin Título",
                    user: item.user || "N/A",
                    category: item.category || 'Otros',
                    pass: encrypted
                });
                count++;
            }

            if (count > 0) {
                saveData();
                await render();
                showToast(`✅ ${count} cuentas importadas con éxito.`);
            } else {
                showToast("No se encontraron datos válidos para importar.");
            }
        } catch (err) {
            console.error("Migration detail:", err);
            showToast("Error en importación: " + err.message);
        }
    };

    const migratorInput = $('legacy-migrator-input');
    if (migratorInput) {
        migratorInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    await performMigration(data);
                    migratorInput.value = '';
                } catch (err) {
                    showToast("Archivo JSON inválido o corrupto.", true);
                }
            };
            reader.readAsText(file);
        };
    }

    onClick('migrate-btn', async () => {
        try {
            const resp = await fetch('datos_recuperados.json');
            if (!resp.ok) throw new Error("No se pudo cargar el archivo automáticamente.");
            const data = await resp.json();
            await performMigration(data);
        } catch (e) {
            showToast("Por favor, selecciona el archivo 'datos_recuperados.json' manualmente.");
            const input = $('legacy-migrator-input');
            if (input) input.click();
        }
    });

    // Category Filter Handling
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.onclick = () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.category;
            render(document.getElementById('search-input').value);
            playSound('click');
        };
    });

    // --- SETTINGS & AUTO-LOCK ---
    let autoLockTimer = null;

    const resetAutoLock = () => {
        if (autoLockTimer) clearTimeout(autoLockTimer);
        const minutes = parseInt(document.getElementById('autolock-timer').value);
        if (minutes > 0 && sessionKey) {
            autoLockTimer = setTimeout(() => {
                lockVault();
                showToast("Bóveda bloqueada por inactividad", true);
            }, minutes * 60000);
        }
    };

    const lockVault = () => {
        sessionKey = null;
        credentials = [];
        if (autoLockTimer) clearTimeout(autoLockTimer);
        const dash = $('dashboard-screen');
        if (dash) dash.classList.remove('active');
        const sett = $('settings-screen');
        if (sett) sett.classList.remove('active');
        renderProfiles();
        const prof = $('profiles-screen');
        if (prof) prof.classList.add('active');
    };

    document.addEventListener('mousemove', resetAutoLock);
    document.addEventListener('keypress', resetAutoLock);

    onClick('settings-btn', () => {
        const dash = $('dashboard-screen');
        if (dash) dash.classList.remove('active');
        const sett = $('settings-screen');
        if (sett) sett.classList.add('active');
    });

    onClick('back-to-vault', () => {
        const sett = $('settings-screen');
        if (sett) sett.classList.remove('active');
        const dash = $('dashboard-screen');
        if (dash) dash.classList.add('active');
    });

    on('autolock-timer', 'change', resetAutoLock);

    on('change-master-form', 'submit', async (e) => {
        e.preventDefault();
        const oldIn = $('old-master');
        const newIn = $('new-master');
        if (!oldIn || !newIn) return;

        const oldPass = oldIn.value;
        const newPass = newIn.value;
        const hashedOld = await hashMaster(oldPass);

        if (hashedOld !== localStorage.getItem(getStoreKey('master'))) {
            showToast("La llave maestra actual es incorrecta", true);
            return;
        }

        if (confirm("¿Estás seguro de que quieres cambiar tu llave maestra? Todas tus cuentas se recifrarán con la nueva llave.")) {
            try {
                // 1. New Salt and Key
                const newSalt = crypto.getRandomValues(new Uint8Array(16));
                const newSessionKey = await deriveKey(newPass, newSalt);
                const newHashed = await hashMaster(newPass);

                // 2. Re-encrypt everything
                const updatedCredentials = [];
                for (const c of credentials) {
                    const plain = await decrypt(c.pass, sessionKey);
                    const newlyEncrypted = await encrypt(plain, newSessionKey);
                    updatedCredentials.push({ ...c, pass: newlyEncrypted });
                }

                // 3. Save new state
                credentials = updatedCredentials;
                sessionKey = newSessionKey;
                localStorage.setItem(getStoreKey('master'), newHashed);
                localStorage.setItem(getStoreKey('salt'), toBase64(newSalt));
                saveData();

                showToast("Llave maestra actualizada y cuentas recifradas con éxito");
                playSound('success');
                const form = $('change-master-form');
                if (form) form.reset();
            } catch (err) {
                console.error("Master key change error:", err);
                showToast("Error crítico al cambiar la llave", true);
            }
        }
    });

    onClick('reset-vault-btn', () => {
        if (confirm("¡ATENCIÓN! Esto borrará TODA tu base de datos y tu llave maestra. Esta acción es irreversible. ¿Proceder?")) {
            const mKey = getStoreKey('master');
            const sKey = getStoreKey('salt');
            const dKey = getStoreKey('data');
            localStorage.removeItem(mKey);
            localStorage.removeItem(sKey);
            localStorage.removeItem(dKey);
            lockVault();
            showToast("Bóveda eliminada por completo", true);
            playSound('error');
        }
    });

    // --- INITIALIZE ---
    loadProfiles();
    renderProfiles();
    checkSetup();
    updateSoundUI();
    setTheme(currentTheme);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.onclick = () => setTheme(btn.dataset.theme);
    });

    // Settings Tab Switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.onclick = () => {
            const target = tab.dataset.tab;
            console.log("Switching to tab:", target);

            // Update Tab Buttons
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Settings Groups
            document.querySelectorAll('.settings-group').forEach(group => group.classList.remove('active'));
            const targetGroup = $(`tab-${target}`);
            if (targetGroup) {
                targetGroup.classList.add('active');
            } else {
                console.error("Target group not found: tab-" + target);
            }

            playSound('click');
        };
    });

    // PWA Support: Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Vaultify SW Registered'))
                .catch(err => console.log('SW Registration Failed', err));
        });
    }
});
