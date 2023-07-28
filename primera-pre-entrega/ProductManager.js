// Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// Status es true por defecto.
// Todos los campos son obligatorios, a excepción de thumbnails
// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

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

// const testProduct = {
//   title: "producto",
//   description: "descripción producto",
//   code: "codigo producto",
//   price: 100,
//   status: true,
//   stock: 10,
//   category: "categoría producto",
//   thumbnails: ["ruta1", "ruta2", "ruta3"],
// };

// const productIdUpdated = {
//   title: "producto",
//   description: "descripción producto",
//   code: "codigo producto",
//   price: 100,
//   status: true,
//   stock: 10,
//   category: "categoría producto",
//   thumbnails: ["ruta1", "ruta2", "ruta3"],
// }

// const productUpdated = {
//   title: "productoUpdated",
//   description: "descripción updated producto",
// }

// async function testing() {
//   //Se creará una instancia de la clase “ProductManager”
//   const myProductManager = new ProductManager("Products.json");

//   // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
//   let products = await myProductManager.getProducts()
//   console.log(products);

// // Se llamará al método “addProduct” con los campos:
// // title: “producto prueba”
// // description:”Este es un producto prueba”
// // price:200,
// // thumbnail:”Sin imagen”
// // code:”abc123”,
// // stock:25
// // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//   await myProductManager.addProduct(testProduct);
//   await myProductManager.addProduct(testProduct);

//   // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
//   products = await myProductManager.getProducts()
//   console.log(products);

//   // Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
//   console.log(await myProductManager.getProductsById(1));
//   console.log(await myProductManager.getProductsById(3));

//   // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
//   console.log(await myProductManager.updateProductById(1, productIdUpdated))
//   await myProductManager.updateProductById(1, productUpdated)
//   console.log(await myProductManager.getProductsById(1));

//   // Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
//   await myProductManager.deleteProduct(2)
//   console.log(await myProductManager.getProducts());
//   console.log(await myProductManager.deleteProduct(3));  
// }

// testing();

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
