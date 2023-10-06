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
    const products = await productsManager.findAll()
    // console.log(products)
    res.render('allProducts', {products})
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