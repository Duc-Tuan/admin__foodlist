import { RootState } from "../../../store";

export const isHeader = (rootState: RootState) => rootState.headers.isHeader;
export const subMenu = (rootState: RootState) => rootState.headers.subMenu;