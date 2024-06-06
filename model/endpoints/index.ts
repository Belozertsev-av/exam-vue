import type {ICar, IFine, IFineType, IOwner} from "~/model/types";

export const getAllFines = async () => {
    try {
        return await useFetch<IFine[]>("/api/fines").data.value as unknown as IFine[]
    } catch (e) {
        console.log(e)
    }
}

export const getAllCars = async () => {
    try {
        return await useFetch<ICar[]>("/api/cars").data.value as unknown as ICar[]
    } catch (e) {
        console.log(e)
    }
}

export const getAllFineTypes = async () => {
    try {
        return await useFetch<IFineType[]>("/api/fine_types").data.value as unknown as IFineType[]
    } catch (e) {
        console.log(e)
    }
}

export const deleteFineById = async (id: number) => {
    try {
        return await useFetch<Object>(`/api/fines/${id}`, {
            method: "DELETE",
        })
    } catch (e) {
        console.log(e)
    }
}

export const updateFineById = async (id: number, body: object) => {
    try {
        await useFetch<Object>(`/api/fines/${id}`, {
            method: "PATCH",
            body: body,
        })
    } catch (e) {
        console.log(e)
    }
}

export const createFine = async (body: object) => {
    try {
        await useFetch(`/api/fines`, {
            method: 'POST',
            body: body
        })
    } catch (e) {
        console.log(e)
    }
}

export const getOwnerById = async (id: number) => {
    try {
        return await useFetch<IOwner>(`/api/owners/${id}`).data.value as unknown as IOwner
    } catch (e) {
        console.log(e)
    }
}

export const getFineTypeById = async (id: number) => {
    try {
        return await useFetch<IFineType>(`/api/fine_types/${id}`).data.value as unknown as IFineType
    } catch (e) {
        console.log(e)
    }
}