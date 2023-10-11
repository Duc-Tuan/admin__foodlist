export interface ITabs {
    indexTab: number;
    status: boolean;
    nameTab: string;
    contentTab: IProduct[];
}

export interface IProduct {
    id: number,
    name: string,
    image: string,
    qty: number,
    price: number
}