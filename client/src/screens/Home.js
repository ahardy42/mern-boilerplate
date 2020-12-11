import React from 'react';
import {
    Container,
    Jumbotron,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home({ location }) {
    return (
        <Container className='pt-5'>
            <Jumbotron className='mt-5'>
                <h1>Welcome to the MERN stack starter app</h1>
                <p>Happy Editing</p>
                <Button as={Link} to='/users/add'>Add A User</Button>
            </Jumbotron>
        </Container>
    )
}