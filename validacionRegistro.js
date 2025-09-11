document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formRegistro");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  
  

  form.addEventListener("submit", function (event) {
    // Validar que las contraseñas coincidan
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Las contraseñas no coinciden");
    } else {
      confirmPassword.setCustomValidity(""); // limpiar error
    }

    // Validación general de HTML5
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  });
});