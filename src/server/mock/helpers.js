module.exports = {
    /**
     * Generates an array of filled with result of function.
     * @param  {object} faker Faker instance (possibly seeded)
     * @param  {object} rand RNG (possibly seeded)
     * @param  {function} generator Function to generate an element for the array.
     * @param  {number} min Minimum length of array, inclusive. (default 1)
     * @param  {number} max Maximum length of array, inclusive. (default 5)
     */
    generateArray: (faker, rand, generator, min = 1, max = 5) =>
        new Array(rand.intBetween(min, max))
            .fill(null)
            .map(generator.bind(null, faker, rand)),

    /**
     * Generates a pair of random sequential dates.
     * @param  {object} faker Faker instance (possibly seeded)
     * @param  {object} rand RNG (possibly seeded)
     * @param  {boolean} allowUndefined If true then the second date may be undefined. (default true)
     */
    randomDateRange: (faker, rand, allowUndefined = true) => {
        const startDate = new Date(faker.date.past(20));
        const endDate = allowUndefined && rand.maybe(true)
            ? undefined
            : new Date(startDate.getTime() + rand.random() * (Date.now() - startDate.getTime()));
        return [startDate, endDate].map(date => date ? date.toISOString().split('T')[0] : undefined);
    },

    /**
     * Generates a pair of random increasing hourly pay amounts.
     * @param  {object} faker Faker instance (possibly seeded)
     * @param  {boolean} useSalary Generate salary amounts instead of hourly (default false)
     */
    randomPayRange: (faker, useSalary = false) => {
        const startPay = faker.finance.amount(useSalary ? 20000 : 7, useSalary ? 500000 : 20, useSalary ? 0 : 2, '$');
        const endPay = faker.finance.amount(startPay.replace('$', ''), useSalary ? 1000000 : 40, useSalary ? 0 : 2, '$');
        return [startPay, endPay];
    },
};
