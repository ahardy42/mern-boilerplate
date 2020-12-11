import React from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';


export default function Header() {

    const location = useLocation();

    const returnName = () => location.pathname.slice(1).toUpperCase() || "HOME"

    return (
        <Navbar fixed='top' variant='primary' bg='light'>
            <Navbar.Brand href='#'>MERN Boilerplate</Navbar.Brand>
            <Nav.Item>{returnName()}</Nav.Item>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Navbar>
    )
}