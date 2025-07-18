# Proyecto de Gestión de Accesorios de Computación

## Descripción General de las Páginas
1. Usamos los datos de “DummyJson”, para los 4 arts (los primeros) destacados, continuamos usando datos del json para reseñas (solo en index)
2.  index.html: Página de inicio que presenta la web, con una portada de 3 imágenes rotativas que cambian cada 3 segundos y enlaces a las secciones de productos y contacto.
3.  catalogo.html: Página que muestra un catálogo de productos con la opción de añadirlos al carrito de compras.
4.  carrito.html: Página donde se pueden ver los productos añadidos a su carrito, eliminar productos y proceder a la compra. A modo de menú flotante el carrito aparece en todo momento indicando la cantidad de artículos de la compra, también se agregó una imagen que hace referencia al mismo para que sea mas descriptivo visualmente y tambien contiene un formulario integrado en la parte inferior de la tabla de productos que se compro con su total parcial y general (para esto usamos formpree)
5.  contacto.html: Página que permite a los usuarios enviar un mensaje de contacto mediante un formulario (usamos el mismo formspree ).

## Estructura del Proyecto
La estructura del proyecto es la siguiente:
Pre_entrega/ │ 
          ├── css/ 
          │      └── styles.css 
          ├── data/ 
          │     └── db.json 
          ├── images/ 
          │         └── (imágenes para la reseña) 
          ├── js/ 
          │     └── api.js
          │     └── script.js 
          ├── carrito.html 
          ├── catalogo.html 
          ├── index.html 
          └── contacto.html
          └── RADME.md

## Funcionalidades Implementadas y breve resumen
•   DOMContentLoaded
•   LocalStorage
•   Menu Toggle
•   CSS 
•   Media Queries
•   Flexbox
•   Grid
•   Formspree

o Consumimos datos de https://dummyjson.com, mas específicamente de la categoría “groceries”  
o   DB.json: tomamos los datos de un archivo json solo para la reseña de los 4 productos destacados/los primeros que nos da DummyJson los mismos se cargan a una ven en una ventana modal.
o Se cargan los productos al Carrito: Al añadir productos al carrito, la información se guarda en el localStorage, permitiendo que el carrito persista entre recargas de página.
o   Actualización del Carrito: Al eliminar productos del carrito, se actualiza el localStorage y la vista del carrito se recarga automáticamente para reflejar los cambios.
o   Menu Toggle: En pantallas pequeñas, se implementa un botón de menú que permite mostrar u ocultar la navegación, mejorando la usabilidad en dispositivos móviles.
o   Carrito Flotante: El enlace "Mi Carrito" en el menú actúa de manera similar a un carrito flotante, permitiendo a los usuarios acceder rápidamente al contenido de su carrito desde cualquier página.
o   Contador de cantidad que se actualiza en tiempo real
o   Vista Responsiva: El diseño del carrito se adapta a diferentes tamaños de pantalla. En dispositivos móviles, los productos en el carrito se muestran en una disposición vertical para facilitar la lectura y la interacción.
o   Actualización en Tiempo Real: Al eliminar productos del carrito, la lista de productos se actualiza en tiempo real sin necesidad de recargar la página 
o   Imágenes Rotativas: En la página de inicio, las imágenes rotativas se ajustan automáticamente al tamaño de la pantalla.
o   Formularios: Los formularios en contacto.html y carrito.html están diseñados para ser fáciles de usar tanto en pantallas grandes como pequeñas.
o   CSS Media Queries: Se utilizan media queries en CSS para ajustar los estilos según el tamaño de la pantalla, asegurando que la web se vea bien en dispositivos móviles, tabletas y computadoras de escritorio.
o   Tabla de artículos: la misma se adapta tanto a dispositivos chicos y grandes, cambiando su forma según sea el dispositivo, con un botón para eliminar el articulo y recargando el resto de los artículos inmediatamente.
o   Elementos Ocultos y Mostrados: Algunos elementos del menú y la navegación se ocultan o muestran según el tamaño de la pantalla para mejorar la experiencia del usuario.


