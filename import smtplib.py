import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Datos del remitente y receptor
remitente = "ps3rioseras007l@gmail.com"
password = "garulo2015"  # Para Gmail: crea una contraseña de app
destinatario = "antonio2709@gmail.com"

# Crear el mensaje
mensaje = MIMEMultipart()
mensaje['From'] = remitente
mensaje['To'] = destinatario
mensaje['Subject'] = "correo desde python"

# Cuerpo del mensaje
cuerpo = "Hola, este es un email enviado desde Python 😎"
mensaje.attach(MIMEText(cuerpo, 'plain'))

# Conexión al servidor SMTP de Gmail
try:
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()  # Activar seguridad
    servidor.login(remitente, password)
    servidor.send_message(mensaje)
    servidor.quit()
    print("Email enviado correctamente ✅")
except Exception as e:
    print(f"Error al enviar email: {e}")
