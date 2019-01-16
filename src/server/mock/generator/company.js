const addressGenerator = require('./address');

module.exports = (faker, rand) => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber('###-###-####'),
    website: rand.maybe(faker.internet.url(), 0.4),
    ...addressGenerator(faker, rand)
});
