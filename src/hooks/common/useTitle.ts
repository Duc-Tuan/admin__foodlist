import { actions as authActions } from '../../pages/login/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { titleSelector } from '../../pages/login/store/select';
import { useAppDispatch } from '..';

export const useTitle = (title?: string) => {
  const getTitle = useSelector(titleSelector);
  const dispatch = useAppDispatch();

  const sendTitle = () => {
    dispatch(authActions.transferTitle(title ?? ''));
  };

  useEffect(() => {
    sendTitle();
  }, []);

  const results: {
    title?: string;
    onSendTitle?: typeof sendTitle;
  } = {
    title: getTitle,
    onSendTitle: sendTitle,
  };

  return results;
};
