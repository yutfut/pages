import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route, Router, Routes, Link, BrowserRouter} from "react-router-dom";
import {Theory} from "./pages/Theory";
import {New_Theory} from "./pages/New_Theory";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Pareto} from "./components/Pareto";

function App() {
  return (
    <div className="App">
        <Navbar />

        <BrowserRouter>
            <div className="container pt-4">
                <Routes>
                    <Route path={'/'} element = {<Home/>}/>
                    <Route path={'/theory'} element = {<Theory/>}/>
                    <Route path={'/about'} element = {<About/>}/>
                </Routes>
            </div>
        </BrowserRouter>

    </div>
  );
}

export default App;
