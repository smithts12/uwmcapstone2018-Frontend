import React from 'react';
import { Container } from 'reactstrap';
import LoginButton from '../../components/LoginButton';
import './styles.scss';

export const LoginPage = props => (
    <Container fluid={true} id='LOGIN_PAGE'>
        <main >
            <div className='vertical-center'>
                <h1>Organize Your Job Hunt - Forever.</h1>
                <LoginButton auth={props.auth} />
            </div>
        </main>
    </Container>
);

export default LoginPage;
