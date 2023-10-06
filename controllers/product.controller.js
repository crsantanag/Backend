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
    console.log ('Leyendo todos los productos')
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí Users viene de Product.models.js
        const allProducts = await Product.find ();
        res.status (200).json (allProducts)
    }
    catch (error)
    {
        res.status(404).json ({message: 'No pudimos encontrar productos'})
    }
}

export const getProduct = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí Product viene de Product.models.js
        // Revisar la clase del 23-09 por la destructuración de "elCodigo"
        const elCodigo = req.params.codigo
        console.log ("CODIGO get: *", elCodigo,"*")

        // En clases usamos const {id} = req.params
        //                  ... = await Product.findById (id)
        const theProduct= await Product.find ({codigo: elCodigo });
        res.status (200).json (theProduct)
    }
    catch (error)
    {
        res.status(400).json ({message: 'No pudimos encontrar el producto'})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const elCodigo = req.params.codigo
        console.log ("CODIGO update: *", elCodigo,"*")
        const updateData = req.body // Esta variable es un objeto ... probar PATCH

        const updateProduct = await Product.findOneAndUpdate({ codigo: elCodigo }, updateData, { new: true} )
        if (!updateProduct) {
            return res.status (404).json ({message: 'Producto no encontrado'})
        }
        res.status (202).json ({message: `Producto ${updateProduct.nombre} ${updateProduct.grupo} ha sido actualizado con éxito`})
    }
    catch (error)
    {
        res.status(500).json ({message: 'Producto no actualizado'})
    }

}