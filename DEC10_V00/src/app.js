import express from 'express';
import  { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('HANDLEBARS')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});
