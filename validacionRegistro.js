// validacion.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formRegistro");
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword"); 
  const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");

  // --- Validar correo dominio duoc ---
  correo.addEventListener("input", function () {
    const duocRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!duocRegex.test(correo.value)) {
      correo.classList.add("is-invalid");
      correo.classList.remove("is-valid");
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }
  });

  // --- Validación dinámica contraseña ---
  const requisitos = {
    longitud: document.getElementById("longitud"),
    mayuscula: document.getElementById("mayuscula"),
    minuscula: document.getElementById("minuscula"),
    numero: document.getElementById("numero"),
    especial: document.getElementById("especial"),
  };

  password.addEventListener("input", function () {
    const val = password.value;

    // Longitud
  
    requisitos.longitud.classList.toggle("text-success", val.length >= 8);
    requisitos.longitud.classList.toggle("text-danger", val.length < 8);
    //Mayuscula
    requisitos.mayuscula.classList.toggle("text-success", /[A-Z]/.test(val));
    requisitos.mayuscula.classList.toggle("text-danger", !/[A-Z]/.test(val));
    // Minúscula  
    requisitos.minuscula.classList.toggle("text-success", /[a-z]/.test(val));
    requisitos.minuscula.classList.toggle("text-danger", !/[a-z]/.test(val));
    // Número
    requisitos.numero.classList.toggle("text-success", /\d/.test(val));
    requisitos.numero.classList.toggle("text-danger", !/\d/.test(val));
    // Especial
    requisitos.especial.classList.toggle("text-success", /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val));
    requisitos.especial.classList.toggle("text-danger", !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val));

  });

   // --- Validación inmediata SOLO en confirmación de contraseña ---
confirmPassword.addEventListener("input", function () {
  if (confirmPassword.value === "") {
    confirmPassword.classList.remove("is-valid", "is-invalid");
    confirmPasswordFeedback.textContent = "Repite la contraseña";
    return;
  }

  if (confirmPassword.value !== password.value) {
    confirmPassword.classList.add("is-invalid");
    confirmPassword.classList.remove("is-valid");
    confirmPasswordFeedback.textContent = "Las contraseñas no coinciden";
  } else {
    confirmPassword.classList.add("is-valid");
    confirmPassword.classList.remove("is-invalid");
    confirmPasswordFeedback.textContent = ""; // oculta el mensaje
  }
});

  // --- Validación al enviar ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    // Nombre
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
    }

    // Correo (ya con dominio duoc)
    const duocRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!duocRegex.test(correo.value)) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
      correo.classList.add("is-valid");
    }

    // Contraseña
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passRegex.test(password.value)) {
      password.classList.add("is-invalid");
      valido = false;
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }
    
    // --- Confirmar contraseña --- 
    if (confirmPassword.value !== password.value || confirmPassword.value === "") { 
      confirmPassword.classList.add("is-invalid"); 
      valido = false; 
    } else { confirmPassword.classList.remove("is-invalid"); 
      confirmPassword.classList.add("is-valid"); }
      
     // Si todo válido
    if (valido) {
      alert("¡Registro exitoso!");
      form.reset();

      // limpiar validaciones
      const inputs = form.querySelectorAll(".form-control, .form-select");
      inputs.forEach((input) => input.classList.remove("is-valid", "is-invalid"));

      // resetear colores de requisitos
      Object.values(requisitos).forEach((req) => (req.style.color = "red"));
    }
  });
});
