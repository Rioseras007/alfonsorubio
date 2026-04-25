import cv2
import os
import glob
import numpy as np

def create_video():
    image_folder = r'd:\inventario\modelos'
    video_name = r'd:\inventario\video_promocional.mp4'
    
    # Obtener todas las imágenes PNG (ignorando mayúsculas/minúsculas si es posible, pero usaremos glob)
    images = glob.glob(os.path.join(image_folder, '*.png')) + glob.glob(os.path.join(image_folder, '*.PNG'))
    images = list(set(images)) # Eliminar duplicados si los hay
    
    if not images:
        print("No se encontraron imágenes en la carpeta.")
        return

    # Configuraciones del video
    fps = 30
    duration_per_image = 10 # segundos
    frames_per_image = fps * duration_per_image
    
    # Resolución objetivo (1080p)
    target_width = 1920
    target_height = 1080
    
    # Inicializar el VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') # Codec para .mp4
    video = cv2.VideoWriter(video_name, fourcc, fps, (target_width, target_height))
    
    print(f"Encontradas {len(images)} imágenes. Generando vídeo...")

    for image_path in images:
        print(f"Procesando: {os.path.basename(image_path)}")
        
        # Leer imagen, permitiendo caracteres especiales en la ruta si los hubiera, pero cv2.imread suele bastar en ascii
        img = cv2.imread(image_path)
        if img is None:
            # Intentar leer con numpy si falla por caracteres unicode
            with open(image_path, "rb") as f:
                chunk = f.read()
            chunk_arr = np.frombuffer(chunk, dtype=np.uint8)
            img = cv2.imdecode(chunk_arr, cv2.IMREAD_COLOR)

        if img is None:
            print(f"  Error al leer {image_path}. Saltando.")
            continue
            
        h, w = img.shape[:2]
        
        # Calcular proporciones para mantener el aspect ratio
        scale = min(target_width / w, target_height / h)
        new_w = int(w * scale)
        new_h = int(h * scale)
        
        resized_img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
        
        # Crear un fondo negro
        final_img = np.zeros((target_height, target_width, 3), dtype=np.uint8)
        
        # Calcular posición para centrar
        y_offset = (target_height - new_h) // 2
        x_offset = (target_width - new_w) // 2
        
        # Pegar la imagen redimensionada sobre el fondo negro
        final_img[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = resized_img
        
        # Escribir frames
        for _ in range(frames_per_image):
            video.write(final_img)
            
    video.release()
    print(f"Vídeo guardado con éxito en: {video_name}")

if __name__ == "__main__":
    create_video()
