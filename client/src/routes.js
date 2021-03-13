import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPAge';
import { LinksPage } from './pages/LinksPage';

export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/links" exact component={LinksPage} />
            <Route path="/create" exact component={CreatePage} />
            <Route path="/detail/:id" exact component={DetailPage} />
            <Redirect to="/create" />
         </Switch>
      )
   } else {
      return (
         <Switch>
            <Route path="/" exact component={AuthPage} />
            <Redirect to="/" />
         </Switch>
      )
   }
}