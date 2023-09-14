import React, { useEffect, useRef, useState } from 'react'

const TodoItem = ({
  todo,
  toggleIsDoneHandler,
  removeTodoHandler,
  updateTodoHandler,
}) => {
  const todoInputRef = useRef(null)

  const [selected, setSelected] = useState(false)

  const clickOutsideTodoHandler = (e) => {
    if (todoInputRef.current && !todoInputRef.current.contains(e.target)) {
      setSelected(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideTodoHandler)
    return () => {
      document.removeEventListener('mousedown', clickOutsideTodoHandler)
    }
  }, [])

  return (
    <div className="todo">
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={todo.isDone}
        onChange={() => toggleIsDoneHandler(todo.id)}
      />

      {selected ? (
        <input
          className="todo__changeTextInput"
          ref={todoInputRef}
          autoFocus
          type="text"
          value={todo.text}
          onChange={(e) =>
            updateTodoHandler({ ...todo, text: e.target.value })
          }
        />
      ) : (
        <span
          className={todo.isDone ? `todo__text done` : `todo__text`}
          onClick={() => setSelected(true)}
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
