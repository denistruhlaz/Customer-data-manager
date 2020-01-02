import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auks';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            name: '',
            username: '',
            password: '',
            cityId: null,
            loginErrors: ''
        };

    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submitHandler(event) {
        const register = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        }

        axios.post('/registeruser', register).then(response => {
            alert("User successfully registered!")
            this.props.history.push('login')
            console.log(response);
        }).catch(error => {
            console.log("register error", error);
        });

        this.setState({
            name: '',
            username: '',
            password: ''
        })

        event.preventDefault();
    }


    render() {
        return (
            <Aux>
                <div className="registerForm ml-auto mt-4 w-75">
                    <h4 className="mt-xl-n5 mb-4"> <Link to="/" >Register</Link></h4>
                    <Form onSubmit={this.submitHandler}>
                        <Row >
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" name="name" required value={this.state.name} onChange={this.changeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formUsername">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" name="username" required value={this.state.username} onChange={this.changeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" required value={this.state.password} onChange={this.changeHandler} />
                                </Form.Group>


                                <Button variant="primary" size="lg" block type="submit"> Register</Button>


                                {/* <Link className="btn btn-primary" to={"/login"} size="lg">Login</Link> */}
                            </Col>

                            <Col>
                                <Form.Label className="text-center" width="100%">If you already have account</Form.Label>
                                <Button variant="primary" size="lg" block onClick={event => window.location.href = '/login'}> Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Aux>
        );
    }
}


export default Register;