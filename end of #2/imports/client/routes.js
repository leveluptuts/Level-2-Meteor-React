import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import { render } from 'react-dom';
import App from './App';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>,
    document.getElementById('render-target')
  );
});
