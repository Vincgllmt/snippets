import { NextFunction, Request, Response } from "express";

export class SnippetsController {
    static list(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Ceci est un message d'erreur");
    }
}