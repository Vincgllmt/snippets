import prisma from "../services/prisma";

export async function snippetValidator(id: any): Promise<boolean> {
    const snippet = await prisma.snippet.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!snippet) {
        throw new Error("Snippet not found");
    }
    return true;
}