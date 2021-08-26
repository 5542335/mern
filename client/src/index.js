import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import './i18n';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer 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`,
  },
  uri: 'https://api.github.com/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
