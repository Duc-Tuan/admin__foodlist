import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocation, removeLocation, setLocation } from '../../../utils/localStorage';
import { generateString, nameSliderbar } from '../../header/const';

const subMenu: string = 'isSubMenu';

interface State {
    isHeader: boolean;
    subMenu: { indexCurrent: number; isCurrent: boolean }
}

const initialState: State = {
    isHeader: false,
    subMenu:
        getLocation(subMenu) !== null ? JSON.parse(getLocation(subMenu) ?? '') :
            {
                indexCurrent: 0,
                isCurrent: false,
            }
};

const sliderbar = createSlice({
    name: 'sliderbar',
    initialState,
    reducers: {
        setSlidebar(state, action: PayloadAction<Pick<Required<State>, 'isHeader'>>) {
            const { payload } = action;
            payload.isHeader ? setLocation(nameSliderbar, generateString(20)) : removeLocation(nameSliderbar);
            state.isHeader = payload.isHeader;
        },
        setSubMenu(state, action: PayloadAction<Pick<Required<State>, 'subMenu'>>) {
            const { payload } = action;
            payload.subMenu && setLocation(subMenu, JSON.stringify(payload.subMenu));
            state.subMenu = payload.subMenu;
        },
    },
});

export default sliderbar;
