import express from "express";
import session from 'express-session'
import snippetRouter from './snippets/snippets.routes'

const app = express()
const port = process.env.PORT ?? 8000;

app.use(session({
    secret: process.env.session_secret ?? "Je ne suis pas très sécurisé", // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}));

declare module "express-session" {
    interface SessionData {
    }
}

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', snippetRouter)

app.listen(port, ()=> {
    console.log(`Serveur local démarré : http://localhost:${port}`);
})