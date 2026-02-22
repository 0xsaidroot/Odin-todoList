class Todo{
    constructor(title,desc,dueDate,priority){
        this.title = title;
        this.description = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}
function saveTodoToProject(todoObj,projectObj){
    let todoId = self.crypto.randomUUID();
    todoObj.id = todoId; 
    projectObj.todoArray.push(todoObj);
}
function deleteTodoFromProject(todoObj,projectObj){
    let todoItem = projectObj.todoArray.findIndex(item => item.id === todoObj.id);
    projectObj.todoArray.splice(todoItem,1);
}

export {Todo,saveTodoToProject,deleteTodoFromProject}