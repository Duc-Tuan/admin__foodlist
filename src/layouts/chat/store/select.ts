import { RootState } from "../../../store";

export const isShow = (rootState: RootState) => rootState.chat.isShow;
export const selected = (rootState: RootState) => rootState.chat.selected;