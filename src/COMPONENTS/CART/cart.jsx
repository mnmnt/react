import React, {  memo} from 'react';
import { connect } from 'react-redux';
import {addTask as addTaskServer} from '../../MODELS/appmodel';
import {
    addDishAction
} from '../../STORE/actions';
import Task from '../BOX/box';
import '../APP/app.css';

const Tasklist = ({
    tasklistName,
    tasklistId,
    tasks,
    addDishDispatch
}) => {
    const addTask = async () => {
        let taskName = prompt('INPUT THE DISH THAT THE CHEF WILL PREPARE');
        if (!taskName) return;
        taskName = taskName.trim();
        if (!taskName) return;

        const info = await addTaskServer({ tasklistId, taskName});
        console.log(info); 
        addDishDispatch({taskName, tasklistId});
    };
    return (
        <div className="box">
                <header>
                    {tasklistName}
                </header>
                <div>
                    {tasks.map((task, index) => (
                        <Task
                        taskName={task}
                        taskId={index}
                        tasklistId={tasklistId}
                        key={`list${tasklistId}-task${index}`}
                        />
                    ))}
                </div>
                <footer 
                className="add_task"
                onClick={addTask}
                >
                    ADD NEW DISH...
                </footer>
            </div>
    );
} ;

const mapDispatchToProps = dispatch => ({
    addDishDispatch: 
    ({tasklistId, taskName}) => 
    dispatch(addDishAction({taskName,tasklistId}))
});

export default connect (
    null,
    mapDispatchToProps
)(memo(Tasklist));