
export const alwaysTrue = value => true;

export const lengthBetween = (minLength, maxLength, value) => value && value.length >= minLength && value.length <= maxLength;

export const startDate = (endDate, value) => {
    // TODO: return true if startDate is before endDate (or endDate is null/empty)
    return true;
};
export const notEmpty = (value) => value && value.length > 0;

export const isNumeric = (value) => value && !isNaN(value);

export const validZip = (value) => value && /^[0-9]{5}$/.test(value);

export const validMoney = (value) => value && /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

export const validState = (value) => value && /^[A-Z]{2}$/.test(value);

export const validEmail = (value) => {
    value && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
};
