import express from "express";
import * as dotenv from 'dotenv'
// import mongoose from "mongoose"
import { connect } from "./config/db.js"
import UserRouter from "./routes/useRouter.js"
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use("/", UserRouter);

connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get("*",(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

// app.get("/", (req, res) => {
//     res.send("Hello");
// })




app.listen(process.env.PORT, () => console.log("Server is running :" + process.env.PORT))