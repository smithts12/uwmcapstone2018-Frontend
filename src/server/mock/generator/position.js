const { randomDateRange, randomPayRange } = require('../helpers');

module.exports = (faker, rand) => {
    const [startDate, endDate] = randomDateRange(faker, rand, false);
    const useSalary = rand.maybe(true);
    const [startPay, endPay] = randomPayRange(faker, useSalary);
    const payPeriod = useSalary ? 'Salary' : 'Hourly';

    return {
        id: faker.random.uuid(),
        title: faker.name.jobTitle(),
        startPay,
        endPay,
        payPeriod,
        startDate,
        endDate
    };
};
