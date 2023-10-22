import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductSales, ITabs } from '../const';
import { cloneDeep } from 'lodash';
import { IProducts } from '../screen/products/const';

interface State {
    isFullscreen: boolean;
    tabs: ITabs[];
    tab: ITabs;
    productSales?: {
        idTab: number;
        data: IProductSales
    };
    products: IProducts[];
    totalPage: number;
}

const initialState: State = {
    isFullscreen: false,
    tabs: [
        {
            indexTab: 0,
            status: true,
            nameTab: 'Đơn 1',
            contentTab: [],
        }
    ],
    tab: {
        indexTab: 0,
        status: true,
        nameTab: 'Đơn 1',
        contentTab: [],
    },
    productSales: undefined,
    products: [],
    totalPage: 1,
};

const sliderbar = createSlice({
    name: 'sliderbar',
    initialState,
    reducers: {
        setisFullscreen(state, action: PayloadAction<Pick<Required<State>, 'isFullscreen'>>) {
            const { payload } = action;
            state.isFullscreen = payload.isFullscreen;
        },
        setTabs(state, action: PayloadAction<Pick<Required<State>, 'tab'>>) {
            const dataOld: ITabs[] = cloneDeep(state.tabs);
            dataOld.map((i: ITabs) => i.status = false)
            const { payload } = action;
            const findIndex = dataOld?.findIndex((i: ITabs) => i?.indexTab === payload?.tab?.indexTab);

            if (findIndex !== -1) {
                dataOld[findIndex] = payload.tab;
                state.tabs = dataOld;
            } else {
                state.tabs = [...dataOld, payload?.tab];
            }
        },
        delete(state, action: PayloadAction<{ id: number }>) {
            const { payload } = action;
            const dataOld: ITabs[] = cloneDeep(state.tabs?.filter((i: ITabs) => i?.indexTab !== payload?.id));
            dataOld[dataOld.length - 1].status = true;
            dataOld?.map((i: ITabs, idx: number) => i.indexTab = idx);
            state.tabs = dataOld;
        },
        setProductSales(state, action: PayloadAction<Pick<Required<State>, 'productSales'>>) {
            const dataOld: ITabs[] = cloneDeep(state.tabs);
            const { payload } = action;
            const findIndexTab = dataOld?.findIndex((i: ITabs) => i?.indexTab === payload?.productSales?.idTab);
            const tab = dataOld?.filter((i: ITabs) => i?.indexTab === payload?.productSales?.idTab)[0];
            const dataProoducts: IProductSales[] = cloneDeep(tab?.contentTab);
            const findIndex = dataProoducts?.findIndex((i: IProductSales) => i?.id === payload?.productSales?.data?.id);

            if (findIndexTab !== -1) {
                if (findIndex !== -1) {
                    dataOld[findIndexTab].contentTab[findIndex].qty += 1;
                    state.tabs = [...dataOld];
                } else {
                    dataOld[findIndexTab].contentTab = dataOld[findIndexTab]?.contentTab?.length !== 0 ? [payload?.productSales?.data, ...dataOld[findIndexTab]?.contentTab] : [payload?.productSales?.data];
                    state.tabs = [...dataOld];
                }
            }
        },
        setDeleteSales(state, action: PayloadAction<{ data: IProductSales }>) {
            const dataOld: ITabs[] = cloneDeep(state.tabs);
            const { payload } = action;
            const findIndexTab = dataOld?.findIndex((i: ITabs) => i?.status === true);

            if (findIndexTab !== -1) {
                const dataProoducts: IProductSales[] = cloneDeep(dataOld[findIndexTab].contentTab);
                const dataNew = dataProoducts?.filter((i: IProductSales) => i?.id !== payload?.data?.id)
                dataOld[findIndexTab].contentTab = [...dataNew]
                state.tabs = [...dataOld];
            }
        },
        setUpdateSales(state, action: PayloadAction<{ data: IProductSales }>) {
            const dataOld: ITabs[] = cloneDeep(state.tabs);
            const { payload } = action;
            const findIndexTab = dataOld?.findIndex((i: ITabs) => i?.status === true);

            if (findIndexTab !== -1) {
                const dataProoducts: IProductSales[] = cloneDeep(dataOld[findIndexTab].contentTab);
                const indexContentTab = dataProoducts.findIndex((i: IProductSales) => i?.id === payload?.data?.id);
                if (indexContentTab !== -1) {
                    dataProoducts[indexContentTab] = payload?.data;
                }
                dataOld[findIndexTab].contentTab = [...dataProoducts]
                state.tabs = [...dataOld];
            }
        },
        setProducts(state, action: PayloadAction<{ data: IProducts[], totalPage: number }>) {
            const { payload } = action;
            state.products = payload.data;
            state.totalPage = payload.totalPage;
        },
    },
});

export default sliderbar;
