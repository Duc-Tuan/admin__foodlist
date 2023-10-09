import { useSelector } from 'react-redux';
import { isHeader, subMenu } from '../../layouts/sliderbar/store/select';

export const useHeader = () => {
  const getHeader = useSelector(isHeader);
  const isSubMenu = useSelector(subMenu);

  const results: {
    isHeader?: boolean;
    isSubMenu?: { indexCurrent: number; isCurrent: boolean };
  } = {
    isHeader: getHeader,
    isSubMenu,
  };

  return results;
};
