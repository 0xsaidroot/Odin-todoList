export class Project {
    constructor(name = "default") {
        this.name = name;
        this.todoArray = [];
    }
}
export function deleteProject(projectObj) {
    Object.keys(projectObj).forEach(key => {
       projectObj[key] = null;
    });
    projectObj = null;
}
