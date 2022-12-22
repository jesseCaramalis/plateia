import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

// CONFIGS

const __filename = fileURLToPath(import.meta.url); //lets you grab file url with modules
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //sets directory of where we keep assets, in this case locally

// FILE STORAGE

//tells app where to save files, giving them a filename
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// ROUTES WITH FILES -stays here instead of /routes to use multer upload
app.post("/auth/register", upload.single("picture"), register);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


// MONGOOSE
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    }).catch((error) => console.log(`${error}: did not connect.`))