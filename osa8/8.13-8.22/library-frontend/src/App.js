import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from './components/Recommended'
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("books-user-token");
    if (tokenInStorage) {
      setToken(tokenInStorage);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? <button onClick={() => setPage("add")}>add book</button> : null}
        {token ? <button onClick={() => setPage("recommended")}>recommended</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === 'recommended'} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

    </div>
  );
};

export default App;
