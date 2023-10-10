import express from "express";
import { SnippetsController } from "./snippets.controller";
import expressAsyncHandler from 'express-async-handler'
import { param } from "express-validator";
import { languageValidator } from "../languages/languages.middlewares";

const router = express.Router();

router.get('/:langId?', param("langId").optional().isNumeric().custom(languageValidator),expressAsyncHandler(SnippetsController.list))

export default router;