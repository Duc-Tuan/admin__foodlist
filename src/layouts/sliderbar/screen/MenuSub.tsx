import { useTranslation } from 'react-i18next';
import { ISubMenu } from '../../types';
import Icon from '../../../assets/icon';

type Props = {
  title: string;
  data?: ISubMenu[];
  onClick?: (pathLink: string, indexCurrent: number) => void;
  idx: number;
};

const MenuSub = (props: Props) => {
  const { t } = useTranslation();
  const { data, onClick, idx: idxSub, title } = props;
  return (
    <div className="menuSub__header--content">
      <div className="title d-flex justify-content-between align-items-center gap-10">
        <div className="title__name">{t(title)}</div>
        <Icon name="chevron-down" />
      </div>
      {data?.map((i: ISubMenu, idx: number) => (
        <div className="item" key={`menuSub__header--${idx}`} onClick={() => onClick && onClick(i?.link, idxSub)}>
          {t(i?.name)}
        </div>
      ))}
    </div>
  );
};

export default MenuSub;
