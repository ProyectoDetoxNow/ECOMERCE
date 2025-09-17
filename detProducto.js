// Extraer param 'producto'
const params = new URLSearchParams(window.location.search);
const idProducto = params.get('producto') || 'batido-verde';

// Buscar producto en productos.js
const producto = productos[idProducto];

// Elementos del DOM
const elNombre = document.getElementById('producto-nombre');
const elPrecio = document.getElementById('producto-precio');
const elImagen = document.getElementById('producto-imagen');
const elDesc = document.getElementById('producto-descripcion');
const relatedContainer = document.getElementById('relatedContainer');
const cartCount = document.getElementById('cartCount');

// Función para cargar contador carrito desde localStorage
function updateCartCount() {
	const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
	const total = carrito.reduce((s, item) => s + Number(item.cantidad || 0), 0);
	cartCount.textContent = total;
}

if (!producto) {
	document.getElementById('detalle-producto').innerHTML = '<p>Producto no encontrado.</p>';
	updateCartCount();
} else {
	// Poblar elementos
	elNombre.textContent = producto.nombre;
	elPrecio.textContent = producto.precioDisplay || ('$' + (producto.precio || '0'));
	elImagen.src = producto.imagen;
	elImagen.alt = producto.nombre;
	elDesc.textContent = producto.descripcion;

	// Mostrar relacionados
	relatedContainer.innerHTML = '';
	const relatedIds = producto.related || Object.keys(productos).filter(k => k !== producto.id).slice(0, 3);
	relatedIds.forEach(rid => {
		const rp = productos[rid];
		if (!rp) return;
		const col = document.createElement('div');
		col.className = 'col-6 col-md-3';
		col.innerHTML = `
			<div class="related-card card shadow clickable" onclick="window.location.href='detProducto.html?producto=${rp.id}'">
				<img src="${rp.imagen}" alt="${rp.nombre}" class="producto-relacionado mb-2">
				<div style="font-weight:600">${rp.nombre}</div>
			</div>
		`;
		relatedContainer.appendChild(col);
	});

	// Botón agregar al carrito
	document.getElementById('addToCart').addEventListener('click', () => {
		const qty = Number(document.getElementById('cantidad').value || 1);
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

		const existing = carrito.find(i => i.id === producto.id);
		if (existing) {
			existing.cantidad = Number(existing.cantidad) + qty;
		} else {
			carrito.push({
				id: producto.id,
				nombre: producto.nombre,
				precio: producto.precio,
				descripcion: producto.descripcion,
				imagen: producto.imagen,
				cantidad: qty
			});
		}

		localStorage.setItem('carrito', JSON.stringify(carrito));

		alert(`Se agregó ${qty} × ${producto.nombre} al carrito.`);
		updateCartCount();
	});

	updateCartCount();
}
