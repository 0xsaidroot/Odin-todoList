class Todo{
    constructor(title,desc,dueDate,priority){
        this.title = title;
        this.description = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}
function saveToProject(todoObj,projectObj){
    let todoId = self.crypto.randomUUID();
    let projectId = self.crypto.randomUUID();
    todoObj.id = todoId; 
    projectObj.todoArray.push(todoObj);
    projectObj.id = projectId;
}
function deleteFromProject(todoObj,projectObj){
    let todoItem = projectObj.todoArray.findIndex(item => item.id === todoObj.id);
    projectObj.todoArray.splice(todoItem,1);
}

export {Todo,saveToProject,deleteFromProject}