import express from "express";
import { AuthController } from "./auth.controller";
import expressAsyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/', expressAsyncHandler(AuthController.loginForm))
router.post('/login', expressAsyncHandler(AuthController.login))
router.get('/logout', AuthController.logout)
export default router;