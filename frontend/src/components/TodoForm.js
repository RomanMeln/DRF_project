import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            project: '',
            title: '',
            text: '',
            complete: '',
            user: '',

            }
        }

    handleProjectsChange(event) {
        if(!event.target.selectedOptions){
            return
        }
        let projects = []
        for (let j = 0; j < event.target.selectedOptions.length ; j++) {
            projects.push(parseInt(event.target.selectedOptions.item(j).value))
        }

        // console.log(projects)
        this.setState({
            'projects': projects
        });
    }

    handleUsersChange(event) {
        if(!event.target.selectedOptions){
            return
        }
        let users = []
        for (let j = 0; j < event.target.selectedOptions.length ; j++) {
            users.push(parseInt(event.target.selectedOptions.item(j).value))
        }

        console.log(users)
        this.setState({
            'users': users[0]
        });
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
                [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.newTodo(this.state.projects, this.state.title, this.state.text, this.state.complete, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <select onChange={(event)=>this.handleProjectsChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>

                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={this.state.title}
                    onChange={(event)=>this.handleChange(event)}
                />

                <input
                    type="text"
                    name="text"
                    placeholder="text"
                    value={this.state.text}
                    onChange={(event)=>this.handleChange(event)}
                />

                <input
                    type="date"
                    name="complete"
                    placeholder="date"
                    value={this.state.complete}
                    onChange={(event)=>this.handleChange(event)}
                />

                <select onChange={(event)=>this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id} >{user.first_name} {user.last_name}</option>)}
                </select>

                <input type="submit" value="Create" />
            </form>
            );
        }
    }

export default TodoForm