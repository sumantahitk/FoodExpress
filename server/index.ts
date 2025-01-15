import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant_route";
dotenv.config();



const app= express();
const PORT =process.env.PORT|| 3000;


//default middleware for mern project
app.use(bodyParser.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}))
app.use(express.json());
app.use(cookieParser());

const corsOption={
    origin:"http://localhost:5173/",
    credentials:true
}
app.use(cors(corsOption));

app.use("api/v1/user",userRoute);
app.use("api/v1/restaurant",restaurantRoute);






app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})