import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';

import { configureStore } from './store';
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
    <Provider store={configureStore()}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
