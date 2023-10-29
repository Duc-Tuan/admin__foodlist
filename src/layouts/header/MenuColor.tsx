import React from 'react';
import Icon from '../../assets/icon';
import { IRIS_THEME_COLORS } from '../../configs/general';
import { useAppDispatch } from '../../hooks';
import useThemeApp from '../../hooks/components/useTheme';
import { actions as actionsAuth } from '../../pages//login/store';
import { ITheme } from './const';
import { Radio } from '../../components';
import { getLocation } from '../../utils/localStorage';

const MenuColor = React.forwardRef(() => {
  const [currentThemeUse, setCurrentThemeUse] = React.useState<ITheme>();
  const dispatch = useAppDispatch();
  useThemeApp(currentThemeUse);

  React.useEffect(() => {
    currentThemeUse && dispatch(actionsAuth.setColor(currentThemeUse));
  }, [currentThemeUse?.color]);

  React.useEffect(() => {
    const themeLocation: { id: number; color: string } = (getLocation('KEY_COLOR_FOODAPP') !== null &&
      JSON.parse(getLocation('KEY_COLOR_FOODAPP') ?? '')) ?? {
      id: 3,
      color: '#C2185B',
    };
    setCurrentThemeUse(themeLocation);
    // themeLocation && setCurrentTheme(themeLocation);
  }, []);

  return (
    <div className="wrapper__color">
      <div className="title">
        <Radio value={true} label="Đổi màu hệ thống" />
      </div>

      <div className="wrap d-flex jusity-content-start align-items-center flex-wrap gap-10 mt-10">
        {IRIS_THEME_COLORS.map((theme) => {
          return (
            <div
              key={theme.id}
              style={{ '--theme-color': theme.color } as React.CSSProperties}
              className={`item ${currentThemeUse && currentThemeUse.id == theme.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentThemeUse(theme);
              }}
            >
              {currentThemeUse?.id == theme.id && (
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                  <Icon name="checked" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default React.memo(MenuColor);
