import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Entity } from '../';
import { alwaysTrue, notEmpty } from '../validators';

const validate = {
    name: notEmpty,
    authority: notEmpty
};

export const CertificationForm = props => {
    const { changeField, entityData, disabled, isLocal } = props;
    let { invalidFields } = props;
    const disabledClass = disabled ? 'disabled' : '';
    const {
        name = '',
        authority = '',
        licenseNumber = '',
        website = '',
        acquireDate = '',
        expireDate = '',
    } = entityData;

    if (isLocal) {
        invalidFields.name = !validate.name(name);
        invalidFields.authority = !validate.authority(authority);
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
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='authority'
                            placeholder='Authority'
                            disabled={disabled}
                            className={disabledClass}
                            value={authority}
                            valid={!invalidFields.authority}
                            invalid={invalidFields.authority}
                            onChange={changeField.bind(null, validate.authority)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='licenseNumber'
                            placeholder='License #'
                            disabled={disabled}
                            className={disabledClass}
                            value={licenseNumber}
                            valid={!invalidFields.licenseNumber}
                            invalid={invalidFields.licenseNumber}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='website'
                            placeholder='Website'
                            disabled={disabled}
                            className={disabledClass}
                            value={website}
                            valid={!invalidFields.website}
                            invalid={invalidFields.website}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col lg='6'>
                    <Row form={true}>
                        <Col xs='2' className='formLabel'>
                            <Label>Since</Label>
                        </Col>
                        <Col xs='10'>
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="acquireDate"
                                    disabled={disabled}
                                    className={disabledClass}
                                    value={acquireDate}
                                    valid={!invalidFields.date}
                                    invalid={invalidFields.date}
                                    onChange={changeField.bind(null, alwaysTrue)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col lg='6'>
                    <Row form={true}>
                        <Col xs='2' className='formLabel'>
                            <Label>Expire</Label>
                        </Col>
                        <Col xs='10'>
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="expireDate"
                                    disabled={disabled}
                                    className={disabledClass}
                                    value={expireDate}
                                    valid={!invalidFields.date}
                                    invalid={invalidFields.date}
                                    onChange={changeField.bind(null, alwaysTrue)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default props => (
    <Entity entityType='certifications' entityData={props}>
        <CertificationForm />
    </Entity>
);
