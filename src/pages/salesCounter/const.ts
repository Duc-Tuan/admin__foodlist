import { ICommon } from "../../types/general";

export interface ITabs {
    indexTab: number;
    status: boolean;
    nameTab: string;
    contentTab: IProductSales[];
}

export interface IProductSales extends ICommon {
    name: string,
    image: string,
    qty: number,
    price: number,
    prommotion: number,
}