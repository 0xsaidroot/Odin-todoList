import "./styles.css";
import { Todo, saveTodoToProject, deleteTodoFromProject } from './todos.js';
import { Project, saveProject, deleteProject } from "./project.js";
import { displayProjects, displayTodos } from "./projectUi.js";
import { selectedProject } from "./projectUi.js";

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

const addDialog = document.querySelector('#addDialogBox');
const editDialog = document.querySelector('#editDialogBox');

const todoDialog = document.querySelector('#TodoDialog');

const projectList = document.querySelector('#projectList')

const todoName = document.querySelector('#todoName');
const addTodoBtnDialog = document.querySelector('#addTodoBtn');
const addTodoToProject = document.querySelector('#addingTaskBtn')

const newProjectName = document.querySelector('#projectName');
const editProjectName = document.querySelector('#projectNameEdit');

displayProjects(projectList, aside, projects);
displayTodos(aside, main, projects);

//Opening and closure of new Project Dialog box
const showAddDialog = (show) =>
    show ? addDialog.showModal() : addDialog.close();

const showEditDialog = (show) =>
    show ? editDialog.showModal() : editDialog.close();

const showTodoDialog = (show) =>
    show ? todoDialog.showModal() : todoDialog.close();

aside.addEventListener('click', (event) => {
    let target = event.target;

    if (target.id === 'openDialog') {
        showAddDialog(true);
    } else return;

})
//Adding new project to UI logic to be moved 
addDialog.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") showAddDialog(false);
    else if (target.id === "addBtn") {
        const newProject = new Project(newProjectName.value);
        newProjectName.value = '';

        showAddDialog(false);
        saveProject(newProject, projects);
        displayProjects(projectList, aside, projects);
    }
    else return;
})
// Editing existing projectName
editDialog.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") showEditDialog(false);
    else if (target.id === "editBtnDialog") {
        const editingItem = projects.find(item => item.id === editDialog.dataset.editingId);
        if (!editingItem) return;
        console.log(editingItem);

        editingItem.name = editProjectName.value;

        showEditDialog(false);

        displayProjects(projectList, aside, projects);
        editProjectName.value = '';

        console.log({editingItem});


    }
    else return;
})

//clear and editing projects containerLogic
projectList.addEventListener('click', (event) => {
    let target = event.target;

    if (target.className === 'editBtn') {

        let item = target.closest("li");
        if (!item) return;
        let projectItem = projects.find(obj => obj.id === item.id);
        if (!projectItem) return;

        console.log(projectItem);

        showEditDialog(true);

        editDialog.dataset.editingId = projectItem.id;
        editProjectName.value = projectItem.name;


    } else if (target.className === 'clearBtn') {
        let item = target.closest("li");
        if (!item) return;
        deleteProject(item, projects);
        console.log(projects);
        displayProjects(projectList, aside, projects);

    } else return;
})

// Add todo to project
main.addEventListener('click',(event)=>{
     let target = event.target;

     if(target.id === "addingTaskBtn"){
        showTodoDialog(true);
        console.log(selectedProject);
     }

    else return
})