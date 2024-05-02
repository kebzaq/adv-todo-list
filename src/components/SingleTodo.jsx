// import React from "react";
import { Button, InputGroup, Input, InputGroupText } from "reactstrap";

const SingleTodo = ({ todo }) => {
  console.log(todo);
  return (
    <InputGroup style={{ marginBottom: "2px" }}>
      <InputGroupText>
        <Input
          addon
          aria-label="Checkbox for following text input"
          type="checkbox"
        />
      </InputGroupText>
      <Input value={todo.text} />
      <Button color="primary">Save</Button>
      <Button color="secondary">Edit</Button>
      <Button color="danger">Delete</Button>
    </InputGroup>
  );
};

export default SingleTodo;
