import React from 'react';
import { Container } from 'reactstrap';
import { ProfileForm, Sidebar, Header } from '../../components';
import './styles.scss';

export const ProfilePage = ({ email, auth }) => {
    return (
        <Container fluid={true} id='PROFILE_PAGE'>
            <Sidebar />
            <Header title={'Profile Settings'} auth={auth} />
            <ProfileForm email={email} />
        </Container>
    );
};

export default ProfilePage;
