import React, { Component } from 'react';
import CustomerManager from '../src/containers/CustomerManager/CustomerManager';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Layout> */}
          {/* <CustomerManager /> */}
          <Toolbar />
          <Route path="/" component={CustomerManager} />
          {/* </Layout> */}
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
