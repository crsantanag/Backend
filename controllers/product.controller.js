import { Product } from '../models/Product.model.js'


export const createProduct = async (req, res) => { // Antes era createUser
    try{
    const newProduct = req.body
    const product = new Product (newProduct)
    // product.save () envía los datos a Mongodb, y en la versión actual (7.0) no debe tener argumentos
    const saveProduct = await product.save();
    res.status(201).json({message: `El producto ${saveProduct.nombre} - ${saveProduct.grupo} ha sido creado`})
    }
    catch (error)
    {
        res.status(500).json ({message: 'No se pudo crear el producto'})
    }
}
