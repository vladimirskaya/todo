'use strict'

const todoData = JSON.parse(localStorage.getItem('data'));

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
        btnTodoRemove.addEventListener('click', function(event){
            let index = 0;
            todoData.forEach(function(item){
                if (item.value === li.textContent) {
                    todoData.splice(index,1);   
                }
                index ++;
            });
            li.remove();
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