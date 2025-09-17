// productos.js
// Objeto con info de cada producto. Las claves son los IDs que usarás en la URL (?producto=batido-verde)
const productos = {
    "batido-verde": {
    id: "batido-verde",
    nombre: "Batido Verde Clásico",
    precio: 3990,
    precioDisplay: "$3.990",
    imagen: "imagenes/Batido Verde Clásico.jpg",
    descripcion: "Rico en clorofila y antioxidantes, ayuda a limpiar el sistema digestivo y aporta frescura. Ideal para comenzar el día ligero.",
    related: ["batido-tropical", "batido-limon-chia", "batido-rojo"]
    },
    "batido-tropical": {
    id: "batido-tropical",
    nombre: "Batido Tropical Detox",
    precio: 4200,
    precioDisplay: "$4.200",
    imagen: "imagenes/Batido Tropical Detox.jpg",
    descripcion: "Refrescante y digestivo. La piña aporta bromelina y la cúrcuma potencia el efecto desintoxicante.",
    related: ["batido-verde", "batido-rojo", "batido-cremoso"]
    },
    "batido-limon-chia": {
    id: "batido-limon-chia",
    nombre: "Batido Limón & Chía",
    precio: 3500,
    precioDisplay: "$3.500",
    imagen: "imagenes/Batido Limón & Chía.jpg",
    descripcion: "Hidratante y depurativo, mejora la digestión y ayuda a la sensación de saciedad gracias a la chía.",
    related: ["batido-verde", "batido-tropical", "batido-cremoso"]
    },
    "batido-rojo": {
    id: "batido-rojo",
    nombre: "Batido Rojo Antioxidante",
    precio: 4500,
    precioDisplay: "$4.500",
    imagen: "imagenes/BATIDO ROJO.jpg",
    descripcion: "Potente fuente de antioxidantes que protegen las células, favorecen la circulación y aportan energía natural.",
    related: ["batido-verde", "batido-tropical", "batido-cremoso"]
    },
    "batido-cremoso": {
    id: "batido-cremoso",
    nombre: "Batido Cremoso Detox",
    precio: 4990,
    precioDisplay: "$4.990",
    imagen: "imagenes/BATIDO CREMOSO.jpg",
    descripcion: "Cremoso y saciante. El aguacate aporta grasas saludables y ayuda a mantener energía por más tiempo.",
    related: ["batido-verde", "batido-limon-chia", "batido-rojo"]
    },
    "batido-verde-dulce": {
    id: "batido-verde-dulce",
    nombre: "Batido Verde Dulce",
    precio: 4300,
    precioDisplay: "$4.300",
    imagen: "imagenes/BATIDO VERDE DULCE.jpg",
    descripcion: "Combina lo detox del kale con la dulzura del mango y el plátano, nutritivo y agradable al paladar.",
    related: ["batido-verde", "batido-tropical", "batido-cremoso"]
    }
};
