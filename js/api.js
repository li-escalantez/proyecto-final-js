// establecemos la api y categoria
const BASE_URL = 'https://dummyjson.com';
const CATEGORY = 'groceries';

// traemos todos los arts de la categoria
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products/category/${CATEGORY}`);
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  return res.json(); 
}

//traemos los datos de un art
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Producto ${id} no encontrado`);
  return res.json();
}
