import { Request, Response } from "express";
import prisma from "../services/prisma";
import { Role } from "@prisma/client";
import bcrypt from 'bcrypt';
import { saltRounds } from "../auth/auth.bcrypt";

const salt = bcrypt.genSaltSync(saltRounds);
export class adminController {
    
    static async index(req : Request, res : Response) {
        res.render('admin/admin');
    }
    static async users(req : Request, res : Response) {
        const users = await prisma.user.findMany();
        res.render('admin/admin_users', { users });
    }
    static async newForm(req : Request, res : Response) {
        const roles = Object.values(Role);
        res.render('admin/admin_form', { roles });
    }
    static async newUser(req: Request, res: Response) {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                role: req.body.role,
                hashedPassword: bcrypt.hashSync(req.body.password, salt),
            }
        })
        res.redirect('/admin/users')
    } 
    static async editForm(req: Request, res: Response) {
        const editUser = await prisma.user.findUnique({
            where: {
                id: +req.params.id
            }
        })
        const roles = Object.values(Role);
        res.render('admin/admin_form', { editUser, roles });
    }
    static async editUser(req: Request, res: Response) {
        
        const user = await prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                name: req.body.name,
                role: req.body.role,
                hashedPassword: req.body.password ? bcrypt.hashSync(req.body.password, salt) : undefined,
            }
        })
        res.redirect('/admin/users')
    }
    static async deleteUser(req: Request, res: Response) {
        await prisma.user.update({
            where: {
                id: +req.params.id
            },
            data: {
                snippets: {
                    deleteMany: {}
                }
            }
        })
        await prisma.user.delete({
            where: {
                id: +req.params.id
            }
        })
        res.redirect('/admin/users')
    }

    static async languages(req: Request, res: Response) {
        const languages = await prisma.language.findMany();
        res.render('admin/admin_language', { languages });
    }

    static async newLanguageForm(req: Request, res: Response) {
        res.render('admin/admin_language_form');
    }
    static async newLanguage(req: Request, res: Response) {
        await prisma.language.create({
            data: {
                name: req.body.name,
                htmlClass: req.body.htmlClass,
                logo: req.body.logo ?? undefined,
            }
        })
        res.redirect('/admin')
    }

    static async editLanguageForm(req: Request, res: Response) {
        const language = await prisma.language.findUnique({
            where: {
                id: +req.params.id
            }
        })
        res.render('admin/admin_language_form', { language });
    }

    static async editLanguage(req: Request, res: Response) {
        await prisma.language.update({
            where: {
                id: +req.params.id
            },
            data: {
                name: req.body.name,
                htmlClass: req.body.htmlClass,
                logo: req.body.logo ?? undefined,
            }
        })
        res.redirect('/admin/languages')
    }

    static async deleteLanguage(req: Request, res: Response) {
        await prisma.language.update({
            where: {
                id: +req.params.id
            },
            data: {
                snippets: {
                    deleteMany: {}
                }
            }
        })
        await prisma.language.delete({
            where: {
                id: +req.params.id
            }
        })
        res.redirect('/admin/languages')
    }
}