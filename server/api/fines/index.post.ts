import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    prisma.fine.create({
        data: {
            car: body.car,
            fineType: body.fineType,
            date: body.date,
            carId: body.carId,
            fineTypeId: body.fineTypeId
        },
    })
})