import React from 'react';
import Address from '.';
import { shallow } from 'enzyme';

const props = {
    address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
    },
    invalidFields: {},
    changeField: jest.fn(),
    disabled: false,
};

describe('Address Form Fragment', () => {
    let address;
    beforeEach(() => {
        address = shallow(<Address {...props} />);
    });

    it('should render without crashing', () => {
        expect(address).toHaveLength(1);
    });

    it('should populate its fields with props.address data', () => {
        const inputs = address.find('Input');
        expect(inputs).toHaveLength(5);
        Object.entries(props.address).forEach(([name, value]) => {
            expect(inputs.findWhere(input => input.prop('name') === name).prop('value')).toEqual(value);
        });
    });
    it('should disable all its fields if props.disabled is true', () => {
        address.find('Input').forEach(input => {
            expect(input.prop('disabled')).toEqual(props.disabled);
        });
    });
    it('should call props.changeField when any field is changed', () => {
        address.setProps({ disabled: false });
        address.find('Input').forEach(input => {
            const event = { target: { name: input.prop('name'), value: 'x' } };
            input.simulate('change', event);
            expect(props.changeField).toBeCalled();
            expect(props.changeField.mock.calls).toHaveLength(1);
            expect(props.changeField).toBeCalledWith(expect.anything(), event);
            props.changeField.mockReset();
        });
    });
});
