import { NextFunction, Request, Response } from "express";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction) {
        throw new Error("Ceci est un message d'erreur");
    }
}