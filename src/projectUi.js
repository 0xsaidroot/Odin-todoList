 const projectList = document.createElement('ul');

export function displayProjects(aside,projects) {
    for (const project of projects) {
        const projectItem = document.createElement('li');
        projectItem.id = project.id;
        projectItem.textContent = project.name;
        projectList.append(projectItem);
    }
    aside.append(projectList);
}