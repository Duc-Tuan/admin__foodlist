import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/common/useUser';
import { PATHNAME } from '../configs/pathname';
import React from 'react';

const Protectedroute = () => {
  // const isLogin = sessionStorage.getItem('token_foodlist');
  const isLogin = true;
  return isLogin ? <Outlet /> : <Navigate replace to={PATHNAME.SCREENLOGIN} />;
};

export default Protectedroute;
