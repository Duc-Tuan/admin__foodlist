import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITabs } from '../const';
import { cloneDeep } from 'lodash';

interface State {
    isFullscreen: boolean;
    tabs: ITabs[];
    tab: ITabs;
}

const initialState: State = {
    isFullscreen: false,
    tabs: [
        {
            indexTab: 0,
            status: true,
            nameTab: 'Đơn 1',
            contentTab: [],
        }
    ],
    tab: {
        indexTab: 0,
        status: true,
        nameTab: 'Đơn 1',
        contentTab: [],
    },
};

const sliderbar = createSlice({
    name: 'sliderbar',
    initialState,
    reducers: {
        setisFullscreen(state, action: PayloadAction<Pick<Required<State>, 'isFullscreen'>>) {
            const { payload } = action;
            state.isFullscreen = payload.isFullscreen;
        },
        setTabs(state, action: PayloadAction<Pick<Required<State>, 'tab'>>) {
            const dataOld: ITabs[] = cloneDeep(state.tabs);
            dataOld.map((i: ITabs) => i.status = false)
            const { payload } = action;
            const findIndex = dataOld?.findIndex((i: ITabs) => i?.indexTab === payload?.tab?.indexTab);

            if (findIndex !== -1) {
                dataOld[findIndex] = payload.tab;
                state.tabs = dataOld;
            } else {
                state.tabs = [...dataOld, payload?.tab];
            }
        },
        delete(state, action: PayloadAction<{ id: number }>) {
            const { payload } = action;
            const dataOld: ITabs[] = cloneDeep(state.tabs?.filter((i: ITabs) => i?.indexTab !== payload?.id));
            dataOld[dataOld.length - 1].status = true;
            dataOld?.map((i: ITabs, idx: number) => i.indexTab = idx);
            state.tabs = dataOld;
        },
    },
});

export default sliderbar;
