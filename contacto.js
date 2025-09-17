const nombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contadorMensaje"); // Asegúrate de tener este <small> en tu HTML

// 🧠 Contador dinámico de caracteres
mensaje.addEventListener("input", function () {
  const longitud = mensaje.value.length;
  contador.textContent = `${longitud} / 500 caracteres`;

  // Cambia color si se acerca al límite
  if (longitud > 500) {
    mensaje.classList.add("is-invalid");
    mensaje.classList.remove("is-valid");
    contador.classList.add("text-danger");
  } else {
    mensaje.classList.remove("is-invalid");
    mensaje.classList.add("is-valid");
    contador.classList.remove("text-danger");
  }
});

// 📨 Validación al enviar
document.getElementById('formContacto').addEventListener('submit', function(event) {
  event.preventDefault();

  let valido = true;

  // Validación de nombre
  if (nombre.value.trim() === "" || nombre.value.trim().length > 100) {
    nombre.classList.add("is-invalid");
    nombre.classList.remove("is-valid");
    valido = false;
  } else {
    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
  }

  // Validación de mensaje
  if (mensaje.value.trim() === "" || mensaje.value.trim().length > 500) {
    mensaje.classList.add("is-invalid");
    mensaje.classList.remove("is-valid");
    valido = false;
  }

  // Si todo está válido
  if (valido) {
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    this.reset();
    nombre.classList.remove("is-valid");
    mensaje.classList.remove("is-valid");
    contador.textContent = "0 / 500 caracteres";
  }
});