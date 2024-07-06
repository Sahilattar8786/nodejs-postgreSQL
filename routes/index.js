import {Router} from 'express' 
import userRoutes from './userRoutes.js';
import dotenv from 'dotenv'

dotenv.config() ;  //load enviroment variable
const router = Router()

router.use('/api/user',userRoutes);


export default router ;