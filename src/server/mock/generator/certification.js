const { randomDateRange } = require('../helpers');

module.exports = (faker, rand) => {
    const [acquireDate, expireDate] = randomDateRange(faker, rand, false);
    return {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        authority: faker.company.companyName(),
        licenseNumber: faker.finance.bitcoinAddress(),
        website: rand.maybe(faker.internet.url(), 0.3),
        acquireDate,
        expireDate
    };
};
