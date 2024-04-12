import './App.css';
import List from './components/List';
import TodoItem from './components/TodoItem';
import InputAdd from './components/InputAdd';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { queries } from './queries';
import { mutations } from './mutations';



function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [findTodo, setFindTodo] = useState('')
  const [todoInfo, setTodoInfo] = useState()
  const { loading: loadingTodos, error: errorTodos, refetch: refetchTodos } = useQuery(queries.GET_TODOS);
  const { loading: loadingTodo, error: errorTodo, refetch: refetchTodo } = useQuery(queries.GET_TODO);
  const [createTodo] = useMutation(mutations.ADD_TODO); 
  const [updateTodo] = useMutation(mutations.UPDATE_TODO);
  const [deleteTodo] = useMutation(mutations.DEL_TODO);


  useEffect(() => {
    const RefechedData = async () => {
      const fetchedTodos = await refetchTodos()
      const InitList = [...fetchedTodos.data.todos.data].reverse()
      setTodos(InitList)
    }
    RefechedData()
  },[])

  
  const handleNewTodo = async () => {
    const fetchedTodos = await refetchTodos()
    let list = [...fetchedTodos.data.todos.data].reverse()
    createTodo({ variables: { title: newTodo, completed: false } })
    .then(result => {
      // Handle success
      list.unshift(result.data.createTodo)
      console.log("Todo added:", result.data.createTodo);
      setTodos(list)
    })
    .catch(error => {
      // Handle error
      console.error('Error adding todo:', error);
    });
  };
  const handleFindTodo = async () => {
    const fetchedTodo = await refetchTodo({id: findTodo})
    console.log("Todo found:", fetchedTodo.data.todo);
    setTodoInfo(fetchedTodo.data.todo)
  }

  const handleDeleteTodo = async (id) => {
    const fetchedTodos = await refetchTodos()
    let list = [...fetchedTodos.data.todos.data].reverse()
    deleteTodo({ variables: { id: id } })
    .then(result => {
      // Handle success
      console.log("ID",id ,"todo deleted:", result.data.deleteTodo);
      list = list.filter(todo => todo.id !== id)
      setTodos(list)
    })
    .catch(error => {
      // Handle error
      console.error('Error deleting todo:', error);
    })
  }

  const handleUpdateTodo = async (id, newTitle) => {
    const fetchedTodos = await refetchTodos()
    let list = [...fetchedTodos.data.todos.data].reverse()
    updateTodo({variables: { id: id, title: newTitle, completed: false } })
    .then(result => {
      // Handle success
      console.log("Todo updated:", result.data.updateTodo);
      list = list.map(todo => todo.id === id ? result.data.updateTodo : todo)
      setTodos(list)
    })
    .catch(error => {
      // Handle error
      console.error('Error updating todo:', error);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GraphQL TODOS</h1>
        <div className='container d-flex flex-row justify-content-around'>
          <InputAdd setNewTodo={setNewTodo} label="Pridėti duomenis" onClick={handleNewTodo}/>
          <InputAdd setFindTodo={setFindTodo} label="Surasti duomenis" onClick={handleFindTodo}/>
        </div>
      </header>
      <main className='container'>
        {todoInfo && <TodoItem todo={todoInfo} onDelete={handleDeleteTodo} setTodoInfo={setTodoInfo} onUpdate={handleUpdateTodo}/>}
        {loadingTodos && <p>Loading...</p>}
        {errorTodos && <p>Error: {errorTodos.message}</p>}
        {todos.length > 0 && <List  data={todos} onDelete={handleDeleteTodo}/>}
      </main>
    </div>
  );
}

export default App;
