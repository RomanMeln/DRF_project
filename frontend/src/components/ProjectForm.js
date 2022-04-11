import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            name: '',
            users: '',
            }
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
            'users': users
        });
    }

    handleChange(event)
        {
            this.setState(
            {
                    [event.target.name]: event.target.value
                }
            );
        }

    handleSubmit(event) {
        this.props.newProject(this.state.name, this.state.users)
        event.preventDefault()
        }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={(event)=>this.handleChange(event)}
                />
                <select multiple onChange={(event)=>this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id} >{user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
            );
        }
    }

export default ProjectForm