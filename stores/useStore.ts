import {defineStore} from 'pinia'
import type {ICar, IFine, IFineType} from "~/model/types";
import {onMounted} from "vue";

export const useStore = defineStore('store', () => {

    const fines = reactive<IFine[]>([])
    const fineTypeItems = reactive(<IFineType[]>[
            {
                id: 0,
                fine: "Превышение скорости на 20-40 км/ч",
                amount: 500
            },
            {
                id: 1,
                fine: "Превышение скорости на 40-60 км/ч",
                amount: 1500
            },
            {
                id: 2,
                fine: "Неправильная парковка",
                amount: 800
            },

        ]
    )
    const carItems = reactive(<ICar[]>[
            {
                id: 0,
                number: "А310УС",
                name: "Toyota Camry",
                ownerName: "Петр Петров",
            },
            {
                id: 1,
                number: "Т444РО",
                name: "Daewoo Matiz",
                ownerName: "Мария Маркова",
            },
            {
                id: 2,
                number: "Р101АК",
                name: "Lada Granta",
                ownerName: "Иван Иванов",
            },
        ]
    )
    const initStorage = () => {
        onMounted(() => {
            const localStorageCopy = localStorage.getItem("fines")
            if (localStorageCopy) {
                JSON.parse(localStorageCopy).forEach((it: IFine) => {
                    fines.push(it)
                })
            } else {
                fines.push(
                    {
                        id: 0,
                        date: "20.05.2024",
                        car: {
                            id: 0,
                            number: "А310УС",
                            name: "Toyota Camry",
                            ownerName: "Петр Петров",
                        },
                        fineType: {
                            id: 0,
                            fine: "Превышение скорости на 20-40 км/ч",
                            amount: 500
                        },
                    },
                )
            }
        })
    }
    initStorage()
    const getFines = () => {
        return fines
    }
    const getFineTypes = () => {
        return fineTypeItems
    }
    const getCars = () => {
        return carItems
    }

    const getFineById = (id: number): IFine => {
        return fines.find(it => it.id === id)! as IFine
    }

    const getLastIndexOfFine = (): number => {
        return fines.length - 1
    }

    const addFine = (newItem: IFine) => {
        fines.push(newItem)
        localStorage.setItem("fines", JSON.stringify(fines))
    }

    const editFine = (id: number, item: IFine) => {
        const targetItem = fines.find(it => it.id === id) as IFine
        const targetItemId = fines.indexOf(targetItem)

        if (targetItem) {
            fines[targetItemId] = item
        }
        localStorage.setItem("fines", JSON.stringify(fines))
    }

    const deleteFine = (id: number) => {
        try {
            const targetItem = fines.find(it => it.id === id) as IFine
            const targetItemId = fines.indexOf(targetItem)
            fines.splice(targetItemId, 1)
            localStorage.setItem("fines", JSON.stringify(fines))
            return {
                color: "green",
                text: "Позиция успешно удалена"
            }
        } catch (e) {
            return {
                color: "red",
                text: "Ошибка при удалении"
            }
        }

    }

    return {fines, getFines, addFine, editFine, deleteFine, getLastIndexOfFine, getFineById, getFineTypes, getCars}
})