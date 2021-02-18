'use strict'

let todoData = JSON.parse(localStorage.getItem('data'));
if (todoData === null || todoData.length === 0 ){
alert('Поздравляем! У вас нет незавершенных дел!');
todoData = [];
}

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
            '<div class="todo-buttons"><button class="todo-remove"></button>' +
                 '<button class="todo-complete"></button>' +
                    '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        
        btnTodoComplete.addEventListener('click', function(event){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){    
            item.value  = null;
            console.log(item);
            todoData.forEach(function(item,index){
                console.log(item, index);
                //console.dir(btnTodoComplete);
                if (item.value === null ){
                    todoData.splice(index,1); 
                }
            render()
            });
            //todoData.splice(todoData.indexOf(item),1); 
        });
    }); 
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value !== ''){
        const newToDo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newToDo);
        headerInput.value = '';
        render();
    } else {
        alert('Введите цель.');
    }
});


window.addEventListener("unload", function() {
    localStorage.setItem('data', JSON.stringify(todoData))
  });

render();