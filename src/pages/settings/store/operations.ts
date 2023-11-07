import * as axiosInstance from '../../../store/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as actionsAccount } from '.'

const pathCart: string = 'chat';

export const chat = createAsyncThunk<any, any>(
    `${pathCart}/login`,
    async (body, { rejectWithValue, dispatch }) => {
        return;
    }
);
