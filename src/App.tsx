import React, { Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes as Routers } from 'react-router-dom';
import { Loading } from './components';
import { PATHNAME } from './configs/pathname';
import { useAppDispatch } from './hooks';
import Error404 from './pages/error';
import { actions as actionsAccount } from './pages/login/store';
import { privateRouters } from './routers';
import Protectedroute from './routers/protectedroute';
import { IRouter } from './routers/types';

import i18next from 'i18next';
import { Chat } from 'layouts/chat';
import { nameLanguage } from 'pages/settings/store/slice';
import { io } from 'socket.io-client';
import { getLocation } from 'utils/localStorage';
import './i18n';

const ScreenLogin = lazy(() => import('./pages/login/screen'));

function App() {
  const [socket, setSocket] = React.useState<any>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (getLocation(nameLanguage)) {
      i18next.changeLanguage(JSON.parse(getLocation(nameLanguage) ?? '')?.value);
    }
    const token: string = JSON.parse(JSON.stringify(localStorage.getItem('token_foodlist')));
    if (token) {
      dispatch(actionsAccount?.autologin());
    }
  }, []);

  React.useEffect(() => {
    const newSocket = io('http://localhost:3036');
    setSocket(newSocket);
    return () => {
      newSocket?.disconnect();
    };
  }, []);

  React.useEffect(() => {
    socket?.emit('client_send-merchant', { data: { value: '', idMerchant: '650bbb2315c0e10c0ed839d9' } });
  }, [socket]);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Food App | admin</title>
      </Helmet>
      <div>
        <Suspense fallback={<Loading />}>
          <Routers>
            <Route path={PATHNAME.SCREENLOGIN} element={<ScreenLogin />} />
            <Route path={PATHNAME.SCREENERROR} element={<Error404 />} />
            <Route element={<Protectedroute />}>
              <Route path="/">{renderRoute(privateRouters)}</Route>
              <Route path="/*" Component={() => <Navigate replace to={PATHNAME.SCREENERROR} />} />
            </Route>
          </Routers>
        </Suspense>
        <Chat socket={socket} />
      </div>
    </HelmetProvider>
  );
}

export default App;

const renderRoute = (routes: IRouter[]) => {
  return routes.map((route) => {
    const { path, component: Component, title, isLayout, isDefaultSales } = route;
    const Comp = () => {
      return (
        <>
          <Helmet>
            <title>{title || 'Food App | admin'}</title>
          </Helmet>
          {isDefaultSales ? (
            <Component />
          ) : (
            <Component />
            // <DefaultLayout>
            // </DefaultLayout>
          )}
        </>
      );
    };
    return <Route path={path} element={<Comp />} key={path} />;
  });
};
