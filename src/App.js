import { useState, useEffect } from 'react'

import TodosInfo from './components/TodosInfo'
import TodoItem from './components/TodoItem'
import { createTodo } from './utils/createTodo'

import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const pendingTodoCounter = todos.length

  const addTodoHandler = () => {
    const newTodo = createTodo()
    setTodos([...todos, newTodo])
  }

  const toggleIsDoneHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone
        }
        return todo
      })
    )
  }

  const updateTodoHandler = (updatedTodo) => {
    const updatedTodos = todos.slice().map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.text = updatedTodo.text
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const removeTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const deleteAllTodoHandler = () => {
    if (window.confirm('Confirm?')) {
      setTodos([])
    }
  }

  useEffect(() => {
    const localTodos = window.localStorage.getItem('todos')
    if (localTodos) setTodos(JSON.parse(localTodos))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className="title">React Todo</h1>
        <TodosInfo
          deleteAllTodoHandler={deleteAllTodoHandler}
          pendingTodoCounter={pendingTodoCounter}
        />

        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleIsDoneHandler={toggleIsDoneHandler}
              removeTodoHandler={removeTodoHandler}
              updateTodoHandler={updateTodoHandler}
            />
          ))}
          <button className="todo-list__addButton" onClick={addTodoHandler}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
