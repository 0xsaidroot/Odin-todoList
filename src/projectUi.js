import { Project, saveProject, deleteProject } from "./project.js";
import { openDialog, closeDialog, projects } from "./script.js";
import { displayTodos } from "./todoUi.js";


export const todoList = document.createElement('ul');

export let selectedProject;

const newProjectDialog = document.querySelector('#newProjectDialogBox');
const editProjectDialog = document.querySelector('#editProjectDialogBox');
const projectList = document.querySelector('#projectList')
const newProjectName = document.querySelector('#newProjectName');
const editProjectName = document.querySelector('#projectNameEdit');

const aside = document.querySelector('aside');



export function displayProjects(projects) {

    projectList.innerHTML = '';


    for (const project of projects) {
        const projectItem = document.createElement('li');
        const clearItem = document.createElement('button');
        const editItem = document.createElement('button');

        projectItem.id = project.id;

        editItem.textContent = "Edit";
        editItem.className = 'editBtn';
        clearItem.textContent = 'Clear';
        clearItem.className = 'clearBtn';
        projectItem.textContent = project.name;

        projectItem.append(editItem, clearItem);
        projectList.append(projectItem);
    }
    aside.append(projectList);
}
export function displayTodosOnClick(projects) {

    aside.addEventListener('click', function (event) {
        let target = event.target.id;
        let projectItem = projects.find(item => item.id === target);

        selectedProject = projectItem;

        if (!projectItem) return;

        todoList.replaceChildren();
        displayTodos(projectItem);
    })
}
export function openNewProjectDialog() {
    aside.addEventListener('click', (event) => {
        let target = event.target;

        if (target.id === 'newProjectBtn') {
            openDialog(newProjectDialog);
        } else return;

    })
}
export function addNewProject() {
    openNewProjectDialog();

    newProjectDialog.addEventListener('click', function (event) {
        let target = event.target;

        if (target.className === "cancelBtn") closeDialog(newProjectDialog);
        else if (target.id === "addBtn") {
            const newProject = new Project(newProjectName.value);
            newProjectName.value = '';

            openDialog(newProjectDialog);
            saveProject(newProject, projects);
            displayProjects(projects);
        }
        else return;
    })
}
export function editAndClearProject() {
    projectList.addEventListener('click', (event) => {
        let target = event.target;

        if (target.className === 'editBtn') {

            let item = target.closest("li");
            if (!item) return;
            let projectItem = projects.find(obj => obj.id === item.id);
            if (!projectItem) return;

            console.log(projectItem);

            openDialog(editProjectDialog);

            editProjectDialog.dataset.editingId = projectItem.id;
            editProjectName.value = projectItem.name;


        } else if (target.className === 'clearBtn') {
            let item = target.closest("li");
            if (!item) return;
            deleteProject(item, projects);
            console.log(projects);
            displayProjects(projects);

        } else return;
    })
    editProjectDialog.addEventListener('click', function (event) {
        let target = event.target;

        if (target.className === "cancelBtn") closeDialog(editProjectDialog);
        else if (target.id === "editBtn") {
            const editingItem = projects.find(item => item.id === editProjectDialog.dataset.editingId);
            if (!editingItem) return;
            console.log(editingItem);

            editingItem.name = editProjectName.value;

            closeDialog(editProjectDialog);

            displayProjects(projects);
            editProjectName.value = '';

            console.log({ editingItem });
        }
        else return;
    })
}
