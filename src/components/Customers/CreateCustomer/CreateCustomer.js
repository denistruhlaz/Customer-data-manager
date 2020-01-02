import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import './CreateCustomer.css';


class CreateCustomer extends Component {

    constructor(props) {
        super(props)

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            Name: '',
            Surname: '',
            Email: '',
            Telephone: '',
            Cities: [],
            CityId: null
        };
    }


    componentDidMount() {
        axios.get('/cities')
            .then(response => {
                this.setState({ Cities: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submitHandler = (event) => {
        const createCustomer = {
            Name: this.state.Name,
            Surname: this.state.Surname,
            Email: this.state.Email,
            Telephone: this.state.Telephone,
            CityId: this.state.CityId
        }

        axios.post('/addcustomer', createCustomer)
            .then(response => {
                this.props.history.replace('/')
                // console.log(response);
            }).catch(error => {
                console.log("login error", error);
            });


        this.setState({
            Name: '',
            Surname: '',
            Email: '',
            Telephone: '',
            CityId: null
        })

        event.preventDefault();
    }

    render() {
        return (
            <Aux>
                {/* <div className="mb-5">
                    <h4 className="mt-xl-n5"> <Link to="/" >New customer</Link></h4>

                </div> */}
                
                <div className="createForm ml-auto mr-auto mt-4">
                    <h4 className="mt-xl-n5"> <Link to="/" >New customer</Link></h4>
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
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicTelephone">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter telephone nr." name="Telephone" required value={this.state.Telephone} onChange={this.changeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control as="select" name="CityId" onChange={this.changeHandler}>
                                    <option>Choose...</option>
                                    {this.state.Cities.map((city, i) => {
                                        return <option key={i} value={city.Id}>{city.Name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group></Form.Row>

                        <Button variant="primary" size="lg" block type="submit">Create</Button>
                    </Form>

                </div>
            </Aux>
        );
    }

}

export default CreateCustomer;