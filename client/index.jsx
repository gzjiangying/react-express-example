import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from  'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import reducers from './reducers';

import App from './containers/app';
import Register from './containers/register';
import Home from './containers/home';
import Complain from './containers/complain';
import Show from './containers/show';
import Wish from './containers/wish';
import Advertise from './containers/advertise';
import PageNotFound from './components/page_not_found';

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

function onAppEnterHook (nextState, replace) {
  console.info('entering root...');
};

function onAppChangeHook (prevState, nextState, replace) {
  console.info('changing root...');
  
};

function onAppLeaveHook(nextstate, replace) {
  console.warn('leaving root?!...');
};

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnterHook} onChange={onAppChangeHook} onLeave={onAppLeaveHook}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/wish" component={Wish}/>
         <Route path="/advertise" component={Advertise}/>
        <Route path="/complain" component={Complain}/>
        <Route path="/register" component={Register}/>
        <Route path="/show" component={Show}/>
        <Route path="*" component={PageNotFound}>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
