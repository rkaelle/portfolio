import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Manage from '../pages/manage';
import Home from '../pages/Home';
import GalleryPage from '../pages/gallery';
import ErrorPage from '../pages/errorPage'; 
import SignaturePage from '../pages/signaturePage'; 
import ScrollIndicator from './ScrollIndicator';

const Main = () => {
  return (
    <Router>
      <Switch> 
        <Route exact path='/' component={Home} />
        <Route exact path='/manage' component={Manage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route path="/signature" component={SignaturePage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default Main;