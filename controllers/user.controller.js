import { User } from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => { // Antes era createUser
    try{

    const { nombre, apellido, rut, email, password} = req.body
    console.log (req.body)
    if (!nombre || !apellido || !rut || !email || !password) {
        return res.status(400).json ({mesagge: 'Debes rellenar todos los datos'})
    }

    const verifyUser = await User.findOne ({rut: rut}) // Trae el primero que coincida. ( find trae todos los que coincidan)
    if (verifyUser) {
        return res.status(500).json ({mesagge: 'El usuario existe'})
    }

    const passwordEncryp = await bcrypt.hash(password, 10)

    // a cada uno se le asigna el mismo dato, excepto password ya que se envia
    const user = new User ({nombre, apellido, rut, email, password: passwordEncryp})

    // user.save () envía los datos a Mongodb, y en la versión actual (7.0) no debe tener argumentos
    const saveUser = await user.save();
    res.status(201).json({mesagge: `El usuario ${saveUser.nombre} ${saveUser.apellido} ha sido creado`})
    }
    catch (error)
    {
        res.status(500).json ({mesagge: 'No pudimos crear el usuario'})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body 
        console.log ("login - RUT login: *", email,"*",password)

        const verifyUserByEmail = await User.findOne ({email: email})
        if  (!verifyUserByEmail) {
            return res.status(404).json ({mesagge: 'El email no existe en la BD'})
        }
        console.log ("Pasó 1")

        const verifyPassword = await bcrypt.compare (password, verifyUserByEmail.password)
        if  (!verifyPassword) {
            return res.status(403).json ({mesagge: 'Contraseña incorrecta'})
        }
        console.log ("Pasó 2")

        const expireTime = Math.floor (new Date()/1000) + 3600
        const {_id, nombre, apellido } = verifyUserByEmail
        const token = jwt.sign({
            exp: expireTime,
            data: {
                id: _id,
                email: email,
                nombre: nombre,
                apellido: apellido,
            }
        }, process.env.SECRET_KEY)

        res.json (token)
    }
    catch (error)
    {
        res.status(403).json ({mesagge: 'No pudimos verificar tu cuenta'})
    }
}

export const getAllUsers = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí Users viene de User.models.js
        const allUsers = await User.find ();
        res.status (200).json (allUsers)
    }
    catch (error)
    {
        res.status(404).json ({mesagge: 'No pudimos encontrar usuarios'})
    }
}

{/*}
export const createUser = async (req, res) => { // Antes era createUser
    try{
    const newUser = req.body
    const user = new User (newUser)
    // user.save () envía los datos a Mongodb, y en la versión actual (7.0) no debe tener argumentos
    const saveUser = await user.save();
    res.status(201).json({mesagge: `El usuario ${saveUser.nombre} ${saveUser.apellido} ha sido creado`})
    }
    catch (error)
    {
        res.status(500).json ({mesagge: 'No pudimos crear el usuario'})
    }
}
*/}

export const getUser = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí User viene de User.models.js
        const elRut = req.params.rut
        console.log ("RUT get: *", elRut,"*")

        const theUser = await User.find ({rut: elRut });
        res.status (200).json (theUser)
    }
    catch (error)
    {
        res.status(400).json ({mesagge: 'No pudimos encontrar usuario'})
    }
}


export const updateUser = async (req, res) => {
    try {
        const elRut = req.params.rut
        console.log ("RUT update: *", elRut,"*")
        const updateData = req.body // Esta variable es un objeto ... probar PATCH

        const updateUser = await User.findOneAndUpdate({ rut: elRut }, updateData, { new: true} )
        if (!updateUser) {
            return res.status (404).json ({mesagge: 'Usuario no encontrado'})
        }
        res.status (202).json ({mesagge: `Usuario ${updateUser.nombre} ${updateUser.apellido} ha sido actualizado con éxito`})
    }
    catch (error)
    {
        res.status(500).json ({mesagge: 'Usuario no actualizado'})
    }

}

export const deleteUser = async (req, res) => {
    try
    {
        // Este find es un método de mongoose (no es de Javascript)
        // Aquí User viene de User.models.js
        const elRut = req.params.rut
        console.log ("RUT delete: *", elRut,"*")

        const theUser = await User.findOneAndRemove ({rut: elRut });
        if (!theUser) {
            return res.status (404).json ({mesagge: 'Usuario no encontrado'})
        }
        res.status (202).json ({mesagge: `El usuario ${elRut} ha sido eliminado`, theUser})
    }
    catch (error)
    {
        res.status(400).json ({mesagge: 'Usuario no encontrado'})
    }
}