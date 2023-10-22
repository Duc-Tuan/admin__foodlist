import { IProductSales, ITabs } from "../../const";
import { ProductSalesContructor } from "../contructor";
import { IProducts } from "../products/const";
import { actions as actionsSales } from '../../store';

export const handlerAddProductSales = (dispatch: any, tabs: ITabs[], data: IProducts) => {
    const dataProduct: IProductSales = new ProductSalesContructor(
        data?._id ?? '',
        data?.code,
        data?.productName,
        data?.productImage,
        1,
        data?.productPrice,
        data?.productPromotion,
    );
    dispatch(
        actionsSales?.setProductSales({
            productSales: {
                idTab: tabs?.filter((i: ITabs) => i?.status === true)[0]?.indexTab,
                data: { ...dataProduct },
            },
        }),
    );
}