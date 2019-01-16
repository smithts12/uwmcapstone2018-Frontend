import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import TextArea from 'react-textarea-autosize';
import { Entity, ReferenceSelector } from '../';
import { alwaysTrue, notEmpty } from '../validators';

const validate = {
    firstName: notEmpty, // title can be [1,20] chars, inclusive
    lastName: notEmpty,
};

export const ContactForm = props => {
    const { changeField, entityData, disabled, isLocal } = props;
    let { invalidFields } = props;
    const disabledClass = disabled ? 'disabled' : '';
    const {
        firstName = '',
        lastName = '',
        companyId,
        position = '',
        phone = '',
        email = '',
        notes = '',
    } = entityData;

    if (isLocal) {
        invalidFields.firstName = !validate.firstName(firstName);
        invalidFields.lastName = !validate.lastName(lastName);
    }

    return (
        <Form>
            <Row form={true}>
                <Col xs='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            disabled={disabled}
                            className={disabledClass}
                            value={firstName}
                            valid={!invalidFields.firstName}
                            invalid={invalidFields.firstName}
                            onChange={changeField.bind(null, validate.firstName)}
                        />
                    </FormGroup>
                </Col>
                <Col xs='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            disabled={disabled}
                            className={disabledClass}
                            value={lastName}
                            valid={!invalidFields.lastName}
                            invalid={invalidFields.lastName}
                            onChange={changeField.bind(null, validate.lastName)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='2' className='formLabel'>
                    <Label>Company</Label>
                </Col>
                <Col xs='10'>
                    <ReferenceSelector
                        entityType='companies'
                        name='companyId'
                        selectedId={companyId}
                        disabled={disabled}
                        className={disabledClass}
                        onChange={changeField.bind(null, alwaysTrue)}
                    />
                </Col>
            </Row>
            <Row form={true}>
                <Col>
                    <FormGroup >
                        <Input
                            type='text'
                            name='position'
                            placeholder='Position'
                            disabled={disabled}
                            className={disabledClass}
                            value={position}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col sm='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='phone'
                            placeholder='Phone'
                            disabled={disabled}
                            className={disabledClass}
                            value={phone}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='email'
                            placeholder='Email'
                            disabled={disabled}
                            className={disabledClass}
                            value={email}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup disabled={disabled} >
                        <Input
                            tag={TextArea}
                            name='notes'
                            placeholder='Notes'
                            disabled={disabled}
                            className={disabledClass}
                            value={notes}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default props => (
    <Entity entityType='contacts' entityData={props}>
        <ContactForm />
    </Entity>
);
