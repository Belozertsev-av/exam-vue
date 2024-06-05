import prisma from "~/server/database/client";



export default defineEventHandler(async (event) => {

    return prisma.fineType.findMany()
})