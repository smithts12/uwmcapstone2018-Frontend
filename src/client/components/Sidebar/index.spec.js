import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '.';
import { mount } from 'enzyme';

describe('Sidebar', () => {
    let router, sidebar;
    beforeEach(() => {
        router = mount(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );
        sidebar = router.find('Sidebar');
    });

    it('should render without crashing', () => {
        expect(sidebar).toHaveLength(1);
    });

    it('should contain a menu element', () => {
        expect(sidebar.find('Menu')).toHaveLength(1);
    });

    it('menu should contain 8 Link children', () => {
        expect(sidebar.find('Menu').find('Link')).toHaveLength(9);
    });

    describe('Links', () => {
        let links;
        beforeEach(() => {
            links = sidebar.find('Menu').find('Link');
        });

        const expectedLinks = {
            'Dashboard': '/dashboard',
            'Experience': '/experience',
            'Education': '/education',
            'Projects': '/projects',
            'Companies': '/companies',
            'Certifications': '/certifications',
            'Contacts': '/contacts',
            'Documents': '/documents',
            'Timeline': '/timeline'
        };

        it('should have correct ordering of links', () => {
            Object.keys(expectedLinks).forEach((expectedText, index) => {
                expect(links.at(index).text().trim()).toEqual(expectedText);
            });
        });

        it('should point to correct routes', () => {
            Object.values(expectedLinks).forEach((expectedRoute, index) => {
                expect(links.at(index).prop('to')).toEqual(expectedRoute);
            });
        });
    });
});
