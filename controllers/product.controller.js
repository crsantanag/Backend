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

export const getAllProducts = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí Users viene de User.models.js
        const allProducts = await Product.find ();
        res.status (200).json (allProducts)
    }
    catch (error)
    {
        res.status(404).json ({message: 'No pudimos encontrar usuarios'})
    }
}

export const getProduct = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí Product viene de Product.models.js
        const elCodigo = req.params.codigo
        console.log ("CODIGO get: *", elCodigo,"*")

        const theProduct= await Product.find ({codigo: elCodigo });
        res.status (200).json (theProduct)
    }
    catch (error)
    {
        res.status(400).json ({message: 'No pudimos encontrar el producto'})
    }
}
