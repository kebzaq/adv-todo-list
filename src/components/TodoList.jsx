// import React from "react";
import { Button, InputGroup, Input, List } from "reactstrap";
import SingleTodo from "./SingleTodo";
import { useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
const initialTodos = localStorageTodos !== null ? localStorageTodos : {};

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoInput, setNewTodoInput] = useState("");
  const [editId, setEditId] = useState(null);
  // const inputRef = useRef(null);

  // [
  //     {
  //         id: 1,
  //         text: "Todo 1",
  //         complete: false
  //     },
  //     ...
  // ]

  // {
  //   1: {
  //       text: "Todo 1",
  //       complete: false
  //   },
  //   2: {
  //   }
  // }

  const updateLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAddTodo = () => {
    // const newId = uuidv4();
    // Object.keys(todos) ==> ['1', '2', ...]
    const newTodos = JSON.parse(JSON.stringify(todos));

    if (newTodoInput !== "") {
      const newId =
        Object.keys(newTodos).length !== 0
          ? Math.max(...Object.keys(newTodos)) + 1
          : 1;

      const newTodo = {
        text: newTodoInput,
        complete: false,
      };

      // newTodos.push(newTodo)
      newTodos[newId] = newTodo;
    } else {
      alert("Please enter a text!");
    }

    updateLocalStorage(newTodos);
    setTodos(newTodos);
    setNewTodoInput("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();

    setNewTodoInput(value);
  };

  const handleTodoEdit = (id) => {
    setEditId(id);
  };

  const handleTodoComplete = (e, id) => {
    const newTodos = JSON.parse(JSON.stringify(todos));

    for (let key in newTodos) {
      if (key === id) {
        newTodos[id].complete = e.target.checked;
        break;
      }
    }

    updateLocalStorage(newTodos);
    setTodos(newTodos);
  };

  // const handleTodoSave = (todoText, id) => {
  const handleTodoSave = (todoText) => {
    // editId === id
    const newTodos = JSON.parse(JSON.stringify(todos));

    for (let key in newTodos) {
      // if (key === id) {
      if (key === editId) {
        // newTodos[id].text = todoText;
        newTodos[editId].text = todoText;
        break;
      }
    }

    updateLocalStorage(newTodos);
    setTodos(newTodos);
    setEditId(null);
  };

  const handleTodoDelete = (id) => {
    const newTodos = JSON.parse(JSON.stringify(todos));

    for (let key in newTodos) {
      if (key === id) {
        delete newTodos[id];
        break;
      }
    }

    updateLocalStorage(newTodos);
    setTodos(newTodos);
  };

  const handleClearAllTodos = () => {
    const newTodos = JSON.parse(JSON.stringify(todos));

    for (let key in newTodos) {
      if (newTodos[key].complete) {
        delete newTodos[key];
      }
    }

    updateLocalStorage(newTodos);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo List React App</h1>
      <InputGroup>
        <Input value={newTodoInput} onChange={handleInputChange} />
        <Button onClick={handleAddTodo} color="primary">
          Add Todo
        </Button>
      </InputGroup>
      <main>
        <List style={{ padding: "0" }}>
          {/* {Object.keys(todos).map((id) => {
            return <SingleTodo key={id} todo={todos[id]} />;
          })} */}
          {/* [['key1', 'object1'], ['key2', 'object2'], ...] */}
          {/* todo = { text: "", complete: false} */}
          {Object.entries(todos).map(([id, todo]) => {
            const editable = editId === id; // false ==> true

            const singleProps = {
              id,
              editable,
              ...todo,
              handleTodoEdit,
              handleTodoComplete,
              handleTodoSave,
              handleTodoDelete,
            };
            return <SingleTodo key={id} {...singleProps} />;
          })}
        </List>
      </main>
      <footer>
        <Button onClick={handleClearAllTodos} color="danger">
          Clear Completed Todos
        </Button>
      </footer>
    </>
  );
};

export default TodoList;
