module.exports = (faker, rand) => ({
    id: faker.random.uuid(),
    title: rand.maybe(faker.name.prefix()),
    firstName: faker.name.firstName(),
    middleName: rand.maybe(faker.name.firstName()),
    lastName: faker.name.lastName(),
    mobilePhone: faker.phone.phoneNumber('###-###-####'),
    homePhone: rand.maybe(faker.phone.phoneNumber('###-###-####')),
    email: faker.internet.email(),
    website: rand.maybe(faker.internet.url)
});
