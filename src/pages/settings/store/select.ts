import { RootState } from "../../../store";

export const isSettingChat = (rootState: RootState) => rootState.settings.isChat;
export const language = (rootState: RootState) => rootState.settings.language;