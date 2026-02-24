import { Project, saveProject, deleteProject } from "./project.js";

const todoList = document.createElement('ul');

export let selectedProject = null;

export function displayProjects(ul,aside, projects) {

    ul.innerHTML = '';


    for (const project of projects) {
        const projectItem = document.createElement('li');
        const clearItem = document.createElement('button');
        const editItem = document.createElement('button');

        projectItem.id = project.id;
        
        editItem.textContent="Edit";
        editItem.className = 'editBtn';
        clearItem.textContent = 'Clear';
        clearItem.className = 'clearBtn';
        projectItem.textContent = project.name;

        projectItem.append(editItem,clearItem);
        ul.append(projectItem);
    }
    aside.append(ul);
}
export function displayTodos(aside, main, projects) {

    aside.addEventListener('click', function (event) {
        let target = event.target.id;
        let projectItem = projects.find(item => item.id === target);

        selectedProject = projectItem ?? null ; 

        if (!projectItem) return;
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

