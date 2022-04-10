import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Menu from './components/Menu.js'
import LoginForm from "./components/LoginForm";
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import Footer from './components/Footer.js'
import {HashRouter, BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
          'todos': [],
          'token': ''
      }
    }
    getData(){
      let headers = this.getHeader()

      axios
            .get('http://127.0.0.1:8000/api/users/0.1/', {headers}) //добавил версию вывода Users
            .then(response => {
                const users = response.data; //убрал results, так как убрал пагинатор
                // console.log(users)
                this.setState(
                {
                    'users': users
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data; //убрал results, так как убрал пагинатор
                // console.log(users)
                this.setState(
                {
                    'projects': projects
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data; //убрал results, так как убрал пагинатор
                // console.log(users)
                this.setState(
                {
                    'todos': todos
                    }
                )
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todos': []
                })
            })
    }
    componentDidMount() {
        let token = localStorage.getItem('token') // вызваать данные из локального хранилища
        this.setState({
                'token': token
            }, this.getData)
        }

    isAuth(){
      return !!this.state.token // не не
    }

    logout() {
        localStorage.setItem('token', '') // сохранить данные в локальном хранилище. Ключ и значение через запятую.!
            this.setState({
                'token': ''
            }, this.getData)
        }

    newProject(name, users) {
        let headers = this.getHeader()
        let data = {'name': name, 'users': users}
        console.log(name, users)
        axios
            .post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(data, headers)
                console.log(error)
            })
    }

    deleteProject(id) {
      console.log(id)
        const headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState(
                    {projects: this.state.projects.filter((project)=>project.id !== id)
                    })
            }).catch(error => console.log(error))
        }

    newTodo(projects, title, text, complete, user) {
        let headers = this.getHeader()
        let data = {'project': projects[0], 'title': title, 'text': text, 'complete': complete, 'user': 1}
        console.log(data)
        axios
            .post('http://127.0.0.1:8000/api/todos/', data, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteTodo(id){
        console.log(id)
        const headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState(
                    {todos: this.state.todos.filter((todo)=>todo.id !== id)
                    })
            }).catch(error => console.log(error))
        }



    getHeader(){
        if (this.isAuth()){
            return {
                'Authorization': 'Token ' + this.state.token // 'Token_' обязательно пробел на месте черты
            }

        }
        return {}
    }

    getToken(login, password) {
      console.log(login, password)
      axios
          .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
          .then(response => {
              const token = response.data.token;
              // console.log(token)
              localStorage.setItem('token', token) // сохранить данные в локальном хранилище. Ключ и значение через запятую.!
              this.setState({
                  'token': token
              }, this.getData)
          })
          .catch(error => alert('Неверный логин или пароль'))
        }


    render () {
        return (
            <div>
                <Menu/>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/projects/create'>New project</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                        <li><Link to='/todos/create'>New to-do</Link></li>
                        <li>
                            {this.isAuth() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={
                            <ProjectList
                                projects={this.state.projects}
                                deleteProject={(id)=>this.deleteProject(id)}
                            />}
                        />
                        <Route exact path='/projects/create' element={
                            <ProjectForm
                                users={this.state.users}
                                newProject={(name, users)=>this.newProject(name, users)}
                            />}
                        />
                        <Route exact path='/todos' element={
                            <TodoList
                                todos={this.state.todos}
                                deleteTodo={(id)=>this.deleteTodo(id)}
                            />}
                        />
                        <Route exact path='/todos/create' element={
                            <TodoForm
                                projects={this.state.projects}
                                users={this.state.users}
                                newTodo={(projects, title, text, complete, users)=>this.newTodo(projects, title, text, complete, users)}
                            />}
                        />
                        <Route exact path='/login' element={
                            <LoginForm
                                getToken={(login, password) => this.getToken(login, password)}
                            />}
                        />
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
  }

export default AppUser;