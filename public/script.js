// script.js
//const API_BASE = 'http://api.jquiroz.net:3013';
const API_BASE = 'http://jquiroz.net:3013';
// Función para agregar un producto
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MjUwODYxNX0.YWpb2-Vk4LPvcF2bS4AV7E9xiMBMIZ2ERD0QIcdwRpY"

function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const inventario = document.getElementById('inventario').value;

    if (!nombre || !precio || !inventario) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    console.log("Agregar el producto");
    fetch(`${API_BASE}/api/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, precio, inventario }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto agregado con éxito');
        cargarProductos();  // Actualizar la lista de productos
        limpiarFormulario();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para cargar todos los productos
function cargarProductos() {
    fetch(`${API_BASE}/api/productos`)
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('lista-productos');
            lista.innerHTML = '';  // Limpiar la lista

            data.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - Precio: $${producto.precio} - Inventario: ${producto.inventario}`;
                
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.onclick = () => eliminarProducto(producto.id);

                li.appendChild(botonEliminar);
                lista.appendChild(li);
            });
        });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch(`${API_BASE}/api/productos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto eliminado con éxito');
        cargarProductos();  // Actualizar la lista de productos
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para limpiar el formulario después de agregar un producto
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('inventario').value = '';
}

// Cargar productos al inicio
cargarProductos();



