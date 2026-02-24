export class Project {
    constructor(name = "default") {
        this.name = name;
        this.todoArray = [];
    }
}
export function saveProject(projectObj, projectArray) {
    let projectId = self.crypto.randomUUID();
    projectObj.id = projectId;
    projectArray.push(projectObj);
}
export function deleteProject(projectObj, projectArray) {
    let projectItem = projectArray.findIndex(item => item.id === projectObj.id );
    if(!projectItem) return;
    
    projectArray.splice(projectItem, 1);

}
