import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import './i18n';
import App from './App';

console.log(process.env);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_OCTOKIT_AUTH}`,
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
