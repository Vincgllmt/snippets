import { Request, Response, NextFunction } from 'express';
                
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