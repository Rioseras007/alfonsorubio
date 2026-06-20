/* ==========================================================================
   PORTAL DE ECLIPSES EN ESPAÑA - LÓGICA DE INTERACTIVIDAD (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegación, buscador, modales y contadores
    initSPA();
    initMobileMenu();
    initCountdowns();
    initResourcesSearch();
    initModals();
});

/* ==========================================================================
   1. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA) - HASH ROUTING
   ========================================================================== */
function initSPA() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const countdownCards = document.querySelectorAll('.countdown-card');
    
    // Función para activar una sección
    const activateSection = (targetId) => {
        // Normalizar targetId
        const id = targetId.replace('#', '');
        let targetSection = document.getElementById(id);
        
        if (!targetSection) {
            // Si no existe, por defecto ir a inicio
            targetSection = document.getElementById('inicio');
        }

        // Desactivar secciones y enlaces
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Activar la correspondiente
        targetSection.classList.add('active');
        const activeLink = document.querySelector(`.nav-link[data-target="${targetSection.id}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        // Hacer scroll arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Escuchar clicks en el menú de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            window.location.hash = targetId;
            activateSection(targetId);
            
            // Cerrar menú móvil si está abierto
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Escuchar clicks en las tarjetas de la página de inicio
    countdownCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSec = card.getAttribute('data-target-sec');
            window.location.hash = targetSec;
            activateSection(targetSec);
        });
    });

    // Logo click
    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'inicio';
        activateSection('inicio');
    });

    // Rutas iniciales en base al hash actual del navegador
    const currentHash = window.location.hash;
    if (currentHash) {
        activateSection(currentHash);
    }
    
    // Escuchar cambios de hash en el navegador (historial)
    window.addEventListener('hashchange', () => {
        activateSection(window.location.hash);
    });
}

/* ==========================================================================
   2. MENÚ MÓVIL (HAMBURGER TOGGLE)
   ========================================================================== */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }
}

/* ==========================================================================
   3. LÓGICA DE CONTADORES REGRESIVOS (COUNTDOWNS)
   ========================================================================== */
function initCountdowns() {
    // Configurar fechas exactas de los eclipses en España
    // Eclipses en huso horario español: CEST (UTC+2) en agosto, CET (UTC+1) en enero.
    const eclipses = [
        {
            id: 'timer-2026',
            targetDate: new Date('2026-08-12T20:30:00+02:00').getTime()
        },
        {
            id: 'timer-2027',
            targetDate: new Date('2027-08-02T10:40:00+02:00').getTime()
        },
        {
            id: 'timer-2028',
            targetDate: new Date('2028-01-26T18:00:00+01:00').getTime()
        }
    ];

    function updateTimers() {
        const now = new Date().getTime();

        eclipses.forEach(eclipse => {
            const container = document.getElementById(eclipse.id);
            if (!container) return;

            const difference = eclipse.targetDate - now;

            const daysEl = container.querySelector('.days');
            const hoursEl = container.querySelector('.hours');
            const minutesEl = container.querySelector('.minutes');
            const secondsEl = container.querySelector('.seconds');

            if (difference <= 0) {
                // El evento ya pasó o está ocurriendo
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                
                // Cambiar el label debajo del timer a modo de alerta
                const parent = container.parentElement;
                const statusBadge = parent.querySelector('.eclipse-badge');
                if (statusBadge) {
                    statusBadge.textContent = '¡EVENTO EN CURSO / FINALIZADO!';
                    statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
                    statusBadge.style.color = '#10b981';
                    statusBadge.style.borderColor = '#10b981';
                }
                return;
            }

            // Cálculos matemáticos de tiempo
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Rellenar con ceros a la izquierda y actualizar el DOM
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        });
    }

    // Actualizar inmediatamente al cargar y luego cada segundo
    updateTimers();
    setInterval(updateTimers, 1000);
}

/* ==========================================================================
   4. FILTRO Y BÚSQUEDA DE LA TABLA DE RECURSOS
   ========================================================================== */
function initResourcesSearch() {
    const searchInput = document.getElementById('resource-search');
    const tableRows = document.querySelectorAll('#resources-table tbody tr');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            tableRows.forEach(row => {
                const title = row.querySelector('.theme-title').textContent.toLowerCase();
                const description = row.cells[2].textContent.toLowerCase();
                const category = row.cells[1].textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

/* ==========================================================================
   5. BASE DE DATOS DE RECURSOS Y LÓGICA DE MODALES
   ========================================================================== */
const RESOURCES_DB = {
    'que-es': {
        title: '¿Qué es un Eclipse Solar?',
        category: 'Ciencia',
        categoryClass: 'cat-ciencia',
        content: `
            <p>Un <strong>eclipse solar</strong> es un fenómeno astronómico espectacular que ocurre cuando la Luna se alinea exactamente entre la Tierra y el Sol, proyectando su sombra sobre una pequeña franja de la superficie terrestre.</p>
            
            <h4>Mecánica Celeste</h4>
            <p>Aunque el Sol es aproximadamente 400 veces más grande que la Luna, también está unas 400 veces más lejos de nosotros. Esta asombrosa coincidencia geométrica hace que ambos cuerpos tengan casi el mismo tamaño aparente en el cielo terrestre, permitiendo que la Luna cubra por completo el disco solar.</p>
            
            <h4>Tipos de Eclipses Solares</h4>
            <ul>
                <li><strong>Eclipse Total:</strong> La Luna cubre por completo el Sol. Se hace de noche durante el día, la temperatura desciende drásticamente y se hace visible la atmósfera exterior del Sol (la corona).</li>
                <li><strong>Eclipse Parcial:</strong> La Luna solo oculta una porción del Sol. El Sol toma una forma creciente y la luz ambiental se atenúa sutilmente.</li>
                <li><strong>Eclipse Anular:</strong> La Luna está más alejada de la Tierra en su órbita (cerca de su apogeo), por lo que se ve ligeramente más pequeña que el Sol. No logra cubrirlo por completo, dejando visible un anillo brillante de luz solar (el famoso "Anillo de Fuego").</li>
            </ul>
            
            <div class="highlight">
                <p><strong>Dato curioso:</strong> Debido a que la órbita de la Luna se aleja de la Tierra aproximadamente 3.8 cm por año, dentro de unos 600 millones de años la Luna se verá demasiado pequeña en el cielo para cubrir el Sol, por lo que la Tierra experimentará su último eclipse total de Sol.</p>
            </div>
        `
    },
    'seguridad': {
        title: 'Guía de Observación Segura',
        category: 'Seguridad',
        categoryClass: 'cat-seguridad',
        content: `
            <p class="text-red"><strong>¡ADVERTENCIA CRÍTICA!</strong> Mirar directamente al Sol sin la protección adecuada puede causar daños oculares graves e irreversibles, incluyendo ceguera permanente (retinopatía solar). Las células de la retina carecen de receptores de dolor, por lo que el daño ocurre sin que lo sientas en el momento.</p>
            
            <h4>Métodos Seguros de Observación</h4>
            <ul>
                <li><strong>Gafas de Eclipse Homologadas:</strong> Deben contar con la certificación oficial <strong>ISO 12312-2</strong>. Verifica que no tengan arañazos, perforaciones ni estén deformadas antes de usarlas. No las uses por más de 3 minutos seguidos.</li>
                <li><strong>Filtros Solares para Instrumentos:</strong> Si usas telescopios, binoculares o cámaras fotográficas, debes colocar un filtro solar certificado (como láminas Mylar o Baader) <strong>siempre en la parte delantera del objetivo</strong>, NUNCA en el ocular.</li>
                <li><strong>Proyección Indirecta:</strong> El método más seguro y educativo. Consiste en proyectar la imagen del sol a través de un pequeño agujero (caja estenopeica) o usando una espumadera, observando la sombra y la luz proyectada en el suelo o una cartulina.</li>
                <li><strong>Cristal de Soldador:</strong> Solo es apto el de <strong>tono 14 o superior</strong>. No utilices tonos inferiores ya que no filtran la radiación infrarroja y ultravioleta nociva.</li>
            </ul>
            
            <h4>Lo que NUNCA debes utilizar:</h4>
            <ul>
                <li>Gafas de sol normales (por muy oscuras que sean).</li>
                <li>Radiografías, negativos de película fotográfica o disquetes antiguos.</li>
                <li>Filtros caseros (CDs, cristales ahumados con vela, etc.).</li>
                <li>Mirar a través de cámaras, telescopios o prismáticos sin filtros específicos en la lente frontal.</li>
            </ul>
        `
    },
    'que-se-ve': {
        title: '¿Qué se experimenta durante la Totalidad?',
        category: 'Observación',
        categoryClass: 'cat-observacion',
        content: `
            <p>La fase de totalidad en un eclipse solar es una experiencia sensorial abrumadora. Va mucho más allá de una simple alineación geométrica; es un cambio radical en las condiciones de la naturaleza.</p>
            
            <h4>Fenómenos Ópticos Memorables</h4>
            <ul>
                <li><strong>La Corona Solar:</strong> La atmósfera exterior del Sol, compuesta por plasma ionizado y campos magnéticos en constante movimiento. Aparece como un halo blanco nacarado y brillante que se extiende millones de kilómetros alrededor del disco oscuro de la Luna.</li>
                <li><strong>El Anillo de Diamante:</strong> Ocurre justo en el segundo anterior y posterior a la totalidad, cuando un último rayo de luz solar destella a través de un valle lunar, simulando un diamante sobre un anillo oscuro.</li>
                <li><strong>Las Perlas de Baily:</strong> Pequeños puntos brillantes de luz solar que aparecen a lo largo del borde lunar justo antes de la totalidad, causados por la luz solar que brilla a través de la accidentada topografía de montañas y valles de la Luna.</li>
                <li><strong>Sombras Volantes (Shadow Bands):</strong> Ondas alternas de luz y sombra muy tenues que se desplazan velozmente por el suelo justo antes del eclipse total, provocadas por la refracción de la luz a través de las turbulencias atmosféricas de la Tierra.</li>
            </ul>
            
            <h4>Cambios Ambientales Inmediatos</h4>
            <ul>
                <li><strong>Descenso de Temperatura:</strong> La temperatura puede caer entre 3°C y 8°C de golpe, provocando una brisa fría conocida como "viento de eclipse".</li>
                <li><strong>Confusión en la Fauna:</strong> Los pájaros dejan de cantar y vuelven a sus nidos, los insectos nocturnos como los grillos comienzan su canto y los animales domésticos pueden mostrar signos de inquietud o irse a dormir.</li>
                <li><strong>Cielo de Atardecer en 360 Grados:</strong> El horizonte a tu alrededor se tiñe de tonos naranjas y rojizos típicos del crepúsculo en todas las direcciones cardinales, mientras el cielo cenital se vuelve azul marino oscuro, permitiendo ver planetas (como Venus o Mercurio) y estrellas brillantes.</li>
            </ul>
        `
    },
    'ciencia': {
        title: 'La Ciencia Detrás de los Eclipses',
        category: 'Ciencia',
        categoryClass: 'cat-ciencia',
        content: `
            <p>Históricamente, los eclipses solares no solo han sido espectáculos visuales, sino laboratorios científicos de valor incalculable para comprender las leyes de la física y el universo.</p>
            
            <h4>El Gran Hito: La Teoría de la Relatividad General</h4>
            <p>En 1919, el físico británico Sir Arthur Eddington organizó expediciones para fotografiar un eclipse total de sol desde Sobral (Brasil) y la isla de Príncipe. Al fotografiar las estrellas que aparecían cerca del borde del Sol oscurecido, demostró que la inmensa gravedad del Sol curvaba la luz de las estrellas del fondo exactamente la cantidad que Albert Einstein había predicho. Este experimento validó la Teoría de la Relatividad General y catapultó a Einstein a la fama mundial.</p>
            
            <h4>Áreas Científicas de Estudio Moderno</h4>
            <ul>
                <li><strong>Física de la Corona Solar:</strong> La corona solar tiene una temperatura superior a 1 millón de grados Celsius, mientras que la superficie solar (fotosfera) apenas llega a 5,500°C. La razón de este calentamiento extremo sigue siendo uno de los mayores misterios de la astrofísica, y los eclipses permiten estudiarlo sin la interferencia del brillo solar directo.</li>
                <li><strong>Clima Espacial e Ionosfera:</strong> Los eclipses bloquean repentinamente la radiación solar en la atmósfera superior, lo que permite a los científicos estudiar cómo reacciona la ionosfera de la Tierra ante cambios bruscos de ionización, afectando a las comunicaciones de radio y satélites.</li>
                <li><strong>Eyecciones de Masa Coronal (CME):</strong> Grandes burbujas de gas y campos magnéticos eyectados por el Sol. Comprender su origen es clave para proteger nuestras redes eléctricas y satélites de tormentas geomagnéticas destructivas.</li>
            </ul>
        `
    },
    'historia': {
        title: 'Los Eclipses en el Devenir Histórico',
        category: 'Historia',
        categoryClass: 'cat-cultura',
        content: `
            <p>A lo largo de los milenios, los eclipses solares han coincidido con momentos históricos trascendentales, alterando el destino de imperios y batallas.</p>
            
            <h4>El Eclipse de Tales de Mileto (585 a.C.)</h4>
            <p>Según relata el historiador Heródoto, los Lidios y los Medos llevaban seis años en una cruenta guerra en la actual Turquía. El 28 de mayo de 585 a.C., durante una batalla, el cielo se oscureció repentinamente por un eclipse solar total (que supuestamente había sido predicho por Tales de Mileto). Los soldados, interpretando el suceso como el enfado de los dioses, depusieron inmediatamente las armas y acordaron un tratado de paz sellado con matrimonios reales.</p>
            
            <h4>El Truco Astronómico de Cristóbal Colón (1504)</h4>
            <p>Durante su cuarto viaje a América, Colón y su tripulación quedaron varados en Jamaica. Tras meses de convivencia, los nativos locales (Arawak) decidieron dejar de suministrarles alimentos. Colón, consultando sus tablas astronómicas (el Almanaque de Regiomontanus), vio que se aproximaba un eclipse lunar total el 29 de febrero de 1504.</p>
            <p>Convocó a los jefes nativos y les advirtió que su dios estaba enfadado con ellos por negarles la comida y que haría desaparecer la Luna como advertencia. Cuando la Luna se tornó roja y oscura, los nativos entraron en pánico y rogaron a Colón que intercediera ante su dios, prometiendo reabastecerlos indefinidamente.</p>
            
            <div class="highlight">
                <p><strong>El eclipse del rey Luis:</strong> En el año 840 d.C., el emperador Luis el Piadoso (hijo de Carlomagno) quedó tan aterrorizado por un eclipse solar total de más de 5 minutos de duración que cayó en una profunda depresión y falleció pocas semanas después, lo que desencadenó la división del Imperio Carolingio.</p>
            </div>
        `
    },
    'arte-mitologia': {
        title: 'Mitología, Leyendas y el Eclipse en el Arte',
        category: 'Cultura',
        categoryClass: 'cat-cultura',
        content: `
            <p>Antes de que la astronomía explicara el movimiento de los astros, los eclipses solares eran interpretados a través del mito, la religión y el arte como batallas cósmicas de proporciones divinas.</p>
            
            <h4>Criaturas Devoradoras de Sol</h4>
            <ul>
                <li><strong>El Dragón Chino:</strong> En la antigua China imperial, se creía que un dragón celestial devoraba al Sol. Para ahuyentarlo, la población salía a las calles haciendo el mayor ruido posible tocando tambores, gongs y lanzando flechas al cielo. La palabra china para eclipse (<em>chih</em>) significa literalmente "comer".</li>
                <li><strong>Los Lobos Nórdicos:</strong> En la mitología vikinga, el lobo gigante Sköll persigue a la personificación del Sol (Sól) a través del cielo. Cuando el lobo está a punto de atrapar y devorar a la diosa solar, se produce un eclipse.</li>
                <li><strong>Rahu y Ketu (Mitología Hindú):</strong> El demonio Rahu intentó beber el néctar de la inmortalidad, pero el Sol y la Luna lo delataron. Como castigo, el dios Vishnu le decapitó. Rahu quedó inmortalizado como cabeza (que devora ocasionalmente al Sol en venganza, creando eclipses) y Ketu como el cuerpo de la serpiente celestial.</li>
            </ul>
            
            <h4>La Representación en el Arte</h4>
            <p>En el arte europeo, los eclipses se asociaban comúnmente con la oscuridad de la crucifixión de Cristo. El pintor renacentista Antoine Caron plasmó la angustia y el desorden cósmico en sus obras. Posteriormente, en el Barroco y Romanticismo, pintores como Cosmas Damian Asam retrataron a la Luna bloqueando el Sol con un enfoque más místico, mientras que la ilustración astronómica del siglo XIX comenzó a registrar con precisión la corona solar, mezclando ciencia y expresividad estética.</p>
        `
    },
    'clima': {
        title: 'Condiciones Climatológicas en España',
        category: 'Logística',
        categoryClass: 'cat-observacion',
        content: `
            <p>La elección de España como destino para la observación de estos tres eclipses no es casual. Su posición geográfica y condiciones climáticas la convierten en la mejor región de Europa Occidental para asegurar cielos despejados.</p>
            
            <h4>Eclipse de Agosto de 2026: Meseta Norte</h4>
            <p>Aunque el norte costero de España (Galicia, Asturias, Cantabria, País Vasco) es propenso a las nieblas y nubes marítimas al atardecer, la meseta norte (Castilla y León, Aragón) presenta en agosto un clima continental muy seco. Las estadísticas históricas muestran una probabilidad de <strong>cielos despejados superior al 80%</strong> en provincias como Valladolid, Burgos, Palencia y Zaragoza.</p>
            
            <h4>Eclipse de Agosto de 2027: El Clima del Sur</h4>
            <p>Este eclipse cruzará Andalucía occidental y el Estrecho de Gibraltar. En pleno mes de agosto, la probabilidad de nubosidad en ciudades como Cádiz, Tarifa, Algeciras y Málaga es de <strong>menos del 5%</strong>. Se aconseja estar atento únicamente al viento de Levante fuerte en la zona de Tarifa, que puede levantar polvo en suspensión o nubosidad baja en zonas muy costeras.</p>
            
            <h4>Eclipse de Enero de 2028: La Dificultad del Invierno</h4>
            <p>Al ocurrir en invierno, la probabilidad de frentes lluviosos y nubes altas en la península aumenta. Sin embargo, la trayectoria del eclipse anular cruza el Levante español (Murcia, Alicante y Valencia) y las Islas Baleares, regiones protegidas de las borrascas atlánticas por los sistemas montañosos centrales. La probabilidad de cielos despejados en estas zonas costeras mediterráneas en enero ronda el <strong>60-70%</strong>, condiciones excelentes para esa época del año.</p>
        `
    },
    'recomendaciones': {
        title: 'Recomendaciones Prácticas de Planificación',
        category: 'Logística',
        categoryClass: 'cat-observacion',
        content: `
            <p>Presenciar un eclipse solar total requiere preparación logística. La afluencia masiva de astrónomos y turistas de todo el mundo puede saturar los servicios locales.</p>
            
            <h4>Consejos de Planificación Anticipada</h4>
            <ul>
                <li><strong>Alojamiento:</strong> Reserva hoteles o zonas de acampada con meses (o incluso un año) de antelación en las zonas dentro de la franja de totalidad. Las plazas en zonas rurales bien ubicadas se agotan rápidamente.</li>
                <li><strong>Movilidad:</strong> Los accesos a los puntos clave de observación se congestionarán notablemente en las horas previas al eclipse. Planifica llegar a tu destino <strong>al menos de 4 a 6 horas antes</strong> del inicio de la fase parcial. Lleva agua, comida y provisiones suficientes para el día.</li>
                <li><strong>El Horizonte Oeste:</strong> Para los eclipses de 2026 y 2028, que ocurren durante el atardecer, debes buscar un mirador elevado, cerro o llanura con el <strong>horizonte Oeste-Noroeste completamente libre de montañas o edificios</strong>. De lo contrario, el sol se ocultará detrás del relieve antes de completarse el eclipse.</li>
                <li><strong>Equipamiento Básico:</strong> Además de tus gafas de eclipse homologadas, lleva ropa de abrigo ligera. Al comenzar la totalidad, la temperatura baja repentinamente y suele levantarse viento frío.</li>
                <li><strong>Plan B Flexible:</strong> Mantente atento a los partes meteorológicos de satélite hasta 24 horas antes del evento. Si tu sitio planificado se prevé nublado, prepárate para desplazarte en coche a una zona despejada a 100-200 km de distancia.</li>
            </ul>
        `
    }
};

function initModals() {
    const modal = document.getElementById('resource-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close');
    const readBtns = document.querySelectorAll('.btn-read-resource');

    // Función para abrir modal e inyectar el recurso
    const openModal = (resourceKey) => {
        const resource = RESOURCES_DB[resourceKey];
        if (!resource) return;

        modalTitle.textContent = resource.title;
        modalCategory.textContent = resource.category;
        modalCategory.className = `modal-badge ${resource.categoryClass}`;
        modalContent.innerHTML = resource.content;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    };

    // Función para cerrar modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    };

    // Escuchar clicks de los botones de la tabla
    readBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-open');
            openModal(key);
        });
    });

    // Cerrar al pulsar X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar al pulsar fuera de la tarjeta modal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Cerrar al pulsar la tecla Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
