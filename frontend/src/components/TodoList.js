import React from 'react'

const TodoItem = ({todo, deleteTodo}) => {
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
            <td>
                <button type='button' onClick={()=>deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
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
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}
export default TodoList
