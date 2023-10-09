import * as axiosInstance from '../../../store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '../types';
import { actions as actionsAccount } from '.'

const pathCart: string = 'auths/admin';

export const login = createAsyncThunk<any, ILogin>(
    `${pathCart}/login`,
    async (body, { rejectWithValue, dispatch }) => {
        return axiosInstance.post(`${pathCart}/login`, body).then(res => {
            localStorage.setItem('token_foodlist', res?.token);
            return res;
        }).catch(err => rejectWithValue(err?.response?.data));
    }
);
export const autologin = createAsyncThunk<any>(
    `${pathCart}/autologin`,
    async (body, { rejectWithValue, dispatch }) => {
        const token: string = JSON.parse(JSON.stringify(localStorage.getItem('token_foodlist')))
        axiosInstance.setHeaders({ 'x-food-access-token': token });
        return axiosInstance.post(`${pathCart}/login`).then(res => res).catch(err => rejectWithValue(err?.response?.data));
    }
);
