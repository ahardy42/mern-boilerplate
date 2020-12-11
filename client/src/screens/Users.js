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

export default function Users() {

    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        apiGet('/api/users')
            .then(response => {
                const { data } = response;
                setUsers(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const deleteUser = userId => {

    }

    return (
        <Container className='pt-5'>
            {Boolean(error) && <Alert variant='danger'>{error}</Alert>}
            <Jumbotron className='mt-5'>
                <h1>Welcome to the Users screen</h1>
                <p>Here you will find Users present in the database</p>
                <Button as={Link} to='/users/add'>Add A User</Button>
            </Jumbotron>
            <Row>
                <Col>
                    <ListGroup>
                        {users.map((user, i) => {
                            return (
                                <ListGroup.Item key={user._id}>
                                    <Row className='d-flex justify-content-between align-items-center'>
                                        <Col sm={8} className='d-flex'>
                                            <div className='px-2'>#{i + 1}</div>
                                            <div className='px-2'>Name: {user.firstName} {user.lastName}</div>
                                            <div className='px-2'>Email: {user.email}</div>
                                        </Col>
                                        <Col sm={4} className='d-flex justify-content-end'>
                                            <Button variant='success' as={Link} to={`/users/show/${user._id}`} className='mx-2'>Show</Button>
                                            <Button as={Link} to={`/users/edit/${user._id}`} className='mx-2'>Edit</Button>
                                            <Button onClick={() => deleteUser(user._id)} variant='danger' className='mx-2'>Delete</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}