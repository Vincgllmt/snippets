import express from "express";
import { adminController } from "./admin.controller";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.get('/', expressAsyncHandler(adminController.index))

export default router;