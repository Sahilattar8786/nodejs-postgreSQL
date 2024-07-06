import { Router } from "express";
import { createUser, deleteUser, getUser, GetUserByName, loginUser, UpdateUser } from "../Controller/UserController.js";

const router = Router();

router.post('/',createUser)
router.get('/',getUser)
router.put('/:id',UpdateUser);
router.delete('/;id',deleteUser);
router.get('/:name',GetUserByName)
router.post('/login',loginUser)


export default router ;