class Todo{
    constructor(title,desc,dueDate,priority){
        this.title = title;
        this.description = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    get title(){
        return this.title;
    }
    set title(title){
        this.title = title;
    }
    get desc(){
        return this.description;
    }
    set description(desc){
        this.description = desc;
    }
    get date(){
        return this.dueDate;
    }
    set dueDate(date){
        this.dueDate = date;
    }
    get priority(){
        return this.priority;
    }
    set priority(priority){
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