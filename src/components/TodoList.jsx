import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
      return (
        <> 
          <div className='border-t-2 py-5  border-zinc-700'>
            <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          </div> 
        </>
      )
    })
  )
}
