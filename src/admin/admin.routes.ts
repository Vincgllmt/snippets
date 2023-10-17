import express from "express";
import { adminController } from "./admin.controller";
import expressAsyncHandler from "express-async-handler";
import { isAdmin } from "./admin.middleware";
import { body } from "express-validator";

const router = express.Router();

router.get('/', expressAsyncHandler(adminController.index))
router.get('/users', isAdmin, expressAsyncHandler(adminController.users))
router.get('/users/new', isAdmin, expressAsyncHandler(adminController.newForm))
router.post('/users/new', isAdmin, expressAsyncHandler(adminController.newUser))
router.get('/users/edit/:id', isAdmin, expressAsyncHandler(adminController.editForm))
router.post('/users/edit/:id', 
        isAdmin,
        body('password')
        .optional()
        .isLength({min: 5, max: 50}),
        expressAsyncHandler(adminController.editUser))
router.get('/users/delete/:id', isAdmin, expressAsyncHandler(adminController.deleteUser))
export default router;