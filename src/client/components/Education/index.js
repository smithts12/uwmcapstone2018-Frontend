import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Entity, Address } from '../';
import { alwaysTrue, notEmpty } from '../validators';

const validate = {
    name: notEmpty, // title should not be empty
    degree: notEmpty, // degree should not be empty
    fieldOfStudy: notEmpty,
};

export const EducationForm = props => {
    const { changeField, entityData, disabled, isLocal } = props;
    let { invalidFields } = props;
    const disabledClass = disabled ? 'disabled' : '';
    const {
        name = '',
        degree = '',
        fieldOfStudy = '',
        startDate = '',
        endDate = '',
        ...address
    } = entityData;

    if (isLocal) {
        invalidFields.name = !validate.name(name);
        invalidFields.degree = !validate.degree(degree);
        invalidFields.fieldOfStudy = !validate.fieldOfStudy(fieldOfStudy);
    }

    return (
        <Form>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='name'
                            placeholder='Name'
                            disabled={disabled}
                            className={disabledClass}
                            value={name}
                            valid={!invalidFields.name}
                            invalid={invalidFields.name}
                            onChange={changeField.bind(null, validate.name)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col sm='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='degree'
                            placeholder='Degree'
                            disabled={disabled}
                            className={disabledClass}
                            value={degree}
                            valid={!invalidFields.degree}
                            invalid={invalidFields.degree}
                            onChange={changeField.bind(null, validate.degree)}
                        />
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='fieldOfStudy'
                            placeholder='Field of Study'
                            disabled={disabled}
                            className={disabledClass}
                            value={fieldOfStudy}
                            valid={!invalidFields.fieldOfStudy}
                            invalid={invalidFields.fieldOfStudy}
                            onChange={changeField.bind(null, validate.fieldOfStudy)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col lg='6'>
                    <Row form={true}>
                        <Col xs='2'className='formLabel'>
                            <Label>Began</Label>
                        </Col>
                        <Col xs='10'>
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="startDate"
                                    disabled={disabled}
                                    className={disabledClass}
                                    value={startDate}
                                    onChange={changeField.bind(null, alwaysTrue)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col lg='6'>
                    <Row form={true}>
                        <Col xs='2' className='formLabel'>
                            <Label>Ended</Label>
                        </Col>
                        <Col xs='10'>
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="endDate"
                                    disabled={disabled}
                                    className={disabledClass}
                                    value={endDate}
                                    onChange={changeField.bind(null, alwaysTrue)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Address address={address} disabled={disabled} changeField={changeField} />
        </Form>
    );
};

export default props => (
    <Entity entityType='education' entityData={props}>
        <EducationForm />
    </Entity>
);
