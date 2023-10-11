import { useTranslation } from 'react-i18next';
import { ISubMenu } from '../../types';

type Props = {
  data?: ISubMenu[];
  onClick?: (pathLink: string, indexCurrent: number) => void;
  idx: number;
};

const MenuSub = (props: Props) => {
  const { t } = useTranslation();
  const { data, onClick, idx: idxSub } = props;
  return (
    <div className="menuSub__header--content">
      {data?.map((i: ISubMenu, idx: number) => (
        <div className="item" key={`menuSub__header--${idx}`} onClick={() => onClick && onClick(i?.link, idxSub)}>
          {t(i?.name)}
        </div>
      ))}
    </div>
  );
};

export default MenuSub;
