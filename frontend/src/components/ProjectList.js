import React from 'react'
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {/*<Link to={`/project/${project.id}`}>{project.name}</Link>*/}
                {project.name}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button type='button' onClick={()=>deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>
               Name
            </th>
            <th>
                Users
            </th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}
export default ProjectList