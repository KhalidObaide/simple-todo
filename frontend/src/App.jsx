import { useState, useEffect } from "react";

const API = "/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await fetch(API);
    setTodos(await res.json());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await fetch(`${API}/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Todo App</h1>

      <form onSubmit={addTodo} style={styles.form}>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit" style={styles.addBtn}>
          Add
        </button>
      </form>

      <ul style={styles.list}>
        {todos.map((t) => (
          <li key={t.id} style={styles.item}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={!!t.done}
                onChange={() => toggleTodo(t)}
              />
              <span style={t.done ? styles.done : styles.text}>{t.title}</span>
            </label>
            <button onClick={() => deleteTodo(t.id)} style={styles.delBtn}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p style={styles.empty}>No todos yet!</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "60px auto",
    fontFamily: "system-ui, sans-serif",
    padding: "0 16px",
  },
  heading: { textAlign: "center", marginBottom: 24 },
  form: { display: "flex", gap: 8, marginBottom: 24 },
  input: {
    flex: 1,
    padding: "10px 12px",
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  addBtn: {
    padding: "10px 20px",
    fontSize: 16,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  label: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  text: { fontSize: 16 },
  done: { fontSize: 16, textDecoration: "line-through", opacity: 0.5 },
  delBtn: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#e11d48",
  },
  empty: { textAlign: "center", color: "#999" },
};
