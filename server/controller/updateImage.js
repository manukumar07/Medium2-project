
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Post from "../models/Post.js"

const updateImage = async (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) => {
        const {id} = fields;
        const errors = [];
        if (error)
            errors.push({ error })
        if (Object.keys(files).length === 0)
            errors.push({ error: "Please Choose image. " })
        else {
            const type = files.image.mimetype.split('/')[1].toLowerCase();
            if (type !== 'jpg' && type !== "jpeg" && type !== 'png') {
                errors.push({ error: type + " does't Valid Extension ." })
            }
            else {
                files.image.newFilename = uuidv4() + "." + type;
            }
        }

        if (errors.length !== 0) {
            return res.status(400).json({ error: errors })
        }
        else {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const newPath = __dirname + "/../../client/build/images/" + files.image.newFilename;
            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if (err) {
                    res.status(500).json({ error:err })
                }
                else
                {
                    try {
                        const data = await Post.findById({_id:id}, { image: files.image.newFilename })
                        return res.status(200).json({ msg: "Your image Updated" })
                    } catch (error) {
                        res.status(500).json({ error })
                    }
                }

            }
            )
        }

    })
}

export default updateImage;