import { compact, flatten, chunk, range } from 'lodash';
import moment from 'moment';
import titleCase from 'title-case';

export const getNonCollidingSubsets = entities => {
    // TODO Create the minimum number of arrays to contain all events of this type so that no events in the same array overlap
    return chunk(entities);
};

const startDate = (entity = {}) => entity.startDate || entity.acquireDate || entity.endDate || entity.expireDate;
const endDate = (entity = {}) => entity.endDate || entity.expireDate || entity.startDate || entity.acquireDate;

export const getMaximumDate = (entities, findEarliest = true) => {
    const lists = Object.values(entities).map(entityType => entityType.list);
    const getDate = findEarliest ? startDate : endDate;

    // Get the maximum date of an array of objects that have startDate/acquireDate or endDate/expireDate properties
    const isNewBest = (current, oldBest) => findEarliest ? current.isBefore(oldBest) : current.isSameOrAfter(oldBest);

    // Takes in array of entities, returns one with maximum date
    const getBestOfArray = arr => {
        let bestEntity;
        arr.forEach(entity => {
            const curDate = getDate(entity);
            if (curDate && (!bestEntity || (isNewBest(moment(curDate), moment(getDate(bestEntity)))))) {
                bestEntity = entity;
            }
        });
        return bestEntity;
    };

    // Get the maximum date for each type of event (e.g. earliest position, earliest project...)
    // Then return the maximum of those
    // ...lol sorry about next line
    return moment(getDate(
        getBestOfArray(
            compact(flatten(
                lists.map(getBestOfArray)
            ))
        )
    ));
};

export const buildTimebar = (startYear, endYear) => {
    // Create array of all years to show
    const yearRange = range(startYear, endYear);
    return [
        {
            id: 'years',
            title: '',
            cells: yearRange.map(year => ({
                id: `timeline-year-${year}`,
                title: String(year),
                start: new Date(`${year}-01-01`),
                end: new Date(`${year}-12-31`),
            })),
            style: {},
        },
    ];
};

const bgColors = {
    'certifications': '',
    'education': '',
    'positions': '',
    'projects': ''
};

export const buildElement = (entityType, startYear, endYear, entityData) => {
    return {
        id: `${entityType}-track-element-${entityData.id}`,
        title: entityData.name || entityData.title || '',
        start: new Date(entityData.startDate || entityData.acquireDate || `${startYear}-01-01`),
        end: new Date(entityData.endDate || entityData.expireDate || `${endYear}-12-31`),
        style: {
            backgroundColor: bgColors[entityType],
            color: '#000000',
            borderRadius: '4px',
            boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
        },
        entityType,
        entityData,
    };
};

export const buildTrack = (entityType, entities, index, startYear, endYear) => {
    return (
        {
            id: `${entityType}-track-${index}`,
            title: titleCase(entityType),
            elements: entities.map(buildElement.bind(null, entityType, startYear, endYear)),
            hasButton: false,
            isOpen: true,
        }
    );
};
