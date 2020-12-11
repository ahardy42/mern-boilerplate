import React from 'react';
import {
    Jumbotron,
    Container,
    Alert,
    ListGroup,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiGet } from '../utils/api';

export default function Show({match, history}) {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const { userId } = match.params;
        if (!userId || userId === 'undefined') return history.replace('/');

        apiGet(`/api/users/${userId}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                setError(err.error?.message || 'something went wrong');
            })
    }, [])

    return (
        <Container className='pt-5'>
            {Boolean(error) && <Alert variant='danger'>{error}</Alert>}
            <Jumbotron className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                <Row className='mb-5'>
                    <Col>
                        <h1>Welcome {user?.firstName} {user?.lastName}!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button as={Link} to={`/users/edit/${match.params.userId}`}>Edit</Button>
                    </Col>
                    <Col>
                        <Button variant='danger'>Delete</Button>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}