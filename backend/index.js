import express from "express"
import dotenv from "dotenv"
dotenv.config();
// now our .env file is configured
// we can now access environ variblaes from .env
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";




const app = express()
app.use(cors({
    // telling the server where the request will come from i.e. the front-end URL
    origin: "http://localhost:5173",
    credentials: true
}))

// done to access the environment variable
const port = process.env.PORT || 5000

// all incoming data is converted to json
app.use(express.json());
app.use(cookieParser());

// CORS package is required to connect front-end and back-end

// authRouter middleware adds /api/auth infront of all routes defined in auth.routes.js
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
// to test our gemini API
// app.use("/", async (req, res) => {
//     let prompt = req.query.prompt
//     let data = await geminiResponse(prompt)
//     res.json(data)
// })

app.listen(port, () => {
    connectDb();
    console.log("server started");
})