const socketClient = io('http://localhost:8080');
const divRealTimeProducts = document.getElementById('divRealTimeProducts');

socketClient.on("productos-actualizados", (products) => {
  
  const realTimeProducts = products
  .map((product) => {
    return `
    <p>id : ${product.id}</p> 
    <p>Title: ${product.title}</p>
    <p>Description: ${product.description}</p>
    <p>Code: ${product.code}</p>
    <p>Price: ${product.price}</p>
    <p>Category: ${product.category}</p>
    <p>Thumbnails: ${product.thumbnails}</p>
    <hr>
    `;
  })
  .join('');
  divRealTimeProducts.innerHTML = realTimeProducts
});