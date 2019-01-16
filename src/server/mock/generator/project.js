const { randomDateRange } = require('../helpers');

module.exports = (faker, rand) => {
    const [startDate, endDate] = randomDateRange(faker, rand, false);
    return {
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(rand.intBetween(2, 5), '\n'),
        startDate,
        endDate
    };
};
