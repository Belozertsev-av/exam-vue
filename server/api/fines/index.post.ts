import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    prisma.fine.create({
        data: {
            date: body.date,
            car: body.car,
            carId: body.carId,
            fineType: body.fineType,
            fineTypeId: body.fineTypeId
        },
    })
})