import React from 'react';
import { shallow } from 'enzyme';
import { ProfileForm } from '.';
const props = {
    userData: {},
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    clearErrorUser: jest.fn(),
};

const form = shallow(<ProfileForm {...props} />);
it('should render the component without crashing', () => {
    expect(form).toHaveLength(1);
});
