import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = new mongoose.Schema({
  products: [

    // {type: mongoose.Schema.Types.ObjectId, ref: 'Products'}

    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: { type: Number },
    },
  ],
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model("Carts", cartsSchema);


/*
{ 
  "products": ["64f1587c949627730a4ac9c2", "64f1587c949627730a4ac9c4", "64f1587c949627730a4ac9c7"]
}
*/

// { 
//   "products": [ {"idProduct": "64f1587c949627730a4ac9c2", "quantity": 3}, {"idProduct": "64f1587c949627730a4ac9c4", "quantity": 5}, {"idProduct": "64f1587c949627730a4ac9c7", "quantity": 1}]
// }

/*
{ 
  "products": [ {"id": "_id", "quantity": 1}, {"id": "_id", "quantity": }, {"id": "_id", "quantity": 1}]
}
*/