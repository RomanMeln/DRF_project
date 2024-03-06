import React from 'react'


class ProjectFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: ''}
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
        console.log(this.state.name)
        this.props.filterProject(this.state.name)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name}
                       onChange={(event)=>this.handleChange(event)} />
                <input type="submit" value="Projects filter" />
            </form>

            );
        }
    }

export default ProjectFilter
