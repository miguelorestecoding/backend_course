import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.send('HANDLEBARS')
})

router.get('/addProduct', (req, res) => {
res.render('addProduct')
});

export default router