import { Router } from "express";
import { createUser, deleteUser, getUser, GetUserByName, loginUser, UpdateUser } from "../Controller/UserController.js";
import dotenv from 'dotenv'
import { protect } from "../Middleware/authMiddleware.js";
const router = Router();
dotenv.config()
router.post('/',createUser)
router.get('/',protect,getUser)
router.put('/:id',UpdateUser);
router.delete('/:id',deleteUser);
router.get('/:name',GetUserByName)
router.post('/login',loginUser)


export default router ;