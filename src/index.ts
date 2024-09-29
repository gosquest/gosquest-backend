import express from "express"
import cors from "cors"
import morgan from 'morgan';
import dotenv from "dotenv"
import router from "./routers"
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from 'cookie-session'

dotenv.config()
import "./config/passport"

const PORT = process.env.PORT || 4000

const app = express()

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieSession({
	name: 'google-auth-session',
	keys: [process.env.COOKIE_KEY as string]
}))

// Passport for google auth
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/", router)

app.listen(PORT, () => {
  console.log(`🏃‍♂️ server running on port ${PORT}`)
})