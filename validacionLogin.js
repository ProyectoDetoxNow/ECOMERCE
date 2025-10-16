document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login");
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");

  const duocRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  // --- Validación en tiempo real del correo ---
  correo.addEventListener("input", function () {
    if (!duocRegex.test(correo.value.trim())) {
      correo.classList.add("is-invalid");
      correo.classList.remove("is-valid");
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }
  });

  // --- Validación en tiempo real de la contraseña ---
  password.addEventListener("input", function () {
    const val = password.value.trim();

    if (val.length < 4 || val.length > 10) {
      password.classList.add("is-invalid");
      password.classList.remove("is-valid");
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }
  });

  // --- Validación al enviar ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    // Correo
    if (!duocRegex.test(correo.value.trim())) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    // Contraseña
    const passVal = password.value.trim();
    if (passVal.length < 4 || passVal.length > 10) {
      password.classList.add("is-invalid");
      valido = false;
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    // Si todo está OK
    if (valido) {
      alert("Inicio de sesión exitoso ✅");
      form.reset();
      [correo, password].forEach((i) =>
        i.classList.remove("is-valid", "is-invalid")
      );
    }
  });
});
