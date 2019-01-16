module.exports = [
    'address',
    'certification',
    'company',
    'contact',
    'education',
    'position',
    'project',
    'user',
].reduce((acc, key) => ({
    ...acc,
    [key]: require(`./${key}`),
}), {});
