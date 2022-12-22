
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Post from "../models/Post.js"


const UserCreatePost =  (req,res) => {
    const form = formidable({ multiples: true })
    form.parse(req,async (error,fields,files) =>
    {
        const errors = [];
        const {title , body , description  , slug ,_id , name  ,image} = fields;
            // Validation
        console.log("hey")

        if(title === "")
        {
            errors.push({msg:"Tittle is required"});
        }
        if(body === "")
        {
            errors.push({msg:"Body is required"});
        }
        if(description === "")
        {
            errors.push({msg:"Description is required"});
        }
        if(slug === "")
        {
            errors.push({msg:"Slug is required"});
        }
        if(Object.keys(files).length == 0)
        {
            errors.push({msg:"Image is required"});
        }
        else{
            console.log("2")
            const {mimetype} = files.image
            const split = mimetype.split("/")
            const ext = split[1].toLowerCase();
            if(ext !== "jpg" && ext !=="jpeg" && ext!=="png")
                errors.push({msg:ext+" is not valid Extension"})
            else
                files.image.newFilename= uuidv4() + "." + ext;
         }

         const slugCheck = await Post.findOne({slug});
         if(slugCheck)
         {
            errors.push({msg:"Please choose a unique Slug/URL"})
         }



        if(errors.length != 0)
        {
            return res.status(400).json({errors,files})  
        }
        else
        {
            console.log("6")
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);
                const newPath= __dirname + "/../../client/build/images/" + files.image.newFilename;
                fs.copyFile(files.image.filepath,newPath, async (err)=>
                {
                    console.log("7")
                    if(!err)
                   {
                    try {
                        const response = await Post.create({title,
                            body,
                            image:files.image.newFilename,
                            description,
                            slug,
                            userName:name,
                            userId:_id
                        });
                        if(response)
                            return res.status(200).json({msg:"Your post has been created Succesfully"});
                    } catch (error) {
                        return res.status(500).json({error})
                    }
                   }
                   else
                   {
                    return res.status(500).json({error:err})
                   }
                })
        }
    })
}

export default UserCreatePost