import "./styles.css";
import { Todo, saveTodoToProject, deleteTodoFromProject } from './todos.js';
import { Project, saveProject, deleteProject } from "./project.js";
import { displayProjects, displayTodos } from "./projectUi.js";


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
const dialog = document.querySelector('dialog');

displayProjects(aside, projects);
displayTodos(aside, main, projects);

const showDialog = (show) =>
    show ? dialog.showModal() : dialog.close();

aside.addEventListener('click', (event) => {
    let target = event.target;

    if (target.id === 'openDialog') {
        showDialog(true);
    } else return;

})

dialog.addEventListener('click', function (event) {
    let target = event.target.id;

    if (target === "cancelBtn") showDialog(close);
    else if (target === "addBtn") {
        const newProjectName = document.querySelector('projectName');
        const newProject = new Project(newProjectName.value);
        saveProject(newProject, projects);
        displayProjects(aside, projects);
    }
    else return;

})