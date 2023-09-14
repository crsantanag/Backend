import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        codigo: {type: Number, required: true}, unique,
        tipo: {type: String, required: true},
        grupoMarca: {type: String, required: true},
        nombreModelo: {type: String, required: true},
        precio: {type: Number, required: true},
        stock: {type: Number, required: true},
        productosVendidos: {type: Number},
        url: {type: String, required: true},
    },
    {
        versionKey: false
    })

// Aquí 'users' es el nombre de la colección a la que me quiero conectar
export const Product = mongoose.model ('products', userSchema)