import React, { Component } from 'react';
import { Container, Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { updateUser, deleteUser, clearErrorUser } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import './styles.scss';

// Local States
const [VIEW, EDIT, SAVING, DELETING, ERROR] = ['VIEW', 'EDIT', 'SAVING', 'DELETING', 'ERROR'];

export class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.changeField = this.changeField.bind(this);
        this.state = { mode: VIEW };
    }

    edit() {
        // Load user data from props into local state
        const { userData } = this.props;
        this.setState({ mode: EDIT, userData });
    }

    cancel() {
        // Clear form data from local state
        this.setState({ mode: VIEW, userData: null });
    }

    save() {
        const { userData, updateUser } = this.props;
        const newUserData = this.state.userData;
        if (!isEqual(userData, newUserData)) {
            // Don't make save call if nothing changed
            this.setState({ mode: SAVING });
            updateUser(newUserData);
        } else {
            this.cancel();
        }
    }

    remove() {
        const { deleteUser } = this.props;
        this.setState({ mode: DELETING });
        deleteUser();
    }

    acknowledgeError() {
        const { clearErrorUser } = this.props;
        this.setState({ mode: VIEW, userData: null, error: null });
        clearErrorUser();
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextState.mode === SAVING || nextState.mode === DELETING) {
            // If an error exists in store but not locally then it's new -> enter error state
            if (nextProps.userData.error && !nextState.error) {
                return { mode: ERROR, error: nextProps.userData.error };
            }
            // If SAVING and store matches local entity data then save has completed or nothing changed anyway -> enter view state
            if (nextState.mode === SAVING && isEqual(nextProps.userData, nextState.userData)) {
                return { mode: VIEW, userData: null };
            }
        }
        return null;
    }

    changeField(event) {
        const { name, value } = event.target;
        const newUserData = {
            ...this.state.userData,
            [name]: value,
        };
        this.setState({ userData: newUserData });
    }

    render() {
        const { mode, error } = this.state;
        const { userData } = mode === VIEW ? this.props : this.state;
        const {
            title = '',
            firstName = '',
            middleName = '',
            lastName = '',
            mobilePhone = '',
            homePhone = '',
            email = '',
            website = '',
        } = userData;
        const disabled = mode !== EDIT;
        const disabledClass = disabled ? 'disabled' : '';

        // Set up overlay for SAVING/ERROR modes
        let overlay = null;
        if (mode === SAVING || mode === DELETING) {
            overlay = (
                <div className={`overlay saving`}>
                    <h3>Saving...</h3>
                </div>
            );
        } else if (mode === ERROR) {
            overlay = (
                <div className={`overlay error`}>
                    <h3>Error</h3>
                    <p>{error.message}</p>
                    <Button onClick={this.acknowledgeError.bind(this)}>Ok</Button>
                </div>
            );
        }

        // Set up buttons based on mode
        const buttonControls = mode === VIEW ? (
            <Row className='profile-buttons'>
                <Button className='edit' onClick={this.edit.bind(this)} >Edit</Button>
                {/* <Button className='delete' onClick={this.remove.bind(this)}>
                    <FontAwesomeIcon icon='trash-alt' />
                </Button> */}
            </Row>
        ) : (
            <Row className='profile-buttons'>
                <div>
                    <Button className='save' onClick={this.save.bind(this)}>Save</Button>
                    <Button className='cancel' onClick={this.cancel.bind(this)}>Cancel</Button>
                </div>
            </Row>
        );

        return (
            <Container className='entity profile'>
                {overlay}
                <Form>
                    <FormGroup row>
                        <Label>Email</Label>
                        <Col>
                            <Input
                                type='text'
                                name='email'
                                placeholder='Email'
                                disabled={true}
                                className='disabled'
                                value={email}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs='1'>
                            <Label>Name</Label>
                        </Col>
                        <Col xs='2'>
                            <Input
                                type='text'
                                name='title'
                                placeholder='Title'
                                disabled={disabled}
                                className={disabledClass}
                                value={title}
                                onChange={this.changeField}
                            />
                        </Col>
                        <Col xs='3'>
                            <Input
                                type='text'
                                name='firstName'
                                placeholder="First"
                                disabled={disabled}
                                className={disabledClass}
                                value={firstName}
                                onChange={this.changeField}
                            />
                        </Col>
                        <Col xs='3'>
                            <Input
                                type="text"
                                name='middleName'
                                placeholder="Middle"
                                disabled={disabled}
                                className={disabledClass}
                                value={middleName}
                                onChange={this.changeField}
                            />
                        </Col>
                        <Col xs='3'>
                            <Input
                                type='text'
                                name='lastName'
                                placeholder='Last'
                                disabled={disabled}
                                className={disabledClass}
                                value={lastName}
                                onChange={this.changeField}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label>Home Phone Number</Label>
                        <Col>
                            <Input
                                type='text'
                                name='homePhone'
                                placeholder='Home Phone'
                                disabled={disabled}
                                className={disabledClass}
                                value={homePhone}
                                onChange={this.changeField}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label>Mobile Phone Number</Label>
                        <Col>
                            <Input
                                type='text'
                                name='mobilePhone'
                                placeholder='Mobile Phone'
                                disabled={disabled}
                                className={disabledClass}
                                value={mobilePhone}
                                onChange={this.changeField}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label>Website</Label>
                        <Col>
                            <Input
                                type='text'
                                name='website'
                                placeholder='Website'
                                disabled={disabled}
                                className={disabledClass}
                                value={website}
                                onChange={this.changeField}
                            />
                        </Col>
                    </FormGroup>
                    {buttonControls}
                </Form>
            </Container>
        );
    }
}

ProfileForm.propTypes = {
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    clearErrorUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    userData: state.user,
});

const mapDispatchToProps = {
    updateUser,
    deleteUser,
    clearErrorUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
