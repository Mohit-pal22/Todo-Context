import { useEffect, useState } from "react"
import { TodoProvider } from "./context"
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const getLocalStorageTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    
    if(todos && todos.length>0){
      setTodos(todos);
    }
  }
  
  const setLocalStorageTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(getLocalStorageTodos,[])
  useEffect(setLocalStorageTodos, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [{...todo}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos(todos.map((prevTodo) => (prevTodo.id===id)? todo : prevTodo));
  }

  const deleteTodo = (id) => {
    const newTodoList = todos.filter((todo) => todo.id!==id);
    setTodos(newTodoList);
  }

  const toggleComplete = (id) => {
    const newTodoList = todos.map((prevTodo) => (prevTodo.id===id) ? {...prevTodo, completed: !prevTodo.completed} : prevTodo);
    setTodos(newTodoList);
  }

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            { todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ TodoProvider>
  )
}

export default App
