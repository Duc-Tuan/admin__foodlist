import { ISubMenu } from '../../types';

type Props = {
  data?: ISubMenu[];
  onClick?: (pathLink: string, indexCurrent: number) => void;
  idx: number;
};

const MenuSub = (props: Props) => {
  const { data, onClick, idx: idxSub } = props;
  return (
    <div className="menuSub__header--content">
      {data?.map((i: ISubMenu, idx: number) => (
        <div className="item" key={`menuSub__header--${idx}`} onClick={() => onClick && onClick(i?.link, idxSub)}>
          {i?.name}
        </div>
      ))}
    </div>
  );
};

export default MenuSub;
