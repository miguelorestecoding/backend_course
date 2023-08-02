import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router();

router.get('/', (req, res) => {
    res.send('HANDLEBARS')
})

router.get('/addProduct', (req, res) => {
res.render('addProduct')
});

router.get('/allProducts', async (req, res) => {
    const products = await productManager.getProducts()
    console.log(products)
    res.render('allProducts', {products})
});

export default router