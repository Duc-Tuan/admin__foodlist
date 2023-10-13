import { ICommon } from "./general";

export interface IProduct extends ICommon {
    productCategory: string;
    productDesc: string;
    productDescribes: string;
    productImage: string;
    productImageDetail: string[];
    productName: string;
    productPrice: number;
    productPromotion: number;
    productQty: number;
    productSource: string;
    productStatus: string;
    productUnit: string;
    productWarehouse: number;
}