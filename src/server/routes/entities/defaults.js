const config = require('config');

const transform = {
    clientToSpring: {
        getAll: x => x,
        create: x => x,
        update: x => x,
        delete: x => x,
    },
    springToClient: {
        getAll: x => x,
        create: x => x,
        update: x => x,
        delete: x => x,
    }
};

module.exports = {
    serviceUrl: config.get('serviceUrl'),
    transform,
    useMock: config.get('useMock'),
};
