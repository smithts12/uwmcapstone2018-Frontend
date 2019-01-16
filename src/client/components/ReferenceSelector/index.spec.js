import React from 'react';
import { shallow } from 'enzyme';
import { ReferenceSelector } from '.';

const props = {
    entityType: 'apples',
    name: 'appleId',
    onChange: jest.fn(),
    selectedId: 1,
    disabled: false,
    apples: {
        list: [
            { id: 1, name: 'gala' },
            { id: 2, name: 'grannysmith' }
        ]
    },
    oranges: {
        list: [
            { id: 3, name: 'valencia' }
        ]
    }
};

describe('ReferenceSelector', () => {
    let selector;
    beforeEach(() => {
        selector = shallow(<ReferenceSelector {...props} />);
    });

    it('should render the component without crashing', () => {
        expect(selector).toHaveLength(1);
    });

    it('should have one Input', () => {
        expect(selector.find('Input')).toHaveLength(1);
    });
    it('should have an option for each entity of that type and a none option', () => {
        expect(selector.find('Input').find('option')).toHaveLength(props.apples.list.length + 1);
    });
    it('should call onChange when selected option changes', () => {
        const event = { target: { name: props.name, value: props.apples.list[1].id } };
        selector.find('Input').simulate('change', event);
        expect(props.onChange).toBeCalled();
        expect(props.onChange.mock.calls).toHaveLength(1);
        expect(props.onChange).toBeCalledWith(event);
    });
    it('should replace "none" with null in onChange', () => {
        const event = { target: { name: props.name, value: 'none' } };
        const transformedEvent = { target: { name: props.name, value: null } };
        selector.find('Input').simulate('change', event);
        expect(props.onChange).toBeCalled();
        expect(props.onChange.mock.calls).toHaveLength(1);
        expect(props.onChange).toBeCalledWith(transformedEvent);
    });
    afterEach(() => {
        props.onChange.mockReset();
    });
});
