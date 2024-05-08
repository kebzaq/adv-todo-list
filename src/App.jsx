import { InputGroup, Input, Button, List, InputGroupText } from "reactstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Todo List React App</h1>
      <InputGroup>
        <Input />
        <Button color="primary">Add Todo</Button>
      </InputGroup>
      <main>
        <List style={{ padding: "0" }}>
          <InputGroup style={{ marginBottom: "2px" }}>
            <InputGroupText>
              <Input
                addon
                aria-label="Checkbox for following text input"
                type="checkbox"
              />
            </InputGroupText>
            <Input value="Todo 1" onChange={() => {}} />
            <Button color="primary">Save</Button>
            <Button color="secondary">Edit</Button>
            <Button color="danger">Delete</Button>
          </InputGroup>
        </List>
      </main>
      <footer>
        <Button color="danger">Clear Completed Todos</Button>
      </footer>
    </div>
  );
}

export default App;
