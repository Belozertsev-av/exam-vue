import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id: number = Number(event.context.params?.id)

    prisma.fine.update({
        where: {
            id: id,
        },
        data: {
            car: body.car,
            fineType: body.fineType,
            date: body.date,
            carId: body.carId,
            fineTypeId: body.fineTypeId
        },
    })
})