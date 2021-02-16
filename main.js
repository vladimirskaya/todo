'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [{
    value: 'Coffee',
    completed: false
}];


const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    console.log(' from',typeof todoData);

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
            console.log('11',event);
            item.completed = !item.completed;
            //localStorage[item] = !todoData[item];
            render();
            });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(event){
            console.log(item.value, li.textContent);
            let index = 0;
            todoData.forEach(function(item){
                if (item.value === li.textContent) {
                    console.log(item, index);
                    todoData.splice(index,1);   
                }
                index ++;
            })
            //console.log(todoData.indexOf(li.textContent,0));
            li.remove();
        })

    }); 
};

/*let btnTodoComplete = document.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(event){
        console.log('11',event);
        //todoData[item] = !todoData[item];
        //localStorage[item] = !todoData[item];
        //render();
        });*/


/*const btnTodoRemove = document.querySelectorAll('.todo-remove');
btnTodoRemove.addEventListener('click', function(event){
    let target = event.target;
    console.log(target);
});
*/
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



render();