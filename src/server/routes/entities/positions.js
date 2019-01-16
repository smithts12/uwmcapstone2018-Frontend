
// Position schema:
// id: string
// title: string
// description: string
// startDate: string (YYYY-MM-DD)
// endDate: string (YYYY-MM-DD)
// TODO: Add payperiod (not present on backend)

function mapSpringToClient(springData) {
    return { id: springData.id || springData.ID,
        userID: springData.userID || springData.USER_ID,
        companyId: springData.companyID || springData.COMPANY_ID,
        title: springData.name || springData.NAME,
        startPay: springData.startPay || springData.START_PAY,
        endPay: springData.endPay || springData.END_PAY,
        startDate: springData.startDate || springData.START_DATE,
        endDate: springData.endDate || springData.END_DATE
    };
}

function mapClientToSpring(clientData) {
    return { id: clientData.id,
        userID: clientData.userID,
        companyID: clientData.companyId,
        name: clientData.title,
        startPay: clientData.startPay,
        endPay: clientData.endPay,
        startDate: clientData.startDate,
        endDate: clientData.endDate
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
    proxyRoute: '/positions',
    serviceRoute: '/position',
    transform,
    mockConfig: {
        root: 'positions',
        responses: {
            getAll: true,
            create: true,
            update: true,
            delete: true
        }
    }
};
