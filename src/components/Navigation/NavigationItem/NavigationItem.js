import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { auth } from '../../Auth/Auth';


const navigationItem = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Customer Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {auth.getUser() ? (

            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text><span className="text-dark ml-2">Signed in as: {auth.getUser()}</span></Navbar.Text>
                {/* <Navbar.Text><span className="ml-2"><a href="/" onClick={() => localStorage.removeItem('user')} >Logout</a></span></Navbar.Text> */}
                <Button variant="outline-primary" className="ml-2"><a href="/" onClick={() => localStorage.removeItem('user')}>Logout</a> </Button>
            </Navbar.Collapse>

        ) : (

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-sm-2">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>

            )}

    </Navbar>




);

export default navigationItem;