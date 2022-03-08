import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Gpa1 from './core/Gpa1';
import Gpa2 from './core/Gpa2';
import Home from './core/Home';
import Info from './core/Info';
import Map from './core/Map';
import Mapper from './core/Mapper';
import Matrix from './core/Matrix';
import NotFound from './core/NotFound';
import Signin from './core/Signin';
import Signinmap from './core/Signinmap';
import Signup from './core/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        
        
        <Route path='/signin' component={Info} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/info' component={Info} exact />
        <Route path='/signup/gpa1' component={Gpa1} exact />
        <Route path='/signup/gpa2' component={Gpa2} exact />
        <Route path='/signinmap' component={Signinmap} exact />
        <Route path='/g' component={Map} exact />
        <PrivateRoute path='/' component={Home} exact />
        <Route component={NotFound} />
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;
