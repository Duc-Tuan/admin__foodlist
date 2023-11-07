import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';
import i18next from 'i18next';
import { Option } from '../../../types/general';

interface State {
    isChat?: boolean;
    language: Option;
}

const initialState: State = {
    isChat: false,
    language: {
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
