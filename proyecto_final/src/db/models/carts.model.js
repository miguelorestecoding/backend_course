import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
})

cartsSchema.plugin(mongoosePaginate)

export const cartsModel = mongoose.model('Carts', cartsSchema)

/*
{ 
  "products": ["_id", "_id", "_id"]
}
*/