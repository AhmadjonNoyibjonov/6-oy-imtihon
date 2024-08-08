import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const nameRef = useRef();
  const countryRef = useRef();
  const urlRef = useRef();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = () => {
    const name = nameRef.current.value.trim();
    const country = countryRef.current.value.trim();
    const url = urlRef.current.value.trim();

    if (name && country && url) {
      const newTodo = { name, country, url };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));

      nameRef.current.value = "";
      countryRef.current.value = "";
      urlRef.current.value = "";
    }
  };

  const handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm("Do you want to delete card?");
    if (confirmDelete) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };


  const handleClearAll = () => {
    const confirmClear = window.confirm("Do you want to delete all cards?");
    if (confirmClear) {
      setTodos([]);
      localStorage.removeItem("todos");
    }
  };


  return (
    <div className={`${styles.container} ${styles.wrapper}`}>
      <h2 className={styles.title}>Welcome to Home</h2>

      <form className={styles.form}>
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter the football player's name..."
          className={styles["card-input"]}
        />
        <input
          type="text"
          ref={countryRef}
          placeholder="Enter the football player's country..."
          className={styles["card-input"]}
        />
        <input
          type="text"
          ref={urlRef}
          placeholder="Enter the football player's picture URL..."
          className={styles["card-input"]}
        />

        <button onClick={handleAddTodo} className={styles["add-button"]}>
          Add +
        </button>
      </form>

      <div className={styles["card-list"]}>
        {todos.map((todo, index) => (
          <div key={index} className={styles["card-item"]}>
            <img
              src={todo.url}
              alt={`${todo.name}'s picture`}
              className={styles["card-image"]}
            />
            <div>
              <h3>{todo.name}</h3>
              <p>{todo.country}</p>
              <button
                onClick={() => handleDeleteTodo(index)}
                className={styles["delete-button"]}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className={styles.footer}>
        <p className={styles.cardCount}>
          You have {todos.length} pending tasks
        </p>
        <button onClick={handleClearAll} className={styles["clear-button"]}>
          Clear All
        </button>
      </span>
    </div>
  );
}

export default Home;
