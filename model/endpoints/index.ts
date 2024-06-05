import type {IFine, IFineType, IOwner} from "~/model/types";

export const getAllFines = async () => {
    try {
        return await useFetch<IFine[]>("/api/fines").data.value as unknown as IFine[]
    } catch (e) {
        console.log(e)
    }
}

export const deleteFineById = async (id: number) => {
    try {
        return await useFetch<Object>(`api/fines/${id}`, {
            method: "DELETE",
        })
    } catch (e) {
        console.log(e)
    }
}

export const getOwnerById = async (id: number) => {
    try {
        return await useFetch<IOwner>(`api/owners/${id}`).data.value as unknown as IOwner
    } catch (e) {
        console.log(e)
    }
}

export const getFineTypeById = async (id: number) => {
    try {
        return await useFetch<IFineType>(`api/fine_types/${id}`).data.value as unknown as IFineType
    } catch (e) {
        console.log(e)
    }
}