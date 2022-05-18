import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route, Router, Routes, Link } from "react-router-dom";
import {Theory} from "./pages/Theory";
import {Home} from "./pages/Home";
import {Pareto} from "./components/Pareto";

function App() {
  return (
    <div className="App">
        <Navbar />
        <h1>Hello</h1>

        <div className="container">
            <Home />
        </div>
    </div>
  );
}

export default App;
