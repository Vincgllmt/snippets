import prisma from "../services/prisma";

export async function languageValidator(langId: any): Promise<boolean> {
    // lance une erreur si le paramètre ne correspond à aucun langage de la base. Sinon, retourne true.
    const language = await prisma.language.findUnique({
        where: {
            id: Number(langId)
        }
    })

    if (!language) {
        throw new Error("Language not found")
    }

    return true;
}
                