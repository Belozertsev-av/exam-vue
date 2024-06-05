import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    return prisma.fine.findMany({
        include: {
            car: {
                include: {
                    owner: true
                }
            },
            fineType: true,
        },
    })
})