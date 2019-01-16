
function mapSpringToClient(springProject) {
    return { id: springProject.id || springProject.ID,
        positionId: springProject.positionID || springProject.POSITION_ID,
        educationId: springProject.educationID || springProject.EDUCATION_ID,
        title: springProject.title || springProject.TITLE,
        description: springProject.description || springProject.DESCRIPTION,
        startDate: springProject.startDate || springProject.START_DATE,
        endDate: springProject.endDate || springProject.END_DATE
    };
}

function mapClientToSpring(clientProject) {
    return { id: clientProject.id,
        userID: clientProject.userID,
        positionID: clientProject.positionId,
        educationID: clientProject.educationId,
        title: clientProject.title,
        description: clientProject.description,
        startDate: clientProject.startDate,
        endDate: clientProject.endDate
    };
}

const transform = {
    springToClient: {
        getAll: springData => springData.map(x => mapSpringToClient(x)),
        create: x => mapSpringToClient(x),
        update: x => mapSpringToClient(x),
        delete: x => mapSpringToClient(x)
    },
    clientToSpring: {
        create: x => mapClientToSpring(x),
        update: x => mapClientToSpring(x),
        delete: x => mapClientToSpring(x)
    }
};

module.exports = {
    proxyRoute: '/projects',
    serviceRoute: '/project',
    transform,
    mockConfig: {
        root: 'projects',
        responses: {
            getAll: true,
            create: true,
            update: true,
            delete: false
        }
    }
};
