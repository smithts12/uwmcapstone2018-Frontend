import React from 'react';
import { shallow } from 'enzyme';
import { ProjectForm } from '.';

const props = {
    changeField: jest.fn(),
    entityData: {
        'title': 'TITLE',
        'description': 'DESCRIPTION',
        'startDate': '2000-01-01',
        'endDate': '3000-07-27',
    },
    invalidFields: {},
    disabled: true,
};

describe('ProjectForm', () => {
    let form;
    beforeEach(() => {
        form = shallow(<ProjectForm {...props} />);
    });

    it('should render the component without crashing', () => {
        expect(form).toHaveLength(1);
    });
    it('should populate its fields with props.entityData', () => {
        // Ignoring ReferenceSelectors for now since they'd need a mock store
        const inputs = form.find('Input');
        expect(inputs).toHaveLength(4);
        Object.entries(props.entityData).forEach(([name, value]) => {
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
