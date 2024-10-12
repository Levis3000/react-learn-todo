import React, { useEffect, useState } from 'react'
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
const [todos, setTodos] = useState([])
const [todoValue, setTodoValue] = useState('')

function handleAddTodos(newTodo){
  const newTodoList = [...todos, newTodo]
  // console.log(newTodoList)
  persistData(newTodoList)
  setTodos(newTodoList)
}


function persistData(newList) {
  localStorage.setItem("todos", JSON.stringify({todos:newList}))


}

function handleDeleteTodo(index){
const newTodoList = todos.filter((todos, todoIndex) => {
return todoIndex !== index
})
persistData(newTodoList)
setTodos(newTodoList)
}

function handleEditTodo(index){
  const valueToBeEdited = todos[index]
  console.log(valueToBeEdited)

  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)


}
useEffect(() => {

  if(!localStorage) {
    return
  }

  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos = JSON.parse(localTodos).todos
   setTodos(localTodos)
}, [])

return (
<>
<TodoInput handleAddTodos={handleAddTodos} setTodoValue={setTodoValue} todoValue={todoValue} />
<TodoList handleDeleteTodo={handleDeleteTodo}  handleEditTodo={handleEditTodo} todos={todos}/>
</>
  )
}

export default App
