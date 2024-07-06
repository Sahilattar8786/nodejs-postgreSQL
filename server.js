import express from "express";
import dotenv from "dotenv";
import routes from './routes/index.js'
const app=express();

dotenv.config() ;  //load enviroment variable
const PORT =process.env.PORT

app.use(express.json())
app.get("/",(req,res)=>{
    return res.send('hello Everyone')  //send a response to client
})
// Route file 
app.use(routes);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})