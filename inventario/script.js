document.addEventListener('DOMContentLoaded', () => {

    const images = [
        { src: "batgirl.png", link: "https://www.printables.com/model/1625336-batgirl" },
        { src: "blackwidow.png", link: "https://www.printables.com/model/1684304-black-widow" },
        { src: "catwoman.png", link: "https://www.printables.com/model/1614733-catwoman" },
        { src: "heroina.png", link: "https://www.printables.com/model/1690267-heroina-sexy" },
        { src: "Hulka.png", link: "https://www.printables.com/model/1614690-hulka" },
        { src: "Spider Woman.png", link: "https://www.printables.com/model/1617016-spider-woman" },
        { src: "Bruja escarlata.png", link: "https://www.printables.com/model/1616997-bruja-escarlata" },
        { src: "Poison Ivy.png", link: "https://www.printables.com/model/1675062-poison-ivy" },
        { src: "Mamba negra.png", link: "https://www.printables.com/model/1696056-mamba-negra-tanya-sealy" },
        { src: "Killer Frost.png", link: "https://www.printables.com/model/1673838-killer-frost" },
        { src: "Susan Storm.png", link: "https://www.printables.com/model/1628621-susan-storm" },
        { src: "Power girl.png", link: "https://www.printables.com/model/1659485-power-girl-18" },
        { src: "Rogue.png", link: "https://www.printables.com/model/1621854-rogue" },
        { src: "Saturngirl.png", link: "https://www.printables.com/model/1700066-saturn-girl" },
        { src: "Sungirl.png", link: "https://www.printables.com/model/1680251-sungirl" },
        { src: "Supergirl.png", link: "https://www.printables.com/model/1700066-saturn-girl" },
        { src: "Titania.png", link: "https://www.printables.com/model/1666376-titania-18" },
        { src: "Storm.png", link: "https://www.printables.com/model/1615981-tormenta-x-men-mutante" },
        { src: "Wonder Woman.png", link: "https://www.printables.com/model/1613204-wonder-woman" }
    ];

    const gallery = document.getElementById('gallery');

    // Modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption");
    const span = document.getElementsByClassName("close-modal")[0];

    span.onclick = function () {
        modal.style.display = "none";
    };

    modal.onclick = function (e) {
        if (e.target !== modalImg) {
            modal.style.display = "none";
        }
    };

    images.forEach((imgData, index) => {

        const item = document.createElement('div');
        item.className = 'gallery-item glass-panel';
        item.style.animationDelay = `${index * 0.1}s`;

        let title = imgData.src.split('.')[0].replace(/[-_]/g, ' ');

        const img = document.createElement('img');
        img.src = `modelos/${imgData.src}`;
        img.alt = title;

        // Masonry
        img.onload = function () {
            const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap')) || 24;
            const rowSpan = Math.ceil((img.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        };

        // Modal
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        };

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const h3 = document.createElement('h3');
        h3.textContent = title;

        // 🔘 BOTÓN CON ENLACE
        const boton = document.createElement('a');
        boton.href = imgData.link;
        boton.textContent = "Descargar en printables";
        boton.className = "btn-enlace";
        boton.target = "_blank";

        // Evitar que abra el modal
        boton.onclick = function (e) {
            e.stopPropagation();
        };

        overlay.appendChild(h3);
        overlay.appendChild(boton);

        // Ensamblar
        item.appendChild(img);
        item.appendChild(overlay);
        gallery.appendChild(item);
    });

    // Recalcular masonry en resize
    window.addEventListener('resize', () => {
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
            const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-row-gap')) || 24;
            const imgHeight = item.querySelector('img').getBoundingClientRect().height;

            if (imgHeight > 0) {
                const rowSpan = Math.ceil((imgHeight + rowGap) / (rowHeight + rowGap));
                item.style.gridRowEnd = "span " + rowSpan;
            }
        });
    });

});