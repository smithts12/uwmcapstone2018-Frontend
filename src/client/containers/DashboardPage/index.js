import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../../components';
import './styles.scss';

export const DashboardPage = ({ auth }) => (
    <Container fluid={true} id='DASHBOARD_PAGE' className='clearfix'>
        <Header title='Job Hunter' auth={auth} />
        <main>
            <Row>
                <Col sm='4'>
                    <Link to='/experience'>
                        <FontAwesomeIcon icon='briefcase'/>
                        <span className='label'>Experience</span>
                    </Link>
                </Col>
                <Col sm='4'>
                    <Link to='/education'>
                        <FontAwesomeIcon icon='graduation-cap'/>
                        <span className='label'>Education</span>
                    </Link>
                </Col>
                <Col sm='4'>
                    <Link to='/projects'>
                        <FontAwesomeIcon icon='project-diagram'/>
                        <span className='label'>Projects</span>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col sm='4'>
                    <Link to='/companies'>
                        <FontAwesomeIcon icon='building'/>
                        <span className='label'>Companies</span>
                    </Link>
                </Col>
                <Col sm='4'>
                    <Link to='/certifications'>
                        <FontAwesomeIcon icon='certificate'/>
                        <span className='label'>Certifications</span>
                    </Link>
                </Col>
                <Col sm='4'>
                    <Link to='/contacts'>
                        <FontAwesomeIcon icon='address-book'/>
                        <span className='label'>Contacts</span>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col sm={{ size: 4, offset: 2 }}>
                    <Link to='/documents'>
                        <FontAwesomeIcon icon='file-alt'/>
                        <span className='label'>Documents</span>
                    </Link>
                </Col>
                <Col xs='4'>
                    <Link to='/timeline'>
                        <FontAwesomeIcon icon='calendar-alt'/>
                        <span className='label'>Timeline</span>
                    </Link>
                </Col>
            </Row>
        </main>
    </Container>
);

export default DashboardPage;
