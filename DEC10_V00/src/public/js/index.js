const socketClient = io();

socketClient.on("productos-actualizados", (productos) => {
  console.log(productos);
  actualizarListaProductos(productos);
});

function actualizarListaProductos(productos) {
  const divRealTimeProducts = document.getElementById("divRealTimeProducts");
  const productsContainer = document.getElementById("productsContainer"); // Identificador del contenedor de productos en products.handlebars

  // Limpia el contenido actual de los contenedores
  divRealTimeProducts.innerHTML = "";
  productsContainer.innerHTML = "";

  // Recorre los productos y agrega elementos al contenedor en addProduct.handlebars
  productos.forEach((producto) => {
    const productInfo = `
      <h3>Title: ${producto.title}</h3>
      <p>id: ${producto.id}</p>
      <p>description: ${producto.description}</p>
      <p>code: ${producto.code}</p>
      <p>price: ${producto.price}</p>
      <p>status: ${producto.status}</p>
      <p>category: ${producto.category}</p>
      <p>thumbnail: ${producto.thumbnail}</p>
    `;
    divRealTimeProducts.innerHTML += productInfo;

    // Agrega elementos al contenedor en products.handlebars
    productsContainer.innerHTML += productInfo;
  });
}

document
  .getElementById("addProductForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el envío automático del formulario

    const formData = new FormData(event.target);
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // No necesitas emitir el evento aquí, ya que el evento se emite en el socketClient.on anterior
      document.getElementById("message").textContent =
        "Producto agregado exitosamente.";
    } else {
      document.getElementById("message").textContent =
        "Error al agregar el producto.";
    }
  });

// DEC10_V00
// const realTimeProductsForm = document.getElementById("realTimeProductsForm");
// const title = document.getElementById("title");
// const description = document.getElementById("description");
// const code = document.getElementById("code");
// const price = document.getElementById("price");
// const productStatus = document.getElementById("status");
// const category = document.getElementById("category");
// const thumbnails = document.getElementById("thumbnails");
// const divRealTimeProducts = document.getElementById("divRealTimeProducts");

// socketClient.on("bienvenida", (message) => {
//   console.log(`He recibo un evento del Servidor que dice: ${message}`);
// });

// realTimeProductsForm.onsubmit = (e) => {
//   e.preventDefault();
//   const realTimeProductAdded = {
//     title: title.value,
//     description: description.value,
//     code: code.value,
//     price: price.value,
//     status: productStatus.value,
//     stock: 10,
//     category: category.value,
//     thumbnails: thumbnails.value,
//   };
//   console.log(
//     `Se ha agregado un nuevo producto: ${JSON.stringify(realTimeProductAdded)}`
//   );
//   socketClient.emit("productAdded", realTimeProductAdded);
// };

// socketClient.on("realTimeProducts", (realTimeProducts) => {
//   const allRealTimeProducts = realTimeProducts
//     .map((realTimeProduct) => {
//       return `<p>id: ${realTimeProduct.id} </p>
//       <p>title: ${realTimeProduct.title} </p> <p>description: ${realTimeProduct.description}</p> <p>code: ${realTimeProduct.code}</p>`;
//     })
//     .join(" ");
//   divRealTimeProducts.innerHTML = allRealTimeProducts;
// });
