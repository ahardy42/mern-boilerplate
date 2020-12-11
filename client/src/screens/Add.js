import React from 'react';
import {
    Container,
    Jumbotron,
    Form,
    Row,
    Col,
    Button,
    Alert
} from 'react-bootstrap';
import { apiPost } from '../utils/api';

export default function Add({history}) {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    const validateEmail = () => {
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        return regex.test(email)
    }

    const submitUser = () => {
        
        setError('');

        if (!validateEmail()) {
            return setError('invalid email');
        }

        if (!firstName.trim()) {
            return setError('must include a first name')
        }

        if (!lastName.trim()) {
            return setError('must include a last name')
        }

        const user = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim()
        }

        apiPost('/api/users/new', user)
            .then(response => {
                console.log(response, user);
                history.push('/users/show/' + response.data._id)
            })
            .catch(error => {
                console.log(error, user);
                setError(error.error?.message || 'something went wrong')
            })

    }

    return (
        <Container className='pt-5'>
            <Jumbotron className='mt-5'>
                <h1>Add A User!</h1>
            </Jumbotron>
            <Row>
                <Col>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form>
                        <Form.Group controlId='firstName'>
                            <Form.Label>first name</Form.Label>
                            <Form.Control type='text' placeholder='first name' value={firstName} onChange={({target}) => setFirstName(target.value)} />
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label>last name</Form.Label>
                            <Form.Control type='text' placeholder='last name' value={lastName} onChange={({target}) => setLastName(target.value)} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>email</Form.Label>
                            <Form.Control type='email' placeholder='email' value={email} onChange={({target}) => setEmail(target.value)} />
                        </Form.Group>
                        <Button variant='success' onClick={submitUser}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}