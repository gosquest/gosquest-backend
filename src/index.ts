import express from "express"
import cors from "cors"
import morgan from 'morgan';
import dotenv from "dotenv"
import router from "./routers"
import cookieParser from "cookie-parser";

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routers
app.use("/", router)

app.listen(PORT, () => {
  console.log(`🏃‍♂️ server running on port ${PORT}`)
})