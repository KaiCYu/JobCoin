import React from 'react';
import UserPage from './UserPage'
import LoginPage from './LoginPage'
import { Route } from 'react-router-dom';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/UserPage" component={UserPage}/>
    </div>
  );
};

export default Routes;