// validacion.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formRegistro");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita envío por defecto
    let valido = true;

    // --- Nombre ---
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
    }

    // --- Correo ---
    const correo = document.getElementById("correo");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.value)) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    // --- Contraseña ---
    const password = document.getElementById("password");
    // Regex flexible: minúscula, mayúscula, número, carácter especial, mínimo 8
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password.value)) {
      password.classList.add("is-invalid");
      valido = false;
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    // --- Confirmar contraseña ---
    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
      confirmPassword.classList.add("is-invalid");
      valido = false;
    } else {
      confirmPassword.classList.remove("is-invalid");
      confirmPassword.classList.add("is-valid");
    }

    // --- Dirección ---
    const direccion = document.getElementById("direccion");
    if (direccion.value.trim() === "") {
      direccion.classList.add("is-invalid");
      valido = false;
    } else {
      direccion.classList.remove("is-invalid");
      direccion.classList.add("is-valid");
    }

    // --- Región ---
    const region = document.getElementById("region");
    if (region.value === "" || region.value === "Seleccione") {
      region.classList.add("is-invalid");
      valido = false;
    } else {
      region.classList.remove("is-invalid");
      region.classList.add("is-valid");
    }

    // --- Comuna ---
    const comuna = document.getElementById("comuna");
    if (comuna.value === "" || comuna.value === "Seleccione") {
      comuna.classList.add("is-invalid");
      valido = false;
    } else {
      comuna.classList.remove("is-invalid");
      comuna.classList.add("is-valid");
    }

    // --- Teléfono (opcional) ---
    const telefono = document.getElementById("telefono");
    if (telefono.value !== "" && isNaN(telefono.value)) {
      telefono.classList.add("is-invalid");
      valido = false;
    } else {
      telefono.classList.remove("is-invalid");
      if (telefono.value !== "") telefono.classList.add("is-valid");
    }

    // --- Si todo es válido ---
    if (valido) {
      alert("¡Registro exitoso!");
      form.reset();

      // Quitar clases de validación
      const inputs = form.querySelectorAll(".form-control, .form-select");
      inputs.forEach((input) => input.classList.remove("is-valid"));
    }
  });
});
