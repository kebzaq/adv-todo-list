import React from "react";
import { InputGroup, Input, Button, List, InputGroupText } from "reactstrap";
import { useState } from "react";

export default function SingleTodo({
  id,
  task,
  completed,
  editId,
  handleDelete,
  handleEdit,
  handleSave,
  handleCompleted,
}) {
  const [updateTask, setUpdateTask] = useState(task);
  const handleUpdateTask = (e) => {
    setUpdateTask(e.target.value);
  };
  // const isDisabled = () => true;
  return (
    <div>
      <InputGroup style={{ marginBottom: "2px" }}>
        <InputGroupText>
          <Input
            addon
            aria-label="Checkbox for following text input"
            type="checkbox"
            checked={completed}
            onChange={(e) => {
              handleCompleted(e, id);
            }}
          />
        </InputGroupText>
        <Input
          className={completed ? "cross capital" : "capital"}
          disabled={editId !== id}
          value={updateTask}
          onChange={handleUpdateTask}
        />
        {/* show SAVE if editId === null, and show EDIT if it is not null */}
        {editId === id ? (
          <Button
            color="primary"
            onClick={() => {
              handleSave(editId, updateTask);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            color="secondary"
            onClick={() => {
              handleEdit(id);
            }}
          >
            Edit
          </Button>
        )}

        <Button
          color="danger"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </Button>
      </InputGroup>
    </div>
  );
}
