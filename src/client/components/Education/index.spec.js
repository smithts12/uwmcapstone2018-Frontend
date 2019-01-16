import React from 'react';
import { omit } from 'lodash';
import { shallow } from 'enzyme';
import { EducationForm } from '.';

const address = {
    'street1': '123 1st ave',
    'street2': 'apt 5',
    'city': 'milwaukee',
    'state': 'wi',
    'zip': '53211'
};

const props = {
    changeField: jest.fn(),
    entityData: {
        'name': 'uwm',
        'degree': 'masters',
        'fieldOfStudy': 'economics',
        'startDate': '2014-06-04',
        'endDate': '2010-01-12',
        ...address
    },
    invalidFields: {},
    disabled: true,
};

describe('EducationForm', () => {
    let form;
    beforeEach(() => {
        form = shallow(<EducationForm {...props} />);
    });

    it('should render the component without crashing', () => {
        expect(form).toHaveLength(1);
    });
    it('should populate its child fields with props.entityData', () => {
        // Ignoring ReferenceSelectors for now since they'd need a mock store
        const inputs = form.find('Input');
        expect(inputs).toHaveLength(5);
        Object.entries(omit(props.entityData, Object.keys(address))).forEach(([name, value]) => {
            expect(inputs.findWhere(input => input.prop('name') === name).prop('value')).toEqual(value);
        });
    });
    it('should disable all its fields if props.disabled is true', () => {
        form.find('Input').forEach(input => {
            expect(input.prop('disabled')).toEqual(props.disabled);
        });
    });
    it('should call props.changeField when any field is changed', () => {
        form.setProps({ disabled: false });
        form.find('Input').forEach(input => {
            const event = { target: { name: input.prop('name'), value: 'x' } };
            input.simulate('change', event);
            expect(props.changeField).toBeCalled();
            expect(props.changeField.mock.calls).toHaveLength(1);
            expect(props.changeField).toBeCalledWith(expect.anything(), event);
            props.changeField.mockReset();
        });
    });
});
