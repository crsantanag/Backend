import mongoose from "mongoose"

export const db = async () => {
    // console.log (process.env.DB_NAME)
    try  {
        await mongoose.connect (process.env.DB_NAME, {useNewURLParser: true, useUnifiedTopology: true,});

        console.log ("BD Conectada")
    }
    catch (error) {
        console.error ("Error: ", error)
    }
}