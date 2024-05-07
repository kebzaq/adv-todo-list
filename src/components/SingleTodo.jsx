// import PropTypes from "prop-types";

// import React from "react";
import { useState } from "react";
import { Button, InputGroup, Input, InputGroupText } from "reactstrap";

const SingleTodo = ({
  id,
  text,
  complete,
  editable,
  handleTodoDelete,
  handleTodoEdit,
  handleTodoSave,
  handleTodoComplete,
}) => {
  const [todoInput, setTodoInput] = useState(text);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();

    setTodoInput(value);
  };

  const completed = complete ? "cross" : "";

  return (
    <InputGroup style={{ marginBottom: "2px" }}>
      <InputGroupText>
        <Input
          addon
          checked={complete}
          aria-label="Checkbox for following text input"
          type="checkbox"
          onChange={(e) => handleTodoComplete(e, id)}
          // onChange={() => handleTodoComplete(event, id)}
        />
      </InputGroupText>
      <Input
        className={completed}
        disabled={!editable}
        value={todoInput}
        onChange={handleInputChange}
      />
      {editable ? (
        // <Button onClick={() => handleTodoSave(todoInput, id)} color="primary">
        <Button onClick={() => handleTodoSave(todoInput)} color="primary">
          Save
        </Button>
      ) : (
        <Button onClick={() => handleTodoEdit(id)} color="secondary">
          Edit
        </Button>
      )}
      <Button onClick={() => handleTodoDelete(id)} color="danger">
        Delete
      </Button>
    </InputGroup>
  );
};

// SingleTodo.propTypes = {
//   todo: PropTypes.object.isRequired,
// };

export default SingleTodo;
