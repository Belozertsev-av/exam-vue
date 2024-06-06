import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
    try {
        const id: number = Number(event.context.params?.id)

        const result = await prisma.fine.delete({
            where: {
                id: id
            },
        })
        if (result) {
            return {
                text: `Штраф с Id: ${id} успешно удален!`,
                color: "green"
            }
        }
    } catch (e) {
        return {
            text: "При удалении произошла ошибка!",
            color: "red"
        }
    }
})