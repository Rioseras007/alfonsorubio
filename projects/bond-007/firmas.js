const disparadores = document.querySelectorAll(".ampliar-firma");
const visor = document.querySelector(".visor-firma");
const imagenVisor = document.querySelector(".visor-firma__imagen");
const pieVisor = document.querySelector(".visor-firma__pie");
const botonCerrar = document.querySelector(".visor-firma__cerrar");

if (disparadores.length && visor && imagenVisor && pieVisor && botonCerrar) {
    disparadores.forEach((disparador) => {
        disparador.addEventListener("click", () => {
            imagenVisor.src = disparador.dataset.imagen || "";
            imagenVisor.alt = disparador.dataset.alt || "";
            pieVisor.textContent = disparador.dataset.titulo || "";
            visor.showModal();
        });
    });

    botonCerrar.addEventListener("click", () => {
        visor.close();
    });

    visor.addEventListener("click", (evento) => {
        const limites = visor.getBoundingClientRect();
        const clicFueraDelDialogo =
            evento.clientX < limites.left ||
            evento.clientX > limites.right ||
            evento.clientY < limites.top ||
            evento.clientY > limites.bottom;

        if (clicFueraDelDialogo) {
            visor.close();
        }
    });

    visor.addEventListener("close", () => {
        imagenVisor.src = "";
        imagenVisor.alt = "";
        pieVisor.textContent = "";
    });
}
