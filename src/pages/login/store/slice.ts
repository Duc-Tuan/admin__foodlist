import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';
import { IUsers } from '../types';
import { ITheme } from '../../../layouts/header/const';

interface State {
    title?: string;
    token?: string;
    isLogin: boolean;
    user: IUsers | undefined;
    theme: ITheme;
}

const initialState: State = {
    title: '',
    isLogin: false,
    user: undefined,
    token: undefined,
    theme: {
        id: 3,
        color: '#c2185b',
    }
};

const payment = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addPayments: (state, { payload }: PayloadAction<any[] | []>) => {
        },
        transferTitle(state, action: PayloadAction<any>) {
            state.title = action.payload;
        },
        setColor: (state, { payload }: PayloadAction<ITheme>) => {
            state.theme = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(operations.login.pending, () => { });
        builder.addCase(operations.login.fulfilled, (state, { payload }) => {
            sessionStorage.setItem('token_foodlist', payload.token)
            state.isLogin = true;
            state.user = payload?.data;
            state.token = payload?.token;
        });
        builder.addCase(operations.login.rejected, () => { });
        builder.addCase(operations.autologin.pending, () => { });
        builder.addCase(operations.autologin.fulfilled, (state, { payload }) => {
            sessionStorage.setItem('token_foodlist', payload.token)
            state.isLogin = true;
            state.user = payload?.data;
            state.token = payload?.token;
        });
        builder.addCase(operations.autologin.rejected, () => { });
    }
});

export default payment;
