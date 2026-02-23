const todoList = document.createElement('ul');

export function displayTodos(aside,main,projects){

    aside.addEventListener('click', function (event) {
    let target = event.target.id;
    let projectItem = projects.find(item => item.id === target);

    if(!projectItem) return; 
    console.log(projectItem);

    todoList.replaceChildren();

    for (const todo of projectItem.todoArray) {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo.title;
        todoList.append(todoItem);
    }
    
    main.append(todoList);
})
}