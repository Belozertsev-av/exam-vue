import {defineStore} from 'pinia'
import type {IFine} from "~/model/types";
import {createFine, getAllFines} from "~/model/endpoints";

export const useFine = defineStore('fine', () => {
    const state = reactive(<IFine[]>[]
    )

    const updateFines = async () => {
        state.splice(0, state.length)
        const fines = await getAllFines()
        if (fines) fines.forEach(it => state.push(it))
    }
    updateFines()

    const addFine = async (newFine: IFine) => {
        await createFine(newFine)
        state.push(newFine)
    }


    return {state, addFine}
})