import * as operations from './operations';
import slice from './slice';

export const { reducer } = slice;

export const actions = {
    ...slice.actions,
    ...operations,
};

export type TypesActions = typeof slice.actions;
export type TypesState = ReturnType<typeof reducer>;