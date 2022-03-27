import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Menu from './components/Menu.js'
import LoginForm from "./components/LoginForm";
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'

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
          'todos': [],
          'token': ''
      }
    }
    getData(){
      let headers = this.getHeader()

      axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
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
              console.log(token)
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
                        <li><Link to='/todos'>Todos</Link></li>
                        <li>
                            {this.isAuth() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                        <Route exact path='/login' element={<LoginForm
                            getToken={(login, password) => this.getToken(login, password)} />} />
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
  }

export default AppUser;