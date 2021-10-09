import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import './App.css';
import { client } from './utils/api';

// pages
import MassImport from './pages/Massimport';
import Difference from './pages/Difference';

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/importAll" exact component={MassImport} />
            <Route path="/diff" exact component={Difference} />
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
