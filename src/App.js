import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';

import TodoDataService from './services/todos';

function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user'));
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  
  const [error, setError] = React.useState('');
  console.log("test 1");

  async function login(user = null) { //default user to null
    TodoDataService.login(user)
      .then(response => {
        debugger;
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  }

  async function logout() {
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  async function signup(user = null) { // default user to null
    TodoDataService.signup(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch(e => {
        console.log(e);
        setError(e.toString());
      })
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to="/todos">Todos</Link>
              {user ? (
                <Link className="nav-link" to="/login" onClick={logout}>
                  Logout ({user})</Link>
              ) : (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <TodosList token={token} />
          }>
          </Route>
          <Route path="/todos" element={
            <TodosList token={token} />
          }>
          </Route>
          <Route path="/todos/create" element={
            <AddTodo token={token} />
          }>
          </Route>
          <Route path="/todos/:id/" element={
            <AddTodo token={token} />
          }>
          </Route>
          <Route path="/login" element={
            <Login login={login} />
          }>
          </Route>
          <Route path="/signup" element={
            <Signup signup={signup} />
            }>
          </Route>
        </Routes>
      </div>

      <footer className="text-center text-lg-startbg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright - <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
          >
            Peng Bai
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;