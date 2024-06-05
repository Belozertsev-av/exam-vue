import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    const id: number = Number(event.context.params?.id)

    return prisma.owner.findFirstOrThrow({
        where: {
            id: id
        }
    })
})