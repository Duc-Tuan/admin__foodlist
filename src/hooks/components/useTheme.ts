import React from 'react';
import { useAppDispatch } from '..';
import { ITheme } from '../../layouts/header/const';
import { actions as actionsAuth } from '../../pages/login/store';
import { hexToRGBA } from '../../utils/transform';
import { useSelector } from 'react-redux';
import { themeUser } from '../../pages/login/store/select';

const useThemeApp = (theme?: ITheme) => {
    const dispatch = useAppDispatch();
    const themeStore = useSelector(themeUser);
    const [currentTheme, setCurrentTheme] = React.useState<ITheme>(themeStore);

    React.useEffect(() => {
        theme && localStorage.setItem('KEY_COLOR_FOODAPP', JSON.stringify(theme));
        theme && setCurrentTheme(theme);
    }, [theme?.color])

    React.useEffect(() => {
        const themeLocation: { id: number; color: string } =
            (localStorage.getItem('KEY_COLOR_FOODAPP') !== String(undefined) && JSON.parse(localStorage.getItem('KEY_COLOR_FOODAPP') ?? ''));
        themeLocation && dispatch(actionsAuth.setColor(themeLocation));
        themeLocation && setCurrentTheme(themeLocation);
    }, []);

    React.useLayoutEffect(() => {
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-sidebar-default-color', currentTheme?.color);
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-color', currentTheme?.color);
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-rgba-color', hexToRGBA(currentTheme?.color));
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-dark-color', hexToRGBA(currentTheme?.color, '0.8'));
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-rgba-80-color', hexToRGBA(currentTheme?.color, '0.8'));
        // @ts-ignore
        document.querySelector('html').style.setProperty('--main-rgba-50-color', hexToRGBA(currentTheme?.color, '0.5'));
    }, [currentTheme?.color]);

    return theme;
}

export default useThemeApp