import { createToken } from "./createToken.js";
import User from "../models/User.js"
import { body, validationResult } from 'express-validator';
import bcrypt from "bcrypt";

export const updatePasswordValidation = [
    body("current").not().isEmpty().withMessage("Please enter Current Password"),
    body("newPassword").not().isEmpty().withMessage("Please enter  New Password"),
]
export const updatePassword = async (req, res) => {

    const { current, newPassword, _id } = req.body;
    const errors = validationResult(req);
    const error = [];
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    else {
        try {
            const user = await User.findOne({ _id })
            if (user) {
                const matched = await bcrypt.compare(current, user.password);
                if (matched) {
                    const saltRounds = 10;      // GIVE ROUNDS OF SALT 
                    bcrypt.genSalt(saltRounds, function (err, salt) {       // GENERATE SALT 
                        bcrypt.hash(newPassword, salt, function (err, hash) {
                            const newUser = User.findOneAndUpdate({ _id }, { password: hash, cpassword: hash }, { new: true })
                            if (newUser) {
                                res.status(200).json({ msg: "Password Change SUccesfully " })
                            }
                        })
                    })
                }
                else {
                    return res.status(400).json({ errors: [{ msg: "Password does't Match." }] })
                }
            }
            // const token = createToken(user);
            // res.status(200).json({token,msg:"Your Name has been Change"});

        } catch (error) {
            error.push({ error })
            res.status(500).json({ error })
        }
    }
}

// export updatePassword