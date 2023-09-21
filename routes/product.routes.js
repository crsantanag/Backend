import express from 'express'
const router = express.Router ()

import { createProduct } from '../controllers/product.controller.js'

//Le paso la ruta y el controlador

router.post   ('/products', createProduct)
// router.get    ('/products/:codigo', getProduct)
// router.get    ('/products', getAllProducts)
// router.put    ('/products/:codigo', updateProduct)
// router.delete ('/products/:codigo', deleteProduct)

export default router