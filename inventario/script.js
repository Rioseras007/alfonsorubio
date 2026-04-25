document.addEventListener('DOMContentLoaded', () => {
    const images = [
        "batgirl.PNG", "blackwidow.PNG", "catwoman.PNG", "heroina.PNG", 
        "Hulka.PNG", "image-1.PNG", "image-3.PNG", "image.PNG", 
        "MAMBA negra.PNG", "mejoradaPNG.PNG", "mujerinvislble.PNG", 
        "Power girl.PNG", "roge.PNG", "SAtrun girl.PNG", "Sungirl.PNG", 
        "Supergirl.PNG", "titania.PNG", "tormentafinal.PNG", "wondergirl.PNG"
    ];

    const gallery = document.getElementById('gallery');
    
    // Configuración del Modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption");
    const span = document.getElementsByClassName("close-modal")[0];

    // Cerrar modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar modal al hacer clic fuera de la imagen
    modal.onclick = function(e) {
        if (e.target !== modalImg) {
            modal.style.display = "none";
        }
    }

    images.forEach((imgName, index) => {
        // Crear elemento contenedor
        const item = document.createElement('div');
        item.className = 'gallery-item glass-panel';
        item.style.animationDelay = `${index * 0.1}s`;

        // Obtener nombre sin extensión para el título
        let title = imgName.split('.')[0].replace(/[-_]/g, ' ');

        // Crear la imagen
        const img = document.createElement('img');
        img.src = `modelos/${imgName}`;
        img.alt = title;

        // Añadir evento para masonry una vez cargada la imagen
        img.onload = function() {
            const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap')) || 24;
            const rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        };

        // Evento para abrir modal
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        };

        // Crear el overlay con título
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const h3 = document.createElement('h3');
        h3.textContent = title;
        overlay.appendChild(h3);

        // Ensamblar
        item.appendChild(img);
        item.appendChild(overlay);
        gallery.appendChild(item);
    });

    // Recalcular layout en resize para el masonry grid
    window.addEventListener('resize', () => {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap')) || 24;
            const imgHeight = item.querySelector('img').getBoundingClientRect().height;
            if(imgHeight > 0) {
                const rowSpan = Math.ceil((imgHeight + rowGap) / (rowHeight + rowGap));
                item.style.gridRowEnd = "span " + rowSpan;
            }
        });
    });
});
