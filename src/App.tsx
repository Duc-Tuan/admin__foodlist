import React, { Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes as Routers } from 'react-router-dom';
import { Loading } from './components';
import { PATHNAME } from './configs/pathname';
import { useAppDispatch } from './hooks';
import { DefaultLayout } from './layouts';
import Error404 from './pages/error';
import { actions as actionsAccount } from './pages/login/store';
import { privateRouters } from './routers';
import Protectedroute from './routers/protectedroute';
import { IRouter } from './routers/types';

import useThemeApp from './hooks/components/useTheme';
import './i18n';
import { useSelector } from 'react-redux';
import { themeUser } from './pages/login/store/select';

const ScreenLogin = lazy(() => import('./pages/login/screen'));

function App() {
  const dispatch = useAppDispatch();
  // const themeStore = useSelector(themeUser);

  React.useEffect(() => {
    const token: string = JSON.parse(JSON.stringify(localStorage.getItem('token_foodlist')));
    if (token) {
      dispatch(actionsAccount?.autologin());
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Food App | admin</title>
      </Helmet>
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
