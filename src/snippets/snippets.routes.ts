import express from "express";
import { SnippetsController } from "./snippets.controller";
import expressAsyncHandler from 'express-async-handler'
import { param } from "express-validator";

const router = express.Router();

router.get('/:langId?', param("langId").optional().isNumeric(),expressAsyncHandler(SnippetsController.list))

export default router;