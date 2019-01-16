import React from 'react';
import { shallow } from 'enzyme';
import { Entity } from '.';

const Child = () => <div />;
const props = {
    userID: 1,
    entityType: 'apples',
    entityData: { id: '1', rating: '1' },
    children: <Child />,
    createEntity: jest.fn(),
    updateEntity: jest.fn(),
    deleteEntity: jest.fn(),
    deleteLocalEntity: jest.fn(),
    clearErrorEntity: jest.fn()
};

const nextEntityData = {
    id: '1',
    rating: '2'
};

const localProps = {
    ...props,
    entityData: { _local: true, id: 1 }
};
const localNextEntityData = {
    ...localProps.entityData,
    rating: '2',
};

describe('Existing Entity', () => {
    let entity;
    beforeEach(() => {
        entity = shallow(<Entity {...props} />);
    });

    it('should render the component without crashing', () => {
        expect(entity).toHaveLength(1);
    });

    describe('defaults', () => {
        it('should be in VIEW mode', () => {
            expect(entity.state('mode')).toEqual('VIEW');
        });
        it('should pass changeField to child', () => {
            expect(entity.find('Child').prop('changeField')).toBeTruthy();
        });
        it('should pass disabled=true to child', () => {
            expect(entity.find('Child').prop('disabled')).toBeTruthy();
        });
        it('should pass props entityData to child', () => {
            expect(entity.find('Child').prop('entityData')).toEqual(props.entityData);
        });
        it('should only have edit button in action bar', () => {
            const actionBar = entity.find('Row.actionBar');
            expect(actionBar.find('Button')).toHaveLength(1);
            expect(actionBar.find('Button').hasClass('edit')).toBeTruthy();
        });
    });

    describe('click edit', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
        });
        it('should be in EDIT mode', () => {
            expect(entity.state('mode')).toEqual('EDIT');
        });
        it('should pass disabled=false to child', () => {
            expect(entity.find('Child').prop('disabled')).toBeFalsy();
        });
        it('should pass state.entityData to child', () => {
            entity.setState({ entityData: nextEntityData });
            expect(entity.find('Child').prop('entityData')).toEqual(nextEntityData);
        });
        it('should update state when changeField is invoked', () => {
            entity.instance().changeField(x => true, {
                target: { name: 'rating', value: nextEntityData.rating }
            });
            expect(entity.state('entityData')).toEqual(nextEntityData);
        });
        it('should put the save, cancel, and delete buttons in action bar', () => {
            const actionBar = entity.find('Row.actionBar');
            expect(actionBar.find('Button')).toHaveLength(3);
            expect(actionBar.find('Button.save')).toHaveLength(1);
            expect(actionBar.find('Button.cancel')).toHaveLength(1);
            expect(actionBar.find('Button.delete')).toHaveLength(1);
        });
    });

    describe('click edit -> click cancel', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
            entity.find('Row.actionBar').find('Button.cancel').simulate('click');
        });
        it('should be in VIEW mode', () => {
            expect(entity.state('mode')).toEqual('VIEW');
        });
        it('should pass disabled=true to child', () => {
            expect(entity.find('Child').prop('disabled')).toBeTruthy();
        });
        it('should pass props entityData to child', () => {
            expect(entity.find('Child').prop('entityData')).toEqual(props.entityData);
        });
        it('should only have edit button in action bar', () => {
            const actionBar = entity.find('Row.actionBar');
            expect(actionBar.find('Button')).toHaveLength(1);
            expect(actionBar.find('Button').hasClass('edit')).toBeTruthy();
        });
    });

    describe('click edit -> make changes -> click save', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
            entity.setState({ entityData: nextEntityData });
            entity.find('Row.actionBar').find('Button.save').simulate('click');
        });
        it('should be in SAVING mode', () => {
            expect(entity.state('mode')).toEqual('SAVING');
        });
        it('should disable the form fields', () => {
            expect(entity.find('Child').prop('disabled')).toBeTruthy();
        });
        it('should show an overlay', () => {
            expect(entity.find('div.overlay')).toHaveLength(1);
        });
        it('should call save action creator once, with state data if different from props', () => {
            expect(props.updateEntity).toBeCalled();
            expect(props.updateEntity.mock.calls).toHaveLength(1);
            expect(props.updateEntity).toBeCalledWith(props.entityType, nextEntityData, props.userID);
        });

        it('should enter view mode when state entityData matches props entityData', () => {
            entity.setProps({ entityData: nextEntityData });
            expect(entity.state('mode')).toEqual('VIEW');
        });
    });

    describe('click edit -> no changes -> click save', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
            entity.find('Row.actionBar').find('Button.save').simulate('click');
        });
        it('should be in VIEW mode', () => {
            expect(entity.state('mode')).toEqual('VIEW');
        });
        it('shouldnt call save action creator if state data is same as props', () => {
            expect(props.updateEntity.mock.calls).toHaveLength(0);
        });
    });

    describe('click edit -> click delete', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
            entity.find('Row.actionBar').find('Button.delete').simulate('click');
        });
        it('should be in DELETING mode', () => {
            expect(entity.state('mode')).toEqual('DELETING');
        });
        it('should show an overlay', () => {
            expect(entity.find('div.overlay')).toHaveLength(1);
        });
        it('should call delete action creator once', () => {
            expect(props.deleteEntity).toBeCalled();
            expect(props.deleteEntity.mock.calls).toHaveLength(1);
            expect(props.deleteEntity).toBeCalledWith(props.entityType, props.entityData.id);
        });
    });

    describe('action creator receives error from API', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.edit').simulate('click');
            entity.setState({ entityData: nextEntityData });
            entity.find('Row.actionBar').find('Button.save').simulate('click');
            entity.setProps({ entityData: { ...nextEntityData, error: new Error('bad stuff happened') } });
        });
        it('should enter error mode when error in props', () => {
            expect(entity.state('mode')).toEqual('ERROR');
        });
        it('should load error into local state', () => {
            expect(entity.state('error')).toBeDefined();
        });
        it('should show an overlay', () => {
            expect(entity.find('div.overlay')).toHaveLength(1);
        });

        describe('click OK on error overlay', () => {
            beforeEach(() => {
                entity.find('div.overlay').find('Button').simulate('click');
                entity.setProps({ ...props });
            });
            it('should enter VIEW mode', () => {
                expect(entity.state('mode')).toEqual('VIEW');
            });
            it('should pass props entityData to child', () => {
                expect(entity.find('Child').prop('entityData')).toEqual(
                    props.entityData
                );
            });
            it('should clear entityData and error from local state', () => {
                expect(entity.state('entityData')).toEqual(null);
                expect(entity.state('error')).toEqual(null);
            });
            it('should call clear error action creator once when OK is clicked', () => {
                expect(props.clearErrorEntity).toBeCalled();
                expect(props.clearErrorEntity.mock.calls).toHaveLength(1);
                expect(props.clearErrorEntity).toBeCalledWith(props.entityType, props.entityData.id);
            });
        });
    });

    afterEach(() => {
        props.updateEntity.mockReset();
        props.deleteEntity.mockReset();
        props.clearErrorEntity.mockReset();
    });
});

describe('Local Entity', () => {
    let entity;
    beforeEach(() => {
        entity = shallow(<Entity {...localProps} />);
    });

    it('should render the component without crashing', () => {
        expect(entity).toHaveLength(1);
    });

    describe('defaults', () => {
        it('should be in CREATING mode', () => {
            expect(entity.state('mode')).toEqual('CREATING');
        });
        it('should pass changeField to child', () => {
            expect(entity.find('Child').prop('changeField')).toBeTruthy();
        });
        it('should pass disabled=false to child', () => {
            expect(entity.find('Child').prop('disabled')).toBeFalsy();
        });
        it('should pass props entityData to child', () => {
            expect(entity.find('Child').prop('entityData')).toEqual(localProps.entityData);
        });
        it('should have save and cancel buttons in action bar', () => {
            const actionBar = entity.find('Row.actionBar');
            expect(actionBar.find('Button')).toHaveLength(2);
            expect(actionBar.find('Button.save')).toHaveLength(1);
            expect(actionBar.find('Button.cancel')).toHaveLength(1);
        });
    });

    describe('click cancel', () => {
        beforeEach(() => {
            entity.find('Row.actionBar').find('Button.cancel').simulate('click');
        });
        it('should call delete local action creator once', () => {
            expect(props.deleteLocalEntity).toBeCalled();
            expect(props.deleteLocalEntity.mock.calls).toHaveLength(1);
            expect(props.deleteLocalEntity).toBeCalledWith(localProps.entityType, localProps.entityData.id);
        });
    });

    describe('click save', () => {
        beforeEach(() => {
            entity.setState({ entityData: localNextEntityData });
            entity.find('Row.actionBar').find('Button.save').simulate('click');
        });
        it('should be in SAVING mode', () => {
            expect(entity.state('mode')).toEqual('SAVING');
        });
        it('should disable the form fields', () => {
            expect(entity.find('Child').prop('disabled')).toBeTruthy();
        });
        it('should show an overlay', () => {
            expect(entity.find('div.overlay')).toHaveLength(1);
        });
        it('should call create action creator once with state data', () => {
            expect(props.createEntity).toBeCalled();
            expect(props.createEntity.mock.calls).toHaveLength(1);
            expect(props.createEntity).toBeCalledWith(localProps.entityType, localNextEntityData, props.userID);
        });
    });

    afterEach(() => {
        props.createEntity.mockReset();
        props.deleteLocalEntity.mockReset();
    });
});
