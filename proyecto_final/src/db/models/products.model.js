import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String},
    code: {type: Number, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean},
    stock: {type: Number, required: true},
    category: {type: String},
    thumbnails: {type: String, required: true},
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema)

/*
Modelo de Objeto!
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