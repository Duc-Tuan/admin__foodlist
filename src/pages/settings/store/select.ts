import { RootState } from "../../../store";

export const isChat = (rootState: RootState) => rootState.settings.isChat;
export const language = (rootState: RootState) => rootState.settings.language;