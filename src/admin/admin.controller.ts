import { Request, Response } from "express";

export class adminController {
    static async index(req : Request, res : Response) {
        res.render('admin/admin');
    }
}