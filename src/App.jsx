// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Landing from './containers/Landing';
import SamplePage from './components/SamplePage';
import NotFound from './components/NotFound';
import './css/styles.scss';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/sample-page" component={SamplePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
