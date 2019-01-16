import React from 'react';
import EntityPage from '../';
import { Project } from '../../../components';

const ProjectsPage = ({ auth }) => (
    <EntityPage
        title='Projects'
        entityType='projects'
        Component={Project}
        auth={auth}
    />
);

export default ProjectsPage;
