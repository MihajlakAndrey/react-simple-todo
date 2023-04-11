import React, { useEffect, useRef, useState } from 'react'

const TodoItem = ({
  todo,
  isDoneHandler,
  removeTodoHandler,
  updateTodoHandler,
}) => {
  const todoInputRef = useRef(null)

  const [updatedTodo, setUpdatedTodo] = useState({ id: null, text: '' })

  const clickOutsideTodoHandler = (e) => {
    if (todoInputRef.current && !todoInputRef.current.contains(e.target)) {
      updateTodoHandler(updatedTodo)
      setUpdatedTodo({ id: null, text: '' })
    }
  }


  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideTodoHandler)
    return () => {
      document.removeEventListener('mousedown', clickOutsideTodoHandler)
    }
  }, [updatedTodo])

  return (
    <div className="todo">
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={todo.isDone}
        onChange={() => isDoneHandler(todo.id)}
      />

      {updatedTodo.id 
        ? (<input
          className="todo__changeTextInput"
          ref={todoInputRef}
          autoFocus
          type="text"
          value={updatedTodo.text}
          onChange={(e) =>
            setUpdatedTodo({ id: todo.id, text: e.target.value })
          }
        />) 
        : (<span
          className={!todo.isDone 
            ? `todo__text` 
            : `todo__text done`}
          onClick={() => setUpdatedTodo({ id: todo.id, text: todo.text })}
        >
          {todo.text ? todo.text : 'What you want to do?'}
        </span>
      )}
      <button
        className="todo__deleteButton"
        onClick={() => removeTodoHandler(todo.id)}
      >
        +
      </button>
    </div>
  )
}

export default TodoItem
