import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    return prisma.car.findMany({
        include: {
            owner: true
        }
    })
})