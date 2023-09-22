import express from "express";
import { SnippetsController } from "./snippets.controller";

const router = express.Router();

router.get('/', SnippetsController.list)

export default router;