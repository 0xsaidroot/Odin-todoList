import "./styles.css";
import { Todo, saveTodoToProject,  } from './todos.js';
import { Project, saveProject } from "./project.js";
import { addNewProject, displayProjects, displayTodosOnClick, editAndClearProject } from "./projectUi.js"
import { addTodoToProject,editAndClearTodos } from "./todoUi.js";



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
export const openDialog = (dialog) => dialog.showModal();
export const closeDialog = (dialog) => dialog.close();

displayProjects(projects);
displayTodosOnClick(projects);
addNewProject();
editAndClearProject();
addTodoToProject();
editAndClearTodos();
