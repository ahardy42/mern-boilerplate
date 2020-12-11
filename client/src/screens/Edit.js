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
import { apiPut, apiGet } from '../utils/api';

export default function Edit({match, history}) {
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [error, setError] = React.useState('');

    const submitUser = () => {
        
        setError('');

        if (!firstName.trim()) {
            return setError('must include a first name')
        }

        if (!lastName.trim()) {
            return setError('must include a last name')
        }

        const user = {
            firstName: firstName.trim(),
            lastName: lastName.trim()
        }

        apiPut(`/api/users/edit/${match.params.userId}`, user)
            .then(response => {
                console.log(response, user);
                history.push('/users/show/' + response.data._id)
            })
            .catch(error => {
                console.log(error, user);
                setError(error.error?.message || 'something went wrong')
            })

    }

    React.useEffect(() => {
        const {userId} = match.params;
        apiGet(`/api/users/${userId}`)
            .then(res => {
                const {firstName, lastName} = res.data;
                setFirstName(firstName)
                setLastName(lastName)
            })
            .catch(err => {
                setError(err.error?.message || 'something went wrong');
            })
    }, [])

    return (
        <Container className='pt-5'>
            <Jumbotron className='mt-5'>
                <h1>Edit A User!</h1>
            </Jumbotron>
            <Row>
                <Col>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form>
                        <Form.Group controlId='firstName'>
                            <Form.Label>first name</Form.Label>
                            <Form.Control disabled={firstName === null} type='text' placeholder='first name' value={firstName} onChange={({target}) => setFirstName(target.value)} />
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label>last name</Form.Label>
                            <Form.Control disabled={lastName === null} type='text' placeholder='last name' value={lastName} onChange={({target}) => setLastName(target.value)} />
                        </Form.Group>
                        <Button variant='success' onClick={submitUser}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}