import { routes } from '../../routes';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../Spinner';

const NavRoutes = ({ match = '' }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routes.map(({ path, exact, component: Component }) => (
          <Route
            path={`${match}${path}`}
            exact={exact}
            component={Component}
            key={path}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default NavRoutes;
