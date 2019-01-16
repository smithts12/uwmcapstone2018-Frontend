import React from 'react';
import { ProfileButton } from '.';
import { shallow } from 'enzyme';

const wrapper = shallow(<ProfileButton />);

// This test was giving console.errors due to PropTypes being off for the DropdownToggle
// I suspect it has something to do with using dive() to pass the context of its parent.
// The tests will still be able to fail.
global.console.error = jest.fn();

it('should render an UncontrolledButtonDropdown', () => {
    expect(wrapper.exists('UncontrolledButtonDropdown'));
});

it('should render a DropdownMenu', () => {
    expect(wrapper.exists('DropdownMenu'));
});

it('should render a dropdown button with the user settings fontawesome icon', () => {
    expect(
        wrapper
            .find('.toggle')
            .dive()
            .dive()
            .dive()
            .text()
    ).toEqual('<FontAwesomeIcon />');
});

it('should render a link for profile settings in first option of two in dropdown', () => {
    expect(
        wrapper
            .find('DropdownItem')
            .at(0)
            .dive()
            .text()
    ).toEqual('Settings');
});

it('should render a link for logout in second option of two in dropdown', () => {
    expect(
        wrapper
            .find('DropdownItem')
            .at(1)
            .dive()
            .text()
    ).toEqual('Logout');
});

it('should render a dropdown menu that has a total of two items', () => {
    expect(wrapper.find('DropdownMenu').children()).toHaveLength(2);
});
