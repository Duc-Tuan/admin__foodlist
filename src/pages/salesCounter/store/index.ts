import slice from './slice';

export const { reducer } = slice;

export const actions = {
    ...slice.actions,
};

export type TypesActions = typeof slice.actions;
export type TypesState = ReturnType<typeof reducer>;