import { body, validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import { createToken } from './createToken.js';
import User from "../models/User.js"

//              MIDDLE FOR VALIDATION
export const registerValidation = [
    body("name").not().isEmpty().withMessage("Invalid Name"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 8 }).withMessage("Password must contain atleast 8 alphabets"),
    body("cpassword").isLength({ min: 8 }).withMessage("Confirm Password must contain atleast 8 alphabets")
]


//              POST REGISTRATION ROUTE CONTROLLER
export const registeration = async (req, res) => {
    const { name, email, password ,cpassword } = req.body;

    //          CHECK HERE IS , IT CRENDTIOL IS PROPER VALIDATE OR NOT ?
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {

        //      FIND USER IS IT EXIST
        const checkUser = await User.findOne({ email: email })
        if (checkUser)
            return res.status(400).json({ errors: [{ msg: "Email already exist" }] })
        try {
            let user;
            const saltRounds = 10;      // GIVE ROUNDS OF SALT 
            bcrypt.genSalt(saltRounds, function (err, salt) {       // GENERATE SALT 
                bcrypt.hash(password, salt, function (err, hash) { 
                    bcrypt.hash(cpassword, salt, function (err, hashed) {
                     User.create({ name, email, password: hash , cpassword:hashed }).    // CREATE USER AND STORE INTO DATABASE
                        then((user) => {
                              const token = createToken(user)// CREATE TOKEN USING USER DATA AND SECRET KEY.
                              res.status(200).json({ msg: "created succesfull", token  })
                        })
                    })
                })
            });


        } catch (error) {
            res.status(500).json({ errors: error });

        }

    } catch (error) {
        res.status(500).json({ errors: error });
    }

}