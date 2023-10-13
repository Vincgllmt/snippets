import { Request, Response } from "express";

export class AuthController{
    static loginForm(req : Request, res : Response) {
        res.render('auth/auth')
    }
}