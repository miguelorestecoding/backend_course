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
      let id;
      if (!productsPrev.length) {
        id = 1;
      } else {
        id = productsPrev[productsPrev.length - 1].id + 1;
      }
      productsPrev.push({ ...obj, id });
      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
    } catch (err) {
      return err;
    }
  }

  async getProductsById(id) {
    try {
      const productsPrev = await this.getProducts();
      const product = productsPrev.find((p) => p.id === id);
      if (!product) {
        return console.log("Imposible Mostrar: Ese producto no se encuentra en el listado.");
      } else {
        return product;
      }
    } catch (err) {
      return err;
    }
  }

  async deleteProduct(id) {
    try {
      const productsPrev = await this.getProducts();
      const product = productsPrev.find((p) => p.id === id);
      if (!product) {
        return console.log(
          "Imposible Borrar: Ese producto no se encuentra en el listado."
        );
      } else {
        const newProducts = productsPrev.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      }
    } catch (err) {
      return err;
    }
  }

  // updateProductById(id, obj) {}
}

// Valida que todos los campos sean obligatorios?
// Permite repetir el código?

const product1 = {
  title: "producto1",
  description: "soy el producto1",
  price: 100,
  thumbnail: "soy el thumbnail",
  code: "1111",
  stock: 10,
};

const product2 = {
  title: "producto2",
  description: "soy el producto2",
  price: 200,
  thumbnail: "soy el thumbnail",
  code: "2222",
  stock: 20,
};

async function testing() {
  const myProductManager = new ProductManager("Products.json");
  // console.log("Antes de Agregar Productos: ", products);
  // await myProductManager.addProduct(product1)
  // await myProductManager.addProduct(product2)
  // console.log(`${product1.title} agergado!`)
  // await myProductManager.addProduct(product2)
  // console.log(`${product2.title} agergado!`)
  await myProductManager.deleteProduct(8)
  // const findProduct = await myProductManager.getProductsById(1);
  const products = await myProductManager.getProducts();
  console.log(products);
  // console.log("Después de Agregar Productos: ", products);
}

testing();
