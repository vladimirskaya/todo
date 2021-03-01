'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage(){
        console.log(this.todoData);
        console.log([...this.todoData]);
        localStorage.setItem('toDoList',JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        console.log(todo.value);
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if(todo.completed){
            this.todoCompleted.append(li);
        }else{
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault(); 
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
        console.log(this);

    }
    generateKey() {
        return Math.random().toString(36).substring(2, 15);
    }

    deleteItem(){
        /*по ключу найти элемент и удалить его из Мар
        после этого сделать рендер*/ 
    }
    completedItem(){
        /**перебрать все желменты и найти тот элемент, 
         * на который мы нажали и поменять его свойство комплитед /
// handler - на какую их кнопок вы нажали, используя делегирование
// и вызвать один из следующих методов: deleteItem / completedItem

самое сложно это найти key
в видео добавлют ключ на страницу: li.key = todo.key? строка 28*/


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();