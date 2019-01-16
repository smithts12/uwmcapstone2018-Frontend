import React from 'react';
import { DashboardPage } from '.';
import { shallow } from 'enzyme';

const props = {
    fetchUser: jest.fn(),
    fetchEntities: jest.fn(),
};

const wrapper = shallow(<DashboardPage {...props} />);

describe('Dashboard Page', () => {
    it('should render without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });
});
