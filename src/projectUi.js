import { Project, saveProject, deleteProject } from "./project.js";

const projectList = document.createElement('ul');
const todoList = document.createElement('ul');

export function displayProjects(aside,projects) {
    for (const project of projects) {
        const projectItem = document.createElement('li');
        projectItem.id = project.id;
        projectItem.textContent = project.name;
        projectList.append(projectItem);
    }
    aside.replaceChildren();
    aside.append(projectList);
}

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
