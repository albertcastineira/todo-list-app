import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <>
        <div className=''>
          <p className='text-xl'>
              <input className=' w-5 h-5 checked:bg-blue-300' type="checkbox" defaultChecked={todo.completed} onChange={handleTodoClick} name="todo-status" style={{"margin-right":"10px"}} />
              {todo.name}
          </p>
        </div>
    </>
  )
}
