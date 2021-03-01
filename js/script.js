'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
		this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage(){
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
		/*console.log('li.key = ', li.key);
        console.log(todo.value);*/
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
		//сюда передается значение this - форма, но метод забиндили с объектом 
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
	    this.form.querySelector('.header-input').value = '';
            this.render();
        }else{
		alert('Вы пытаетесь ввести пустое значение');
	};
    }
	
    generateKey() {
        return Math.random().toString(36).substring(2, 15);
    }

    deleteItem(_this, liDelKey){
        /*по ключу найти элемент и удалить его из Мар
        после этого сделать рендер*/ 
		_this.todoData.delete(liDelKey);
		_this.render();
		//this.handle();
		//найти в коллекции 
    }
    completedItem(_this, liToggleKey){
		let item = _this.todoData.get(liToggleKey);
		//console.log(_this.todoData.get(liToggleKey));
		for (let i in item){
			if (i === 'completed') {
				//console.log(item[i])
				item[i] = !item[i];
				//console.log(item[i])
			}	
		}
		_this.render();	
	}
	
	handle(e){
		//для того чтобы осуществить делегирование, найдем общего родителя. как варик есть два списка, а есть общий контейнер.
		let btnTodoRemove = document.querySelectorAll('.todo-remove'),
			btnTodoComplete = document.querySelectorAll('.todo-complete'),
			target = event.target,
			btnTarget = target.closest('button'), // найдет ближайшую кнопку
			liTarget = target.closest('li');  // ближайшая li
			//console.log(btnTarget,liTarget);
			
			btnTodoRemove.forEach((value) =>{
				if (btnTarget === value){
					this.deleteItem(this, liTarget.key);
				}
			});
			btnTodoComplete.forEach((value) =>{
				if (btnTarget === value){
					this.completedItem(this, liTarget.key);
				}
			});
	}

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
		this.todoContainer.addEventListener('click',this.handle.bind(this));
        this.render();
    }
}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed','.todo-container');

todo.init();
