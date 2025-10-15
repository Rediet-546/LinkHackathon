import express from "express";
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from "./src/lib/db.js";
import userRoute from "./src/route/userRoute.js";
import postRoute from "./src/route/postRoute.js";
import projectRoute from "./src/route/projectRoute.js";

const app = express();
dotenv.config();

const port = process.env.PORT
const server = http.createServer(app);

app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());


app.use('/api/user' , userRoute)
app.use('/api/post' , postRoute)
app.use('/api/project' , projectRoute)


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);  
  connectDB();
});
