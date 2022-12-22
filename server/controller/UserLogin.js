import { body, validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import User from "../models/User.js"
import { createToken } from './createToken.js';


//              MIDDLE FOR VALIDATION
export const loginValidation = [
    body("email").not().isEmpty().withMessage("Please enter Email"),
    body("password").not().isEmpty().withMessage("Please enter Password"),
]

export const login = async (req, res) => {
    const { email, password } = req.body;

    //          CHECK HERE IS , IT CRENDTIOL IS PROPER VALIDATE OR NOT ?
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array() });

    try {
        const user = await User.findOne({ email });
        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                const token = createToken(user);
                return res.status(200).json({ msg: "User login succesfully", token});
            }
            else
                return res.status(401).json({ errors :[ "Password Does't match"] });
        }
        else
            return res.status(404).json({errors: [ "Email not found" ]});

    }
    catch (error) {
        return res.status(400).json({ errors: [error] });
    }
}