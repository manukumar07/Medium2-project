import { createToken } from "./createToken.js";
import User from "../models/User.js"

const updateName = async(req ,res) =>
{

       const {name , _id} = req.body;
       const error = [];
    //    console.log(req.body)
       if(name === "")
       {
         error.push({error:"Please Enter your name"})
         res.status(400).json({error})
       }
       else
       {
         try {
            const user = await User.findOneAndUpdate({_id},{name},{new:true})
            const token = createToken(user);
            res.status(200).json({token,msg:"Your Name has been Change"});
            
         } catch (error) {
            error.push({error})
            res.status(500).json({error})
         }
       }
}

export default updateName