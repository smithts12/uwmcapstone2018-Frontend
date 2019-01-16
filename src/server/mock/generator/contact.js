module.exports = (faker, rand) => ({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: rand.maybe(faker.name.jobTitle(), 0.4),
    phone: rand.maybe(faker.phone.phoneNumber('###-###-####'), 0.4),
    email: faker.internet.email(),
    notes: faker.lorem.paragraph(rand.intBetween(0, 7)),
});
