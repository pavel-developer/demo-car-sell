import React, { Component } from 'react';
import { BrowserRouter as  Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../components/Home';
import AppSnackbarContainer from '../containers/SnackbarContainer';
import CarSellContainer from '../containers/CarSellContainer';

class App extends Component {
  render() {
    return (
      <>
        <AppSnackbarContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/car/:id" component={CarSellContainer}/>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
