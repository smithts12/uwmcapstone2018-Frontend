import React from 'react';
import EntityPage from '../';
import { Education } from '../../../components';

const EducationPage = ({ auth }) => (
    <EntityPage
        title='Education'
        entityType='education'
        Component={Education}
        auth={auth}
    />
);

export default EducationPage;
