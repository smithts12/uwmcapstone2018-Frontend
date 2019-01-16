module.exports = (faker, rand) => {
    return {
        street1: faker.address.streetAddress(),
        street2: rand.maybe(faker.address.secondaryAddress(), 0.2),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode('#####')
    };
};
