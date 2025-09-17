// validacionCarrito.js
document.addEventListener("DOMContentLoaded", () => {
  const CAR_KEY = "carrito";
  const COUPON_KEY = "carritoCupon";

  const carritoContainer = document.getElementById("carritoContainer");
  const carritoTotal = document.getElementById("carritoTotal");
  const subtotalEl = document.getElementById("subtotal");
  const descuentoEl = document.getElementById("descuento");
  const totalResumenEl = document.getElementById("totalResumen");
  const cartCount = document.getElementById("cartCount");
  const cuponInput = document.getElementById("cupon");
  const aplicarCuponBtn = document.getElementById("aplicarCupon");

  if (!carritoContainer) return; // seguridad: salir si no está la página

  const formatPrice = (n) => (Number(n) || 0).toLocaleString("es-CL");

  function getCarrito() {
    return JSON.parse(localStorage.getItem(CAR_KEY) || "[]");
  }
  function setCarrito(c) {
    localStorage.setItem(CAR_KEY, JSON.stringify(c));
  }
  function getCoupon() {
    return localStorage.getItem(COUPON_KEY) || "";
  }
  function setCoupon(code) {
    if (code) localStorage.setItem(COUPON_KEY, code);
    else localStorage.removeItem(COUPON_KEY);
  }

  function calculateTotals(carrito) {
    const subtotal = carrito.reduce((s, it) => s + Number(it.precio) * Number(it.cantidad), 0);
    const coupon = getCoupon();
    const rate = coupon === "DESCUENTO10" ? 0.10 : 0;
    const descuento = Math.round(subtotal * rate);
    const total = subtotal - descuento;
    return { subtotal, descuento, total, rate, coupon };
  }

  function updateCartCountUI(carrito) {
    const totalItems = carrito.reduce((s, it) => s + Number(it.cantidad), 0);
    if (cartCount) cartCount.textContent = totalItems;
  }

  function renderCarrito() {
    const carrito = getCarrito();
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoContainer.innerHTML = `<p class="text-center">Tu carrito está vacío.</p>`;
    } else {
      carrito.forEach((item, index) => {
        const itemTotal = Number(item.precio) * Number(item.cantidad);
        const row = document.createElement("div");
        row.className = "d-flex align-items-center border-bottom py-2";
        row.innerHTML = `
          <img src="${item.imagen}" class="img-pequena me-3" alt="${item.nombre}" style="max-height:60px;">
          <div class="flex-grow-1">
            <strong>${item.nombre}</strong><br>
            <small class="text-muted">${item.descripcion || ""}</small>
          </div>
          <div class="me-3">$${formatPrice(item.precio)}</div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-1" data-action="restar" data-index="${index}">-</button>
            <span class="mx-2">${item.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary ms-1" data-action="sumar" data-index="${index}">+</button>
          </div>
          <div class="ms-3 d-flex align-items-center">
            <strong>$${formatPrice(itemTotal)}</strong>
            <button class="btn btn-sm btn-danger ms-2" data-action="eliminar" data-index="${index}">✕</button>
          </div>
        `;
        carritoContainer.appendChild(row);
      });
    }

    const totals = calculateTotals(carrito);
    if (carritoTotal) carritoTotal.textContent = `$ ${formatPrice(totals.total)}`;
    if (subtotalEl) subtotalEl.textContent = `$ ${formatPrice(totals.subtotal)}`;
    if (descuentoEl) descuentoEl.textContent = totals.descuento > 0 ? `-$ ${formatPrice(totals.descuento)}` : `$ 0`;
    if (totalResumenEl) totalResumenEl.textContent = `$ ${formatPrice(totals.total)}`;

    updateCartCountUI(carrito);
    setCarrito(carrito);
  }

  // Delegación de eventos para + / - / eliminar
  carritoContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;
    const idx = Number(btn.dataset.index);
    let carrito = getCarrito();
    if (!Number.isInteger(idx) || idx < 0 || idx >= carrito.length) {
      // índice inválido
      return;
    }

    if (action === "sumar") {
      carrito[idx].cantidad = Number(carrito[idx].cantidad) + 1;
      setCarrito(carrito);
      renderCarrito();
    } else if (action === "restar") {
      if (carrito[idx].cantidad > 1) {
        carrito[idx].cantidad = Number(carrito[idx].cantidad) - 1;
      } else {
        carrito.splice(idx, 1);
      }
      setCarrito(carrito);
      renderCarrito();
    } else if (action === "eliminar") {
      carrito.splice(idx, 1);
      setCarrito(carrito);
      renderCarrito();
    }
  });

  // Aplicar cupón
  if (aplicarCuponBtn) {
    aplicarCuponBtn.addEventListener("click", () => {
      const code = (cuponInput?.value || "").trim().toUpperCase();
      if (!code) {
        alert("Ingresa un código de cupón.");
        return;
      }
      if (code === "DESCUENTO10") {
        setCoupon(code);
        alert("Cupón aplicado: 10% de descuento");
      } else {
        setCoupon("");
        alert("Cupón inválido");
      }
      renderCarrito();
    });
  }

  // Inicial
  renderCarrito();
});

// --- Contador de carrito en el navbar ---
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return; // si la página no tiene carrito, no hace nada

  function updateCartCount() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce((s, it) => s + Number(it.cantidad || 0), 0);
    cartCount.textContent = totalItems;
  }

  updateCartCount();

  // Se actualiza automáticamente si cambias el carrito en otra pestaña
  window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
      updateCartCount();
    }
  });
});
