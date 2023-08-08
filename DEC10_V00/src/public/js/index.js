const socketClient = io();

const realTimeProductsForm = document.getElementById("realTimeProductsForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const price = document.getElementById("price");
const productStatus = document.getElementById("status");
const category = document.getElementById("category");
const thumbnails = document.getElementById("thumbnails");
const divRealTimeProducts = document.getElementById("divRealTimeProducts");

socketClient.on("bienvenida", (message) => {
  console.log(`He recibo un evento del Servidor que dice: ${message}`);
});

realTimeProductsForm.onsubmit = (e) => {
  e.preventDefault();
  const realTimeProductAdded = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    status: productStatus.value,
    stock: 10,
    category: category.value,
    thumbnails: thumbnails.value,
  };
  console.log(
    `Se ha agregado un nuevo producto: ${JSON.stringify(realTimeProductAdded)}`
  );
  socketClient.emit("productAdded", realTimeProductAdded);
};

socketClient.on("realTimeProducts", (realTimeProducts) => {
  const allRealTimeProducts = realTimeProducts
    .map((realTimeProduct) => {
      return `<p>id: ${realTimeProduct.id} </p>
      <p>title: ${realTimeProduct.title} </p> <p>description: ${realTimeProduct.description}</p> <p>code: ${realTimeProduct.code}</p>`;
    })
    .join(" ");
  divRealTimeProducts.innerHTML = allRealTimeProducts;
});
