import { RootState } from "../../../store";

export const isFullscreen = (rootState: RootState) => rootState.sales.isFullscreen;
export const tabs = (rootState: RootState) => rootState.sales.tabs;
export const dataProducts = (rootState: RootState) => rootState.sales.products;
export const dataTotalPage = (rootState: RootState) => rootState.sales.totalPage;