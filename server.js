import app from "./app.js";
import "dotenv/config";
import {connectDB} from "./config/db.js"
await connectDB(process.env.MONGO_URI);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})