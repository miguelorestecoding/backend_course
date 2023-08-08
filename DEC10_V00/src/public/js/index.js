const socketClient = io();

const divRealTimeProducts = document.getElementById('divRealTimeProducts');

socketClient.on("productos-actualizados", (products) => {
  // Codigo que renderice dentro del <div id="divRealTimeProducts"></div> que se encuentra en el archivo realTimeProducts.handlebars el detalle de todos los productos que llegan en "productos"
  const realTimeProducts = products
  .map((product) => {
    return `<p>id : ${product.id}</p> <p>Title: ${product.title}</p>`;
  })
  .join('');
  divRealTimeProducts.innerHTML = realTimeProducts
});