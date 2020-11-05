/* eslint-disable no-undef */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

/* eslint-disable no-undef */
const { ipcRenderer } = require('electron');

const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// open Add todo window button
document.getElementById('createTodoBtn').addEventListener('click',() => {
    ipcRenderer.send('add-todo-window')
})

// on receive todos
ipcRenderer.on('todos', (event,todos) => {

    // get the todoList ul
    const todoList = document.getElementById('todoList')

    todoList.innerHTML = ``

    // create html string
    const todoItems = todos.reduce((html, todo) =>{
        html += `<li class="todo-item">${todo}</li>`
        return html
    },'')

    // set list html to the todo items
    todoList.innerHTML += todoItems

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})