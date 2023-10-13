import express from "express";
import { SnippetsController } from "./snippets.controller";
import expressAsyncHandler from 'express-async-handler'
import { body, param } from "express-validator";
import { languageValidator } from "../languages/languages.middlewares";

const router = express.Router();

router.get('/new', expressAsyncHandler(SnippetsController.newForm))
router.post('/new', 
    body('title')
        .isLength({min: 5, max: 50}),
    body('lang')
        .isNumeric()
        .custom(languageValidator),
    body('code')
        .isLength({min: 1, max: 1000}),
    body('description')
        .isLength({min: 0, max: 1000})
    , expressAsyncHandler(SnippetsController.newSnippet))

router.get('/:langId?', param("langId").optional().isNumeric().custom(languageValidator),expressAsyncHandler(SnippetsController.list))
export default router;
