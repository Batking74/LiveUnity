// Importing Modules/Packages
import { NavigationComponent } from './components/NavigationComponent';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const App = () => {
  return (
    <React.Fragment>
      <NavigationComponent />
      <Outlet />
    </React.Fragment>
  );
}