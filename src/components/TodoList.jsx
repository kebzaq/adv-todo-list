// import React from "react";
import { Button, InputGroup, Input, List } from "reactstrap";
import SingleTodo from "./SingleTodo";
import { useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todos, setTodos] = useState({});
  const inputRef = useRef("");

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

  const handleAddTodo = () => {
    // const newId = uuidv4();
    // Object.keys(todos) ==> ['1', '2', ...]
    const newTodos = JSON.parse(JSON.stringify(todos));

    if (inputRef.current !== "") {
      const newId =
        Object.keys(newTodos).length !== 0
          ? Math.max(...Object.keys(newTodos)) + 1
          : 1;

      const newTodo = {
        text: inputRef.current,
        complete: false,
      };

      newTodos[newId] = newTodo;
      console.log(newTodo);
    } else {
      alert("Please enter a text!");
    }

    setTodos(newTodos);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim();

    inputRef.current = value;
  };

  console.log(todos);
  return (
    <>
      <h1>Todo List React App</h1>
      <InputGroup>
        <Input onChange={handleInputChange} />
        <Button onClick={handleAddTodo} color="primary">
          Add Todo
        </Button>
      </InputGroup>
      <main>
        <List style={{ padding: "0" }}>
          {Object.keys(todos).map((id) => {
            return <SingleTodo key={id} todo={todos[id]} />;
          })}
        </List>
      </main>
      <footer>
        <Button color="danger">Clear All Todos</Button>
      </footer>
    </>
  );
};

export default TodoList;
