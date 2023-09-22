import { PrismaClient } from '@prisma/client';
    
const prisma = new PrismaClient();
    
async function main() {

    const c = await prisma.language.create({
        data: {
            name: 'C',
            htmlClass: 'language-c',
            logo: 'devicon-c-plain'
        }
    });

    const html = await prisma.language.create({
        data: {
            name: 'HTML',
            htmlClass: 'language-html',
            logo: 'devicon-html5-plain'
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            languageId: c.id,
            code:
`main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
        }
    });
    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            languageId: html.id,
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.', 
        }
    });
    await prisma.snippet.create({
        data: {
            title: 'Il faut télécharger les scripts skyler',
            languageId: html.id,
            code: ' <a href="/images/myw3schoolsimage.jpg" download>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Cela permet de télcharger un fichier avec son lien en cliquant dessus', 
        }
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});