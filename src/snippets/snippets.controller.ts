import { NextFunction, Request, Response } from "express";
import prisma from "../services/prisma";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction) {
        res.json(await prisma.snippet.findMany())
    }
}