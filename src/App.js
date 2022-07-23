import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import './App.css';
import { client } from './utils/api';

// pages
import MassImport from './pages/Massimport';
import Difference from './pages/Difference';
import SetKey from './pages/SetKey';
import { Container } from 'react-bootstrap';

const App = () => {
  const [apiKey, setapiKey] = useState('');

  return (
    <>
      <Router>
        <Container fluid className="m-auto">
          {true ? (
            <SetKey setapiKey={apiKey} />
          ) : (
            <ApolloProvider client={client}>
              <Switch>
                <Route path="/importAll" exact component={MassImport} />
                <Route path="/diff" exact component={Difference} />
              </Switch>
            </ApolloProvider>
          )}
        </Container>
      </Router>
    </>
  );
};

export default App;
