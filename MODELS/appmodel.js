const getTasklists = async () => {
    const response = await fetch('http://localhost:3001/tasklists');
    
    const tasklists = await response.json();
    return tasklists;
};
const addTasklist = async (tasklist) => {
    const response = await fetch('http://localhost:3001/tasklists', {
        method: 'POST',
        body: JSON.stringify(tasklist),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const addTask = async ({tasklistId, taskName}) => {
    const response = await fetch(`http://localhost:3001/tasklists/${tasklistId}/tasks`, {
        method: 'POST',
        body: JSON.stringify({taskName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const editTask = async ({tasklistId, taskId, newTaskName}) => {
    const response = await fetch(`http://localhost:3001/tasklists/${tasklistId}/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({newTaskName}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {info} = await response.json();

    return info;
};

const removeTask = async ({tasklistId, taskId}) => {
    const response = await fetch(`http://localhost:3001/tasklists/${tasklistId}/tasks/${taskId}`, {
        method: 'DELETE',
    });

    const {info} = await response.json();

    return info;
};

const moveTask = async ({tasklistId, taskId, destTasklistId}) => {
    
    const response = await fetch(`http://localhost:3001/tasklists/${tasklistId}`, {
        method: 'PATCH',
        body: JSON.stringify({taskId, destTasklistId}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        const {error} = await response.json();
        return Promise.reject(error);
    }
    const {info} = await response.json();

    return info;
};
export {
    addTasklist,
    addTask,
    editTask,
    removeTask,
    moveTask,
    getTasklists
};