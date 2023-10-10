import { Request, Response } from "express";
import prisma from "../services/prisma";

export class LanguagesController {
    static async list(req: Request, res: Response) {
        console.log(await prisma.language.findMany())
    }
}