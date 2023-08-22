import { productsModel } from '../../db/models/products.model.js'

class ProductsMongo {
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
            return response
        } catch (error) {
            return error
        }
    }
}

export const productsMongo = new ProductsMongo()