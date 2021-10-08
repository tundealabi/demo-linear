import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import App from './App';
import Diff from './Diff';
import './index.css';
import { client } from './utils/api';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Diff />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
