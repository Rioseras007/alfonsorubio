function escribir(valor) {
    document.getElementById('pantalla').textContent += valor;
}

function limpiar() {
    document.getElementById('pantalla').textContent = '';
}

function borrar() {
  
  document.getElementById('pantalla').textContent = '';
}

function clave() {
    var claveIngresada = document.getElementById('pantalla').textContent.trim();
    var claveCorrecta ="007"; // Puedes cambiar esta clave a lo que desees

    if (String(claveIngresada) === String(claveCorrecta)) {
         window.location.href = 'https://rioseras007.github.io/alfonsorubio/peliculas/index.html';
        alert('Clave correcta!');
       
    } else {
        alert('Clave incorrecta!');
    }
}


