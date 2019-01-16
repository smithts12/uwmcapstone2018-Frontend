// Certification schema:
// id: string
// name: string
// authority: string
// licenseNumber: string
// website: string
// acquireDate: string
// expireDate: string (YYYY-MM-DD)

/*
    private LocalDateTime acquiredDate;
    private LocalDateTime expiredDate;
    private String website;
 */

function mapSpringToClient(springData) {
    return { id: springData.id || springData.ID,
        userID: springData.userID || springData.USER_ID,
        name: springData.name || springData.NAME,
        authority: springData.authority || springData.AUTHORITY,
        licenseNumber: springData.licenseNumber || springData.LICENSE_NUMBER,
        acquireDate: springData.acquiredDate || springData.ACQUIRED_DATE,
        expireDate: springData.expiredDate || springData.EXPIRED_DATE,
        website: springData.website || springData.WEBSITE
    };
}

function mapClientToSpring(clientData) {
    return { id: clientData.id,
        userID: clientData.userID,
        name: clientData.name,
        authority: clientData.authority,
        licenseNumber: clientData.licenseNumber,
        acquiredDate: clientData.acquireDate,
        expiredDate: clientData.expireDate,
        website: clientData.website
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
    proxyRoute: '/certifications',
    serviceRoute: '/certification',
    transform,
    mockConfig: {
        root: 'certifications',
        responses: {
            getAll: true,
            create: true,
            update: true,
            delete: true
        }
    }
};
