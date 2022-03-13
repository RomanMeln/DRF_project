import React from 'react'
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {/*<Link to={`/project/${project.id}`}>{project.name}</Link>*/}
                {project.name}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
               Name
            </th>
            <th>
                Users
            </th>
                {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList