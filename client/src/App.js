import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";

const App = () => {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1 className="App">Welcome Home!</h1>
      {msg ? <h2>{msg}</h2> : null}
    </>
  );
};

export default hot(module)(App);
