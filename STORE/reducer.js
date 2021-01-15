import {
    ADD_CHEFLIST,
    ADD_DISH,
    EDIT_DISH,
    MOVE_DISH_BACK,
    MOVE_DISH_FORWARD,
    REMOVE_DISH,
    DOWNLOAD_TASKLISTS
} from './actions';

const initialState = {
    tasklists: []
};

export default function reducer (state = initialState, {type, payload}) {
    switch(type) {
        case DOWNLOAD_TASKLISTS:
        return {
            ...state,
            tasklists: payload
        };
        case ADD_CHEFLIST: 
            return {
            ...state,
            tasklists: [
                ...state.tasklists,
                {
                    tasklistName: payload,
                    tasks:[]
                }
            ]
            };
        case ADD_DISH: 
        return {
            ...state,
            tasklists: state.tasklists.map(
                (tasklist, index) => index !== payload.tasklistId
                ? {...tasklist}
                : {...tasklist, tasks: [...tasklist.tasks, payload.taskName]}
                ) 
            };
        case EDIT_DISH: 
        return {
            ...state,
            tasklists: state.tasklists.map(
                (tasklist, index) => index !== payload.tasklistId
                ? {...tasklist}
                : {
                    ...tasklist, 
                    tasks: tasklist.tasks.map(
                        (task, taskIndex) => taskIndex === payload.taskId
                        ? payload.newTaskName
                        : task
                        )
                    }
                ) 
            };
        case MOVE_DISH_BACK: 
            if (payload.tasklistId === 0) return state;
            const movedBackTask = state.tasklists[
                payload.tasklistId].tasks[payload.taskId];
            const backTasks = state.tasklists[
                payload.tasklistId].tasks.filter(
                task => task !== movedBackTask
            );
            return {
                ...state,
                tasklists: state.tasklists.map((tasklist, index)=> {
                    if (index === payload.tasklistId - 1) {
                        return {
                            ...tasklist,
                            tasks: [...tasklist.tasks, movedBackTask]
                        };
                    }
                    if (index === payload.tasklistId) {
                        return {
                            ...tasklist,
                            tasks: backTasks
                        };
                    }
                    return {...tasklist};

                    })
                };
            
        case MOVE_DISH_FORWARD: 
            
            if (payload.tasklistId === state.tasklists.length - 1) return state;
            const movedForwardTask = state.tasklists[payload.tasklistId]
            .tasks[payload.taskId];
            const forwardTasks = state.tasklists[payload.tasklistId].tasks.filter(
                task => task !== movedForwardTask
            );
            return {
                ...state,
                tasklists: state.tasklists.map((tasklist, index)=> {
                    if (index === payload.tasklistId + 1) {
                        return {
                            ...tasklist,
                            tasks: [...tasklist.tasks, movedForwardTask]
                        };
                    }
                    if (index === payload.tasklistId) {
                        return {
                            ...tasklist,
                            tasks: forwardTasks
                        };
                    }
                    return {...tasklist};

                    })
                };
        case REMOVE_DISH:  
        const removedTask = state.tasklists[payload.tasklistId]
        .tasks[payload.taskId];
        const tasks = state.tasklists[payload.tasklistId].tasks.filter(
            task => task !== removedTask
        );
        return {
            ...state,
            tasklists: state.tasklists.map(
                (tasklist, index)=> index === payload.tasklistId 
                    ? {
                        ...tasklist,
                        tasks
                    }
                    : {...tasklist}
                )
            };
        default: return state;
    }
}