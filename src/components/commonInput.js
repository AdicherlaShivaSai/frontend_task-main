import React, { useState } from "react";
import "./components.css";

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email });
    setName("");  
    setEmail("");
  };

  return (
    <div className="header-box">
      <form onSubmit={handleSubmit}>
        <input
          required
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          {!!editMode ? "Edit user" : "Add user"}
        </button>
      </form>
    </div>
  );
};

export default InputHandler;
