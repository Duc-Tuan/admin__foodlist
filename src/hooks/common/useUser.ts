import { actions as authActions } from '../../pages/login/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLogin } from '../../pages/login/store/select';
import { useAppDispatch } from '..';

export const useUser = () => {
  const getLogin = useSelector(isLogin);

  // useEffect(() => {
  // }, []);

  const results: {
    isLogin?: boolean;
  } = {
    isLogin: getLogin,
  };

  return results;
};
