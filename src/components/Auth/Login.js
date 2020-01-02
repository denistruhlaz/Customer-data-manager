import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auks';

import './Login.css';


class Login extends Component {

    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            username: '',
            password: '',
            loginErrors: ''
        };
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    submitHandler(event) {

        const login = {
            username: this.state.username,
            password: this.state.password
        }

        // pitati zasto nece raditi ?!?!?!? a iznad na identicni pristup hoce
        // const{username, password} = this.state

        // axios.post('/login', username, password).then(response => {

        axios.post('/login', login)
            .then(response => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(response.data))
                window.location.href = "/";
            }).catch(error => {
                console.log("login error", error);
            });

        this.setState({
            username: '',
            password: ''
        })

        event.preventDefault();
    }


    render() {
        return (
            <Aux>
                <div className="loginForm ml-auto mr-auto mt-4">

                    <h4 className="mt-xl-n5 mb-4"> <Link to="/" >Login</Link></h4>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter username/email" name="username" required value={this.state.username} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" required value={this.state.password} onChange={this.changeHandler} />
                        </Form.Group>

                        <Button variant="primary" size="lg" block type="submit">Login</Button>
                    </Form>
                </div>
            </Aux>
        );
    }
}


export default Login;