import React, { Component } from 'react';
import Aux from '../../hoc/Auks';
import CustomerTable from '../../components/Customers/CustomerTable/CustomerTable';
import axios from 'axios';
import { auth } from '../../components/Auth/Auth';
import { BrowserRouter } from 'react-router-dom';
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Login from '../../components/Auth/Login';
import { Route, Redirect } from 'react-router-dom';
import Register from '../../components/Auth/Register';
import BillTable from '../../components/Bills/BillTable/BillTable';
import BillItems from '../../components/Bills/BillTable/BillItems/BillItems';
import CreateCustomer from '../../components/Customers/CreateCustomer/CreateCustomer';
import CreateBill from '../../components/Bills/CreateBill/CreateBill';
import CreateItem from '../../components/Bills/CreateItem/CreateItem';
import EditCustomer from '../../components/Customers/EditCustomer/EditCustomer';
// import CustomerManager from '../src/containers/CustomerManager/CustomerManager';



axios.defaults.baseURL = 'http://www.fulek.com/nks/api/aw';


// upgrade - napraviti novu hoc komponentu error handler gdje cu wrepat ovu komponentu u taj error handler
axios.interceptors.request.use((config) => {
  const token = auth.getToken()
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use((response) => {
  //console.log(response);
  return response;
}, error => {
  if (401 === error.response.status) {
    alert("Server error!")
  } else if (404 === error.response.status) {
    alert("Server could't find the requested data!")
  }
  else {
    return Promise.reject(error);
  }
}

);


class CustomerManager extends Component {

  render() {

    let isAuth = auth.getUser('user');

    return (
      <BrowserRouter>
        <Aux>
          {/* <Toolbar /> */}
          <div className="container-fluid">
            <div className="jumbotron">
              {/* <CustomerTable /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={CustomerTable} />
              <Route exact path="/customers/:customerId/bills" component={BillTable} />
              <Route exact path="/customers/:customerId/:billId/items" component={BillItems} />
              <Route exact path="/customer/create" render={() => (isAuth ? (<CreateCustomer />) : (<Redirect to="/login" />))} />
              <Route exact path="/customers/:customerId/bills/create" render={(props) => (isAuth ? (<CreateBill {...props} key={this.props.location.key} />) : (<Redirect to="/login" />))} />
              <Route exact path="/customers/:customerId/:billId/items/create"  render={(props) => (isAuth ? (<CreateItem {...props} key={this.props.location.key} />) : (<Redirect to="/login" />))} />
              <Route exact path="/customers/:customerId/edit"  render={(props) => (isAuth ? (<EditCustomer {...props} key={this.props.location.key} />) : (<Redirect to="/login" />))} />

            </div>
          </div>
        </Aux>
      </BrowserRouter>

    );
  }
}


export default CustomerManager;