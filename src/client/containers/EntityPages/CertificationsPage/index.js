import React from 'react';
import EntityPage from '../';
import { Certification } from '../../../components';

const CertificationsPage = ({ auth }) => (
    <EntityPage
        title='Certifications'
        entityType='certifications'
        Component={Certification}
        auth={auth}
    />
);

export default CertificationsPage;
