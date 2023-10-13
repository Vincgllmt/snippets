import { Request, Response } from "express";
import prisma from "../services/prisma";
import bcrypt from "bcrypt"
export class AuthController{
    static loginForm(req : Request, res : Response) {
        res.render('auth/auth')
    }
    static async login(req : Request, res : Response) {
        const user = await prisma.user.findUniqueOrThrow({where: {name: req.body.name}})
        if(!await bcrypt.compare(req.body.password,user.hashedPassword)) {
            throw new Error("Mauvais mot de passe")
        }
        req.session.regenerate(err => {
            if(!err) {
                req.session.user = user
            }
        })
        res.redirect('/')
    } 
}