import React from 'react';
import EntityPage from '../';
import { Contact } from '../../../components';

const ContactsPage = ({ auth }) => (
    <EntityPage
        title='Contacts'
        entityType='contacts'
        Component={Contact}
        auth={auth}
    />
);

export default ContactsPage;
