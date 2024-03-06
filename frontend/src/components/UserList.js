import React from 'react'
import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    // console.log(user)
    return (
        <tr>
            <td>
                {/*<Link to={`/user/${user.username}`}>{user.first_name}</Link>*/}
                {user.username}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
                {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}
export default UserList