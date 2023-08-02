import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.send('HANDLEBARS')
})

router.get('/products', (req, res) => {
res.render('products')
});

export default router