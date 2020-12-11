import React from 'react';
import {
    Container,
    Jumbotron,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Lost() {
    return (
        <Container>
            <Jumbotron className='mt-5'>
                <h1>Looks like you're lost!</h1>
                <Button as={Link} to='/'>Head Home</Button>
            </Jumbotron>
        </Container>
    )
}