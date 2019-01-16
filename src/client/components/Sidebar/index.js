import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './styles.scss';
/*
 * Sidebar component of the project that will be used on all pages aside from the
 * homescreen. This sidebar makes use of the react-burger-menu library component
 * and is retractable.
 */
export class Sidebar extends Component {
    render() {
        return (
            <Menu width='none'>
                <Link className="menu-item" to="/dashboard">Dashboard</Link>
                <hr className='divider'/>
                <Link className="menu-item" to="/experience">Experience</Link>
                <Link className="menu-item" to="/education">Education</Link>
                <Link className="menu-item" to="/projects">Projects</Link>
                <Link className="menu-item" to="/companies">Companies</Link>
                <Link className="menu-item" to="/certifications">Certifications</Link>
                <Link className="menu-item" to="/contacts">Contacts</Link>
                <Link className="menu-item" to="/documents">Documents</Link>
                <hr className='divider'/>
                <Link className="menu-item" to="/timeline">Timeline</Link>
            </Menu>
        );
    }
}

export default Sidebar;
