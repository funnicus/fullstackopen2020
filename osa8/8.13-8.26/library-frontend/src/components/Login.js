import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  const submit = async event => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    setPage('authors')
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token)
      setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          type="username"
          placeholder="userame"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
