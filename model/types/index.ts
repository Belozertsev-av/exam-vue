export interface IFine {
    id: number
    date: string
    car: ICar | null
    fineType: IFineType | null,
}

export interface IFineType {
    id: number
    fine: string
    amount: number
}

export interface ICar {
    id: number
    number: string
    name: string
    ownerName: string
}