import React from 'react';
import { ProfileButton } from '..';
import './styles.scss';

export default ({ title, auth }) => {
    return (
        <header>
            <h1>{title}</h1>
            <ProfileButton auth={auth} />
        </header>
    );
};
