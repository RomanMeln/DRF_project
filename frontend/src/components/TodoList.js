import React from 'react'

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.title}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                Title
            </th>
            <th>
                Text
            </th>
            <th>
                User
            </th>
                {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default TodoList
