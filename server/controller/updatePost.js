import { body, validationResult } from 'express-validator';
import Post from "../models/Post.js"
import {htmlToText} from 'html-to-text';



export const updaetValidation = [
    body("title").not().isEmpty().trim().withMessage("Title is required"),
    body("body").not().isEmpty().trim().custom(value => {
        let bodyValue = value.replace(/\n/g, "")
        if(htmlToText(bodyValue).trim().length === 0)
            return false;
        else
            return true;
    }).withMessage("Body is required"),
    body('description').not().isEmpty().trim().withMessage("Description is required")
]

export const updatePost = async (req, res) => {
    
    const {title , body , description,id} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json({errors})
    }
    else
    {
        try {
            const response = await Post.findByIdAndUpdate(id,{
                title,
                description,
                body
            })
            if(response)
                res.status(200).json({msg:"Suucesfully updated"})
            
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}