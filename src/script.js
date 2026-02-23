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
const projectList = document.querySelector('#projectList')
 const newProjectName = document.querySelector('#projectName');

displayProjects(projectList, aside, projects);
displayTodos(aside, main, projects);

//Opening and closure of new Project Dialog box
const showDialog = (show) =>
    show ? dialog.showModal() : dialog.close();

aside.addEventListener('click', (event) => {
    let target = event.target;

    if (target.id === 'openDialog') {
        showDialog(true);
    } else return;

})
//Adding new project to UI logic to be moved 
dialog.addEventListener('click', function (event) {
    let target = event.target.id;

    if (target === "cancelBtn") showDialog(false);
    else if (target === "addBtn") {
        const newProject = new Project(newProjectName.value);
        newProjectName.value = '';
        showDialog(false);
        saveProject(newProject, projects);
        displayProjects(projectList, aside, projects);
    }
    else return;
})
//clear and editing projects
projectList.addEventListener('click', (event) => {
    let target = event.target;

    if (target.className === 'editBtn') {

        let item = target.closest("li");
        if(!item) return;
        let projectItem = projects.find(obj => obj.id === item.id);
        if (!projectItem) return;
        console.log(projectItem);
        showDialog(true);
        newProjectName.value = projectItem.name;
        projectItem.name = newProjectName.value;
        displayProjects(projectList, aside, projects);

    } else if (target.className === 'clearBtn') {
        let item = target.closest("li");
        if(!item) return;
        deleteProject(item,projects);
        console.log(projects);
        displayProjects(projectList, aside, projects);

    } else return;
})
