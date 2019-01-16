import React from 'react';
import EntityPage from '../';
import { Position } from '../../../components';

const ExperiencePage = ({ auth }) => (
    <EntityPage
        title='Experience'
        entityType='positions'
        Component={Position}
        auth={auth}
    />
);

export default ExperiencePage;
