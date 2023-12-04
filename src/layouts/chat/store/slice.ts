import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocation, removeLocation, setLocation } from '../../../utils/localStorage';
import { generateString, nameSliderbar } from '../../header/const';
import { ISelectUser } from '../screen/const';

interface State {
    isShow: boolean;
    selected?: ISelectUser;
    socket?: any;
}

const initialState: State = {
    isShow: false,
    selected: undefined,
    socket: undefined
};

const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(state, action: PayloadAction<Pick<Required<State>, 'isShow'>>) {
            const { payload } = action;
            state.isShow = payload.isShow;
        },
        setSocketChat(state, action: PayloadAction<Pick<Required<State>, 'socket'>>) {
            const { payload } = action;
            state.socket = payload.socket;
        },
        setSelected(state, action: PayloadAction<Pick<Required<State>, 'selected'>>) {
            const { payload } = action;
            state.selected = payload.selected;
        },
    },
});

export default chat;
