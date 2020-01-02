import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import Aux from '../../../hoc/Auks';
import './EditCustomer.css';

class EditCustomer extends Component {

    _isMounted = false;

    constructor(props) {
        super(props)

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        const state = this.props.location.state;

        this.state = {
            Id: state.Id,
            Name: state.Name,
            Surname: state.Surname,
            Email: state.Email,
            Telephone: state.Telephone,
            CityName: state.CityName,
            StateName: state.StateName,
            Cities: [],
            CityId: null,
            States: [],
            StateId: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCities()
        this.getStates()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCities = () => {
        axios.get('/cities')
            .then(response => {
                if (this._isMounted) {
                    this.setState({ Cities: response.data });
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
                    this.setState({ States: response.data });
                }
                // console.log(this.state.states)
            }).catch(error => {
                console.log(error);
            })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submitHandler = (event) => {
        const updateCustomer = {
            Id: this.state.Id,
            Name: this.state.Name,
            Surname: this.state.Surname,
            Email: this.state.Email,
            Telephone: this.state.Telephone,
            StateId: this.state.StateId,
            CityId: this.state.CityId
        }

        axios.post('/editcustomer', updateCustomer)
            .then(response => {
                // console.log(response);
                window.location.href = "/";
            }).catch(error => {
                console.log(error);
            });


        this.setState({
            Name: '',
            Surname: '',
            Email: '',
            Telephone: '',
            CityId: null,
            StateId: null
        });

        event.preventDefault();
    }



    render() {
        return (
            <Aux>
                {/* <div className="mb-5">
                <h4 className="mt-xl-n5"> <Link to="/" >New customer</Link></h4>

            </div> */}
                <div className="editForm ml-auto mr-auto mt-4">
                    <h4 className="mt-xl-n5"> <Link to="/" >Edit customer</Link></h4>
                    <Form onSubmit={this.submitHandler}>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="Name" required value={this.state.Name} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" placeholder="Enter surname" name="Surname" required value={this.state.Surname} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email address" name="Email" required value={this.state.Email} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicTelephone">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="tel" placeholder="Enter telephone nr." name="Telephone" required value={this.state.Telephone} onChange={this.changeHandler} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" name="StateId" onChange={this.changeHandler}>
                                    <option>{this.state.StateName}</option>
                                    {this.state.States.map((state) => {
                                        return <option key={state.Id} value={state.Id}>{state.Name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control as="select" name="CityId" onChange={this.changeHandler}>
                                    <option >{this.state.CityName}</option>
                                    {this.state.Cities.map((city) => {
                                        return <option key={city.Id} value={city.Id}>{city.Name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" size="lg" block type="submit">Edit customer</Button>
                    </Form>

                </div>
            </Aux>
        )
    }
}


export default EditCustomer;