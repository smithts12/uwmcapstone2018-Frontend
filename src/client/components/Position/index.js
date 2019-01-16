import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Entity, ReferenceSelector } from '../';
import { alwaysTrue, notEmpty, validMoney } from '../validators';

const validate = {
    title: notEmpty,
    startPay: validMoney,
    endPay: validMoney
};

export const PositionForm = props => {
    const { changeField, entityData, disabled, isLocal } = props;
    let { invalidFields } = props;
    const disabledClass = disabled ? 'disabled' : '';
    const {
        companyId,
        title = '',
        startPay = '',
        endPay = '',
        payPeriod = '',
        startDate = '',
        endDate = ''
    } = entityData;

    if (isLocal) {
        invalidFields.title = !validate.title(title);
    }

    return (
        <Form>
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
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='title'
                            placeholder='Position'
                            disabled={disabled}
                            className={disabledClass}
                            value={title}
                            valid={!invalidFields.title}
                            invalid={invalidFields.title}
                            onChange={changeField.bind(null, validate.title)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='4'>
                    <FormGroup >
                        <Input
                            type='select'
                            name='payPeriod'
                            placeholder='Pay Period'
                            disabled={disabled}
                            className={disabledClass}
                            value={payPeriod || 'Hourly'}
                            onChange={changeField.bind(null, alwaysTrue)}
                        >
                            <option value='Hourly'>Hourly</option>
                            <option value='Salary'>Salary</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs='4'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='startPay'
                            placeholder='Start Pay'
                            disabled={disabled}
                            className={disabledClass}
                            value={startPay}
                            valid={!invalidFields.startPay}
                            invalid={invalidFields.startPay}
                            onChange={changeField.bind(null, validate.startPay)}
                        />
                    </FormGroup>
                </Col>
                <Col xs='4'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='endPay'
                            placeholder='End Pay'
                            disabled={disabled}
                            className={disabledClass}
                            value={endPay}
                            valid={!invalidFields.endPay}
                            invalid={invalidFields.endPay}
                            onChange={changeField.bind(null, validate.endPay)}
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
        </Form>
    );
};

export default props => (
    <Entity entityType='positions' entityData={props}>
        <PositionForm />
    </Entity>
);
