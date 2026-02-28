import { Todo, saveTodoToProject, deleteTodoFromProject } from "./todos.js";
import { selectedProject, todoList } from "./projectUi.js";
import { projects, openDialog, closeDialog, main, saveProjects } from "./script.js";


export const todoDialog = document.querySelector('#TodoDialog');
export const todoNameInput = document.querySelector('#todoName');
const addTodo = document.querySelector('#addTaskBtn')

export const todoEditDialog = document.querySelector('#TodoEditDialog');
export const todoEditNameInput = document.querySelector('#todoNameEditInput');
export const editTodo = document.querySelector('#todoEditBtn')

let choosedProject = null;

export function addTodoToProject(){
addTodo.addEventListener('click', () => {

    choosedProject = selectedProject;

    if (!choosedProject) choosedProject = projects[0];

    console.log(choosedProject);
    openDialog(todoDialog);
})
todoDialog.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") closeDialog(todoDialog);
    else if (target.id === "addTodoBtn") {
        const todoName = todoNameInput.value;
        const todo = new Todo(todoName, '', '', '');
        closeDialog(todoDialog);
        todoNameInput.value = "";
        let projectItem = projects.find(item => item.id === choosedProject.id);
        saveTodoToProject(todo, projectItem);
        displayTodos(projectItem);
        saveProjects();

    }
    else return;
})
}
export function displayTodos(projects) {
    todoList.replaceChildren();

    for (const todo of projects.todoArray) {
        const todoItem = document.createElement('li');
        const clearItem = document.createElement('button');
        const editItem = document.createElement('button');

        todoItem.id = todo.id;
        editItem.textContent = "Edit";
        editItem.className = 'editBtn';
        clearItem.textContent = 'Clear';
        clearItem.className = 'clearBtn';
        todoItem.textContent = todo.title;
        todoItem.append(editItem, clearItem);
        todoList.append(todoItem);
    }

    main.append(todoList);
}
export function editAndClearTodos(){
    main.addEventListener('click', function (event) {
    let target = event.target;
    if (target.className === 'clearBtn') {
        let Item = target.closest('li');
        if (!Item) return;

        const todoObj = selectedProject.todoArray.find(t => t.id === Item.id);
        if (todoObj) {
            deleteTodoFromProject(todoObj, selectedProject);
            displayTodos(selectedProject);
            saveProjects();
        }
    } else if (target.className === "editBtn") {
        let item = target.closest("li");
        if (!item) return;
        console.log(item);

        let todoItem = selectedProject.todoArray.find(obj => obj.id === item.id);
        if (!todoItem) return;

        console.log(todoItem);
        openDialog(todoEditDialog);

        todoEditDialog.dataset.editingId = todoItem.id;
        todoEditNameInput.value = todoItem.title;
    } else return
})
todoEditDialog.addEventListener('click', function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") closeDialog(todoEditDialog);
    else if (target.id === "todoEditBtn") {

        console.log("clicked Edit");

        let todoItem = selectedProject.todoArray.find(obj => obj.id === todoEditDialog.dataset.editingId);
        if (!todoItem) return;

        console.log(todoItem);

        todoItem.title = todoEditNameInput.value;

        console.log(todoItem);

        closeDialog(todoEditDialog);

        displayTodos(selectedProject);
        saveProjects();
        todoEditNameInput.value = '';

        console.log({ todoItem});
    }
    else return;
})
}