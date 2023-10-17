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

    static async newForm(req: Request, res: Response) {
        const languages = await prisma.language.findMany()
        res.render('snippets/snippet_form', {languages})
    } 

    static async newSnippet(req: Request, res: Response) {
        if(!req.session.user){
            res.status(403).send('Forbidden')
            return;
        }

        const snippet = await prisma.snippet.create({
            data: {
                title: req.body.title,
                languageId: +req.body.language,
                code: req.body.code,
                description: req.body.description,
                creationDate: new Date(),
                authorId: req.session.user?.id
            }
        })

        res.redirect('/')
    } 
    static async editForm(req: Request, res: Response) {
        const languages = await prisma.language.findMany()
        const snippet = await prisma.snippet.findUnique({
            where: {
                id: +req.params.id
            }
        })
        res.render('snippets/snippet_form', { languages, snippet })
    }
    static async editSnippet(req: Request, res: Response) {
        await prisma.snippet.update({
            where: {
                id: +req.params.id
            },
            data: {
                title: req.body.title,
                languageId: +req.body.language,
                code: req.body.code,
                description: req.body.description,
            }
        })
        res.redirect('/')
    }
}