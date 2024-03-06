import React from 'react'
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import axios from 'axios'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import {HashRouter, BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";

const NotFound404 = () => {
    let location = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class AppUser extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          'users': [],
          'projects': [],
          'todos': []
      }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results; //добавил results, чтобы массив приходил
                // console.log(users)
                this.setState(
                {
                    'users': users
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results; //добавил results, чтобы массив приходил
                // console.log(users)
                this.setState(
                {
                    'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const todos = response.data.results; //добавил results, чтобы массив приходил
                // console.log(users)
                this.setState(
                {
                    'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <Menu/>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
  }

export default AppUser;
