import mongoose from "mongoose"

export const  connect = async () =>
{
    try {
        //          TRY TO CONNECT TO DATABASE
        const res = await mongoose.connect(process.env.LINK)
        if (res)
            console.log("Connect to database")
    
    } catch (error) {
        console.log(error)
    }
}
