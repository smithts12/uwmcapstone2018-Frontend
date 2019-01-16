import React from 'react';
import { LoginButton } from '.';
import { shallow } from 'enzyme';
import Auth from '../../Auth/Auth';

const auth = new Auth();
const wrapper = shallow(<LoginButton auth={auth} />);

it('should render the component without crashing', () => {
    expect(LoginButton).toHaveLength(1);
});

it('should render without crashing', () => {
    expect(wrapper.exists('Button'));
});

it('should render a button with the text: Login Or Create An Account', () => {
    expect(
        wrapper
            .find('Button')
            .dive()
            .text()
    ).toEqual('Login Or Create An Account');
});
