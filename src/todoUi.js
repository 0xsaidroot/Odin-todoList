import { Todo, saveTodoToProject, deleteTodoFromProject } from "./todos.js";
import { selectedProject, todoList } from "./projectUi.js";
import {
  projects,
  openDialog,
  closeDialog,
  main,
  saveProjects,
} from "./script.js";

export const todoDialog = document.querySelector("#TodoDialog");
export const todoNameInput = document.querySelector("#todoName");
export const todoDesc = document.querySelector("#todoDesc");
export const todoDate = document.querySelector("#todoDate");
export const priorityBox = document.querySelector(".priorityRadios");

const addTodo = document.querySelector("#addTaskBtn");
let priority = null;
export const todoEditDialog = document.querySelector("#TodoEditDialog");
export const todoEditNameInput = document.querySelector("#todoNameEditInput");
export const editTodo = document.querySelector("#todoEditBtn");

let choosedProject = null;

export function addTodoToProject() {
  addTodo.addEventListener("click", () => {
    choosedProject = selectedProject;
    if (!choosedProject) choosedProject = projects[0];

    console.log(choosedProject);

    openDialog(todoDialog);
  });
  priorityBox.addEventListener("click", function (e) {
    let target = e.target.id;
    switch (target) {
      case "prior3":
        document.querySelector("#prior3").priority = "High";
        break;
      case "prior2":
        document.querySelector("#prior2").priority = "medium";
        break;
      default:
        document.querySelector("#prior1").priority = "Low";
        break;
    }
  });
  todoDialog.addEventListener("click", function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") closeDialog(todoDialog);
    else if (target.id === "addTodoBtn") {
      const todo = new Todo(
        todoNameInput.value,
        todoDesc.value,
        todoDate.value,
        priority,
      );
      console.log(todo);
      closeDialog(todoDialog);
      todoNameInput.value = "";
      todoDesc.value = "";
      todoDate.valueAsDate = new Date();
      priority = null;

      let projectItem = projects.find((item) => item.id === choosedProject.id);
      saveTodoToProject(todo, projectItem);
      displayTodos(projectItem);
      saveProjects();
    } else return;
  });
}
export function displayTodos(projects) {
  todoList.replaceChildren();

  for (const todo of projects.todoArray) {
    const todoItem = document.createElement("div");

    const topLeft = document.createElement("div");
    const topRight = document.createElement("div");
    const bottomLeft = document.createElement("div");
    const bottomRight = document.createElement("div");

    const checkBox = document.createElement('input');

    checkBox.type = "checkBox";
    

    const todoItemName = document.createElement('label');
    const todoItemDesc = document.createElement('p');
    const todoItemDate = document.createElement('p');
    const todoItemPriority = document.createElement('p');

    const clearItem = document.createElement("button");
    const editItem = document.createElement("button");

    todoItem.id = todo.id;

    editItem.textContent = "Edit";
    editItem.className = "editBtn";
    clearItem.textContent = "Clear";
    clearItem.className = "clearBtn";

    todoItemName.textContent = todo.title;
    todoItemDesc.textContent =todo.description;
    todoItemDate.textContent ="dueDate : " + todo.dueDate;
    todoItemPriority.textContent ="Priority : " + todo.priority;

    topLeft.append(checkBox,todoItemName);
    topRight.append(editItem,clearItem);
    bottomLeft.append(todoItemDesc);
    bottomRight.append(todoItemPriority,todoItemDate);
    
    todoList.className = "todoContainer";
    todoItem.className = "todoItem";

    todoItem.append(topLeft,topRight,bottomLeft,bottomRight);
    todoList.append(todoItem);
  }

  main.append(todoList);
}
export function editAndClearTodos() {
  main.addEventListener("click", function (event) {
    let target = event.target;
    if (target.className === "clearBtn") {
      let Item = target.closest(".todoItem");

      console.log(Item);

      if (!Item) return;

      const todoObj = selectedProject.todoArray.find((t) => t.id === Item.id);
      if (todoObj) {
        deleteTodoFromProject(todoObj, selectedProject);
        displayTodos(selectedProject);
        saveProjects();
      }
    } else if (target.className === "editBtn") {
      let item = target.closest(".todoItem");
      if (!item) return;
      console.log(item);

      let todoItem = selectedProject.todoArray.find(
        (obj) => obj.id === item.id,
      );
      if (!todoItem) return;

      console.log(todoItem);
      openDialog(todoEditDialog);

      todoEditDialog.dataset.editingId = todoItem.id;
      todoEditNameInput.value = todoItem.title;
    } else return;
  });
  todoEditDialog.addEventListener("click", function (event) {
    let target = event.target;

    if (target.className === "cancelBtn") closeDialog(todoEditDialog);
    else if (target.id === "todoEditBtn") {
      console.log("clicked Edit");

      let todoItem = selectedProject.todoArray.find(
        (obj) => obj.id === todoEditDialog.dataset.editingId,
      );
      if (!todoItem) return;

      console.log(todoItem);

      todoItem.title = todoEditNameInput.value;

      console.log(todoItem);

      closeDialog(todoEditDialog);

      displayTodos(selectedProject);
      saveProjects();
      todoEditNameInput.value = "";

      console.log({ todoItem });
    } else return;
  });
}
