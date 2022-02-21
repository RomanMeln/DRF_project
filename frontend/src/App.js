import React from 'react'
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/AuthorList.js'
import UserList from './components/UserList.js'
import axios from 'axios'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'

// class App extends React.Component {
//   constructor(props) {
//       super(props)
//       this.state = {
//           'authors': [],
//       }
//     }
//
//     componentDidMount() {
//         axios
//             .get('http://127.0.0.1:8000/api/authors/')
//             .then(response => {
//                 const authors = response.data
//                 this.setState(
//                 {
//                     'authors': authors
//                     }
//                 )
//             })
//             .catch(error => console.log(error))
//     }
//
//     render () {
//         return (
//             <div>
//               <AuthorList authors={this.state.authors} />
//             </div>
//         )
//     }
//   }



class AppUser extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          'users': []
      }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                {
                    'users': users
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render () {
        return (
            <div>
                <Menu/>
                <UserList users={this.state.users} />
                <Footer/>
            </div>
        )
    }
  }

export default AppUser;
