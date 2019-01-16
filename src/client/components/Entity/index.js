import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit, isEqual } from 'lodash';
import { createEntity, updateEntity, deleteEntity, deleteLocalEntity, clearErrorEntity } from '../../redux/actions/entityActions';
import { Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

// Local States
const [VIEW, EDIT, CREATING, SAVING, DELETING, ERROR] = ['VIEW', 'EDIT', 'CREATING', 'SAVING', 'DELETING', 'ERROR'];

/**
 * This is a wrapper class for the forms of each entity type (contacts, projects, companies, etc).
 * It is created and configured by a parent entity component (e.g. Project), and serves primarily as a controller.
 * It will call Entity action creators in response to its action bar, and pass along the entity type
 * and form data as needed.
 *
 * @class Entity
 * @extends Component
 */
export class Entity extends Component {
    constructor(props) {
        super(props);
        this.changeField = this.changeField.bind(this);
        if (props.entityData._local) {
            this.state = { mode: CREATING, entityData: props.entityData, invalidFields: {} };
        } else {
            this.state = { mode: VIEW, invalidFields: {} };
        }
    }

    edit() {
        // Load entity data from props into local state
        const { entityData } = this.props;
        this.setState({ mode: EDIT, entityData });
    }

    cancel() {
        if (this.state.mode === CREATING) {
            const { deleteLocalEntity, entityType, entityData } = this.props;
            deleteLocalEntity(entityType, entityData.id);
            this.setState({ mode: DELETING, entityData: null, invalidFields: {} });
        } else {
            // Clear form data from local state
            this.setState({ mode: VIEW, entityData: null, invalidFields: {} });
        }
    }

    save() {
        // Shouldn't have to check for invalid fields here as long as we disable the save button
        const { userID, createEntity, updateEntity, entityType, entityData } = this.props;
        const newEntityData = this.state.entityData;
        if (this.state.mode === CREATING) {
            this.setState({ mode: SAVING });
            createEntity(entityType, newEntityData, userID);
        } else if (!isEqual(entityData, newEntityData)) {
            // Don't make save call if nothing changed
            this.setState({ mode: SAVING });
            updateEntity(entityType, newEntityData, userID);
        } else {
            this.cancel();
        }
    }

    remove() {
        const { deleteEntity, entityType } = this.props;
        const entityId = this.state.entityData.id;
        this.setState({ mode: DELETING });
        deleteEntity(entityType, entityId);
    }

    acknowledgeError() {
        const { clearErrorEntity, entityType } = this.props;
        const entityId = this.state.entityData.id;
        this.setState({ mode: VIEW, entityData: null, error: null });
        clearErrorEntity(entityType, entityId);
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextState.mode === SAVING || nextState.mode === DELETING) {
            // If an error exists in store but not locally then it's new -> enter error state
            if (nextProps.entityData.error && !nextState.error) {
                return { mode: ERROR, error: nextProps.entityData.error };
            }
            // If SAVING and store matches local entity data then save has completed or nothing changed anyway -> enter view state
            if (nextState.mode === SAVING && isEqual(nextProps.entityData, nextState.entityData)) {
                return { mode: VIEW, entityData: null, invalidFields: {} };
            }
        }
        return null;
    }

    changeField(validator, event) {
        const { name, value } = event.target;
        const { entityData, invalidFields } = this.state;
        const isValid = validator(value);

        const newEntityData = {
            ...entityData,
            [name]: value,
        };
        const newInvalidFields = isValid ? omit(invalidFields, [name]) : { ...invalidFields, [name]: true };
        this.setState({
            entityData: newEntityData,
            invalidFields: newInvalidFields,
        });
    }

    render() {
        const { mode, error, invalidFields } = this.state;
        const { entityType } = this.props;
        const { entityData } = mode === VIEW ? this.props : this.state;

        // Set up overlay for SAVING/ERROR modes
        let overlay = null;
        if (mode === SAVING || mode === DELETING) {
            overlay = (
                <div className={`overlay saving ${entityType}`}>
                    <h3>Saving...</h3>
                </div>
            );
        } else if (mode === ERROR) {
            overlay = (
                <div className={`overlay error ${entityType}`}>
                    <h3>Error</h3>
                    <p>{error.message}</p>
                    <Button onClick={this.acknowledgeError.bind(this)}>Ok</Button>
                </div>
            );
        }

        // Set up action bar based on mode (only show in VIEW/EDIT)
        let actionBar = <div />;
        if (mode === VIEW) {
            actionBar = (
                <React.Fragment>
                    <div />
                    <div>
                        <Button onClick={this.edit.bind(this)} className='edit'>
                            <FontAwesomeIcon icon='edit' />
                        </Button>
                    </div>
                </React.Fragment>
            );
        } else if ([CREATING, EDIT].includes(mode)) {
            actionBar = (
                <React.Fragment>
                    <div>{
                        mode === EDIT ? (
                            <Button onClick={this.remove.bind(this)} className='delete'>
                                <FontAwesomeIcon icon='trash-alt' />
                            </Button>
                        ) : null
                    }</div>
                    <div>
                        <Button onClick={this.save.bind(this)} className='save' disabled={Object.values(invalidFields).some(x => x)}>
                            <FontAwesomeIcon icon='check' />
                        </Button>
                        <Button onClick={this.cancel.bind(this)} className='cancel'>
                            <FontAwesomeIcon icon='ban' />
                        </Button>
                    </div>
                </React.Fragment>
            );
        }

        // Clone form child (passed through props) to pass additional props to it
        const form = React.cloneElement(this.props.children, {
            changeField: this.changeField, // It can update entity's state when a field changes
            entityData, // Its fields hold these values
            invalidFields, // Object containing keys with names of each invalid field
            isLocal: this.props.entityData._local,
            disabled: ![CREATING, EDIT].includes(mode),
        });

        return (
            <div className={`entity ${entityType}`}>
                {overlay}
                <Row className='actionBar'>
                    {actionBar}
                </Row>
                {form}
            </div>
        );
    }
}

Entity.propTypes = {
    entityType: PropTypes.string.isRequired, // Type of entity
    entityData: PropTypes.object.isRequired, // Entity data according to Redux store
    children: PropTypes.object.isRequired, // Should be single child: the entity's form

    // Redux Action Creators
    createEntity: PropTypes.func.isRequired,
    updateEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    deleteLocalEntity: PropTypes.func.isRequired,
    clearErrorEntity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userID: state.user.id,
});

const mapDispatchToProps = {
    createEntity,
    updateEntity,
    deleteEntity,
    deleteLocalEntity,
    clearErrorEntity
};

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
