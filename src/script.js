import "./styles.css";
import { Todo, saveTodoToProject, deleteTodoFromProject } from './todos.js';
import { Project, saveProject, deleteProject } from "./project.js";
import { displayProjects } from "./projectUi.js";
import { displayTodos } from "./todoUi.js";

const projects = [];
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




const aside = document.querySelector('aside');
const main = document.querySelector('main');

displayProjects(aside,projects);
displayTodos(aside,main,projects);

