export class Project {
    constructor(name = "default") {
        this.name = name;
        this.todoArray = [];
    }
    get name(){
        return this.name
    }
    set name(name){
        this.name = name;
    }

}
export function deleteProject(projectObj) {
    Object.keys(projectObj).forEach(key => {
       projectObj[key] = null;
    });
}
