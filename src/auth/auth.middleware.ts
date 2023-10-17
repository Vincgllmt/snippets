import { Request, Response, NextFunction } from 'express';
import prisma from '../services/prisma';
                
export function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}
export function isConnected(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth');
    }
}
export async function isAuthorConnected(req: Request, res: Response, next: NextFunction){
    const snippet = await prisma.snippet.findUniqueOrThrow({
        where: {
            id: +req.params.id
        },
        select: {
            authorId: true
        }
    })
    if(snippet.authorId === req.session.user?.id){
        next();
        return;
    }

    throw new Error('Forbidden');
}