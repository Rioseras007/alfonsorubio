import os
import subprocess
import sys

# -----------------------------
# CONFIGURACIÓN
# -----------------------------
carpeta_peliculas = os.getcwd()  # Ejecuta desde la carpeta donde están los MP4
carpeta_miniaturas = os.path.join(carpeta_peliculas, "miniaturas")

# Crear carpeta miniaturas si no existe
if not os.path.exists(carpeta_miniaturas):
    os.makedirs(carpeta_miniaturas)

peliculas = [
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

# -----------------------------
# FUNCIONES
# -----------------------------
def encontrar_ffmpeg():
    """Buscar ffmpeg en PATH o en C:\\ffmpeg\\bin\\ffmpeg.exe"""
    posibles_rutas = ["ffmpeg", "C:\\ffmpeg\\bin\\ffmpeg.exe"]
    for ruta in posibles_rutas:
        try:
            subprocess.run([ruta, "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            return ruta
        except Exception:
            continue
    return None

ffmpeg_cmd = encontrar_ffmpeg()
if not ffmpeg_cmd:
    print("❌ No se encontró FFmpeg. Instálalo o añade C:\\ffmpeg\\bin al PATH.")
    sys.exit(1)

# -----------------------------
# GENERAR MINIATURAS
# -----------------------------
for pelicula in peliculas:
    ruta_video = os.path.join(carpeta_peliculas, pelicula)
    nombre_thumb = os.path.splitext(pelicula)[0] + ".jpg"
    ruta_thumb = os.path.join(carpeta_miniaturas, nombre_thumb)

    # Comando FFmpeg: captura un frame a los 5 segundos
    cmd = [
        ffmpeg_cmd,
        "-y",
        "-i", ruta_video,
        "-ss", "00:00:05",
        "-vframes", "1",
        "-q:v", "2",
        ruta_thumb
    ]

    try:
        # Quitamos stdout/stderr PIPE para que muestre errores en la consola
        subprocess.run(cmd, check=True)
        print(f"🖼 Miniatura creada: {ruta_thumb}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al generar miniatura de {pelicula}")
        print("FFmpeg output:")
        print(e)

print("✅ Proceso completado. Revisa la carpeta 'miniaturas'.")

