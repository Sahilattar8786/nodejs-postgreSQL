import jwt from 'jsonwebtoken'
import prisma from '../DB/db.config.js';
import dotenv from 'dotenv'



export const protect=async(req,res,next)=>{
  let token ;
  console.log(process.env.JWT_SECRET)
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     try{
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                password:true
            }
        })

        next();
     }
     catch(error){
        res.status(401).json({error:"Not authorized",message:error.message})
     }
  } else{
     res.status(401).json({error:"Token Not Provided"})
  }
}