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
export function isAuthorConnected(req: Request, res: Response, next: NextFunction){
    console.log(req.session.user?.id, req.params.id);
    if(req.session.user?.id === +req.params.id){
        next();
    }else{
        throw new Error('Forbidden');
    }
}