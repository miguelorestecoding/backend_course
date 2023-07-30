import fs from "fs";

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
        return console.log(
          "Imposible Mostrar: Ese producto no se encuentra en el listado."
        );
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

  async updateProductById(id, obj) {
    try {
      const productsPrev = await this.getProducts(id);
      const productIndex = productsPrev.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        return console.log(
          "Imposible Actualizar: Ese producto no se encuentra en el listado."
        );
      } else if ("id" in obj) {
        return console.log(
          "Imposible Actualizar: No se permite sobrescribir el campo id"
        );
      } else {
        const productToUpdate = productsPrev[productIndex];
        productsPrev[productIndex] = { ...productToUpdate, ...obj };
        await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
      }
    } catch (err) {
      return err;
    }
  }
}

const  productManager = new ProductManager('Products.json');
export default productManager;

/*
Modelo de Objeto!
{
    "title": "producto",
    "description": "descripción producto",
    "code": "codigo producto",
    "price": 100,
    "status": true,
    "stock": 10,
    "category": "categoría producto",
    "thumbnails": ["ruta1","ruta2", "ruta3"]
  }
  */
