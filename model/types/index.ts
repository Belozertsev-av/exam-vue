export interface IFine {
    id: number
    date: Date
    car: ICar | null
    fineType: IFineType | null
}

export interface IFineType {
    id: number
    fine: string
    amount: number
}

export interface IOwner {
    id: number
    firstName: string
    lastName: string
}

export interface ICar {
    id: number
    number: string
    name: string
    owner: IOwner | null
}