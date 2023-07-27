import { Router } from 'express';
import __dirname from "../utils.js"
import ProductManager from '../daos/mongodb/ProductManager.class.js';

let productManager = new ProductManager()

const router = Router();

router.get('/', async (req,res)=>{
    let products = await productManager.getProducts();
    res.render('home', {
        title: "Inicio",
        products: products
    });
    })

    router.get('/realtimeproducts', async (req,res)=>{
    res.render('realTimeProducts');
})

export default router;