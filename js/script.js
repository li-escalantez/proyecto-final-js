//importamos
import { getProducts, getProductById } from './api.js';


// configuiramos el carrusel de imagenes, fijamos el tiempo en que se cambiasn las img y que sea responsivo
const alternarMenu = document.querySelector('.menu_toggle');
const menu = document.querySelector('.menu');
alternarMenu?.addEventListener('click', () => {
  menu.classList.toggle('menu_active');
});

let indiceActual = 0;
const imagenes = document.querySelectorAll('.contenedor_imagenes img');
function mostrarSiguienteImagen() {
  imagenes[indiceActual]?.classList.remove('activa');
  indiceActual = (indiceActual + 1) % imagenes.length;
  imagenes[indiceActual]?.classList.add('activa');
}
setInterval(mostrarSiguienteImagen, 3000);


// modal de reseñas
window.abrirModal = function (idModal) {
  const modal = document.getElementById(idModal);
  if (!modal) return;
  modal.style.display = 'block';

  if (window.innerWidth <= 768) {
    const mc = modal.querySelector('.modal_content');
    mc.style.margin = '50% auto';
    mc.style.transform = 'translateY(-50%)';
  }
};

// cerramos modal
window.cerrarModal = function (idModal) {
  const modal = document.getElementById(idModal);
  if (modal) modal.style.display = 'none';
};

// si se hace clic afuera del modal se cierra la misma
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

//Cargamos con los art: index, catalogo y carrito
document.addEventListener('DOMContentLoaded', async () => {
  actualizarCantidadCarrito();

  if (document.getElementById('productos_destacados')) {
    await cargarIndex(); 
  }

  if (document.getElementById('catalogo')) {
    await cargarCatalogo(); 
  }

  if (document.getElementById('carrito_tabla')) {
    await cargarCarrito(); 
  }
});

//  funciones del carrito
function agregarAlCarrito(productId, cantidad = 1) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existente = carrito.find(item => item.id === productId);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id: productId, cantidad });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('¡Su producto fue agregado con éxito!');
  actualizarCantidadCarrito();
}

function eliminarDelCarrito(productId) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(item => item.id != productId); // 
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCantidadCarrito();
  mostrarTablaCarrito(); 
}

function actualizarCantidadCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  localStorage.setItem('cantidadCarrito', totalCantidad);
  document.getElementById('cantidad_carrito').textContent = `(${totalCantidad})`;
}

//cargamos 4 art destacados para index ya que toma datos de reseña del json  
async function cargarIndex() {
  const { products } = await getProducts(4, 0);
  const resp = await fetch('data/db.json');
  const { reviews } = await resp.json(); 

  const contenedor = document.getElementById('productos_destacados');
  contenedor.innerHTML = '';

  products.forEach((prod, i) => {
    const card = document.createElement('div');
    card.classList.add('card_producto');
    card.innerHTML = `
      <img src="${prod.thumbnail}" alt="${prod.title}" class="producto_img">
      <h3>${prod.title}</h3>
      <p class="producto_descripcion">${prod.description}</p>
      <div class="precio"><p class="precio_descuento">$${prod.price}</p></div>
      <button class="boton_resenia" onclick="abrirModal('modal${prod.id}')">Reseñas</button>
    `;
    contenedor.appendChild(card);

// modal para reseña de los 4 art
    const rev = reviews[i] || {};
    const modal = document.createElement('div');
    modal.id = `modal${prod.id}`;
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal_content">
        <span class="close" onclick="cerrarModal('modal${prod.id}')">&times;</span>
        <div class="review">
          <img src="images/${rev.reviewImage}" alt="Foto del revisor" class="review_photo">
          <div>
            <div class="review_name">${rev.reviewUser}</div>
            <div class="review_stars">${'★'.repeat(rev.reviewStars)}</div>
            <div class="review_text">${rev.reviewComment}</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  });
}

// cargamos renderizado de los arts para catalogo y la paginacion
async function cargarCatalogo() {
  const url = new URL(window.location.href);
  const page = Math.max(1, parseInt(url.searchParams.get('page')) || 1);
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  const { products, total } = await getProducts(pageSize, skip);
  const contenedor = document.getElementById('catalogo');
  contenedor.innerHTML = '';

  products.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card_producto');
    card.innerHTML = `
      <img src="${prod.thumbnail}" alt="${prod.title}" class="producto_img">
      <h3>${prod.title}</h3>
      <p class="producto_descripcion">${prod.description}</p>
      <div class="precio"><p class="precio_descuento">$${prod.price}</p></div>
      <button class="boton_carrito" onclick="agregarAlCarrito('${prod.id}', 1)">Añadir al Carrito</button>
    `;
    contenedor.appendChild(card);
  });

  const paginacion = document.getElementById('paginacion');
  paginacion.innerHTML = '';
  const totalPages = Math.ceil(total / pageSize);

  if (page > 1) {
    const prev = document.createElement('button');
    prev.className = 'boton_carrito'; //usamos mismo estilo de boton del carrito
    prev.textContent = 'Anterior';
    prev.onclick = () => window.location.href = `catalogo.html?page=${page - 1}`;
    paginacion.appendChild(prev);
  }

  if (page < totalPages) {
    const next = document.createElement('button');
    next.className = 'boton_carrito';
    next.textContent = 'Siguiente';
    next.onclick = () => window.location.href = `catalogo.html?page=${page + 1}`;
    paginacion.appendChild(next);
  }
}

//cargamos art del carrito e4n grilla y totalde compra 
async function cargarCarrito() {
  await mostrarTablaCarrito();
}
async function mostrarTablaCarrito() {
  const tbody = document.getElementById('carrito_tabla');
  const totalEl = document.getElementById('total_precio');
  tbody.innerHTML = '';
  let total = 0;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  for (const item of carrito) {
    const prod = await getProductById(item.id);
    const subtotal = prod.price * item.cantidad;
    total += subtotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Imagen"><img src="${prod.thumbnail}" alt="${prod.title}" class="producto_img pequeña"></td>
      <td data-label="Nombre del Artículo">${prod.title}</td>
      <td data-label="Precio">$${prod.price}</td>
      <td data-label="Cantidad">${item.cantidad}</td>
      <td data-label="Total Parcial">$${subtotal.toFixed(2)}</td>
      <td data-label="Acción"><button class="boton_eliminar" onclick="eliminarDelCarrito('${prod.id}')">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  }

  totalEl.textContent = total.toFixed(2);
}

// Form de compra para envio usando formspree  redirecciona a catalogo.html
function realizarCompra(event) {
  event.preventDefault();

  const form = document.getElementById('formulario_compra');
  const formData = new FormData(form);
  formData.append('mensaje', 'Gracias, a la brevedad nos comunicaremos.');

  fetch('https://formspree.io/f/xkgrdrwy', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      localStorage.removeItem('carrito');
      localStorage.setItem('cantidadCarrito', 0);
      actualizarCantidadCarrito?.();
      alert('¡Muchas Gracias, su compra fue realizada con éxito!');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      alert('Hubo un problema con su compra. Por favor intente nuevamente.');
    }
  })
  .catch(error => {
    alert('Hubo un problema con su compra. Por favor intente nuevamente.');
  });

  return false;
}

//decimos que se pueda usar desde los html
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito= eliminarDelCarrito;
window.realizarCompra = realizarCompra;
