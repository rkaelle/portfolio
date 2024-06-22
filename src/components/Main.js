import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Manage from '../pages/manage';
import Home from '../pages/Home';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/manage' component={Manage}></Route>
    </Switch>
  );
}

export default Main;