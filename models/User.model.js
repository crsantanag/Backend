import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        rut: {type: String, required: true, unique: true},
        email: {type: String, required: true,  unique: true},
        password: {type: String, required: true},
        direccion: {type: String, required: true},
        comuna: {type: String, required: true},
        ciudad: {type: String, required: true},
        region: {type: String, required: true},
        telefono: {type: Number, required: true},
    },
    {
        versionKey: false
    })

// Aquí 'users' es el nombre de la colección a la que me quiero conectar
export const User = mongoose.model ('users', userSchema)