import express from "express";
import { SnippetsController } from "./snippets.controller";
import expressAsyncHandler from 'express-async-handler'
import { body, param } from "express-validator";
import { languageValidator } from "../languages/languages.middlewares";
import { isAuthorConnected, isConnected } from "../auth/auth.middleware";
import { snippetValidator } from "./snippets.middlewares";

const router = express.Router();

router.get('/new',
    isConnected,
    expressAsyncHandler(SnippetsController.newForm))

router.post('/new', 
    body('title')
        .isLength({min: 5, max: 50}),
    body('language')
        .isNumeric()
        .custom(languageValidator),
    body('code')
        .isLength({min: 1, max: 1000}),
    body('description')
        .isLength({min: 0, max: 1000}), 
    isConnected,
    expressAsyncHandler(SnippetsController.newSnippet))

router.get('/edit/:id', isConnected, isAuthorConnected, expressAsyncHandler(SnippetsController.editForm))
router.post('/edit/:id',
    isConnected,
    isAuthorConnected,
    body('title')
        .isLength({min: 5, max: 50}),
    body('language')
        .isNumeric()
        .custom(languageValidator),
    body('code')
        .isLength({min: 1, max: 1000}),
    body('description')
        .isLength({min: 0, max: 1000}), 
    body('id')
        .isNumeric()
        .custom(snippetValidator),
    expressAsyncHandler(SnippetsController.editSnippet))

router.get('/:langId?', param("langId").optional().isNumeric().custom(languageValidator),expressAsyncHandler(SnippetsController.list))
export default router;
