import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
})

export const cartsModel = mongoose.model('Carts', cartsSchema)

/*
{ 
  "products": ["_id", "_id", "_id"]
}
*/