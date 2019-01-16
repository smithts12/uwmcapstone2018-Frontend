import React from 'react';
import { CallbackPage } from '.';
import { shallow } from 'enzyme';
import Auth from '../../Auth/Auth';

const auth = new Auth();
const wrapper = shallow(<CallbackPage auth={auth} />);

describe('Callback Page', () => {
    it('should render without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });
});
