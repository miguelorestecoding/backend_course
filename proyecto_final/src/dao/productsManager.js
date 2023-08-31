import { productsModel } from '../db/models/products.model.js'

class ProductsManager {
    async findAll() {
        try {
            const users = await productsModel.find();
            return users
        } catch (error) {
            return error
        }
    }

    async createOne(obj) {
        try {
            const newUser = await productsModel.create(obj)
            return newUser
        } catch (error) {
            return error
        }
    }

    async findById(id) {
        try {
            const user = await productsModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj) {
        try {
            const user = await productsModel.updateOne({_id: id},{...obj})
            return user
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await productsModel.findByIdAndDelete(id)
            // const response = await productsModel.deleteOne({_id: id})
            // el metodo findByIdAndDelete ya busca por _id por eso no es necesario indicar {_id: id} 
            return response
        } catch (error) {
            return error
        }
    }

    async paginateFun(obj) {
        const {limit, page, query, sort} = obj
        try {
            console.log(limit, page)
            const result = await productsModel.paginate({query},{})
        } catch (error) {
            return error
        }
    }

}

export const productsManager = new ProductsManager()

/*
Modelo de Objeto Producto!
{
    "title": "producto",
    "description": "descripción producto",
    "code": 12345,
    "price": 100,
    "status": true,
    "stock": 10,
    "category": "categoría producto",
    "thumbnails": ["ruta1","ruta2", "ruta3"]
  }
  */