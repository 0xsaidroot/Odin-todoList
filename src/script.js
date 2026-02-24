import "./styles.css";
import { Todo, saveTodoToProject, deleteTodoFromProject } from './todos.js';
import { Project, saveProject, deleteProject } from "./project.js";
import { addNewProject, displayProjects, displayTodos, editAndClearProject, selectedProject,todoList } from "./projectUi.js"

export const projects = [];
let project1 = new Project();
let project2 = new Project("Home")
let task = [];

for (let i = 1; i <= 5; i++) {
    task[i] = new Todo(`Programming ${i}`, "A short or long desc", '11/22/26', 'Very High');
    saveTodoToProject(task[i], project1);
    saveTodoToProject(task[i], project2);
}

saveProject(project1, projects);
saveProject(project2, projects);
console.log({ projects })



export const main = document.querySelector('main');

const todoDialog = document.querySelector('#TodoDialog');
const todoNameInput = document.querySelector('#todoName');
const addTodoToProject = document.querySelector('#addTaskBtn')

let choosedProject = null;

export const openDialog = (dialog) => dialog.showModal();
export const closeDialog = (dialog) => dialog.close();

displayProjects(projects);
displayTodos(projects);
addNewProject();
editAndClearProject();

// Add todo to project
addTodoToProject.addEventListener('click', () => {

    choosedProject = selectedProject;

    if (!choosedProject) choosedProject = projects[0];

    console.log(choosedProject);
    openDialog(todoDialog);
})
todoDialog.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") closeDialog(todoDialog);
    else if (target.id === "addTodoBtn") {
        const todoName = todoNameInput.value;
        const todo = new Todo(todoName, '', '', '');
        closeDialog(todoDialog);
        todoNameInput.value = "";
        let projectItem = projects.find(item => item.id === choosedProject.id);
        saveTodoToProject(todo, projectItem);

        todoList.replaceChildren();

        for (const todo of projectItem.todoArray) {
            const todoItem = document.createElement('li');
            todoItem.textContent = todo.title;
            todoList.append(todoItem);
        }

        main.append(todoList);


    }
    else return;
})