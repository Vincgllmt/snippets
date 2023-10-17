import { NextFunction, Request, Response } from "express";

export function isAdmin(req : Request, res : Response, next : NextFunction) {
    if (req.session.user && req.session.user.role === 'ADMIN') {
        next();
    } else {
        res.redirect('/');
    }
}