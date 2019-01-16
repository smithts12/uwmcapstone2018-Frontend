
// Education schema:
// id: string
// name: string
// degree: string
// fieldOfStudy: string
// startDate: string (YYYY-MM-DD)
// endDate: string (YYYY-MM-DD)

function mapSpringToClient(springData) {
    return { id: springData.id || springData.ID,
        userID: springData.userID || springData.USER_ID,
        name: springData.schoolName || springData.SCHOOL_NAME,
        degree: springData.degree || springData.DEGREE,
        fieldOfStudy: springData.fieldOfStudy || springData.FIELD_OF_STUDY,
        startDate: springData.startDate || springData.START_DATE,
        endDate: springData.endDate || springData.END_DATE,
        street1: springData.street1 || springData.STREET_1,
        street2: springData.street2 || springData.STREET_2,
        city: springData.city || springData.CITY,
        state: springData.state || springData.STATE,
        zip: springData.zipCode || springData.ZIP_CODE
    };
}

function mapClientToSpring(clientData) {
    console.log('clientData: ' + JSON.stringify(clientData));
    return { id: clientData.id,
        userID: clientData.userID,
        schoolName: clientData.name,
        degree: clientData.degree,
        fieldOfStudy: clientData.fieldOfStudy,
        startDate: clientData.startDate,
        endDate: clientData.endDate,
        street1: clientData.street1,
        street2: clientData.street2,
        city: clientData.city,
        state: clientData.state,
        zipCode: clientData.zip
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
    proxyRoute: '/education',
    serviceRoute: '/education',
    transform,
    mockConfig: {
        root: 'education',
        responses: {
            getAll: true,
            create: true,
            update: true,
            delete: true
        }
    }
};
