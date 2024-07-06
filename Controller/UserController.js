import prisma from "../DB/db.config.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const getUser=async(req,res)=>{
    try{
        const user = await prisma.user.findMany();

        return res.status(201).json({
            message:"All users",
            users:user
        })

    }catch(error){
        return res.status(500).json({message:error.message,error:error})
    }

}
export const GetUserByName=async(req,res)=>{
    const {name} =req.params;
    try{
        const user = await prisma.user.findMany({
            where:{
                name
            }
        })
    }
    catch(error){
        return res.status(500).json({message:error.message,error:error})
    }}
export const createUser=async(req,res)=>{
    const {name,email,password} =req.body;

    const findUser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    
    if(findUser){
        return res.status(400).json({error:"Email already exists"})
    }
    try{
       const hashedPassword = await bcrypt.hash(password,10)
       const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
       })

       return res.status(201).json({message:"User created successfully",user:newUser})
    }catch(error){
       return res.status(400).json({message:error.message,error:error})
    }
}

export const UpdateUser=async(req,res)=>{
    let {id} =req.params;
    id=Number(id)
    const {name,email,password} =req.body;
    
    const findUser = await prisma.user.findUnique({
        where:{
            id
        }
    })
    
    if(!findUser){
        return res.status(404).json({error:"User not found"})
    }

    try{
        const updateuser = await prisma.user.update({
          where:{
            id
          },
          data:{
            name,
            email,
            password
          }
        })

        return res.status(200).json({
            message:"User Update Successfully",
            user:updateuser
        })
    }
    catch(error){
        return res.status(400).json({message:error.message,error:error})
    }
}

export const deleteUser=async(req,res)=>{
    const {id} =req.params;
    
    const findUser = await prisma.user.findUnique({
        where:{
            id
        }
    })
    
    if(!findUser){
        return res.status(404).json({error:"User not found"})
    }
    try{
        const deleteUser = await prisma.user.delete({
            where:{
                id
            }
        })
        return res.status(200).json({
            message:"User deleted Successfully",
            deleteUser
        })
    }catch(error){
        return res.status(400).json({
            message:error.message ,
            error
        })
    }
}

export const loginUser=async(req,res)=>{
    const {email,password} =req.body;

    try{
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid password"})
        }

        const token =generateToken(user.id);
        
        return res.status(200).json({
            message:"Login Successful",
            user,
            token
        })


    }catch(error){
        return res.status(400).json({message:error.message,error:error})
    }
}