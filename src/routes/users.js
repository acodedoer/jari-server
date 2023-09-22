import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";
import bcrypt from 'bcrypt'; 
import { loginUser, registerUser } from '../controllers/users.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router