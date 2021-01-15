const DOWNLOAD_TASKLISTS = 'DOWNLOAD_TASKLISTS'
const ADD_CHEFLIST = 'ADD_CHEFLIST';
const ADD_DISH = 'ADD_DISH';
const EDIT_DISH = 'EDIT_DISH';
const MOVE_DISH_BACK = 'MOVE_DISH_BACK';
const MOVE_DISH_FORWARD = 'MOVE_DISH_FORWARD';
const REMOVE_DISH = 'REMOVE_DISH';

const downloadTasklistsAction = (tasklists) => ({
    type: DOWNLOAD_TASKLISTS,
    payload: tasklists
});

const addCheflistAction = (tasklistName) => ({
    type:ADD_CHEFLIST,
    payload: tasklistName
});

const addDishAction = ({taskName, tasklistId}) => ({
    type: ADD_DISH,
    payload: {
        tasklistId,
        taskName
    }
});

const editDishAction = ({tasklistId, taskId, newTaskName}) => ({
    type: EDIT_DISH,
    payload: {
        tasklistId,
        taskId,
        newTaskName
    }
});

const moveDishBackAction = ({tasklistId, taskId}) => ({
    type: MOVE_DISH_BACK,
    payload: {
        tasklistId,
        taskId
    }
});

const moveDishForwardAction = ({tasklistId, taskId}) => ({
    type: MOVE_DISH_FORWARD,
    payload: {
        tasklistId,
        taskId
    }
});

const removeDishAction = ({tasklistId, taskId}) => ({
    type: REMOVE_DISH,
    payload: {
        tasklistId,
        taskId
    }
});

export {
    ADD_CHEFLIST,
    ADD_DISH,
    EDIT_DISH,
    MOVE_DISH_BACK,
    MOVE_DISH_FORWARD,
    REMOVE_DISH,
    DOWNLOAD_TASKLISTS,
    downloadTasklistsAction,
    addCheflistAction,
    addDishAction,
    editDishAction,
    moveDishBackAction,
    moveDishForwardAction,
    removeDishAction
};