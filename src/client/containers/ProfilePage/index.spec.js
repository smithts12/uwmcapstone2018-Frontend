import React from 'react';
import { ProfilePage } from '.';
import { shallow } from 'enzyme';

const wrapper = shallow(<ProfilePage />);

describe('Profile Page', () => {
    it('should render without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });
});
