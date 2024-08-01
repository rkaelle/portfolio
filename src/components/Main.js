import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Manage from '../pages/manage';
import Home from '../pages/Home';
import GalleryPage from '../pages/gallery';
import ErrorPage from '../pages/errorPage'; 
import ScrollIndicator from './ScrollIndicator';
import Projects from '../pages/projectsPage';
import LoginPage from '../pages/LoginPage';
import UploadPage from '../pages/UploadPage';
import SocialsPage from '../pages/SocialsPage';
import PrivateRoute from './PrivateRoute';

const Main = () => {
  return (
    <Router>
      <Switch> 
        <Route exact path='/' component={Home} />
        <Route exact path='/manage' component={Manage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route exact path='/projects' component={Projects} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/socials' component={SocialsPage} />
        <PrivateRoute path="/upload" component={UploadPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default Main;