import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { configureStore } from './store/store';
import './i18n';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_OCTOKIT_AUTH}`,
  },
  uri: 'https://api.github.com/graphql',
});

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore(history)}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
