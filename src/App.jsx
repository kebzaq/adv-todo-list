import { InputGroup, Input, Button, List, InputGroupText } from "reactstrap";
import "./App.css";
import { useState } from "react";
import SingleTodo from "./components/SingleTodo";
import { v4 as uuidv4 } from "uuid";

//LS-1: creating var to GET data from localStorage using JSON parse
const localStorageTodoList = JSON.parse(localStorage.getItem("todoList"));
//LS-2: no checking id localStorage has data, if not then create empty array...
const initialTodoList =
  localStorageTodoList !== null ? localStorageTodoList : [];

function App() {
  const [inputTask, setInputTask] = useState("");
  const [todoList, setTodoList] = useState(initialTodoList);
  const [editId, setEditId] = useState(null);

  //LS-3 update LocalStorage
  const updateLocalStorage = (newTodoList) => {
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };
  //handle input value
  const handleChange = (e) => {
    setInputTask(e.target.value);
  };
  // add new todo
  const addTodo = () => {
    //LS-3 create deep copy of toList from useState
    const newTodoList = JSON.parse(JSON.stringify(todoList));
    //
    const newId = newTodoList.length === 0 ? 1 : newTodoList.length - 1 + 1;
    if (inputTask.trim() === "") {
      alert("Enter your task");
    } else {
      // create new Task  - id using uuid
      const newTask = {
        id: uuidv4(),
        task: inputTask.trim(),
        completed: false,
      };
      newTodoList.push(newTask);
      setTodoList(newTodoList);
    }
    updateLocalStorage(newTodoList);
    setInputTask("");
  };
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    updateLocalStorage(newTodoList);
  };
  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = (editId, updateTask) => {
    const tempList = JSON.parse(JSON.stringify(todoList));
    if (updateTask.trim() === "") {
      alert("Enter your task");
    }

    tempList.forEach((el) => {
      if (el.id === editId) {
        el.task = updateTask;
      }
    });

    setTodoList(tempList);
    updateLocalStorage(tempList);
    setEditId(null);
  };

  const handleCompleted = (e, id) => {
    const tempList = JSON.parse(JSON.stringify(todoList));

    tempList.forEach((el) => {
      if (el.id === id) {
        el.completed = e.target.checked;
      }
    });

    setTodoList(tempList);
    updateLocalStorage(tempList);
  };
  const handleClearCompletedTodos = () => {
    const incompleteTodos = todoList.filter((todo) => !todo.completed);
    updateLocalStorage(incompleteTodos);
    setTodoList(incompleteTodos);
  };

  //
  return (
    <div className="App">
      <h1>Todo List React App</h1>
      <InputGroup>
        <Input value={inputTask} onChange={handleChange} />
        <Button color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </InputGroup>
      <main>
        <List style={{ padding: "0" }}>
          {todoList.length > 0 ? (
            todoList.map((todo) => {
              console.log(todo);
              const oneProps = {
                ...todo,
                editId,
                handleDelete,
                handleEdit,
                handleSave,
                handleCompleted,
              };
              return <SingleTodo {...oneProps} key={todo.id} />;
            })
          ) : (
            <p>No Todos yet!</p>
          )}
        </List>
      </main>
      <footer>
        <Button color="danger" onClick={handleClearCompletedTodos}>
          Clear Completed Todos
        </Button>
      </footer>
    </div>
  );
}

export default App;
