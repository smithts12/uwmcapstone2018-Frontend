import React from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { Entity, Address } from '../';
import { alwaysTrue, notEmpty } from '../validators';

const validate = {
    name: notEmpty,
};

export const CompanyForm = props => {
    const { changeField, entityData, disabled, isLocal } = props;
    let { invalidFields } = props;
    const disabledClass = disabled ? 'disabled' : '';
    const {
        name = '',
        phone = '',
        website = '',
        ...address
    } = entityData;

    if (isLocal) {
        invalidFields.name = !validate.name(name);
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
                            name='website'
                            placeholder='Website'
                            disabled={disabled}
                            className={disabledClass}
                            value={website}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Address address={address} disabled={disabled} changeField={changeField} />
        </Form>
    );
};

export default props => (
    <Entity entityType='companies' entityData={props}>
        <CompanyForm />
    </Entity>
);
