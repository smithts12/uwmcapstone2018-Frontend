import React from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import { alwaysTrue, validState, validZip } from '../validators';

const validate = {
    zip: validZip,
    state: validState
};

const Address = props => {
    const { changeField, disabled, address } = props;
    const {
        street1 = '',
        street2 = '',
        city = '',
        state = '',
        zip = ''
    } = address;
    const disabledClass = disabled ? 'disabled' : '';

    return (
        <React.Fragment>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup >
                        <Input
                            type='text'
                            name='street1'
                            placeholder='Street 1'
                            disabled={disabled}
                            className={disabledClass}
                            value={street1}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col xs='12'>
                    <FormGroup disabled={disabled} >
                        <Input
                            type='text'
                            name='street2'
                            placeholder='Street 2'
                            disabled={disabled}
                            className={disabledClass}
                            value={street2}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form={true}>
                <Col sm='6'>
                    <FormGroup disabled={disabled} >
                        <Input
                            type='text'
                            name='city'
                            placeholder='City'
                            disabled={disabled}
                            className={disabledClass}
                            value={city}
                            onChange={changeField.bind(null, alwaysTrue)}
                        />
                    </FormGroup>
                </Col>
                <Col xs='3' sm='2'>
                    <FormGroup disabled={disabled} >
                        <Input
                            type='text'
                            name='state'
                            placeholder='State'
                            disabled={disabled}
                            className={disabledClass}
                            value={state}
                            onChange={changeField.bind(null, validate.state)}
                        />
                    </FormGroup>
                </Col>
                <Col xs='9' sm='4'>
                    <FormGroup disabled={disabled} >
                        <Input
                            type='text'
                            name='zip'
                            placeholder='Zip'
                            disabled={disabled}
                            className={disabledClass}
                            value={zip}
                            onChange={changeField.bind(null, validate.zip)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Address;
