import "./styles.css";
import { Todo } from './todos.js';
import { Project, saveProject } from "./project.js";
import { addNewProject, displayProjects, displayTodosOnClick, editAndClearProject } from "./projectUi.js"
import { addTodoToProject, editAndClearTodos } from "./todoUi.js";



export const projects = [];

export function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem('projects');
    if (!data) {
        console.log('no saved projects in localStorage');
        return;
    }

    let raw;
    try {
        raw = JSON.parse(data);
    } catch (e) {
        console.error('Failed to parse projects from storage', e);
        return;
    }
    raw.forEach(p => {
        const proj = new Project(p.name);
        proj.id = p.id;
        proj.todoArray = (p.todoArray || []).map(t => {
            const todo = new Todo(t.title, '', '', '');
            todo.id = t.id;
            return todo;
        });
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


