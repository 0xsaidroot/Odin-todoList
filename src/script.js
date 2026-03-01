import "./styles.css";
import { Todo } from './todos.js';
import { Project } from "./project.js";
import { addNewProject, displayProjects, displayTodosOnClick, editAndClearProject } from "./projectUi.js"
import { addTodoToProject, editAndClearTodos } from "./todoUi.js";



export const projects = [];

export function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}
export function loadProjects() {
    let data = localStorage.getItem("projects");
    if (!data) {
        console.log('no saved projects in localStorage')
        return
    }
    let raw;
    try{
        raw = JSON.parse(data);
    }catch(e){
        console.error('Failed to parse projects from storage',e);
        return
    }
    raw.array.forEach(element => {
        let proj = new Project(element.name);
        proj.id = element.id;
        proj.todoArray = (element.todoArray || []).map(t =>{
            const task = new Todo(t.title,'','','');
            task.id =t.id;
            return task;
        })
        projects.push(proj);
    });
}

export const main = document.querySelector('main');
export const openDialog = (dialog) => dialog.showModal();
export const closeDialog = (dialog) => dialog.close();







loadProjects();

displayProjects(projects);
displayTodosOnClick(projects);
addNewProject();
editAndClearProject();
addTodoToProject();
editAndClearTodos();


