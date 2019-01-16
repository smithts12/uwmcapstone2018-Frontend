import React from 'react';
import EntityPage from '../';
import { Company } from '../../../components';

const CompaniesPage = ({ auth }) => (
    <EntityPage
        title='Companies'
        entityType='companies'
        Component={Company}
        auth={auth}
    />
);

export default CompaniesPage;
