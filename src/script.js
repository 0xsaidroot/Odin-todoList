import "./styles.css";
import {Todo,saveToProject,deleteFromProject} from'./todos.js';
import {Project,deleteProject } from "./project.js";


let project1 = new Project()
const task= [];
for(let i= 1;i<=5;i++){
    task[i] = new Todo(`Programming ${i}`,"A short or long desc",'11/22/26','Very High');
    saveToProject(task[i],project1);
}
console.log(project1);

deleteFromProject(task[1],project1)

console.log(project1);

deleteProject(project1);

console.log(project1);