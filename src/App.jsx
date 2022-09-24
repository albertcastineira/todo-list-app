import React, { useState, useRef, useEffect } from "react"
import TodoList from "./components/TodoList"
import {v4 as uuid} from "uuid"
import './index.css'



const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed =! todo.completed
    setTodos(newTodos)

  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if ( name === "" ) return
    setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuid(),
        name: name,
        completed: false
      }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="p-10">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h1 className="text-3xl"><i className="bi bi-list-check"></i> Lista de tareas</h1>
          </div>
          <div className="col-span-2 text-end">
          <input className="w-2/3 h-12 bg-zinc-700 mr-5 outline-none px-5 rounded text-white" ref={todoNameRef} type="text" />
          <button className="h-11 mr-5 rounded bg-blue-700 px-5 py-2 hover:bg-blue-600" onClick={handleAddTodo}>
            <i className="bi bi-plus-circle"></i> Añadir tarea
          </button>
          <button className="h-11 mr-5 rounded bg-red-800 px-5 py-2 hover:bg-red-700" onClick={handleClearTodos}>
            <i className="bi bi-trash3"></i> Borrar completadas
          </button>
          </div>
        </div>
        <div className='mt-10'>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <div className="text-end mt-10">
          <p>
            <span className="text-xl rounded-full px-5 py-2 bg-blue-700">Tienes {todos.filter(todo => !todo.completed).length} tareas por completar</span>
          </p>
        </div>
        
        
      </div>
    </>
  );
}

export default App;
