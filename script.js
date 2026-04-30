document.addEventListener("DOMContentLoaded", () => {
    const images = [
        {
            src: "modelos/batgirl.png",
            title: "Batgirl",
            description: "Figura con presencia dinamica y silueta muy reconocible.",
            link: "https://www.printables.com/model/1625336-batgirl"
        },
        {
            src: "modelos/Viudanegra.png",
            title: "Viuda Negra",
            description: "Estetica agil y pose de accion con acabado elegante.",
            link: "https://www.printables.com/model/1684304-black-widow"
        },
        {
            src: "modelos/catwoman.png",
            title: "Catwoman",
            description: "Diseño estilizado con una lectura visual muy limpia.",
            link: "https://www.printables.com/model/1614733-catwoman"
        },
        {
            src: "modelos/Heroinasexy.png",
            title: "Heroina Sexy",
            description: "Composicion pensada para destacar en exposicion y render.",
            link: "https://www.printables.com/model/1690267-heroina-sexy"
        },
        {
            src: "modelos/SheHulk.png",
            title: "She-Hulk",
            description: "Volumen potente y personalidad marcada desde cualquier angulo.",
            link: "https://www.printables.com/model/1614690-hulka"
        },
        {
            src: "modelos/Spider%20Woman.png",
            title: "Spider-Woman",
            description: "Pose heroica con un perfil muy atractivo para impresion.",
            link: "https://www.printables.com/model/1617016-spider-woman"
        },
        {
            src: "modelos/Bruja%20escarlata.png",
            title: "Bruja Escarlata",
            description: "Estilo dramatico y presencia visual muy cinematografica.",
            link: "https://www.printables.com/model/1616997-bruja-escarlata"
        },
        {
            src: "modelos/Poison%20Ivy.png",
            title: "Poison Ivy",
            description: "Una pieza con identidad fuerte y acabado ornamental.",
            link: "https://www.printables.com/model/1675062-poison-ivy"
        },
        {
            src: "modelos/Mamba%20negra.png",
            title: "Mamba Negra",
            description: "Figura expresiva con un perfil muy llamativo en coleccion.",
            link: "https://www.printables.com/model/1696056-mamba-negra-tanya-sealy"
        },
        {
            src: "modelos/Killer%20Frost.png",
            title: "Killer Frost",
            description: "Contraste visual y postura con mucha personalidad.",
            link: "https://www.printables.com/model/1673838-killer-frost"
        },
        {
            src: "modelos/Susan%20Storm.png",
            title: "Susan Storm",
            description: "Interpretacion elegante con lectura muy clara del personaje.",
            link: "https://www.printables.com/model/1628621-susan-storm"
        },
        {
            src: "modelos/Powergirl.png",
            title: "Power Girl",
            description: "Presencia frontal muy potente y base visual firme.",
            link: "https://www.printables.com/model/1659485-power-girl-18"
        },
        {
            src: "modelos/Rogue.png",
            title: "Rogue",
            description: "Postura segura y silueta muy reconocible en vitrina.",
            link: "https://www.printables.com/model/1621854-rogue"
        },
        {
            src: "modelos/Saturngirl.png",
            title: "Saturn Girl",
            description: "Diseño con aire clasico y modelado atractivo.",
            link: "https://www.printables.com/model/1700066-saturn-girl"
        },
        {
            src: "modelos/Sungirl.png",
            title: "Sungirl",
            description: "Figura luminosa con pose ideal para un escaparate digital.",
            link: "https://www.printables.com/model/1680251-sungirl"
        },
        {
            src: "modelos/Supergirl.png",
            title: "Supergirl",
            description: "Un icono superheroico con muy buena lectura de volumen.",
            link: "https://www.printables.com/model/1651267-supergirl-18"
        },
        {
            src: "modelos/Titania.png",
            title: "Titania",
            description: "Modelado contundente con un caracter visual muy claro.",
            link: "https://www.printables.com/model/1666376-titania-18"
        },
        {
            src: "modelos/Storm.png",
            title: "Storm",
            description: "Composicion dramatica y movimiento visual muy marcado.",
            link: "https://www.printables.com/model/1615981-tormenta-x-men-mutante"
        },
        {
            src: "modelos/Wonder%20Woman.png",
            title: "Wonder Woman",
            description: "Cierre perfecto para la coleccion con energia heroica.",
            link: "https://www.printables.com/model/1613204-wonder-woman"
        }
    ];

    const gallery = document.getElementById("gallery");
    const gallerySearch = document.getElementById("gallerySearch");
    const galleryStatus = document.getElementById("galleryStatus");
    const modelCount = document.getElementById("modelCount");

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const modalCaption = document.getElementById("caption");
    const modalLink = document.getElementById("modalLink");
    const closeButton = document.querySelector(".close-modal");

    let currentItems = [...images];

    modelCount.textContent = String(images.length);

    function updateStatus(items) {
        const total = images.length;
        const count = items.length;
        galleryStatus.textContent = count === total
            ? `${count} modelos disponibles en la galeria.`
            : `${count} modelos encontrados de ${total}.`;
    }

    function openModal(item) {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        modalImg.src = item.src;
        modalImg.alt = item.title;
        modalCaption.textContent = `${item.title} · vista ampliada`;
        modalLink.href = item.link;
        closeButton.focus();
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        modalImg.src = "";
        modalLink.href = "#";
        document.body.style.overflow = "";
    }

    function createCard(item, index) {
        const article = document.createElement("article");
        article.className = "gallery-item";
        article.style.animationDelay = `${Math.min(index * 0.04, 0.4)}s`;

        const imageButton = document.createElement("button");
        imageButton.type = "button";
        imageButton.className = "gallery-image-button";
        imageButton.setAttribute("aria-label", `Ampliar ${item.title}`);
        imageButton.addEventListener("click", () => openModal(item));

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.title;
        img.loading = "lazy";
        img.decoding = "async";
        imageButton.appendChild(img);

        const body = document.createElement("div");
        body.className = "gallery-card-body";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const detailLink = document.createElement("a");
        detailLink.className = "card-link primary";
        detailLink.href = item.link;
        detailLink.target = "_blank";
        detailLink.rel = "noreferrer";
        detailLink.textContent = "Abrir en Printables";

        const previewButton = document.createElement("button");
        previewButton.type = "button";
        previewButton.className = "card-link secondary";
        previewButton.textContent = "Vista ampliada";
        previewButton.addEventListener("click", () => openModal(item));

        actions.append(detailLink, previewButton);
        body.append(title, description, actions);
        article.append(imageButton, body);

        return article;
    }

    function renderGallery(items) {
        gallery.innerHTML = "";

        if (!items.length) {
            const emptyState = document.createElement("div");
            emptyState.className = "empty-state";
            emptyState.textContent = "No hay resultados para esa busqueda. Prueba con otro nombre.";
            gallery.appendChild(emptyState);
            updateStatus(items);
            return;
        }

        items.forEach((item, index) => {
            gallery.appendChild(createCard(item, index));
        });

        updateStatus(items);
    }

    gallerySearch.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase();

        currentItems = images.filter((item) => {
            const haystack = `${item.title} ${item.description}`.toLowerCase();
            return haystack.includes(query);
        });

        renderGallery(currentItems);
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    renderGallery(images);
});
