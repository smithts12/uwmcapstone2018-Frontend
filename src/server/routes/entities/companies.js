
// Company schema:
// id: string
// name: string
// phone: string
// website: string

function mapSpringToClient(springData) {
    return { id: springData.id || springData.ID,
        userID: springData.userID || springData.USER_ID,
        name: springData.name || springData.NAME,
        phone: springData.phoneNumber || springData.PHONE_NUMBER,
        website: springData.website || springData.WEBSITE,
        street1: springData.street1 || springData.STREET_1,
        street2: springData.street2 || springData.STREET_2,
        city: springData.city || springData.CITY,
        state: springData.state || springData.STATE,
        zip: springData.zipCode || springData.ZIP_CODE
    };
}

function mapClientToSpring(clientData) {
    return { id: clientData.id,
        userID: clientData.userID,
        name: clientData.name,
        phoneNumber: clientData.phone,
        website: clientData.website,
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
    proxyRoute: '/companies',
    serviceRoute: '/company',
    transform,
    mockConfig: {
        root: 'companies',
        responses: {
            getAll: true,
            create: true,
            update: true,
            delete: true
        }
    }
};
