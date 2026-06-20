import os

# Carpeta donde están tus videos de muestra
carpeta_videos = r"D:\proyecto umd video\peliculas"

# Lista con los nombres “oficiales” de las 25 películas
nombres_peliculas = [
    "dr-no.mp4",
    "from-russia-with-love.mp4",
    "goldfinger.mp4",
    "thunderball.mp4",
    "you-only-live-twice.mp4",
    "on-her-majestys-secret-service.mp4",
    "diamonds-are-forever.mp4",
    "live-and-let-die.mp4",
    "the-man-with-the-golden-gun.mp4",
    "the-spy-who-loved-me.mp4",
    "moonraker.mp4",
    "for-your-eyes-only.mp4",
    "octopussy.mp4",
    "a-view-to-a-kill.mp4",
    "the-living-daylights.mp4",
    "licence-to-kill.mp4",
    "goldeneye.mp4",
    "tomorrow-never-dies.mp4",
    "the-world-is-not-enough.mp4",
    "die-another-day.mp4",
    "casino-royale.mp4",
    "quantum-of-solace.mp4",
    "skyfall.mp4",
    "spectre.mp4",
    "no-time-to-die.mp4"
]

# Listar todos los archivos mp4 en la carpeta
archivos = [f for f in os.listdir(carpeta_videos) if f.lower().endswith(".mp4")]

# Comprobar que haya al menos 25 archivos
if len(archivos) < 25:
    print(f"¡Atención! Hay {len(archivos)} archivos, se necesitan 25.")
else:
    archivos.sort()  # Ordenar alfabéticamente, para que coincidan con los nombres
    for i, archivo in enumerate(archivos[:25]):
        nuevo_nombre = nombres_peliculas[i]
        ruta_antigua = os.path.join(carpeta_videos, archivo)
        ruta_nueva = os.path.join(carpeta_videos, nuevo_nombre)
        os.rename(ruta_antigua, ruta_nueva)
        print(f"{archivo} → {nuevo_nombre}")

    print("\n¡Renombrado completado! Los 25 videos están listos.")
