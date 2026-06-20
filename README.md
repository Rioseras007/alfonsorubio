# Web Personal y Panel de Servicios - Alfonso Rubio Rioseras

Este proyecto contiene la página web personal de Alfonso Rubio Rioseras, así como un panel unificado de acceso rápido a herramientas, redes sociales, servicios, y diversos subproyectos de diseño, desarrollo web y aficiones.

## Estructura del Proyecto

El proyecto está organizado en una estructura profesional para facilitar su mantenimiento:

- **`/css/`**: Hojas de estilo globales (`style.css`, `style2.css`, etc.)
- **`/js/`**: Scripts globales y lógica de la interfaz principal.
- **`/assets/`**: Recursos multimedia centralizados (imágenes, audios, fuentes).
- **`/pages/`**: Páginas independientes accesibles desde la raíz (juegos, utilidades, listados).
- **`/projects/`**: Subproyectos modulares, cada uno en su propia carpeta (Gestor de Contraseñas, Calendario Épico, Colecciones de Música, etc.)
- **`/styles/`**: Contiene exclusivamente el `favicon.ico` del sitio.
- **`/tools/`**: Scripts de utilidad (ej. Python) para automatización de tareas.

## Subproyectos Destacados (`/projects/`)

- **Gestor Passwords**: Un gestor de contraseñas seguro tipo PWA (anteriormente Vaultify).
- **Calendario Épico**: Un calendario mensual interactivo con temas dinámicos.
- **Colección de Música**: Varios reproductores web para álbumes de Julio Iglesias, Raphael, Pink Floyd y Bandas Sonoras de James Bond.
- **Bond 007**: Completa wiki y catálogo para fans de la saga de James Bond (películas, actores, coches, etc.)
- **CV**: Currículum vitae en formato web.
- **Inventario 3D**: Catálogo de impresiones y modelos 3D.

## Tecnologías Utilizadas

- **Frontend**: HTML5 Semántico, CSS3, JavaScript Vanilla.
- **Frameworks/Librerías**: Bootstrap 5, FontAwesome, Bootstrap Icons, Moment.js.
- **Multimedia**: Web Audio API para efectos de sonido, iframes para reproductores embebidos y calculadoras de Google Sheets.
- **Automatización**: Scripts de Python para procesamiento por lotes (disponibles en `/tools/` y en subcarpetas).

## Despliegue

La página está preparada para ser servida como un sitio estático. No requiere servidor backend, por lo que puede ser desplegada de inmediato en plataformas como **GitHub Pages**, **Vercel** o **Netlify**.

> **Nota sobre archivos pesados:** Algunos subproyectos contienen archivos multimedia voluminosos (`.mp4`, `.mp3`). Estos están excluidos del control de versiones mediante el `.gitignore`.

## Contacto y Redes Sociales

- [YouTube](https://www.youtube.com/@AlfonsoRubioRioseras)
- [Twitch](https://www.twitch.tv/ps3rioseras007)
- [Printables](https://www.printables.com/@Rioseras007)
