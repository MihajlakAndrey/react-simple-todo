import { useState } from 'react'
import TodosInfo from './components/TodosInfo'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className='title'>React Todo</h1>
        <TodosInfo todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default App
