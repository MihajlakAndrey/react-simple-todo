import React from 'react'

const TodosInfo = ({ pendingTodoCounter, deleteAllTodoHandler }) => {
  return (
    <div className="info">
      <span className="info__text">
        {pendingTodoCounter > 0
          ? `You have ${pendingTodoCounter} pending tasks`
          : `You dont have any tasks`}
      </span>
      {pendingTodoCounter > 0 && (
        <button
          className="info__deleteAllTodoButton"
          onClick={deleteAllTodoHandler}
        >
          Clear all
        </button>
      )}
    </div>
  )
}

export default TodosInfo
