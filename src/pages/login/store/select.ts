import { RootState } from "../../../store";

export const titleSelector = (rootState: RootState) => rootState.accounts.title;
export const isLogin = (rootState: RootState) => rootState.accounts.isLogin;
export const accountSelect = (rootState: RootState) => rootState.accounts.user;
export const token = (rootState: RootState) => rootState.accounts.token;
export const themeUser = (rootState: RootState) => rootState.accounts.theme;