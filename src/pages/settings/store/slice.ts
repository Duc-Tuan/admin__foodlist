import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';
import i18next from 'i18next';
import { Option } from '../../../types/general';
import { getLocation, setLocation } from 'utils/localStorage';

export const nameLanguage: string = 'Language';

interface State {
    isChat?: boolean;
    language: Option;
}

const initialState: State = {
    isChat: false,
    language: getLocation(nameLanguage) ? JSON.parse(getLocation(nameLanguage) ?? "") : {
        label: "Tiếng việt",
        value: 'vn'
    }
};

const payment = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setChat: (state, { payload }: PayloadAction<{ isChat: boolean }>) => {
            state.isChat = payload?.isChat;
        },
        setLanguage: (state, { payload }: PayloadAction<{ language: Option }>) => {
            state.language = payload?.language;
            setLocation(nameLanguage, JSON.stringify(payload?.language))
            i18next.changeLanguage(payload?.language?.value);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(operations.chat.pending, () => { });
        builder.addCase(operations.chat.fulfilled, (state, { payload }) => {
        });
        builder.addCase(operations.chat.rejected, () => { });
    }
});

export default payment;
