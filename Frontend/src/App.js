import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>To Do App</h1>

      <input
        type="text"
        placeholder="Add task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
