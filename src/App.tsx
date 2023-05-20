import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import {Theory} from "./pages/Theory";
import {Home} from "./pages/Home";
import {Pareto} from "./components/Pareto";
import {BaseCriteria} from "./components/BaseCriteria";
import {PointScore} from "./components/PointScore";
import {Borda} from "./components/Borda";
import {Nanson} from "./components/Nanson";
import {WeightedSum} from "./components/WeightedSum";
import {PairComparisonCriterias} from "./components/PairComparisonCriterias";
import {Auth} from "./components/Auth";
import {Method} from "./components/Method"
import {Register} from "./components/Register"

function App() {
    return (
        <div className="App">
            <Navbar/>
            <BrowserRouter>
                <div style={{marginLeft: "50px", marginTop: "20px"}}>
                    <Routes>
                        <Route path={'/pages'} element = {<Home/>}/>
                        <Route path={'/pages/theory'} element = {<Theory/>}/>
                        <Route path={'/pages/pareto'} element = {<Pareto/>}/>
                        <Route path={'/pages/baseCriteria'} element = {<BaseCriteria/>}/>
                        <Route path={'/pages/pointScore'} element = {<PointScore/>}/>
                        <Route path={'/pages/pairComparisonCriteria'} element = {<PairComparisonCriterias/>}/>
                        <Route path={'/pages/borda'} element = {<Borda/>}/>
                        <Route path={'/pages/nanson'} element = {<Nanson/>}/>
                        <Route path={'/pages/weightedSum'} element = {<WeightedSum/>}/>
                        <Route path={'/pages/auth'} element = {<Auth/>}/>
                        <Route path={'/pages/register'} element = {<Register/>}/>
                        <Route path={'/pages/method'} element = {<Method/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}
export default App;
