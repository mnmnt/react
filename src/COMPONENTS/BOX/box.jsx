import React, { memo} from 'react';
import { connect } from 'react-redux';
import {
    editTask as editTaskServer,
    moveTask as moveTaskServer,
    removeTask as removeTaskServer
} from '../../MODELS/appmodel';
import {
    editDishAction,
    moveDishBackAction,
    moveDishForwardAction,
    removeDishAction
} from '../../STORE/actions';

const Task = ({
    taskName,
    taskId,
    tasklistId,
    editDishDispatch,
    moveDishBackDispatch,
    moveDishForwardDispatch,
    removeDishDispatch
}) => {
    const editTask = async () => {
       let newTaskName =  prompt('EDIT THE LAST ONE', taskName);
       if (!newTaskName) return;
       newTaskName = newTaskName.trim();

       if (!newTaskName || newTaskName === taskName) return;

    const info = await editTaskServer({tasklistId, taskId,newTaskName});
    console.log(info);


       removeDishDispatch({tasklistId, taskId, newTaskName});

    };
    const removeTask = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`DISH '${taskName}' WILL BE DELETED. OK ?`)) {

        const info = await removeTaskServer({tasklistId, taskId});
        console.log(info);
        removeDishDispatch({tasklistId, taskId});
        }
        
 
     };

     const moveTaskBack = async () => {
        try {
            const info = await moveTaskServer({ 
                tasklistId, taskId, destTasklistId: tasklistId-1});
            console.log(info);

            moveDishBackDispatch({tasklistId, taskId});
        } catch (error) {
            console.log(error);
        }
     };

     const moveTaskForward = async () => {
        try {
            const info = await moveTaskServer({ 
                tasklistId, taskId, destTasklistId: tasklistId+1});
            console.log(info);

            moveDishForwardDispatch({tasklistId, taskId});
        } catch (error) {
            console.log(error);
        }
     };
    return(
        <div  className="cart">
                    <div >
                        {taskName}
                    </div>
                    <div 
                    className="buttom" id="prev"
                    onClick={moveTaskBack}></div>
                    <div 
                    className="buttom" 
                    id="next"
                    onClick={moveTaskForward}></div>
                    <div 
                    className="buttom" id="edit"
                    onClick={editTask}>
                    </div>
                    <div 
                    className="buttom" id="cancel"
                    onClick={removeTask}>                                          
                    </div>
                </div>
    );
};

const mapDispatchToProps=dispatch => ({
    editDishDispatch: ({tasklistId, taskId, newTaskName}) => 
    dispatch(editDishAction({tasklistId, taskId, newTaskName})),
    moveDishBackDispatch: ({tasklistId, taskId}) => 
    dispatch(moveDishBackAction({tasklistId, taskId})),
    moveDishForwardDispatch: ({tasklistId, taskId}) => 
    dispatch(moveDishForwardAction({tasklistId, taskId})),
    removeDishDispatch: ({tasklistId, taskId}) => 
    dispatch(removeDishAction({tasklistId, taskId})),
});

export default connect (
    null,
    mapDispatchToProps
)(memo(Task));