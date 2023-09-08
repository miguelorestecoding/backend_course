import { Router } from "express";
import {productsManager} from "../dao/productsManager.js";

const router = Router();

router.get('/', (req, res) => {
    res.send('HANDLEBARS')
})

router.get('/addProduct', (req, res) => {
res.render('addProduct')
});

router.get('/allProducts', async (req, res) => {
    const products = await fetch('http://localhost:8080/api/products/paginate')
    const productsJson = await products.json()
    console.log('productsJson:', productsJson)
    const getProducts = productsJson.payload
    res.render('allProducts', {getProducts})
});

router.get('/home', async (req, res) => {
    const products = await productsManager.findAll()
    // console.log(products)
    res.render('home', {products})
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await productsManager.findAll()
    // console.log(products)
    res.render('realTimeProducts', {products})
});

export default router