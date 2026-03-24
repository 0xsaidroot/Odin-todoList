import "./styles.css";
import "pretty-checkbox/dist/pretty-checkbox.min.css";
import { Todo, saveTodoToProject } from './todos.js';
import { Project, saveProject } from "./project.js";
import { addNewProject, displayProjects, displayTodosOnClick, editAndClearProject, selectedProject } from "./projectUi.js"
import { addTodoToProject, displayTodos, editAndClearTodos } from "./todoUi.js";



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
    try {
        raw = JSON.parse(data);
    } catch (e) {
        console.error('Failed to parse projects from storage', e);
        return
    }
    raw.forEach(element => {
        let proj = new Project(element.name);
        proj.desc = element.desc;
        proj.id = element.id;
        proj.todoArray = (element.todoArray || []).map(t => {
            const task = new Todo(t.title, t.description, t.dueDate, t.priority);
            task.id = t.id;
            return task;
        })
        projects.push(proj);
    });
}
function startProject() {
    if (Object.keys(projects).length === 0) {
        let project1 = new Project();
        project1.desc = "Lorem ipsum dolor sit amet consectetur adipisicing ipsa repellendus, saepe tempora aliquid laudantium officia distinctio. Tempore asperiores odit provident iste earum commodi unde nesciunt.";
        let task = [];

        for (let i = 1; i <= 5; i++) {
            task[i] = new Todo(`Programming ${i}`, "A short or long desc", '2026-03-13', 'High');
            saveTodoToProject(task[i], project1);
        }
        saveProject(project1, projects);
    }
}

export const main = document.querySelector('main');
export const openDialog = (dialog) => dialog.showModal();
export const closeDialog = (dialog) => dialog.close();







loadProjects();
startProject();
displayProjects(projects);
displayTodosOnClick(projects);
addNewProject();
editAndClearProject();
addTodoToProject();
editAndClearTodos();
displayTodos(projects[0]);



