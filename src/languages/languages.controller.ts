import { Request, Response } from "express";
import prisma from "../services/prisma";

export class LanguagesController {
    static async list(req: Request, res: Response) {
        const languages = await prisma.language.findMany({ include: { _count: { select: { snippets: true } } } });
        res.render('languages/languages_list', { languages })
    }
}