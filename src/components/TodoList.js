import React, { useEffect } from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, setTodos }) => {

  const addTodoHandler = () => {
    setTodos((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        text: '',
        isDone: false,
      },
    ])
  }

  const isDoneHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone
        }
        return todo
      })
    )
  }

  const removeTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
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

  useEffect(() => {
    if (window.localStorage.getItem('todos'))
      setTodos(JSON.parse(window.localStorage.getItem('todos')))
  }, [])
  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isDoneHandler={isDoneHandler}
          removeTodoHandler={removeTodoHandler}
          updateTodoHandler={updateTodoHandler}
        />
      ))}
      <button className="todo-list__addButton" onClick={addTodoHandler}>
        +
      </button>
    </div>
  )
}

export default TodoList
