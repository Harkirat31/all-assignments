import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [todos, refreshData] = useTodos()

  return (
    <>
      <ListTodos todos={todos} refreshData={refreshData}></ListTodos>
      <AddTodo refreshData={refreshData}></AddTodo>
    </>
  )
}

function AddTodo(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function addTodo() {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(
        {
          title: title,
          description: description
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      props.refreshData()
    })
  }
  function onChangeTitleHandler(event) {
    setTitle(event.target.value)
  }
  function onChangeDescriptionHandler(event) {
    setDescription(event.target.value)
  }

  return <>
    <br></br>
    <h3>New Todo</h3>
    <p>Title</p>
    <input type='text' value={title} onChange={onChangeTitleHandler} ></input>
    <p>Description</p>
    <input type='text' value={description} onChange={onChangeDescriptionHandler}></input>
    <br></br>
    <br></br>
    <button onClick={addTodo}>Add Todo</button>
  </>
}

function useTodos() {
  const [todos, setTodos] = useState([])
  // fetch all todos from server
  let fetchData = function () {
    fetch("http://localhost:3000/todos", {
      method: "GET"
    }).then((response) => {
      response.json().then((data) => {
        setTodos(data)
      })
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return [todos, fetchData]
}

function ListTodos(props) {
  function deleteTodo(event) {
    let todoId = event.target.value
    fetch("http://localhost:3000/todos/" + todoId, {
      method: "DELETE"
    }).then((res) => {
      props.refreshData()
    })
    console.log(event.target.value)
  }
  return <>
    <div>
      <table>
        <tr>
          <th>Sr.</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {props.todos.map((todo, index) => {
          return <tr>
            <td>{index + 1}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td><button value={todo.id} onClick={deleteTodo}>Delete</button></td>
          </tr>
        })}
      </table>
    </div>

  </>
}

export default App
