const addressGenerator = require('./address');
const { randomDateRange } = require('../helpers');

module.exports = (faker, rand) => {
    const [startDate, endDate] = randomDateRange(faker, rand, false);
    return {
        id: faker.random.uuid(),
        name: `U${faker.address.stateAbbr()}`,
        degree: rand.maybe('BA', 0.5, 'GED'),
        fieldOfStudy: `${faker.name.jobDescriptor()} ${faker.name.jobArea()}`,
        startDate,
        endDate,
        ...addressGenerator(faker, rand),
    };
};
