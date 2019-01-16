import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import moment from 'moment';
import { Row } from 'reactstrap';
import './styles.scss';

const dateStyle = date => date ? moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY') : 'Unknown';

const views = {
    'certifications': ({
        name = '',
        authority = '',
        licenseNumber = '',
        website = '',
        acquireDate = '',
        expireDate = ''
    }) => (
        <React.Fragment>
            <Row className='detailsHeader opposite'>
                <span>{name}</span>
                <span>{`${dateStyle(acquireDate)} through ${dateStyle(expireDate)}`}</span>
            </Row>
            <Row>License #: {licenseNumber}</Row>
            <Row>Authority: {authority}</Row>
            <Row>Website: {website}</Row>
        </React.Fragment>
    ),
    'education': ({
        name = '',
        degree = '',
        fieldOfStudy = '',
        startDate = '',
        endDate = '',
    }) => (
        <React.Fragment>
            <Row className='detailsHeader opposite'>
                <span>{name}</span>
                <span>{`${dateStyle(startDate)} through ${dateStyle(endDate)}`}</span>
            </Row>
            <Row>Degree: {degree}</Row>
            <Row>Field of Study: {fieldOfStudy}</Row>
        </React.Fragment>
    ),
    'positions': ({
        companyName,
        title = '',
        startPay = '',
        endPay = '',
        payPeriod = '',
        startDate = '',
        endDate = ''
    }) => (
        <React.Fragment>
            <Row className='detailsHeader opposite'>
                <span>{title}</span>
                <span>{`${dateStyle(startDate)} through ${dateStyle(endDate)}`}</span>
            </Row>
            <Row>
                <span>Company: {companyName}</span>
            </Row>
            <Row>
                <span>{payPeriod ? `${payPeriod}, ` : null}Start {`$${startPay}`}, End {`$${endPay}`}</span>
            </Row>
        </React.Fragment>
    ),
    'projects': ({
        title,
        description = 'No Description',
        positionTitle,
        companyName = 'Unknown',
        educationName,
        startDate,
        endDate,
    }) => (
        <React.Fragment>
            <Row className='detailsHeader opposite'>
                <span>{title}</span>
                <span>{`${dateStyle(startDate)} through ${dateStyle(endDate)}`}</span>
            </Row>
            <Row>{description}</Row>
            { positionTitle ? <Row className='detailsFooter'>Related to Position: {positionTitle} at {companyName}</Row> : null }
            { educationName ? <Row className='detailsFooter'>Related to Education: {educationName}</Row> : null }
        </React.Fragment>
    ),
};

const Details = ({ entityType, entityData }) => {
    const View = views[entityType];
    return (
        <div id='TIMELINE_DETAILS'>
            <View {...entityData} />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { entityType, entityData } = ownProps;
    switch (entityType) {
        case 'positions': {
            // For positions grab the company name and forward in entityData
            const { companies } = state.data;
            const { companyId } = entityData;
            const { name: companyName } = companyId ? find(companies.list, { id: companyId }) || {} : {};
            return { entityType, entityData: { ...entityData, companyName } };
        }
        case 'projects': {
            // For projects grab the position name, company name, and education name and forward in entityData
            const { positions, companies, education } = state.data;
            const { positionId, educationId } = entityData;
            const position = positionId ? find(positions.list, { id: positionId }) || {} : {};
            const { title: positionTitle, companyId } = position;
            const { name: companyName } = companyId ? find(companies.list, { id: companyId }) || {} : {};
            const { name: educationName } = educationId ? find(education.list, { id: educationId }) || {} : {};
            return { entityType, entityData: { ...entityData, positionTitle, companyName, educationName } };
        }
        default: return ownProps;
    }
};

export default connect(mapStateToProps)(Details);
