import { ICommon } from "../../../../types/general";

export interface IProducts extends ICommon {
    productCategory?: string;
    productImage: string;
    productStatus?: string;
    productUnit?: string;
    productName: string;
    productPrice: number;
    productPromotion: number;
    productQty: number;
}