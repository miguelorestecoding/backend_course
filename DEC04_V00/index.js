const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProducts = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(infoProducts);
      } else {
        return [];
      }
    } catch (err) {
      return err;
    }
  }

  async addProduct(obj) {
    try {
      const productsPrev = await this.getProducts();
      let id
      if(!productsPrev.length) {
        id = 1
      } else {
        id = productsPrev[productsPrev.length - 1].id + 1;
      }
      productsPrev.push({...obj, id})
      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
    } catch (err) {
      return err;
    }
  }

  // getProductsById(id) {
  //   const productById = this.products.filter((product) => product.id === id);
  //   if (productById.length === 0) {
  //     console.log("Not found ");
  //   }
  //   return productById;
  // }

  // deleteProductById(id) {}

  // updateProductById(id, obj) {}
}

// Valida que todos los campos sean obligatorios?
// Permite repetir el código?

const product1 = {
  title: 'producto1',
  description: 'soy el producto1',
  price: 100,
  thumbnail: 'soy el thumbnail',
  code: '1111',
  stock: 10
}

const product2 = {
  title: 'producto2',
  description: 'soy el producto2',
  price: 200,
  thumbnail: 'soy el thumbnail',
  code: '2222',
  stock: 20
}
async function testing() {
  const myProductManager = new ProductManager("Products.json");
  const products = await myProductManager.getProducts();
  console.log(`Antes de Agregar Productos: ${products}`);
  await myProductManager.addProduct(product1)
  console.log(`Después de Agregar Productos: ${products}`);
}

testing();



