import jwt from 'jsonwebtoken'

export const authRequire = (req, res, next) => {
    try {
    const {authorization} = req.headers // debe ser el mismo nombre en postman (header), 
    const decoded = jwt.verify (authorization, process.env.SECRET_KEY)
    const actualTime = (new Date()/1000)

    if (actualTime > decoded.exp) {
        return res.status (401).json ({message: 'Token ha expirado'})
    }

    req.data = decoded.data // Esta línea es fundamental

    }
    catch (error) {
        return res.status (401).json (error)
    }

    next() // Esto hace que siga. Es decir, le da "el paso" para que responda el servidor. Debe ir fuera del try/catch
}