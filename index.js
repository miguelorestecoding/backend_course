class ProductManager {
    constructor() {
        this.products = []
    }
    
    addProduct(name, description, price, thumbnail, code, stock) {
        // id autonumerable
        const id =
        this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        
        //que todos los campos sean oblitarorios
        if(!name || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios')
        } else if(this.products.find(product => product.code === code)) {
            console.log(`El código ya existe`)
        } else {
            const newProduct = {id, name, description, price, thumbnail, code, stock}
            this.products.push(newProduct)
        }
    }

    getProducts() {
        return  this.products
    }

    getProductsById(id) {
        const  productById =
        this.products.filter(product => product.id === id)
        if (productById.length === 0) {console.log("Not found ")} 
        return  productById;
    }
}

const myProductManager = new ProductManager();
console.log(myProductManager.getProducts())
myProductManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(myProductManager.getProducts())
myProductManager.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(myProductManager.getProductsById(1))
console.log(myProductManager.getProductsById(10))