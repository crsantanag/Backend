import express from 'express'
const router = express.Router ()

import { createProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js'

//Le paso la ruta y el controlador

router.post   ('/products', createProduct)
router.get    ('/products', getAllProducts)
router.get    ('/products/:codigo', getProduct)
router.put    ('/products/:codigo', updateProduct)
// router.delete ('/products/:codigo', deleteProduct)

export default router