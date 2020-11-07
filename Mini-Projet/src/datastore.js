/* eslint-disable no-undef */

//local storage

const Store = require('electron-store')

class DataStore extends Store {
    constructor(settings) {

        super(settings)

        //initialize todos with empty array
        this.todos = this.get('todos') || []
    }

    saveTodos(){
        //save todos to JSON file
        this.set('todos',this.todos)

        //return this allows method chaining
        return this
    }

    getTodos(){
        //set object's todos to todos in JSON file
        this.todos = this.get('todos') || []
        return this
    }

    addTodo(todo){
        //merge the existing todos with the new todo
        this.todos = [...this.todos, todo]
        return this.saveTodos()
    }

    deleteTodo(title) {
        //filter out the target todo
        this.todos = this.todos.filter(t => t.title !== title)
        return this.saveTodos()
    }
}

module.exports = DataStore