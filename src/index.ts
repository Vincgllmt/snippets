import express, { Request, Response, NextFunction} from "express";
import session from 'express-session'
import snippetRouter from './snippets/snippets.routes'
import languagesRouter from './languages/languages.routes'
import authRouter from './auth/auth.routes'
import 'dotenv/config'
import { sessionUser } from "./auth/auth.middleware";
import adminRouter from "./admin/admin.routes";
import { isAdmin } from "./admin/admin.middleware";
const app = express()
const port = process.env.PORT ?? 8000;

app.use(session({
    secret: process.env.session_secret ?? "Je ne suis pas très sécurisé", // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}));



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionUser)

app.use('/auth', authRouter)
app.use('/languages', languagesRouter)
app.use('/admin', isAdmin, adminRouter)
app.use('/', snippetRouter)



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, ()=> {
    console.log(`Serveur local démarré : http://localhost:${port}`);
})