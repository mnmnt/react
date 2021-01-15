const { request, response } = require('express');
const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');


const port = 3001;
const hostname = 'localhost';

let tasklists = [];

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 
    'Content-Type');
    next();
});

app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(),
        request.method,
        request.originalUrl

    );
    next();
});

app.get('/tasklists', async (request, response) => {
    tasklists = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.json(tasklists);
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.post('/tasklists', async (request, response) =>{
    tasklists.push(request.body);

    await writeData(tasklists);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Tasklist '${request.body.tasklistName}' was success`
    });
});

app.post('/tasklists/:tasklistId/tasks', async (request, response) =>{
    const {taskName} = request.body;
    const tasklistId = Number(request.params.tasklistId);
    tasklists[tasklistId].tasks.push(taskName);
    await writeData(tasklists);
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Task '${taskName}' was success added in tasklist`
    });
});

app.patch('/tasklists/:tasklistId/tasks/:taskId', async (request, response) =>{
    const { newTaskName} = request.body;
    const tasklistId = Number(request.params.tasklistId);
    const taskId = Number(request.params.taskId);
    tasklists[tasklistId].tasks[taskId] = newTaskName;
    await writeData(tasklists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Task ${taskId} was success renamed`
    });
});

app.delete('/tasklists/:tasklistId/tasks/:taskId', async (request, response) =>{
    const tasklistId = Number(request.params.tasklistId);
    const taskId = Number(request.params.taskId);

    const remowedTask = tasklists[tasklistId].tasks[taskId];
    tasklists[tasklistId].tasks = tasklists[tasklistId].tasks.filter(
        (task,index) => index !== taskId
    );
    await writeData(tasklists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Task ${remowedTask} was success deleted`
    });
});

app.patch('/tasklists/:tasklistId', async (request, response) =>{
    const {taskId, destTasklistId} = request.body;
    const tasklistId = Number(request.params.tasklistId);

    if (tasklistId < 0 || destTasklistId >= tasklists.length) {
        response.setHeader('Content-Type', 'application/json');
        response.status(403).json({
        error: `wrong destination tasklistId: ${destTasklistId}`
    });
    }

    const movedTask = tasklists[tasklistId].tasks[taskId];
    tasklists[tasklistId].tasks = tasklists[tasklistId].tasks.filter(
        (task,index) => index !== taskId
    );

    tasklists[destTasklistId].tasks.push(movedTask);
    await writeData(tasklists);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({
        info: `Task ${movedTask} was success moved`
    });
});

app.listen(port, hostname, (err) =>{
    if (err){
        console.log('Error: ', err);
    }
    console.log(`server is working on ${hostname}:${port}`);

});