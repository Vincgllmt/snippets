import express from "express";
import { LanguagesController } from "./languages.controller";
import expressAsyncHandler from 'express-async-handler'

const router = express.Router();

router.get('/', expressAsyncHandler(LanguagesController.list))

export default router;