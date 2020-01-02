import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import axios from 'axios';
import CustomerList from './CustomerList/CustomerList';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import Pagination from '../../Pagination/Pagination';
import Spinner from '../../UI/Spinner/Spinner';
import { auth } from '../../Auth/Auth';
// import Modal from '../../UI/Modal/Modal';



class CustomerTable extends Component {

    _isMounted = false;

    state = {
        loading: true,
        customers: [],
        cities: [],
        states: [],
        pageSize: 10,
        currentPage: 1,
        // delete: false
    }


    componentDidMount() {
        this._isMounted = true;
        this.getCustomers()
        this.getCities()
        this.getStates()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCustomers = () => {
        axios.get('/customers')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ customers: response.data, loading: false });
                }
                // console.log(this.state.customers)
            }).catch(error => {
                console.log(error);
            })
    }

    getCities = () => {
        axios.get('/cities')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ cities: response.data, loading: false });
                }
                // console.log(this.state.cities)
            }).catch(error => {
                console.log(error);
            })
    }

    getStates = () => {
        axios.get('/states')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ states: response.data, loading: false });
                }
                // console.log(this.state.states)
            }).catch(error => {
                console.log(error);
            })
    }

    pageChangeSizeHandler = (customerList, pageNumber, pageSize) => {
        const index = (pageNumber - 1) * pageSize;
        return lodash(customerList).slice(index).take(pageSize).value();
    }

    pageChangeHandler = (page) => {
        this.setState({ currentPage: page });
    }

    pageRowsHandler = (event) => {
        let page = parseInt(event.target.value);
        this.setState({ pageSize: page });
    }

    customerListHandler = () => {
        let mCustomers = this.mapCustomerCityState(this.state.customers, this.state.cities, this.state.states);
        let customers = this.pageChangeSizeHandler(mCustomers, this.state.currentPage, this.state.pageSize);
        return customers.map((customers) => {
            return <CustomerList customer={customers} key={customers.Id} deleteHandler={this.deleteHandler} />;
        })
    }

    mapCustomerCityState = (customers, cities, states) => {
        const mappingCustomers = [];

        customers.map((customer) => {
            cities.map((city) => {
                states.map((state) => {
                    const newCustomer = customer;
                    if (newCustomer.CityId === city.Id && city.StateId === state.Id) {
                        newCustomer.CityName = city.Name;
                        newCustomer.StateName = state.Name
                        mappingCustomers.push(newCustomer);
                        //console.log(mappingCustomers);
                    }
                    return state;
                });
                return city;
            });
            return customer;
        });
        return mappingCustomers;
    }

    searchHandler = (event) => {
        let search = event.target.value.toLowerCase();
        // eslint-disable-next-line
        const filter = this.state.customers.filter((customer) => {
            if (search !== "") {
                return customer.Name.toLowerCase().indexOf(search) !== -1
                    || customer.Surname.toLowerCase().indexOf(search) !== -1
                    || customer.Email.toLowerCase().indexOf(search) !== -1
                    || customer.Telephone.toLowerCase().indexOf(search) !== -1
                    || customer.StateName.toLowerCase().indexOf(search) !== -1
                    || customer.CityName.toLowerCase().indexOf(search) !== -1;
            }
        });
        if (filter.length > 0) {
            this.setState({ customers: filter });
        }
        else {
            this.getCustomers();
        }
    }

    deleteHandler = (id) => {
        axios.post('/deletecustomer', { Id: id })
            .then(response => {
                this.getCustomers();
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    deleteContinueHandler = () => {
        this.setState({delete: true});
    }
    deleteCancelHandler = () => {
        this.setState({delete: false});
    }


    render() {

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Aux>

                {/* <Modal show={this.state.delete} modalClosed={this.deleteCancelHandler}> */}

                <h4 className="mt-xl-n5"> <Link to="/" className="">Customers List</Link></h4>
                {auth.getUser() ?
                    (<Button variant="outline-primary" className="mb-2">
                        <Link to="/customer/create">

                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512" width="20" className="mr-1"><path fill="#007bff" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" /><path fill="#007bff" d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path fill="#007bff" d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0" /></svg>

                            Create new customer</Link></Button>)
                    :('')}

                <div className="float-right">
                    <Form inline>
                        {/* <Form.Label column >Search: </Form.Label>                */}
                        <FormControl type="text" placeholder="Search" className="mb-2" onChange={this.searchHandler} />

                        <div className="mb-2 ml-2">
                            Items per page:
                                <FormControl className="ml-2" as="select" onChange={this.pageRowsHandler}>
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </FormControl>
                        </div>
                    </Form>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* <CustomerList customers={this.state.customers} /> */}
                        {this.customerListHandler()}
                    </tbody>

                </Table>
                {/* </ Modal> */}

                {auth.getUser() ? (<Button variant="outline-primary" className="mb-2"><Link to="/customer/create">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512" width="20" className="mr-1"><path fill="#007bff" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" /><path fill="#007bff" d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path fill="#007bff" d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                    Create new customer</Link></Button>) : ''}

                <Pagination
                    listCount={this.state.customers.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onChange={this.pageChangeHandler}
                />
            </Aux>
        );
    }
}

export default CustomerTable;