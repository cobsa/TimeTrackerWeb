import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { Route, Switch } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import uri from '../graphql/serverUrl'
import HeaderContainer from './containers/headerContainer'
// Views
import Home from './views/home'
import History from './views/history'
import Login from './views/login'
import Profile from './views/profile'
import SignOut from './views/signout'
import Signup from './views/signup'

import { store, history } from '../redux/store'

// Apollo setup

const httpLink = createHttpLink({
  uri
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <HeaderContainer />
            <div className="main-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/history" component={History} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/signout" component={SignOut} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  )
}

export default App
