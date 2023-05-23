import { Router } from "express";
import {LoginUser, newUser   } from '../controllers/user';


const router = Router();

router.post('/', newUser);
router.post('/login', LoginUser)

export default router;