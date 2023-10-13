import { NextFunction, Request, Response } from "express";
import prisma from "../services/prisma";
import { validationResult } from "express-validator";

export class SnippetsController {
    static async list(req: Request, res: Response) {
        if(validationResult(req).isEmpty()){
            const snippets = await prisma.snippet.findMany({
                include: {
                    language: true,
                    author: true,
                },
                where: {
                    languageId: req.params.langId ? +req.params.langId : undefined
                },
            });
            res.render('snippets/snippets_list', { snippets })
        }else{
            throw new Error('Invalid param');
        }
    }
}