import "./styles.css";
import {Todo,saveTodoToProject,deleteTodoFromProject} from'./todos.js';
import {Project,saveProject,deleteProject } from "./project.js";


const projects = [];
let project1 = new Project()
let task= [];

for(let i= 1;i<=5;i++){
    task[i] = new Todo(`Programming ${i}`,"A short or long desc",'11/22/26','Very High');
    saveTodoToProject(task[i],project1);
}

saveProject(project1,projects);


console.log({projects})

deleteTodoFromProject(task[1],project1);

deleteProject(project1,projects);

console.log(projects);