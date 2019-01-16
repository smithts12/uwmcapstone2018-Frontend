import React from 'react';
import { UnfoundPage } from '.';
import { shallow } from 'enzyme';

const wrapper = shallow(<UnfoundPage />);

describe('Unfound Page', () => {
    it('should render without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });
});
