import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import axios from "axios";

export default function App() {
  useEffect(() => {
    axios
      .get("/api/users")
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      }
    </Routes>
  );
}
