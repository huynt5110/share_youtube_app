import React from 'react';
// libraries
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { useSelector } from 'react-redux';

// Pages
import DashboardLayout from 'components/dashboardLayout';
import HomePage from 'page/home_page';
import SharePage from 'page/share_movies';

export const publicRouteList = [
  {
    path: '/',
    component: HomePage,
  },
];

const privateRouteList = [
  {
    path: '/share',
    component: SharePage,
  },
];

const Routes = (props) => {
  const isSignIn = useSelector((state) => state.user.isSignIn);

  let routeList = publicRouteList;
  if (isSignIn) routeList = [...routeList, ...privateRouteList];

  const routeComponents = routeList.map((route, key) => (
    <Route
      exact
      path={route.path}
      key={key}
      render={(routeProps) => {
        return (
          <DashboardLayout page={route.page}>
            <route.component {...routeProps} />
          </DashboardLayout>
        );
      }}
    />
  ));

  return (
    <Router>
      <Switch>
        {routeComponents}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
