import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    code: {type: Number, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean},
    stock: {type: Number, required: true},
    category: {type: String},
    thumbnails: {type: Array, required: true},
})

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