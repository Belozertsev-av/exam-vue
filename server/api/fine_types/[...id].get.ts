import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    const id: number = Number(event.context.params?.id)

    return prisma.fineType.findFirstOrThrow({
        where: {
            id: id
        }
    })
})