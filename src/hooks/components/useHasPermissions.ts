import { useSelector } from 'react-redux';
import { accountSelect } from '../../pages/login/store/select';
import { Permission } from '../../configs/perm';

export const useHasPermissions = (value: Permission | Permission[]) => {
  const user = useSelector(accountSelect);
  if (!value) return false;

  if (user?.userRoles?.length == 0) return false;
  if (Array.isArray(value))
    return value.every((permission) => user?.userRoles?.includes(permission));
  return user?.userRoles?.includes(value);
};
